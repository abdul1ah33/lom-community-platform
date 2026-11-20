import type { PathwayDetail } from "../../types";

/** Circle of Inevitability / Dancer (Outer Deity). Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "dancer",
  sequences: [
    {
      n: 9,
      name: "Dancer",
      powers: [
        {
          name: "Rhythm",
          text: "Far more flexible than almost anyone, with stronger spirituality. A master of rhythm who uses movement, beat and spirit to call on nature and unnamed powers. They can learn the ritual dances for the Circle of Inevitability and design new ones to please other beings.",
        },
        {
          name: "Summoning Dance",
          text: "An eerie mix of rite and summons that draws nearby beings in. For a price in blood, one possesses the dancer and lends a power or trait, if the dancer can bear it.",
        },
      ],
    },
    {
      n: 8,
      name: "Alms Monk",
      acting: [
        "Live as an ascetic monk: poor, restrained, sober and thrifty, begging and preaching. It sharpens your sense of fortune and your rites.",
      ],
      powers: [
        {
          name: "Sense of fortune",
          text: "Roughly feels others' recent luck: good, bad, disaster coming, romance ahead. Strong against harsh places and strong feelings.",
        },
        {
          name: "Animal and Prophecy Spells",
          text: "Animal hides turn a target, or the monk, into that animal, mute and mostly powerless until a counter-chant or the end of the rite. A brew poured into a corpse less than seven days dead lets it wake and answer three questions about the future.",
        },
        {
          name: "Luck Transference",
          text: "Puts its bad luck into an object for someone else to open, eat, step on or wear. If no one takes it within three days, the luck comes back for good. One at a time.",
        },
        {
          name: "Substitution and Exorcism",
          text: "Someone who has lived as another long enough can, through ritual, become indistinguishable from them. With a ghost's true name, a belonging and time, spirits can be driven off for good.",
        },
      ],
    },
    {
      n: 7,
      name: "Contractee",
      powers: [
        {
          name: "Contracts",
          text: "Special contracts, witnessed by godhood, are woven into body and soul. With a summoned being's consent, each one lends a chosen trait, and the stronger the being, the more its influence seeps in. Witnesses needn't be the Circle itself.",
        },
        {
          name: "A strange toolkit",
          text: "Common gains include tame imps, rising again in your killer's body, spirit form, shadow burial and decoys, curses of headache and bone, demon flowers, invisibility, slow flight, steel skin, poison, teleportation, weakening rays and more.",
        },
        {
          name: "Stronger summons",
          text: "Much more spirit, and the Summoning Dance reaches further and can bind stronger beings.",
        },
      ],
    },
    {
      n: 6,
      name: "Ascetic",
      powers: [
        {
          name: "Endure, store, release",
          text: "Frost doesn't freeze it, and desire and emotion can be held back, not erased. What's held is stored, to be released at the key moment.",
        },
        {
          name: "Accumulation",
          text: "Packs away spirit and strength beyond human limits for later. That means a refill of spirituality, or one or two minutes as a giant matching a Dawn Paladin. Stored ritual steps let it cast long rites in combat with a chant.",
        },
        { name: "More contracts", text: "Twice as many contracts as a Contractee." },
      ],
    },
    {
      n: 5,
      name: "Fate Appropriator",
      powers: [
        {
          name: "Appropriation",
          text: "Sense of luck becomes sight of fate. It reaches into someone's River of Fate and takes a chosen stretch, slowly if the stretch matters, faster if the target is dead and their fate fixed. It holds up to three.",
        },
        {
          name: "Fate Exchange",
          text: "Swaps a stretch it holds for one of the target's, fastest when they weigh the same. Usually quicker than taking, and it can walk away while it works.",
        },
        {
          name: "Compelling Fate",
          text: "Steers where someone's fate goes next through rituals and curses. Up to twelve contracts now.",
        },
      ],
    },
    {
      n: 4,
      name: "Circle Inhabitant",
      powers: [
        {
          name: "Circles",
          text: "Draws loops of fate, cause and effect, past and present, on an enemy, an area or itself, one at a time, cycling up to nine times. Targeted circles can set harsh terms but weaken against stronger foes. Area circles can't, but reach even angels. Worse fates cost more power and take longer.",
        },
      ],
    },
    {
      n: 3,
      name: "Sufferer",
      powers: [
        {
          name: "Present pain",
          text: "Embodies the present. It brings past suffering back onto a target, as hard as that suffering was. It can fix its own state in the present to shrug off bursts of desire and mental attacks without a circle. Tougher against every kind of harm.",
        },
      ],
    },
    {
      n: 2,
      name: "Sinner",
      powers: [
        {
          name: "Past and causality",
          text: "Rolls its own state back to any earlier moment, though not to anything tied to a Uniqueness without its owner's consent, or to Sefirot. It anchors a target's past sins to force an outcome now, and can slip a false past into fate for a split second before the river fixes it.",
        },
      ],
    },
    {
      n: 1,
      name: "Angel of Redemption",
      powers: [
        {
          name: "Inevitable future",
          text: "Gains a first hold on the future and its outcomes. Opens a new branch in fate's river, pins a target to a chosen branch so an outcome happens regardless of cause, at a cost against stronger targets, and by instinct conjures new hope from nothing to redeem the future.",
        },
      ],
    },
    {
      n: 0,
      name: "Bearer of the Eternal Aeon",
      powers: [
        {
          name: "Cycle and inevitability",
          text: "Joins past, present and future, cause, process and outcome into one. The disasters it brings run far deeper than a Sufferer's pain.",
        },
      ],
    },
    {
      n: -1,
      name: "Circle of Inevitability",
      powers: [
        {
          name: "The redeemer",
          text: "Eternal cycles and certain fate, cause, process and outcome in one being. Its deepest symbol is redemption. Fate is chaotic, and when that chaos threatens the whole universe, its instinct is to save it. Like Fate, it has only one pathway, and crossing into Fate is only possible, very riskily, through pathways like this.",
        },
      ],
      notes: [
        {
          label: "Mythical form",
          text: "A colossal silver-black being with three heads, three bodies and six arms, joined in a ring.",
        },
        {
          label: "Followers",
          text: "The Order of Suffering, the Sinner, the School of Redemption, the Eternal Cycle, the Hand of Fate, the Dance of Devotion and the Order of Asceticism.",
        },
      ],
    },
  ],
};

export default pathway;
