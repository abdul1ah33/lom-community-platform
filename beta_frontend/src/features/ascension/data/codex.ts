/**
 * The Beyonder power system, retold in our own words.
 *
 * Source material: the official "World Research Handbook" on lomworld.com (Power system
 * section). Facts and terms follow the handbook; the wording, structure and selection are
 * ours, and plot-specific examples were left out on purpose (they are spoilers anyway).
 *
 * `sealUntil` is the chapter a reader must reach before a block shows unblurred.
 * Book one ends around chapter 1430, so anything set past that is "always sealed until
 * revealed": it comes from the sequel or the very end of the story.
 */

export interface CodexBlock {
  id: string;
  title: string;
  /** One line shown before the block is opened. */
  teaser: string;
  /** Paragraphs. A line starting with "• " renders as a bullet. */
  body: string[];
  sealUntil: number;
}

/** The three laws, shown as three glowing tablets. */
export const LAWS: CodexBlock[] = [
  {
    id: "law-indestructibility",
    title: "Indestructibility",
    teaser: "Nothing is ever lost.",
    body: [
      "A Beyonder characteristic can't be destroyed or worn down. When its holder dies, it doesn't fade. It moves on, settling into a new vessel: a corpse, an object, or whoever drinks it next.",
    ],
    sealUntil: 0,
  },
  {
    id: "law-conservation",
    title: "Conservation",
    teaser: "The total stays the same.",
    body: [
      "Across a pathway and its neighbours, the total amount of power is fixed. The more people climb to high Sequences, the fewer remain at the bottom, and the other way round.",
      "That puts a hard ceiling on the top: a pathway can hold either one Sequence 0 or up to three Sequence 1s, never both at once. The closer two powers of the same pathway stand to the summit, the more they're pushed into conflict.",
      "One pathway's Sequence 0 is a known exception. It can split off Sequence 1 characteristics and replace them with imagined copies, so it keeps its throne without losing strength.",
    ],
    sealUntil: 900,
  },
  {
    id: "law-convergence",
    title: "Convergence",
    teaser: "Like calls to like.",
    body: [
      "Characteristics of the same or neighbouring pathways pull towards each other. Beyonders and sealed artifacts carrying them drift together as if by chance. In practice it shows up as fate, a strange sense of awareness, and longing.",
      "Not even the Original Creator can switch this law off.",
    ],
    sealUntil: 0,
  },
];

/** The ladder from mortal to Above the Sequences. Rendered bottom-up. */
export interface Tier {
  id: string;
  sequences: string;
  name: string;
  alias?: string;
  summary: string;
  detail: string[];
  sealUntil: number;
}

