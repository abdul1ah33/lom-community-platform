import type { PathwayDetail } from "../../types";

/** Visionary / Spectator. Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "spectator",
  sequences: [
    {
      n: 9,
      name: "Spectator",
      potion: "A rush of bubbles calms the air around it, then the brew settles into a thick, silvery-white liquid.",
      main: ["A pair of eyes from an adult Manhal Fish", "35 ml Goat-Horned Black Fish blood"],
      sub: [
        "80 ml pure water",
        "5 drops autumn crocus essence",
        "13 g bovine-tooth peony powder",
        "7 elf flower petals",
      ],
      acting: ["You're only watching the play, never acting in it.", "Stay completely neutral."],
      powers: [
        {
          name: "The watcher's eye",
          text: "A sharp mind and sharper eyes. The Spectator reads people's true thoughts from their faces, habits and the little things they do, then nudges events in the direction they want without anyone noticing.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A silvery-white vertical eye." }],
    },
    {
      n: 8,
      name: "Telepathist",
      potion: "Its sheen keeps shifting, as if it could shine straight into anyone's heart.",
      main: ["Whole pituitary gland of an adult Rainbow Salamander", "10 ml Farsman Rabbit spinal fluid"],
      sub: [
        "100 ml pure water",
        "5 g chestnut bud spores",
        "8 g dragon tooth grass powder",
        "3 pure white elf flower petals",
      ],
      acting: [
        "Guide people gently and reasonably. Nothing abrupt or illogical should ever reveal that they're being steered.",
      ],
      powers: [
        {
          name: "Reading hearts",
          text: "Observation goes deeper than the surface, into auras and the Ether Body. The Telepathist sees moods as colours, catches shallow thoughts and begins to model how someone else thinks. Secrets don't last long around them.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A pair of clear, dreamlike eyes." }],
    },
    {
      n: 7,
      name: "Psychiatrist",
      potion:
        "Faintly golden and gently rippling, shaped like a huge, warped pupil whose gaze reaches into every heart.",
      main: ["A pair of Mirror Dragon eyes", "Fruit of the Tree of Elders"],
      sub: [
        "50 ml Mirror Dragon blood",
        "15 g Tree of Elders bark powder",
        "10 drops foxglove oil",
        "9 strands of a newborn's hair",
      ],
      acting: ["Use what you know: help the people around you with what troubles their minds."],
      powers: [
        { name: "Awe", text: "One person or a whole crowd feels like they're facing a dragon and breaks into panic." },
        {
          name: "Frenzy",
          text: "Sets off a target's emotions until they rage, taking real mental damage, and sometimes losing control outright.",
        },
        {
          name: "Suggestion",
          text: "With the right word, gesture or prop, a target follows the Psychiatrist's plan without realising it, or feels they can't break a promise. Turned inward, it opens a way into the sea of collective subconscious.",
        },
        {
          name: "Placate",
          text: "Pulls a Beyonder back from the edge of losing control, more reliably at higher Sequences, and calms a troubled mind enough to talk.",
        },
        {
          name: "Telepathy",
          text: "With candle flame, incense or similar, puts someone into a half-trance and talks directly to their Body of Heart and Mind.",
        },
      ],
      notes: [
        {
          label: "Characteristic",
          text: "A crystallised, faintly blue heart full of dreamlike colour, like a diamond under lamplight.",
        },
      ],
    },
    {
      n: 6,
      name: "Hypnotist",
      potion:
        "Clear and syrupy. Still, it's a perfect mirror. Stirred, tiny whirlpools turn silently beneath the surface.",
      main: [
        "Whole pituitary gland of a young Mind Dragon, or 60 ml Black-Hunting Giant Lizard spinal fluid plus a fruit of the Illusory Chime Tree",
      ],
      sub: [
        "One belladonna berry",
        "A mirror from your own home",
        "80 ml young Mind Dragon blood (or Black-Hunting Giant Lizard blood)",
        "3 young Mind Dragon scales (or 3 pieces of Illusory Chime Tree bark)",
      ],
      acting: ["Hypnotise people."],
      powers: [
        {
          name: "Dragon-scaled body",
          text: "Strength and speed beyond human, and a layer of scales that dulls incoming harm.",
        },
        {
          name: "Hypnosis",
          text: "Once someone's attention is truly fixed, the Hypnotist slips into their mind and rewrites what they want, so they act against their own will without knowing it.",
        },
        {
          name: "Battle hypnosis",
          text: "Forces a foe to do something strange, like turning on an ally or stepping aside. It lasts moments and can't make anyone kill themselves.",
        },
        {
          name: "Mental invisibility",
          text: "Stands in someone's blind spot of awareness: right in front of them, completely unseen.",
        },
      ],
      notes: [
        { label: "Characteristic", text: "A shapeless mirror-like gel with tiny bubbles that throw coloured light." },
      ],
    },
    {
      n: 5,
      name: "Dreamwalker",
      potion: "Dim, flecked with grey-white sparks.",
      main: ["Heart of a Dream Catcher, a Mental Phantom crystal, or the whole brain of an adult Mind Dragon"],
      sub: [
        "One grey-white dragon breath grass",
        "3 treant leaves",
        "100 ml adult Mind Dragon blood (or 90 ml Dream Catcher blood)",
        "3 adult Mind Dragon scales (or 3 g Mental Phantom dust)",
      ],
      ritual:
        "Make a pact with a Spirit World creature to learn how to stay awake in dreams. One way: bind a harpy, hold one of its tail feathers, and drink in a burst of joy or fury.",
      acting: ["Travel through dreams. Come, watch, take notes, and never interfere."],
      powers: [
        {
          name: "Guiding",
          text: "Shifts a dream little by little until the dreamer gives up their deepest secrets. Unlike some, the Dreamwalker can't drag people into sleep without hypnosis.",
        },
        {
          name: "Alteration",
          text: "Edits dreams night after night. The change seeps through spirit and mind into the subconscious, slowly reshaping someone. It's quieter than hypnosis and safer against stronger targets.",
        },
        {
          name: "Dream traversal",
          text: "The body turns dreamlike and hides inside other people's dreams, hopping between sleepers up to 500 metres apart.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A wisp of grey-white fog, like dreams gathered together." }],
    },
    {
      n: 4,
      name: "Manipulator",
      potion: "Countless fragments of light drift inside, like a glimpse of the collective subconscious.",
      main: ["Whole brain of an old Mind Dragon, or the crystal heart of a Treant Mentor"],
      sub: [
        "80 ml old Mind Dragon blood",
        "3 golden Treant Mentor leaves",
        "One tear each from seven humans or humanoids, shed in strong emotion",
      ],
      ritual: "Drink amid the shared surge of feeling of a crowd of at least ten thousand.",
      acting: [
        "Manipulate others, never be manipulated by your own appetites. Digging greedily into every secret means your desires are steering you.",
      ],
      powers: [
        {
          name: "Manipulation",
          text: "The Body of Heart and Mind crosses the collective subconscious to land on someone's island of mind, rewriting it, reading it and quietly steering them.",
        },
        {
          name: "Virtual personas",
          text: "Spins up extra selves, thirteen at first, each with a mind of its own. They shield against mental attack and let the Manipulator raid a mind while chatting politely.",
        },
        {
          name: "Dragonification",
          text: "A partial dragon form, safe only after much careful self-suggestion. At first, about a minute before madness creeps in.",
        },
        {
          name: "Mind storm, plague and breath",
          text: "Sweeps a chosen thought over every enemy, spreads mental illness through the collective subconscious, and breathes a wave that tears at mind and spirit. Can also strike awe, terror or fanaticism.",
        },
        {
          name: "Brute strength",
          text: "Punches through steel, outruns a steam train, and wears scales as tough as a dragon's.",
        },
      ],
      notes: [
        {
          label: "Characteristic",
          text: "A fist-sized heart wrinkled like a brain, its folds covered in symbols that thread out into a hidden world.",
        },
      ],
    },
    {
      n: 3,
      name: "Dreamweaver",
      potion: "Dark and foggy, never holding one shape.",
      main: ["Crystal heart of the King of Treants, or the whole brain of a Dream Dragon"],
      sub: [
        "One sapling",
        "10 drops nightmare grass juice",
        "100 ml King of Treants sap (or Dream Dragon blood)",
        "9 hairs each from thirteen people who died or went mad from nightmares",
      ],
      ritual: "Give at least a hundred thousand people the same dream on the same night.",
      powers: [
        { name: "Woven dreams", text: "Spins dreams and pulls targets inside." },
        {
          name: "Believe it and it's real",
          text: "Its images are so close to life that anyone who believes them makes them real. The wounds leave no mark, but can kill.",
        },
        { name: "Spare identities", text: "Splits off whole identities, though not Beyonder characteristics." },
      ],
      notes: [{ label: "Characteristic", text: "A grey-white brain spun from thin fog, never quite solid." }],
    },
    {
      n: 2,
      name: "Discerner",
      potion: "Pale, with ghostly vertical eyes blinking open and shut.",
      main: ["Pale heart of an ancient Mind Dragon, or a Discerner characteristic"],
      sub: [
        "90 ml ancient Mind Dragon or Discerner blood",
        "Three true identities you wove yourself",
        "Nine of the darkest flowers from the depths of the human heart",
        "A Solar Divine Bird feather (not a tail feather)",
      ],
      ritual:
        "Reach deep into at least ten thousand minds, find each one's truest fear, rawest want and the root of their troubles, and leave your mark there.",
      powers: [
        {
          name: "Self-suggestion",
          text: "Suggestion reaches the level of authority. If the Discerner believes they're strong enough, they are, whatever their body says. With enough understanding they can briefly imagine themselves into a far higher state, at the risk of being absorbed by whatever they imitate. They can only imagine powers they've truly seen.",
        },
        {
          name: "Discernment",
          text: "Spots a target's hidden weak points, deepest fears, and even their past fates and the links between them. It can pierce concealment, or be blocked by it. Ordinary anti-divination doesn't fool it.",
        },
        {
          name: "Dream labyrinth",
          text: "Stitches many minds into a maze that interrogates and scrambles anyone inside.",
        },
        {
          name: "Dragon",
          text: "Becomes a true Mind Dragon. Since the form is imagined too, it can become any mythical creature and use its powers, as long as an enemy believes it.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A pale heart full of holes, studded with vertical eyes." }],
    },
    {
      n: 1,
      name: "Author",
      potion: "Clear, with scenes of fate and points of conceptual starlight settled inside.",
      main: ["The Quill of Alzuhod, or an Author characteristic"],
      sub: [
        "100 ml mud water from the underground Nightmare Swamp",
        "A shard of a meteor fallen from the Astral World",
        "Nine of this era's most popular novels or fairy tales",
        "Your own corrupted nature",
      ],
      ritual:
        "Write a novel cast with real people, then make their real lives play out to its last page, marking both the Spirit World and the River of Fate.",
      powers: [
        {
          name: "Envisioning",
          text: "Part of the authority of turning fantasy into reality. It touches minds and the Astral World, and pulls ideas into the world for real. Whatever the Author writes comes true, but plot holes papered over with 'somehow' cost more and are easier to spot.",
        },
        {
          name: "Speak of the Author",
          text: "Whoever knows of the Author is known in return, along with everyone they've met. The more someone understands the Author, the easier they are to write into a story.",
        },
        {
          name: "Coincidence",
          text: "Rare wonders become echoes of the Author's will, happening whenever needed.",
        },
        {
          name: "Mind and true dreams",
          text: "Sways minds so the owners think the ideas are theirs, and blends dream with waking until no one can tell them apart.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A crystal-clear finger bone shaped like a wand." }],
    },
    {
      n: 0,
      name: "Visionary",
      potion: "Golden, with a whole imagined world hiding inside.",
      main: ["The Visionary Uniqueness", "Three Author characteristics"],
      sub: ["A nation you created from fantasy or dreams, which becomes the divine kingdom"],
      ritual: "Make the era unfold the way you planned, then drink at the key moment as the tide of history turns.",
      powers: [
        {
          name: "Envisioning",
          text: "What the Visionary imagines appears, the nation they dream lands in the world, and the future they announce takes the stage. This is how they can swap two Sequence 1 characteristics for imagined ones without losing a thing, and turn the real ones into free-roaming Authors. Their near-omnipotence can't stand up to powers that dispel illusions.",
        },
        {
          name: "Mind",
          text: "Ruler of every island of mind and the collective subconscious. Humanity itself, rational and mad, good and bad, is a sub-authority they can shape.",
        },
        {
          name: "Discernment",
          text: "Near-omniscience within the world of the mind, reaching into fate and the line between real and unreal.",
        },
        {
          name: "Dreams and losing control",
          text: "Holds part of the authority of dreams, and part of losing control, since for Beyonders a failing mind is where the fall begins.",
        },
      ],
      notes: [
        { label: "Uniqueness", text: "A grey-white mix of brain and mind." },
        { label: "Mythical form", text: "A grey-white Mind Dragon with pale gold vertical pupils." },
      ],
    },
  ],
};

export default pathway;
