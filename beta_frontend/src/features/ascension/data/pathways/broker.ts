import type { PathwayDetail } from "../../types";

/** Uncertain Mist / Broker (Outer Deity). Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "broker",
  sequences: [
    {
      n: 9,
      name: "Broker",
      powers: [
        {
          name: "Middleman",
          text: "Senses what people need, finds who can provide it, and brokers the deal with words and contacts, settling the fee first or waiving it for goodwill. No powers needed.",
        },
        {
          name: "Gray Perception",
          text: "A keen sense of the grey between black and white: who is willing to go there and what they want. Silver-tongued and good at reading faces.",
        },
      ],
    },
    {
      n: 8,
      name: "Shadow Merchant",
      powers: [
        {
          name: "Trading with the dark",
          text: "Spots things lurking in shadow and can safely deal with them, because it softens nearby malice, less so against stronger beings. Rules: no attacking, no hidden harm, no obvious ill will, and it's not safe in an actual battle. Seeing what shouldn't be seen still corrupts it.",
        },
        {
          name: "Shadow contracts",
          text: "Deals sealed by both parties' shadows bind their souls. Break one and the shadow tears at your spirit. It can quietly shift key terms at the last moment.",
        },
        { name: "Shadow tricks", text: "Hides in shadows, becomes one, or casts false ones, mostly to stay alive." },
      ],
    },
    {
      n: 7,
      name: "Prosecutor",
      powers: [
        {
          name: "Indictment",
          text: "Sees the crimes someone has committed, not how. Declare them guilty, name the charge, and punishment falls from the world itself, scaled to the crime, up to sudden death or losing control. A crime in progress needs no charge named.",
        },
        { name: "Words of Order", text: "Strange words that call on the forces of nature." },
      ],
    },
    {
      n: 6,
      name: "Ambitionist",
      powers: [
        {
          name: "Ambition",
          text: "Endless ambition fuels a strong body, sharp senses and great spirituality, always pushing for more combat power. It refuses forced sleep or blackout until it chooses to rest. The mind itself doesn't improve.",
        },
      ],
    },
    {
      n: 5,
      name: "Under the Table",
      powers: [
        {
          name: "Back-room deal",
          text: "Mid-fight, it creates an invisible, peaceful space where a foe can be made to accept terms in exchange for something of value. The terms can't hurt them, and the Broker has to act natural. Works best on people used to grey areas. On the Sun's Unshadowed, almost never.",
        },
        {
          name: "Deal with the unknown",
          text: "Given time and a closed space, it bargains with some unseen being from the dark, whose identity and methods stay hidden. Name the wish, pay the price, get the result.",
        },
      ],
    },
    {
      n: 4,
      name: "Overseer",
      powers: [
        {
          name: "Oversight",
          text: "Watches everything, secrets included, across hundreds to thousands of metres. It enforces contracts automatically, with flexible taboos that shift with circumstance. It sees crimes before they happen and makes the would-be victim appear and strike back.",
        },
        {
          name: "Sacred immunity",
          text: "Beings without godhood can't hurt it at all: their attacks bounce back as punishment. Against the godly, a barrier holds two or three blows and punishes the attacker.",
        },
      ],
    },
    {
      n: 3,
      name: "Vortex Weaver",
      powers: [
        {
          name: "The platform",
          text: "Becomes the hub of all trade. The body turns into a slowly spinning vortex of white mist that can deal across any distance and, under a ritual's protection, any rank, weaving a vast network.",
        },
      ],
    },
    {
      n: 2,
      name: "Blasphemer",
      powers: [
        {
          name: "Stolen through trade",
          text: "Steals power through deals, even from beings as high as Great Old Ones, though that kills it. Takes apart opposites like sacred and profane, light and dark.",
        },
      ],
    },
    {
      n: 1,
      name: "Truth",
      powers: [
        {
          name: "Grey truth",
          text: "Light is too extreme, dark too depraved, order too rigid, shadow too twisted. Only grey is true. Really, the truth is how people deal with each other, flaws and all, and how even gods bargain. It blurs, unpicks or swaps out logic.",
        },
      ],
    },
    {
      n: 0,
      name: "Chaos Mist",
      powers: [
        {
          name: "Uncertainty",
          text: "Makes everything certain uncertain again: fate's course, fixed outcomes, words just spoken, what just happened. It can't undo the past, only unsettle what must follow from it.",
        },
      ],
    },
    {
      n: -1,
      name: "Uncertain Mist",
      powers: [
        {
          name: "Between light and dark",
          text: "The bridge between light and darkness, the gap between black and white, the mist that never settles, the Truth watching over all things.",
        },
      ],
      notes: [{ label: "Followers", text: "The Black Market, the Mediation Society and the School of Truth." }],
    },
  ],
};

export default pathway;
