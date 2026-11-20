import type { PathwayDetail } from "../../types";

/** Goddess of Fate / Dreamless (Outer Deity). Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "dreamless",
  sequences: [
    {
      n: 9,
      name: "Dreamless",
      powers: [
        {
          name: "No more dreams",
          text: "Loses dreaming and dream revelations, but can no longer be dragged into dreams, and starts to sense how fate flows and shifts.",
        },
      ],
    },
    {
      n: 8,
      name: "Musician",
      powers: [
        {
          name: "The music of fate",
          text: "Hears fate's voice and, with long preparation and a long enough performance, plays it back to nudge a target's fate. Many blind themselves to listen and play better.",
        },
      ],
    },
    {
      n: 7,
      name: "Fate Pryer",
      powers: [{ name: "Direct revelation", text: "Sees or hears fate's revelations without any medium." }],
    },
    {
      n: 6,
      name: "Mute",
      powers: [
        {
          name: "Spoken fate",
          text: "Speaks a revelation aloud to act directly on the target, then must stay silent for a long while to avoid fate's backlash.",
        },
      ],
    },
    {
      n: 5,
      name: "Deceased",
      powers: [
        {
          name: "Feigned death",
          text: "A fake death cuts it loose from its old fate. Fate-level divination and prophecy can't find it, though its looks don't change. The limits on its earlier fate powers fall away, and they become steadier.",
        },
      ],
    },
    {
      n: 4,
      name: "Fate Changer",
      powers: [{ name: "Manipulation", text: "No longer just influences fate but steers it, its own included." }],
    },
    {
      n: 3,
      name: "Fate's Attendant",
      powers: [
        {
          name: "Weaving fate",
          text: "Arranges fates almost like an Author. Weaving a strong target, or many at once, has a price: each weave wounds the weaver until the damage kills. It's hard to heal except through the Mother's pathway.",
        },
      ],
    },
    {
      n: 2,
      name: "Web Weaver",
      powers: [
        {
          name: "The web",
          text: "Eyeless, with the first true grip on weaving fate. Ties many fates into one web with no backlash. Its three-bodied mythical form is forming, but only the eyeless body is clear yet.",
        },
      ],
    },
    {
      n: 1,
      name: "Blade of Fate",
      powers: [
        {
          name: "Judging fate",
          text: "Gains the authority to judge fate and forms a blade that severs its threads and branches. The headless body takes shape, and its arrangements outdo an Author's.",
        },
      ],
    },
    {
      n: 0,
      name: "Law of Immortality",
      powers: [
        {
          name: "Immortal in fate",
          text: "Weaves, gathers and judges fate. While every fate still flows together as a river, it can't die: destroy the body and its mind returns from the river to take a new one, with no need for prepared resurrections or slow revival like most Great Old Dominators.",
        },
      ],
    },
    {
      n: -1,
      name: "Goddess of Fate",
      powers: [
        {
          name: "Weaver of all things",
          text: "Weaver of everyone's fate, symbol of final judgment, the goddess of immortality to come. She is the eldest daughter of the Original Creator and the Mother Goddess of Depravity, and the symbol that keeps the River of Fate orderly and flowing. Killing her for good would mean ending every life and breaking the river.",
        },
      ],
      notes: [
        {
          label: "Mythical form",
          text: "Three bodies side by side: the eyeless one weaves fate, the armless one gathers it, the headless one judges it.",
        },
        {
          label: "Followers",
          text: "People of the Web, the Dreamseekers, the Deceased, the Supreme School of Fate, the Blade, the Silent Society and the Masquerade.",
        },
      ],
    },
  ],
};

export default pathway;