export const TIERS: Tier[] = [
  {
    id: "low",
    sequences: "Seq. 9 – 7",
    name: "Low Sequence",
    summary: "The first steps out of ordinary life.",
    detail: [
      "Every pathway starts at Sequence 9. These first three steps bring sharper senses, a body or mind past human limits, and a handful of mystical tricks.",
      "After the end of the Fifth Epoch, Sequence 7 is sometimes counted as mid-Sequence instead.",
    ],
    sealUntil: 0,
  },
  {
    id: "mid",
    sequences: "Seq. 6 – 5",
    name: "Mid Sequence",
    summary: "Where rituals begin to matter.",
    detail: [
      "From Sequence 6 to Sequence 5, a potion alone is no longer enough. Each formula from here on includes an advancement ritual that helps the Beyonder stay themselves while the power settles.",
    ],
    sealUntil: 0,
  },
  {
    id: "saint",
    sequences: "Seq. 4 – 3",
    name: "Saints",
    alias: "Demigods",
    summary: "Beings who stop being entirely human.",
    detail: [
      "Sequences 4 to 1 count as demigods. The lower pair are usually called Saints.",
      "From the step into Sequence 4 onward, some pathways can cross over to a neighbour.",
    ],
    sealUntil: 150,
  },
  {
    id: "angel",
    sequences: "Seq. 2 – 1",
    name: "Angels",
    alias: "Sequence 1 · Archangel",
    summary: "Living myths, each one a disaster on legs.",
    detail: [
      "Sequence 2 and Sequence 1 are angels, and a Sequence 1 is sometimes honoured as an Archangel.",
      "When a pathway holds three Archangels, it can only support six to eight Sequence 2 angels. The exact number depends on the pathway.",
    ],
    sealUntil: 400,
  },
  {
    id: "king",
    sequences: "Beyond Seq. 1",
    name: "King of Angels",
    summary: "Past the angels, but not yet a god.",
    detail: [
      "In the broad sense, this is any Archangel who has gone past Sequence 1 without becoming a god. There are several ways to get there: holding extra Sequence 1 characteristics, holding the pathway's Uniqueness, having that Uniqueness wake up inside them, or gaining some authority over their pathway's Sefirah.",
      "In the narrow sense, the title belongs to the eight great Kings of Angels who served the Ancient Sun God in the Third Epoch.",
      "A King of Angels who also holds Sefirah authority is called a King of Angels among Kings of Angels.",
      "A Uniqueness that wakes up inside its holder gives far more than one that is merely held. Holding one means constantly keeping it quiet so godhood doesn't take over. All else being equal, the awakened kind is stronger.",
    ],
    sealUntil: 900,
  },
  {
    id: "god",
    sequences: "Sequence 0",
    name: "True God",
    summary: "Three Sequence 1 characteristics, one Uniqueness, one throne.",
    detail: [
      "Becoming a true god means gathering three portions of Sequence 1 characteristics plus the pathway's Uniqueness, then letting them converge and transform together.",
      "Once they do, the Uniqueness is fully awake no matter how it was obtained, so every new god starts on equal footing.",
      "Because of Conservation, a pathway with a god has no Archangels left, unless that god has a special way around it.",
    ],
    sealUntil: 900,
  },
  {
    id: "half",
    sequences: "Beyond Seq. 0",
    name: "Half a Great Old One",
    alias: "Quasi Great Old One",
    summary: "A god who has started to take hold of a Sefirah.",
    detail: [
      "Their strength depends on how much authority they hold over a Sefirah and how much of it they hold. From strongest to weakest:",
      "• A true god who has completely absorbed a Sefirah and only lacks the neighbouring pathways' Uniquenesses and Sequence 1 characteristics.",
      "• A being whose Sefirah is fully awake or fully mastered, but who lacks the Beyonder characteristics to match.",
      "• A god spanning two or more pathways who can draw on a Sefirah to some degree.",
    ],
    sealUntil: 1200,
  },
  {
    id: "old-one",
    sequences: "Above the Sequences",
    name: "Great Old One",
    alias: "Outer Deity",
    summary: "One whole Sefirah, every Uniqueness that belongs to it.",
    detail: [
      "The natural-born Great Old Ones are the Original Creator, the personalities split off from it, its direct children, and the first beings born of the Original Creator and the Mother Goddess. Each was born holding a Sefirah, all of its Uniquenesses and at least one Sequence 1 characteristic from each of its pathways. Their will can never be destroyed.",
      "A Beyonder can reach the same height by gathering a Sefirah, all its Uniquenesses and a Sequence 1 characteristic from each of its pathways. They then match the natural-born ones in power and standing. The one thing they lack is an indestructible will.",
    ],
    sealUntil: 1300,
  },
];

