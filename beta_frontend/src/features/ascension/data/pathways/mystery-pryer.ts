import type { PathwayDetail } from "../../types";

/** Hermit / Mystery Pryer. Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "mystery-pryer",
  sequences: [
    {
      n: 9,
      name: "Mystery Pryer",
      potion: "A gradient that grows darker towards the middle.",
      main: ["Cornea of a Nightmare Evil Eye", "One Cursed Crystal"],
      sub: [
        "70 ml Nightmare Evil Eye pus",
        "10 g Cursed Crystal by-product",
        "A sheet of paper with someone else's secret",
        "13 drops rosemary oil",
      ],
      acting: ["Do as you will, but harm no one."],
      powers: [
        {
          name: "Eye of Mystery Prying",
          text: "Sees more than others at the same level: the state of a target's Astral Projection, Ether Body and mind, and things all around that shouldn't be seen. It can't be switched off.",
        },
        {
          name: "Occult studies",
          text: "A broad first grasp of magic, witchcraft and astrology, with many rituals. It also brings the sense of something hiding behind everything, so power has to be handled with care and respect.",
        },
        { name: "Quick ritual", text: "Finishes ritual magic fast, without most of the props." },
      ],
      notes: [{ label: "Characteristic", text: "A bloodstained, eerie eye in stark black and white." }],
    },
    {
      n: 8,
      name: "Melee Scholar",
      potion: "Grey, as if storms and towering waves were inside.",
      main: ["Spine of an Iron-Arm Orc", "Heart of a Four-Eyed Green Turtle"],
      sub: [
        "100 ml Iron-Arm Orc blood",
        "20 g Four-Eyed Green Turtle shell powder",
        "Nine sharp fingernails",
        "10 drops flytrap juice",
      ],
      powers: [
        {
          name: "Fighting is a secret too",
          text: "Hunts the secrets behind things, and combat is just another thing. Masters many martial schools. Tougher body.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A cold, dull grey piece of bone." }],
    },
    {
      n: 7,
      name: "Warlock",
      potion: "Dark green pus with grey flecks floating in it.",
      main: ["Horn of a Stag-Headed Orc", "Eye of a Gray Bird Matriarch"],
      sub: [
        "100 ml Stag-Headed Orc blood",
        "9 Gray Bird Matriarch feathers",
        "A dead person's eyes",
        "Notes from an earlier Warlock",
      ],
      powers: [
        {
          name: "Spellcraft",
          text: "Studies, analyses and even invents spells with mind and knowledge alone. Fiddly and risky, but endlessly flexible, and more knowledge means more power: light, weeding, exorcism, louder voices, lightning, wind, a force hand and more.",
        },
        {
          name: "Three steps",
          text: "Gather spirituality, picture the spell's symbol or say it aloud, then use the materials, which are either the channel or part of the spell. The hard part is carrying them all.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A dull grey crystal with no shine." }],
    },
    {
      n: 6,
      name: "Scrolls Professor",
      potion: "Pale purple, smelling faintly of rotting wood.",
      main: ["Heartwood of a Treant Priest", "Eye of Illusion of a Paper Fiend"],
      sub: [
        "100 ml Treant Priest sap",
        "15 g Paper Fiend ashes",
        "A scroll made by a higher-Sequence Beyonder",
        "10 drops paper-root grass extract",
      ],
      powers: [
        {
          name: "Scrolls",
          text: "Stores spells in scrolls that burn and release them when the trigger word is spoken. Saves a lot of casting time and makes a Warlock far more dangerous in a fight.",
        },
      ],
      notes: [{ label: "Characteristic", text: "Pale purple leather covered in mysterious patterns." }],
    },
    {
      n: 5,
      name: "Constellations Master",
      potion: "Clear, with starlight gathering into ghostly eyes.",
      main: ["Brain of a Star-Patterned Fiend", "One Fate Crystal"],
      sub: [
        "90 ml Star-Patterned Fiend pus",
        "18 g Fate Crystal contaminant",
        "A fairly complete star chart",
        "9 drops star-praising flower oil",
      ],
      ritual:
        "Choose a constellation, observe it, draw it in full, recover its true shape, and learn all the mysticism tied to it.",
      powers: [
        {
          name: "Star Pillar",
          text: "Star-sand spins in the palm and bursts into stars whose light joins into a great pillar that dissolves whatever it covers.",
        },
        {
          name: "Starlight travel",
          text: "Sails ships across vast distances on starlight, builds clear bridges out of it, and can shatter into starlight, slip through cracks and re-form elsewhere.",
        },
        {
          name: "Starlight Cage",
          text: "Starlight settles on a target and hardens into a huge block of clear amber around them.",
        },
        {
          name: "Wider prying",
          text: "Everything for tens of metres lies bare and chaotic, and behind it they glimpse heavy curtains of shadow with something watching from behind.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A crystal sphere sprinkled with bright, ghostly specks of light." }],
    },
    {
      n: 4,
      name: "Mysticologist",
      potion: "Ghostly and dark, with purple sparks forever lighting deep inside.",
      main: ["Scalp of an Arcane Sprite", "Pupil of an Evil God's Eye"],
      sub: [
        "13 Arcane Sprite tears",
        "80 ml grey fluid of an Evil God's Eye",
        "A relic of a mystical event",
        "A Warlock potion of your own invention",
      ],
      ritual:
        "Fully analyse one drop of a mythical creature's blood and take its vast knowledge. Whose blood you study shapes your specialty.",
      acting: ["Soak up huge amounts of mystical knowledge."],
      powers: [
        {
          name: "Dangerous knowing",
          text: "Its power is knowledge, which means seeing, hearing and touching things it shouldn't. A long-lived Mysticologist learns to hold back curiosity.",
        },
        {
          name: "Free-roaming eye",
          text: "The prying eye opens and closes at will, can be placed on someone else, and can be hidden from detection.",
        },
        {
          name: "Mystical Re-enactment",
          text: "Turns rare knowledge into magic. The less known it is, the stronger. Spells drawn from old Earth fairy tales are called Fairy Tale Magic.",
        },
        {
          name: "Fairy tale magic",
          text: "A match that brings visions, a Cinderella disguise, a mirror that sharpens prophecy, a sleep spell, a horn whose blast shatters foes and space, a flaming spear, an invisibility cap, a slow-time chessboard, a guiding thread, a hidden sealed realm, and more.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A dark, ghostly eye-shaped gem that seems to look back at you." }],
    },
    {
      n: 3,
      name: "Clairvoyant",
      potion: "Half-solid, see-through purple laced with tiny silver 'veins'.",
      main: ["Eye of a Star Gazer, a deformed fish with stalk eyes", "Star-dust skin of a Treant High Priest"],
      sub: [
        "100 ml Treant High Priest sap",
        "10 ml Star Gazer brain fluid",
        "A book of prophecies more right than wrong",
        "Nine hairs from nine people with strange fates",
      ],
      ritual:
        "Through information, reasoning and divination, predict an event involving a demigod three years ahead and see it happen, guiding it only indirectly, with no outside help and without causing it yourself.",
      powers: [
        {
          name: "Prying into fate",
          text: "Real contact with the authority of Mystery Prying, which now reaches fate. It shows the outcome of choices and the best path, and replays true past events.",
        },
        {
          name: "Limits",
          text: "Visions of high powers come blurry, and the bigger the matter, the worse the backlash. It can sense an apocalypse coming, and see clearly when its own next advancement is ready.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A mercury-tinged vertical eye." }],
    },
    {
      n: 2,
      name: "Sage",
      potion: "Bubbling, with a clear eye hidden in every bubble.",
      main: ["A Sage characteristic, or a Fantasy Ancient Fiend crystal plus a Mind Wanderer tentacle"],
      sub: [
        "130 ml Fantasy Ancient Fiend blood",
        "Nine light motes of a Mind Wanderer",
        "A widely sung ballad of your deeds",
        "An object that has gathered tens of thousands of heartfelt blessings",
      ],
      ritual:
        "Head off a disaster involving high powers. The strong Spirit World record that leaves behind helps the drinker hold together and gather up their scattered self.",
      powers: [
        {
          name: "Living information",
          text: "Dissolves into a torrent of knowledge and rebuilds from it. Missing bits don't kill it as long as the whole holds together, though a limb or a spell might need relearning.",
        },
        {
          name: "Self-editing",
          text: "In that state it can write in mastered knowledge and cut what isn't needed, reshaping its body and speeding up spells.",
        },
        {
          name: "Knowledge as weapon",
          text: "Pours knowledge into anyone its gaze fixes on, sends knowledge chasing enemies as solid attacks, and absorbs objects and powers into knowledge.",
        },
        { name: "False information", text: "Crafts lies good enough to fool people, and even the rules." },
      ],
      notes: [
        {
          label: "Characteristic",
          text: "A fist-sized diamond of solid information, holy and wise, each face showing cold eyes.",
        },
      ],
    },
    {
      n: 1,
      name: "Knowledge Emperor",
      potion: "Chaotic, full of mingling bubbles of every colour.",
      main: ["A Knowledge Emperor characteristic"],
      sub: [
        "An object inscribed with knowledge about you",
        "A real crown",
        "Nine pieces of knowledge closely tied to Sequence 0",
        "A book of all you've discovered",
      ],
      ritual:
        "Study yourself until you know everything about you, find your truest core, and use it to tie all your other knowledge into one whole, a primordial spirit.",
      powers: [
        {
          name: "Power from knowing",
          text: "Gives abstract knowledge real power. Know enough about another pathway's ability and it can be written into its own information flow and used.",
        },
        {
          name: "Information mastery",
          text: "Draws on everything gathered in the Spirit World, moves others in and out of information form, sends fake signals along Spirit Body Threads, and gathers loose information into a ball of light.",
        },
        {
          name: "Overload",
          text: "Symbols flare in its eyes and flood a target's mind with useless knowledge until their head bursts.",
        },
        { name: "Secrets of gods", text: "Pries into the secrets of gods, even of Great Old Ones." },
      ],
      notes: [{ label: "Characteristic", text: "A clear, ghostly crown of condensed information." }],
    },
    {
      n: 0,
      name: "The Hermit",
      potion: "A giant eye with another world inside it.",
      main: ["The Hermit Uniqueness", "Three Knowledge Emperor characteristics"],
      sub: ["Enough knowledge of the Great Old Dominators"],
      ritual:
        "Gather every trace of information you've left in the world, and hide all of it so completely nothing is left.",
      powers: [
        {
          name: "Mystical Knowledge",
          text: "Gives numbers real symbolic power. Zero is chaos and the unknown, one is the beginning and the Creator. Linked end to end they make a digital world, and the Hermit can turn one into zero and reduce it to nothing.",
        },
        {
          name: "Concealment and prying",
          text: "Hides any information from gods' tracking, and pries into any secret, since every secret is knowledge.",
        },
        {
          name: "Civilisation and the Spirit World",
          text: "Grants knowledge to others. The Spirit World is a store of information, so the knowledge pathways hold part of it.",
        },
        {
          name: "Backups",
          text: "Comes back from hidden backups of itself, the Uniqueness going to the chosen one or the nearest. Every copy decays a little, and self-destruction corrupts it worst of all.",
        },
      ],
      notes: [
        { label: "Uniqueness", text: "A cold, lashless, ghostly eye." },
        { label: "Mythical form", text: "A torrent of knowledge, a being of information." },
        { label: "Divine kingdom", text: "The World Within the Eye, the Digital Heaven, or the Land of Fairy Tales." },
      ],
    },
  ],
};

export default pathway;
