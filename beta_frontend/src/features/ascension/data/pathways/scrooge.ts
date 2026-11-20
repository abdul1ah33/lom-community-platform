import type { PathwayDetail } from "../../types";

/** Mother Tree of Desire / Scrooge (Outer Deity). Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "scrooge",
  sequences: [
    {
      n: 9,
      name: "Scrooge",
      powers: [
        {
          name: "Greed",
          text: "Grows ever more greedy and stingy and can stir greed in others, more strongly through a chosen object. For a while, senses where things they once owned have ended up.",
        },
        {
          name: "Gluttony",
          text: "Stirs up appetite in others. Never wasting food makes them stronger and sturdier than they look.",
        },
      ],
    },
    {
      n: 8,
      name: "Sex Addict",
      powers: [
        {
          name: "Burning hunger",
          text: "A healthy, powerful body that is always hungry and always on edge, as if burning its own life. Strength, reflexes, speed and toughness rise. Resists many influences, except from whatever it craves.",
        },
        {
          name: "Lust",
          text: "Looks, words and gestures quietly stir desire and steal attention. A touch or a spell-like trick makes it strong enough to wipe out reason for a moment.",
        },
        { name: "Chemistry", text: "Brews sedatives and aphrodisiacs, and can smell each person's hormones." },
      ],
    },
    {
      n: 7,
      name: "Actor",
      acting: [
        "Find a proper stage so the urge to perform can be fed without suspicion.",
        "Never lose yourself in a role.",
      ],
      powers: [
        {
          name: "The urge to perform",
          text: "A burning need to be seen, which it can stir in others until they're restless, touchy and showy.",
        },
        {
          name: "Becoming the role",
          text: "Reshapes muscle, skin and bone a little, with master-level makeup, props, acting and mimicry.",
        },
        {
          name: "Mystical imitation",
          text: "Playing an ordinary person makes even its Astral Projection ordinary, and playing a soldier makes it a good fighter. It can copy other Beyonders' powers after watching them, at first as harmless illusions, and after months of study as real but weaker copies.",
        },
      ],
    },
    {
      n: 6,
      name: "Recipient",
      powers: [
        {
          name: "Craving glory",
          text: "Feeds on the hunger for success and praise, and can enter a surging, adrenaline-like state.",
        },
      ],
    },
    {
      n: 5,
      name: "Fallen Tree Spirit",
      powers: [
        {
          name: "Dream lover",
          text: "Weaves illusions and slips into dreams, often for intimacy that drains the dreamer's life. In time it may think of itself as the victim's spouse and, in jealous rage, kill their real partners.",
        },
        {
          name: "Tree spirit",
          text: "Grows vines and fires branches like arrows. The tree it takes as a host can grant limited extras, like being very hard to kill.",
        },
      ],
    },
    {
      n: 4,
      name: "Tree Supplicant",
      powers: [
        {
          name: "Talking trees",
          text: "Feeds on the hunger to know and to survive. Wakes trees into walking humanoids, and prays to different trees for different temporary gifts. The Mother Tree of Desire is a tree too, and it roars back.",
        },
      ],
    },
    {
      n: 3,
      name: "Priest of Desire",
      powers: [
        {
          name: "Proxy of desire",
          text: "Anyone who still wants anything is within reach. It can strip a target's sanity in moments.",
        },
      ],
    },
    {
      n: 2,
      name: "Cupid",
      powers: [
        {
          name: "Love",
          text: "Holds the authority of love, which belongs to gods, not just to humans. It makes anyone love it, makes others love each other through a medium, or makes someone fall in love with an idea, even murder.",
        },
      ],
    },
    {
      n: 1,
      name: "Leviathan",
      powers: [
        {
          name: "Jealousy",
          text: "Commands envy and the urge to dominate, because a friend's success burns more than your own failure. It first touches the authority of reason.",
        },
      ],
    },
    {
      n: 0,
      name: "Primogenitor",
      powers: [
        {
          name: "Father of the feeling",
          text: "Ruler of thinking beings, both an angry scolding and a whisper of pain. Its roar echoes forever in desire and emotion, pulling people into depravity and illusion. While desire burns it lives. If it dies, a new and different one is born from emotion.",
        },
      ],
    },
    {
      n: -1,
      name: "Mother Tree of Desire",
      powers: [
        {
          name: "Beyond the Pillars",
          text: "Also called the Perpetual Blatherer and the God of Lost Minds. Reunited with the part of itself lost on Earth, it would be the strongest Great Old One outside the Pillars, and with one more Sefirah it could rival them. It holds the Prisoner and Criminal pathways as well as its own.",
        },
      ],
      notes: [
        {
          label: "Mythical form",
          text: "A humanoid giant tree in chaotic scales, hung with crystal fruit, lush flowers, badges, black hearts, tumours and coins of many civilisations, crowned by two heads: a man with closed eyes and a breathtaking green-haired woman.",
        },
        {
          label: "Followers",
          text: "The Rose School of Thought, Bliss Society, Tree Worship Sect, Non-Self Society, Hall of Honour, Love Society, the Seekers and the Naturism Sect.",
        },
      ],
    },
  ],
};

export default pathway;
