"""
Turn the summary PDFs into the JSON the website reads.

    python pdf_summaries/extract_text.py

Needs `pdftotext` (Poppler) on PATH. For each PDF it writes
beta_frontend/src/features/summaries/data/text/v2-p<N>.json shaped like:

    {
      "prelude": [ "paragraph", {"heading": "The Sun"}, ... ],   # notes before the first chapter
      "chapters": { "214": ["paragraph", {"quote": ["passage from the novel", ...]}, ...], ... }
    }

and checks every chapter number and title against vol2Chapters.ts.
"""

import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PDF_DIR = ROOT / "pdf_summaries"
DATA_DIR = ROOT / "beta_frontend" / "src" / "features" / "summaries" / "data"
OUT_DIR = DATA_DIR / "text"

PARTS = {
    "v2-p1": "lom vol2 summary part 1.pdf",
    "v2-p2": "lom vol2 summary part 2.pdf",
    "v2-p3": "lom vol2 summary part 3.pdf",
}

CHAPTER = re.compile(r"^chapter\s+(\d+)\s*:\s*(.+)$", re.IGNORECASE)
# Titles the website already shows itself, e.g. "Volume 2: Faceless", "Notes from Volume 1".
VOLUME_TITLE = re.compile(r"^(volume\s+\d+\s*:|notes from volume \d+$)", re.IGNORECASE)
PAGE_BREAK = "\f"


def pdf_lines(pdf: Path) -> list[str]:
    """pdftotext puts one paragraph per line, and a form feed where a page ends."""
    out = subprocess.run(
        ["pdftotext", "-enc", "UTF-8", str(pdf), "-"],
        check=True,
        capture_output=True,
    ).stdout.decode("utf-8")
    for old, new in FIXES:
        out, count = re.subn(old, new, out)
        if count > 1:
            raise ValueError(f"fix matched {count} times: {old}")
    lines: list[str] = []
    for line in out.split("\n"):
        # A form feed can sit at the start of a line: split it off as its own marker.
        while line.startswith(PAGE_BREAK):
            lines.append(PAGE_BREAK)
            line = line[1:]
        lines.append(" ".join(line.split()))
    return lines


# Spots where pdftotext reads a wrapped line out of order: (regex on the extracted text, as written).
FIXES = [
    (
        r"shook his hand\. \] it’s money\)\s+\(If there’s one thing in this world that Klein loves,",
        "shook his hand. ]\n(If there’s one thing in this world that Klein loves, it’s money)",
    ),
]

# A line ending in one of these finishes its paragraph; anything else was cut short.
ENDS_PARAGRAPH = tuple(".!?:;…)]”\"’*")


def closing_bracket(line: str) -> int:
    """Index of the "]" that ends a quote, skipping editorial ones like "[the Apothecary’s]"."""
    depth = 0
    for i, char in enumerate(line):
        if char == "[":
            depth += 1
        elif char == "]":
            if depth == 0:
                return i
            depth -= 1
    return -1


def parse(lines: list[str]) -> dict:
    """
    Blocks are a paragraph (str), {"heading": str} in the prelude, or {"quote": [str, ...]}:
    the author quotes the novel itself between "[" and "]".
    """
    prelude: list = []
    chapters: dict[str, list] = {}
    blocks = prelude  # where the next block goes
    paragraphs = prelude  # where the next paragraph goes: `blocks`, or the open quote
    after_break = False

    def add(text: str) -> None:
        nonlocal after_break
        last = paragraphs[-1] if paragraphs and isinstance(paragraphs[-1], str) else None
        # Hard-wrapped lines, or a paragraph cut in two by a page break, get rejoined.
        if last and (not last.endswith(ENDS_PARAGRAPH) or (after_break and text[0].islower())):
            paragraphs[-1] = f"{last} {text}"
        else:
            paragraphs.append(text)
        after_break = False

    for line in lines:
        if line == PAGE_BREAK:
            after_break = True
            continue
        if not line or line == "[]" or VOLUME_TITLE.match(line):
            continue

        heading = CHAPTER.match(line)
        if heading:
            blocks = paragraphs = chapters.setdefault(heading.group(1), [])
            after_break = False
            continue

        if line.startswith("[") and paragraphs is blocks:
            quote: list[str] = []
            blocks.append({"quote": quote})
            paragraphs = quote
            line = line[1:].strip()

        close = closing_bracket(line) if paragraphs is not blocks else -1
        if close >= 0:
            inside, rest = line[:close], line[close + 1 :]
            if inside.strip():
                add(inside.strip())
            paragraphs = blocks
            after_break = False
            if rest.strip():
                blocks.append(rest.strip())
            continue

        if blocks is prelude and line.endswith(":") and len(line) <= 40:
            blocks.append({"heading": line[:-1]})
        elif line:
            add(line)

    if paragraphs is not blocks:
        raise ValueError(f"a quote starting {paragraphs[:1]} is never closed")
    return {"prelude": prelude, "chapters": chapters}


def paragraphs_of(blocks: list):
    for block in blocks:
        if isinstance(block, str):
            yield block
        elif "quote" in block:
            yield from block["quote"]


def index_titles() -> dict[str, list[tuple[int, str]]]:
    """Chapter index per part, read from vol2Chapters.ts (VOL2_PART1 → v2-p1)."""
    source = (DATA_DIR / "vol2Chapters.ts").read_text(encoding="utf-8")
    parts: dict[str, list[tuple[int, str]]] = {}
    for n, body in re.findall(r"VOL2_PART(\d+)[^=]*=\s*\[(.*?)\n\];", source, re.DOTALL):
        rows = re.findall(r'\[(\d+),(?:\s*\d+,)?\s*"((?:[^"\\]|\\.)*)"\]', body)
        parts[f"v2-p{n}"] = [(int(num), title) for num, title in rows]
    return parts


def main() -> int:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    expected = index_titles()
    problems = 0

    for part_id, filename in PARTS.items():
        text = parse(pdf_lines(PDF_DIR / filename))
        found = [int(n) for n in text["chapters"]]
        wanted = [n for n, _ in expected[part_id]]
        if found != wanted:
            problems += 1
            print(f"{part_id}: chapters differ from the index\n  missing {set(wanted) - set(found)}\n  extra {set(found) - set(wanted)}")
        for n, paragraphs in text["chapters"].items():
            if not paragraphs:
                problems += 1
                print(f"{part_id}: chapter {n} has no text")

        out = OUT_DIR / f"{part_id}.json"
        out.write_text(json.dumps(text, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
        words = sum(len(p.split()) for ps in text["chapters"].values() for p in paragraphs_of(ps))
        print(f"{part_id}: {len(found)} chapters, {words} words -> {out.relative_to(ROOT)}")

    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
