import type { PathwayDetail } from "../../types";

/** Inextinguishable Ravings / Initiator (Outer Deity). Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "initiator",
  sequences: [
    {
      n: 9,
      name: "Initiator",
      powers: [
        {
          name: "Ascent of the mind",
          text: "Through secret rites like Midoro's Worship, the mind rises, much like astral projection, and witnesses wonders at the edge of immortality, coming back with knowledge and powers.",
        },
        {
          name: "Alignment",
          text: "These rites aren't contracts. They tune the mind step by step to a hidden being, earning experiences and secret knowledge.",
        },
      ],
    },
    {
      n: 8,
      name: "Critic",
      powers: [
        {
          name: "Reading minds",
          text: "Feels the ebb and pull of others' thoughts, so it always makes the fitting choice. The audience and the critic know you better than you do.",
        },
      ],
    },
    {
      n: 7,
      name: "Orator",
      powers: [{ name: "Speech", text: "Pours its mind into its words, deeply moving anyone who hears them." }],
    },
    {
      n: 6,
      name: "Singer",
      powers: [
        {
          name: "Songs of revelation",
          text: "Sings the effects it gained through its visions into reality, each song doing something different.",
        },
      ],
    },
    {
      n: 5,
      name: "Bearer of Secrets",
      powers: [
        {
          name: "Sharing secrets",
          text: "Passes hidden knowledge from its ascents straight into other minds, safe or deadly, a fast but unguarded exchange. The more terrible the secrets it carries, the stronger it is.",
        },
      ],
    },
    {
      n: 4,
      name: "Philosopher",
      powers: [
        {
          name: "Philosophical prison",
          text: "Uses its ravings to sink a target into its philosophy. Anyone who resonates with it can't escape, and ends as a silent statue, mad, or out of control.",
        },
        {
          name: "Schools as spells",
          text: "Draws power from philosophies, like materialism making a zone where the supernatural fades. Always torn by pain and doubt, on the line between sense and madness.",
        },
      ],
    },
    {
      n: 3,
      name: "Messenger of God",
      powers: [
        {
          name: "Voice of the Old Ones",
          text: "The great turning point. Its knowledge now comes as the voices and thoughts of Great Old Ones, and it can bear them, but a bond with them means its fate is theirs to decide.",
        },
      ],
    },
    {
      n: 2,
      name: "Great Old One Attendant",
      powers: [
        {
          name: "Pure mind",
          text: "Becomes a being of pure mind and spirit, serving the Ravings and carrying part of its thought, even parts of other Great Old Ones' minds without losing control.",
        },
      ],
    },
    {
      n: 1,
      name: "Voice of the Heart",
      powers: [
        {
          name: "Inescapable raving",
          text: "As long as there is thought, no one on the same world escapes its voice.",
        },
      ],
    },
    {
      n: 0,
      name: "The Immortal",
      powers: [
        {
          name: "Consciousness",
          text: "Holds consciousness and spirit, and exists alongside them forever, so it can't die. Rules culture and thought, and can feed the very laws false information across a planet.",
        },
      ],
    },
    {
      n: -1,
      name: "Inextinguishable Ravings",
      powers: [
        {
          name: "The undying mind",
          text: "The source of philosophy, the sum of every thinking mind. It has no body at all, only a phenomenon that can cling to objects and tint their colour or shape.",
        },
      ],
      notes: [
        {
          label: "Followers",
          text: "The Initiates, the Council, the Messengers, Feelers of the Immortal, First Philosophy, the Sacred Attendants and the Shadow Preaching Assembly.",
        },
      ],
    },
  ],
};

export default pathway;
