import type { PathwayDetail } from "../../types";

/** White Tower / Reader. Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "reader",
  sequences: [
    {
      n: 9,
      name: "Reader",
      potion: "White, with specks of dust clearly hanging in it.",
      main: ["One Book-Devouring Worm", "One Knowledge Addiction Root"],
      sub: [
        "50 ml Book-Devouring Worm blood",
        "10 g of the root's corrupting residue",
        "50 ml liquor",
        "A study notebook of your own, full of notes",
      ],
      powers: [
        {
          name: "A sponge for knowledge",
          text: "Better memory, faster understanding and quicker learning. Ritual magic opens up, and a well-read Reader builds a huge store of knowledge.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A short white cord like a tree root." }],
    },
    {
      n: 8,
      name: "Student of Ratiocination",
      potion: "Clear and perfectly still like a mirror, with a few patches of blood.",
      main: ["Brain of a Naga Priest", "Spine of a Riddle Evil Cat"],
      sub: [
        "9 Naga Priest hairs",
        "100 ml Riddle Evil Cat blood",
        "10 drops black jimsonweed juice",
        "10 drops of a calming, focusing extract",
      ],
      powers: [{ name: "Logic", text: "Sharper observation and reasoning, and real skill at ritual magic." }],
      notes: [{ label: "Characteristic", text: "A deathly white bone wrinkled with brass-coloured folds." }],
    },
    {
      n: 7,
      name: "Knowledge Keeper",
      potion: "Pale red, woven through with brass-coloured threads.",
      main: ["Liver of a Six-Armed Naga", "Ear of a Man-Hunting Fox"],
      sub: [
        "100 ml Six-Armed Naga blood",
        "Tip of a Man-Hunting Fox's tail",
        "20 g Calm Flower incense",
        "10 drops red or black ink",
      ],
      powers: [
        {
          name: "Detective",
          text: "Mostly brains and deduction, with decent fighting and equipment skills on top. More agile, good with weapons, skilled at reasoning and rituals. Still no match for Beyonders built for battle.",
        },
        {
          name: "Reconstruction",
          text: "Uses supernatural means to piece together what happened in an area.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A palm-sized sheet of thick 'paper' with brass veins." }],
    },
    {
      n: 6,
      name: "Polymath",
      potion: "Blood red, with strange letters blinking in and out of view.",
      main: ["Scalp of a Deep Sea Naga", "Stomach of a White-Tailed Red Fox"],
      sub: [
        "150 ml White-Tailed Red Fox blood",
        "A pair of Deep Sea Naga eyes",
        "Proof of having read and been tested on a thousand books",
        "A new piece of knowledge found in a ruin, tomb, foreign library or the like",
      ],
      powers: [
        {
          name: "Analysis",
          text: "With the right background, quickly works out how an opponent's power works, its strengths and its weaknesses. It can be wrong.",
        },
        {
          name: "Imitation",
          text: "Once a power is understood, the Polymath can copy it as often as they like, unlike a Scribe. A copy runs at 20% to 50% of the original, depending on study and digestion, and it fails more often against stronger foes.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A slimy pouch of blood-red leather." }],
    },
    {
      n: 5,
      name: "Mysticism Magister",
      potion: "Dark red with brass-coloured scales floating in it.",
      main: ["Small intestine of a Shadow Naga", "Spinal fluid of a young Brass Dragon or Brass Lizard"],
      sub: [
        "120 ml Shadow Naga blood",
        "A secret art you've designed and proven but not yet made",
        "Notes on other people's spells (copies are fine)",
        "3 scales of a young Brass Dragon or Brass Lizard",
      ],
      ritual:
        "Teach at least fifty all-rounders, or five mid-Sequence Beyonders who found the acting method on their own. The first choice makes a balanced Magister, the second a specialist in those students' fields.",
      powers: [
        {
          name: "Secret arts",
          text: "Rare, specialised spells that often skip materials, chants and most steps, making them fast and hard to spot. The ones that keep their steps tend to be either very strange or very strong. They can delay losing control or reinforce the body, among much else.",
        },
        {
          name: "A gift to start",
          text: "Six to thirteen arts come with advancement. After that, every new one has to be learned or invented.",
        },
        { name: "Better copies", text: "Imitated spells now reach 60% of the original." },
      ],
      notes: [{ label: "Characteristic", text: "A see-through, curved blood sausage." }],
    },
    {
      n: 4,
      name: "Prophet",
      potion: "Brass-coloured with several silver whirlpools.",
      main: ["Heart scale of an adult Brass Dragon", "Brass vertical eye of a Three-Eyed Naga"],
      sub: [
        "100 ml adult Brass Dragon blood",
        "A Three-Eyed Naga tooth",
        "10 drops of liquid tainted by the River of Fate or a high-ranking Beyonder of Fate",
        "A book of prophecy, partly proven true",
      ],
      ritual:
        "Search the overlapping times of the Spirit World for scraps of your own future and bring them back into reality.",
      powers: [
        {
          name: "Prophecy",
          text: "A grip on the mysteries of fate. The Prophet clearly sees the few likeliest futures, or glimpses the single most probable one.",
        },
        {
          name: "Astral arts",
          text: "Uses safe knowledge of the Astral World to build arts on ideas themselves, such as one that wipes out every 'insect' nearby without touching creatures made of many insects.",
        },
        { name: "Demigod body", text: "A demigod's physique. Imitated spells reach 80%." },
      ],
      notes: [{ label: "Characteristic", text: "A cold eye opening among brass scales." }],
    },
    {
      n: 3,
      name: "Insighter",
      potion: "Brass-coloured and tinged with blood, as if a tiny Spirit World were inside.",
      main: ["Eye of a Calamity Tome giant tree", "Brain of an ancient Brass Dragon"],
      sub: [
        "100 ml Calamity Tome tree sap",
        "100 ml Brass Dragon blood",
        "A remnant of a destroyed demigod-level Spirit World creature",
        "An object often used by a Knowledge Mentor or a Sage",
      ],
      ritual:
        "Study the flesh or characteristic of an angel from either knowledge pathway and grasp at least a third of what it holds, or win that angel's blessing.",
      powers: [
        {
          name: "Insight",
          text: "Sees the rules beneath the world. Enemies keep no secrets, and every weakness and strength is laid bare. Some authority over order.",
        },
        {
          name: "Leverage",
          text: "Knowing where to push, the Insighter solves problems with ease: one stone pulled from the right spot brings down a mountain. Unlike a Mentor of Deceit, who lies to the rules directly, the Insighter sets things up and lets the rules do the work.",
        },
      ],
      notes: [
        {
          label: "Characteristic",
          text: "A little tree of white pointed bones with bloody brains hanging from its branches and brass eyes along its trunk.",
        },
      ],
    },
    {
      n: 2,
      name: "Wisdom Angel",
      potion: "Thick, greyish-white and folded, with brass eyes hidden inside.",
      main: ["A characteristic of a Dragon of Wisdom, a Dragon of Knowledge or a Wisdom Angel"],
      sub: [
        "10,000 souls of beings you helped grow wiser, gathered when they died naturally",
        "1,000 heartfelt recordings of different beings calling you 'teacher'",
        "Full mastery of at least a hundred years of history, in written form",
        "150 ml blood of one of the dragons above or a Wisdom Angel",
      ],
      ritual: "Bring an angel down by wit alone, not strength.",
      powers: [
        {
          name: "Wisdom",
          text: "Some authority over wisdom: always sees how things will unfold and makes the best choice at the best time. It boosts learning and analysis, and copies reach 90%.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A grey-white, blood-tinged brain covered in brass eyes." }],
    },
    {
      n: 1,
      name: "Omniscient Eye",
      potion: "Brass liquid spinning wildly into a whirlpool shaped like a giant eye.",
      main: ["An Omniscient Eye characteristic"],
      sub: ["100 ml each of the blood of a Dark Angel, a Thunder God, an Author and a White Angel"],
      ritual:
        "Slip briefly into a half-chaotic state while keeping your basic sense and reason, for example through a Demoness's chaos or the Chaos Sea's corruption, and drink.",
      powers: [
        {
          name: "Near-omniscience",
          text: "Sees everything about a target's past, present and future. Copied powers reach full strength, as long as no authority is involved.",
        },
        {
          name: "Astral Mentor",
          text: "Briefly bends an idea from the Astral World, one aspect only and never the target itself. That can make an action fail, misfire or grow stronger. For example, it could redefine a sea's 'water' so a Tyrant can't use it.",
        },
      ],
      notes: [
        { label: "Characteristic", text: "A giant brass eye reflecting a white tower built of countless books." },
      ],
    },
    {
      n: 0,
      name: "White Tower",
      potion: "Countless motes of white light spiralling into an endless tower, each holding a book.",
      main: ["The White Tower Uniqueness", "Three Omniscient Eye characteristics"],
      sub: ["A great tower holding all your knowledge and relics of Great Old Ones"],
      ritual:
        "Live through a disaster caused by something above Sequence 0, or by a Sefirah combined with matching Great Old One knowledge.",
      powers: [
        {
          name: "Omniscience",
          text: "Knows everything, unaffected by the Spirit World, and that knowledge is power. It copies any ability at full strength or better, but never authority or symbols, which are like permissions. Foolishness and the Inconceivable can cloud it.",
        },
        {
          name: "Creation",
          text: "Knowing everything, it can make anything, within the symbols it holds.",
        },
        {
          name: "Staircase of the Astral World",
          text: "Climbs knowledge layer by layer towards the universe's deepest symbols, with all the danger waiting at the top.",
        },
        {
          name: "Wisdom, laws, learning and analysis",
          text: "Gives the wisest guidance, and because what is known can be grasped, it can wield the laws of nature.",
        },
        { name: "Calamity", text: "Some knowledge is madness and ruin, and it can pass them on." },
      ],
      notes: [
        { label: "Uniqueness", text: "A ghostly white tower built of books." },
        {
          label: "Mythical form",
          text: "An endless tower whose floors are thick volumes, each with a brass eye. The higher you go, the darker, madder and more ominous it gets.",
        },
        { label: "Divine kingdom", text: "The Tower of Omniscience, also called the Tower of Madness." },
      ],
    },
  ],
};

export default pathway;