/** Long-form concepts, rendered as an accordion of tomes. */
export const CONCEPTS: CodexBlock[] = [
  {
    id: "characteristics",
    title: "Beyonder Characteristics",
    teaser: "The physical source of every power.",
    body: [
      "Every Beyonder ability comes from here. When a Beyonder or mystical creature dies, its power settles out as a characteristic. Sometimes it fuses with part of the body or a nearby object instead and creates a sealed artifact.",
      "A loose characteristic is roughly a potion of its Sequence without the supplementary ingredients. Swallowing one raw does grant the power, but it is a quick way to go mad and lose control. That's why it is usually brewed into a proper potion first, which softens its side effects and shields the drinker from its mystical pull.",
      "A characteristic can stand in for a potion's main ingredients. The catch is that it also carries every lower potion folded inside it, and those have to be digested too.",
    ],
    sealUntil: 0,
  },
  {
    id: "potions",
    title: "The Potion System",
    teaser: "Ingredients, formulas and the only correct way up.",
    body: [
      "The world runs on two ideas: everything shares one origin, and everything holds a spark of divinity. That's why a person can drink a potion, fuse with a characteristic and gain Beyonder powers.",
      "Over a long history of trial and error, and with the help of two Blasphemy Slates, humanity refined this into neat Sequence chains that can be climbed one safe step at a time. The lower the number, the stronger the potion: Sequence 9 is the bottom of every pathway and Sequence 0 the top.",
      "From Sequence 9 up to Above the Sequences, this system is the only correct way to power. It isn't the only way, though.",
      "A complete formula has three parts:",
      "• Main ingredients: where the power itself comes from.",
      "• Supplementary ingredients: these soften the characteristic's side effects.",
      "• Advancement ritual: needed for the step into Sequence 5 and every step after it. It keeps the drinker's sense of self intact.",
      "Potions are drunk in order. Skip a step and one of three things happens: the mind dies and the body breaks apart into monsters; the personality is overwritten until the person turns cold, cruel and indifferent; or the drinker goes mad on the spot. That last one is what people call losing control.",
    ],
    sealUntil: 0,
  },
  {
    id: "neighbours",
    title: "Neighbouring Pathways",
    teaser: "Where one road can turn into another.",
    body: [
      "From the step into Sequence 4 onward, some pathways connect and a Beyonder can switch to a neighbour's next Sequence without building up madness. Two conditions must be met:",
      "• They haven't already drunk the neighbour's potion of the Sequence they are moving into.",
      "• They are past the point where the two pathways are allowed to cross.",
      "After the apocalypse, people can force a switch before that point, but it is very risky.",
    ],
    sealUntil: 150,
  },
  {
    id: "acting",
    title: "The Acting Method",
    teaser: "You are only acting.",
    body: [
      "Digesting a potion through acting means digesting the mental imprints still inside it. These come in two kinds: the permanent imprint of the Great Old One at the top of the pathway (godhood), and the imprint left by the most recent and highest-ranking person who held the characteristic.",
      "The goal is to digest, not to master. Mastering treats the power like a tamed beast: however well trained, it never truly belongs to you and can always turn on you. Digesting breaks the potion down and makes it part of you.",
      "In practice, it means behaving the way the potion's name describes, working out the rules hidden in that role and holding yourself to them. Over time body, heart and spirit move closer to the will in the potion until it dissolves into yours.",
      "The one rule you can't break: you are only acting.",
      "At Sequence 0 this flips around. Digesting more only brings a god closer to the original godhood, so gods hold and control their power instead. Even so, every god ends up looking a little like they're playing a part.",
    ],
    sealUntil: 0,
  },
  {
    id: "rituals",
    title: "Advancement Rituals",
    teaser: "An anchor for the moment of rebirth.",
    body: [
      "From the step into Sequence 5 onward, every potion comes with a ritual. Whatever its details, each ritual has one job: helping the Beyonder stay themselves while the new power takes hold. The apotheosis ritual for Sequence 0 works the same way.",
      "A ritual doesn't have to follow the Blasphemy Slate word for word. Anything that does the same job works too. And these advancement rituals are not the same thing as ritualistic magic.",
      "There is no ritual for becoming a Great Old One, because nothing can stop the original will from waking. What helps is the order in which things are absorbed. The best order is to become one pathway's Sequence 0, then take hold of the Sefirah, and only then gather the other Uniquenesses. Becoming a two-pathway god first and taking the Sefirah next is middling. Leaving the Sefirah for last is the worst.",
    ],
    sealUntil: 1200,
  },
  {
    id: "anchors",
    title: "Anchors",
    teaser: "Faith as a counterweight.",
    body: [
      "Once someone becomes an angel at Sequence 2, the permanent imprints in their characteristics start pressing on them. These come from the Original Creator and the natural-born Great Old Ones at the top of the pathway. To keep their balance they need anchors, and the most common kind is the faith of humans or human-like beings.",
      "Anchors don't protect humanity directly. They give the believers' picture of the angel a fixed shape that pushes back against the imprints. Between the two pressures, the angel's own humanity just about survives.",
      "There is a catch. Believers imagine their deity a certain way, and without imprints pushing back, that imagined image would slowly replace the real one. That is its own kind of corruption.",
    ],
    sealUntil: 800,
  },
  {
    id: "godhood",
    title: "Godhood",
    teaser: "Three things people mean by the word.",
    body: [
      "• True godhood: what the original gods left behind in their Sefirot and characteristics. These are the Original Creator, its split personalities, its direct children and the first beings born of the Mother Goddess of Depravity. Their spirit never dies, and every successor has to face it. What a Beyonder faces depends on their pathway and its Sefirah.",
      "• Surface godhood: what an exalted being looks like from outside while spending almost everything they have on holding true godhood back. They might seem cold, or gentle, or fixed on one goal and willing to crush anything in the way.",
      "• Imagined godhood: what outsiders usually call godhood is often just the first layer of humanity.",
    ],
    sealUntil: 1000,
  },
  {
    id: "humanity",
    title: "Humanity",
    teaser: "Two layers, and why the outer one wears away.",
    body: [
      "• The first layer is the core: self-awareness and raw instinct. Selfishness, greed, the will to survive, putting yourself first and ignoring the morals of the group. Even the greatest beings have it, and creatures born mystical have at least this much. Without it, nothing could hold out against true godhood at all.",
      "• The second layer is what people usually mean by humanity: love, mercy, courage, sacrifice, compassion and a sense of justice, along with the uglier traits that come with them. It's learned over a short life.",
      "A god who stays at Sequence 0 long enough watches the anchors of their strongest feelings fade one by one, until only the first layer is left. From then on they are slowly losing to true godhood, and in the long run that loss is certain.",
    ],
    sealUntil: 1000,
  },
  {
    id: "uniqueness",
    title: "Uniqueness",
    teaser: "The authority of a god, made into an object.",
    body: [
      "This is the most important ingredient in any Sequence 0 formula, because it stands for a god's authority. It can take solid form as an object, or fall back into something abstract, a pure concept.",
    ],
    sealUntil: 900,
  },
];

