import type { PathwayDetail } from "../../types";

/** Wheel of Fortune / Monster. Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "monster",
  sequences: [
    {
      n: 9,
      name: "Monster",
      potion: "Clear, with what looks like a rainbow aurora inside.",
      main: ["Tail of a colourful carp", "A silver four-leaf clover"],
      sub: [
        "100 ml muddy river water",
        "3 ordinary four-leaf clovers",
        "10 drops monkeyflower extract",
        "A Sequence 9-grade lucky charm",
        "9 drops of your own blood",
      ],
      powers: [
        {
          name: "Too much spirit",
          text: "Spiritual perception so high they hear and see what others can't, catch glimpses of the future and feel danger coming.",
        },
        {
          name: "The 'monster'",
          text: "They often slip into trances, muttering things no one understands, so people really do think they're monsters.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A scaly silver petal." }],
    },
    {
      n: 8,
      name: "Machine",
      potion: "Cold grey, as if frozen solid.",
      main: ["One orange light stone", "Crystal of a young unicorn"],
      sub: [
        "80 ml young unicorn blood",
        "10 snake scales, white or silver preferred",
        "7 drops white chestnut oil",
        "9 stalks lemongrass",
        "13 g rust",
      ],
      powers: [
        {
          name: "Calculation",
          text: "Frightening mental arithmetic and precise control of the body, which makes them gifted at close combat and shooting.",
        },
        { name: "Divination", text: "Can divine, and block divination." },
      ],
      notes: [{ label: "Characteristic", text: "A crystal-clear, cold grey stone." }],
    },
    {
      n: 7,
      name: "Lucky",
      potion: "Mercury-coloured with floating bubbles like countless opening eyes.",
      main: ["A Flower of Serendipity", "Eye of a Silvereye Snake"],
      sub: [
        "100 ml Silvereye Snake blood",
        "15 g soil where the Flower grew",
        "A gold or silver coin found in the last three days",
        "10 ml mercury",
      ],
      acting: [
        "Delighting in luck is often how disaster starts.",
        "Don't scorn bad luck, and don't lean on good luck.",
      ],
      powers: [
        {
          name: "Luck",
          text: "Good fortune turns up often: money on the street, shots that miss, dice that obey, a crush who likes them back. It comes and goes, though, so it can't be counted on.",
        },
      ],
      notes: [
        { label: "Characteristic", text: "A mercury-coloured eye that slowly rolls in every direction, as if alive." },
      ],
    },
    {
      n: 6,
      name: "Calamity Priest",
      potion: "Silver under a black-green skin, with a sickening stench.",
      main: ["Heart of a blue-spotted Fire Bird", "Snake tail of a one-eyed white ox"],
      sub: [
        "90 ml one-eyed white ox blood",
        "3 blue-spotted Fire Bird feathers",
        "10 drops gentian extract",
        "Obsidian stained with someone else's blood",
      ],
      powers: [
        {
          name: "Magnet for disaster",
          text: "Disasters keep finding them, but they see them coming and prepare. They can also pull disasters onto a target on purpose, dodge most of the danger with luck, and strike in the chaos.",
        },
        {
          name: "Psyche Storm",
          text: "Overwhelming spirituality slams into an enemy's soul and leaves them dazed. A dazed enemy makes mistakes, and the disaster snowballs until it swallows them.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A fist-sized heart in mercury-coloured scales." }],
    },
    {
      n: 5,
      name: "Winner",
      potion: "Golden, filling you with joy.",
      main: ["A Beatified Crystal", "Heart of a Redflame Treant"],
      sub: [
        "80 ml Redflame Treant sap",
        "20 g Beatified Crystal residue",
        "10 g white mustard seed",
        "9 drops sweet chestnut oil",
        "Luck that came from someone else",
      ],
      ritual: "Stay unlucky for a whole month without a single stroke of good fortune.",
      powers: [
        {
          name: "Banked luck",
          text: "Some control over their own luck. Holding back stores it up, then it saves their life dramatically at the critical moment. Odds-against good things happen: a mistaken inheritance, an admirer won by a silly walk, pursuers getting lost.",
        },
        { name: "Foresight", text: "Keen foresight, and expert at divining and blocking divination." },
        { name: "Bad luck for others", text: "Can make enemies unlucky." },
      ],
      notes: [{ label: "Characteristic", text: "A 'golden' stone glowing with red flame." }],
    },
    {
      n: 4,
      name: "Mage of Misfortune",
      potion: "Black, streaked with flowing grey-white.",
      main: ["Brain of a Fourear Giant Ape", "Horn of an adult unicorn"],
      sub: [
        "90 ml adult unicorn blood",
        "Ear of a Fourear Giant Ape",
        "An aquamarine purified with salt",
        "One golden orange",
      ],
      ritual:
        "At a low point in your luck, face a major disaster and survive it without preparing or trying to soften it.",
      powers: [
        {
          name: "Misfortune Domain",
          text: "Anyone, any number, entering 100 to 300 metres around them catches bad luck.",
        },
        {
          name: "Blessings and curses",
          text: "Spends their own luck to bless one person, or everyone they choose within fifty metres. Can pull someone's future luck into now, or curse them with deadly misfortune.",
        },
        {
          name: "Madness storm",
          text: "Psyche Storm now scrambles thoughts and adds a touch of madness.",
        },
        {
          name: "Body of Mercury",
          text: "A huge physical leap, and strong passive protection against divination and prophecy. Absolute intuition for shifts in fate, beacons and high powers.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A sharp black horn with many grey-white folds." }],
    },
    {
      n: 3,
      name: "Disorderwalker",
      potion: "Wildly chaotic, churning cold silver, grey, black and green.",
      main: ["Crystal core of a Calamity Phoenix", "Gallbladder of a Misfortune White Snake"],
      sub: [
        "40 ml Misfortune White Snake venom",
        "40 ml Calamity Phoenix blood",
        "A Placate charm from a Spectator of Sequence 2 or higher, or similar",
        "Nine thank-you letters from survivors of misfortune or disaster",
      ],
      ritual: "Pin down a destination or beacon your fate will certainly reach within ten years.",
      powers: [
        {
          name: "Disorder",
          text: "Throws a settled fate back into chaos so nothing is certain anymore, and drags spirit and fate towards madness. Fate's chaos comes from the Oldest One's madness.",
        },
        {
          name: "Keeper of Fate",
          text: "Spots the mad, chaotic threads in a tangled fate, to step around or seal them.",
        },
        {
          name: "Spirit Baptism",
          text: "Washes a spirit clean and calm, as at the very beginning.",
        },
      ],
      notes: [
        {
          label: "Characteristic",
          text: "A silver-grey patterned jelly that scrambles the mind and seems to warp fate.",
        },
      ],
    },
    {
      n: 2,
      name: "Soothsayer",
      potion: "Pure, thick mercury covered in tiny symbols.",
      main: ["Horn of a Grey Tiger of Fate, heart of a Snakescale Treant Elder, or a Soothsayer characteristic"],
      sub: [
        "A major revelation that came true, written down before it did",
        "A blessing from one of the Spirit World's Seven Lights",
        "A century of saved-up luck",
        "100 ml blood or sap from one of the creatures above, or from a matching angel",
      ],
      ritual:
        "Look into the River of Fate, find a revelation about at least one country, and see it come true exactly as you saw it.",
      powers: [
        {
          name: "Fortune and misfortune",
          text: "Part of fate: good luck, bad luck and foresight. Grants either to anyone within thirty kilometres.",
        },
        {
          name: "Revelation",
          text: "Reads the River of Fate for answers. Prophecies may be false, but anyone who believes one and acts on it makes it true. In a maze of choices, revelations point the way, if read correctly. Misreading them is very dangerous.",
        },
        {
          name: "Prophecy",
          text: "Foretells how luck will shape a person or event, and it usually comes true, or very nearly.",
        },
        {
          name: "Mercury Body",
          text: "The full mythical form, joined with the River of Fate. When attacked, nothing touches it for ten seconds, and its luck stays extraordinary after.",
        },
      ],
      notes: [
        {
          label: "Characteristic",
          text: "A scaled horn, a wood-grained heart or a cracked tortoise shell, all mercury-coloured.",
        },
      ],
    },
    {
      n: 1,
      name: "Snake of Mercury",
      potion: "A small mercury snake curled head to tail inside a clear shell, more flowing water than snake.",
      main: ["Core of a Mercury Phoenix or Mercury Giant Serpent, or a Snake of Mercury characteristic"],
      sub: [
        "9 drops from the River of Fate, each one a stretch of your own fate",
        "Something touched by the grey fog of Sefirah Castle",
        "Your own umbilical cord or eggshell",
      ],
      ritual:
        "Pull out all your memories and pour them back after drinking, or return to an unborn state while all buried awareness is reawakened.",
      powers: [
        {
          name: "Cycle",
          text: "Also called the Ouroboros of Fate. Hides how strange its fate is. Facing certain doom, it restarts as an embryo, a little different each time to stay sane. It must act like a child when young, and needs faith to anchor it or the state won't last.",
        },
        {
          name: "Cycle of Fate",
          text: "Traps someone in a loop where time moves but keeps coming back around, in a kind of stillness.",
        },
        {
          name: "Restart",
          text: "Resets a place or events, not by reversing time but by loading a saved state over the present.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A mercury ring covered in symbols of cycles." }],
    },
    {
      n: 0,
      name: "Wheel of Fortune",
      potion: "A slowly turning wheel, half real, covered in mysterious symbols.",
      main: ["The Wheel of Fortune Uniqueness", "Three Snake of Mercury characteristics"],
      sub: ["Nine markers in the River of Fate, past, present or future"],
      ritual: "Find the right moment in the flow of fate.",
      powers: [
        {
          name: "Fate",
          text: "Close to fate itself, roaming the River of Fate. It can briefly bend the river's branches so its prophecies come true for certain.",
        },
        {
          name: "Probability",
          text: "Everything can be turned into odds. Mastering probability is mastering the fate of all things.",
        },
        {
          name: "Cycle",
          text: "Return to the mother, the source, the beginning, an instinct of the universe. It copies a stretch of fate from up to three minutes ago over the present, or picks the branch it wants, such as a restart.",
        },
        { name: "Disorder", text: "Fate is chaos at heart, and the Wheel watches over that madness and uses it." },
      ],
      notes: [
        { label: "Uniqueness", text: "Probability made solid, usually as dice." },
        {
          label: "Divine kingdom",
          text: "The Light Cone World, ruled by probability, where every action rolls invisible dice and the Wheel loads them.",
        },
      ],
    },
  ],
};

export default pathway;