/** The Boon system and its Eastern counterpart: sequel material, sealed by default. */
export const BESTOWAL: CodexBlock[] = [
  {
    id: "boons",
    title: "Boons",
    teaser: "Power on loan from something greater.",
    body: [
      "Through ritualistic magic, a person can pray to a higher being, the Bestower, and become a Beyonder without drinking anything. They are then called the Recipient.",
      "Bestowers that can keep many Boons going for a long time are usually Great Old Ones or Sefirot. A true god can do it too, but only as a stopgap: every extra Recipient adds weight and can wear the god down.",
      "The price is gradual change. Body, mind and spirit drift towards the Bestower, because power without the Bestower's will in it slips out of control and fades. The Bestower can also take the Boon back at any moment, unless the Recipient has a certain pathway's knack for quiet theft.",
      "Someone who is already a Beyonder can still receive a Boon. Their body is reshaped towards the Bestower and fights the characteristics they already have until it finds a new balance. Since the clash is physical, not mental, it rarely causes loss of control, unless the mind was already close to breaking. A Boon from the Recipient's own pathway or a neighbouring one causes no clash, though the body still changes.",
      "At heart, a Boon is a controlled corruption that can be taken back. A careful Bestower holds back their own thoughts and feelings inside it. A careless one turns the Recipient into a monster. A ritual with too few offerings opens the channel but can't keep everyone safe, and some of those present collapse on the spot.",
    ],
    sealUntil: 1500,
  },
  {
    id: "talisman",
    title: "Talisman Bestowal",
    teaser: "The Western Continent's answer to sealed Sefirot.",
    body: [
      "In the First Epoch, seven of the nine Sefirot were sealed on the Western Continent. Only the Chaos Sea and Sefirah Castle escaped. Guards were posted, and only a sliver of characteristics was left behind so the people there could never climb high.",
      "Over many generations, Daoists, monks and scholars learned to draw on those sealed Sefirot anyway. Crude, deadly attempts slowly became careful, orderly practice. The Celestial Masters and Nether Daoists who came after built it into the Talisman Bestowal system.",
      "• Side effects: praying to a sleeping Sefirah and the Celestial Court allowed shortcuts that skip some of the cost. Praying to a living Outer Deity offers no such shortcut without outside help.",
      "• Imperial appointment: power is tied to official posts, and divine proxies play a big role.",
      "• Ceiling: a Boon can lift someone to Sequence 0 at most, and only briefly. A Sefirah controller can reach the level of half a Great Old One.",
      "A Sefirah controller works at three levels. Day to day, they stand at a weak Sequence 0, like a King of Angels among Kings of Angels with an awakened Uniqueness. At full strength they equal a true god. If they give up everything and merge with the Dao, they reach half a Great Old One, but they become part of the Sefirah's own mind. Only one person can merge with a given Sefirah at a time.",
    ],
    sealUntil: 1500,
  },
];
