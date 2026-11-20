import type { PathwayDetail } from "../../types";

/** Tyrant / Sailor. Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "sailor",
  sequences: [
    {
      n: 9,
      name: "Sailor",
      potion: "A stirred, dark-green paste that reeks of fish.",
      main: ["A murloc's bladder", "One Anthropophagous Snail"],
      sub: ["300 ml strong liquor", "3 murloc scales", "12 drops seaweed extract", "200 ml seawater"],
      powers: [
        {
          name: "Keeper of the Seas",
          text: "That's what the old stories called them. Great strength, and as nimble in water as the sea folk: they dive fifteen metres with no gear and hold their breath for ten minutes or more.",
        },
        { name: "Sea legs", text: "Walks a storm-tossed deck as easily as solid ground." },
        { name: "Hidden scales", text: "Faint scales under the skin make them as slippery to catch as a fish." },
      ],
      notes: [{ label: "Characteristic", text: "A see-through, dark-green pouch twisted with spirals." }],
    },
    {
      n: 8,
      name: "Folk of Rage",
      potion: "Blood-red and bubbling as if still on the boil.",
      main: ["Alveolus of a Deep One", "Breastbone of a Warcry Bird"],
      sub: [
        "500 ml strong liquor",
        "Half a Deep One's tongue",
        "A piece of Warcry Bird beak",
        "10 drops red-skinned seaweed oil",
      ],
      powers: [
        {
          name: "Fury",
          text: "Anger pushes strength and speed far past normal limits. Facing one feels like facing a storm.",
        },
        { name: "Raging Blow", text: "A terrifying strike fuelled by stored-up rage." },
      ],
      notes: [{ label: "Characteristic", text: "A big blood-coloured bubble of jelly." }],
    },
    {
      n: 7,
      name: "Seafarer",
      potion: "Calm, jewel-blue, scattered with points of starlight.",
      main: ["Pituitary gland of a Blackscale Shark", "Heart of a Berserk Dolphin, the 'darling of elves'"],
      sub: [
        "500 ml strong liquor",
        "A Blackscale Shark fin",
        "100 ml Berserk Dolphin blood",
        "A branch of Bluestar Coral",
        "A piece of crystal",
      ],
      acting: ["Stay close to the sea. Learn its routes and weather, explore and discover."],
      powers: [
        {
          name: "Navigator's sense",
          text: "Feels magnetic fields, currents, winds and clouds by instinct. A ship carrying a Seafarer never gets lost. Maths, memory and judging distance all sharpen.",
        },
        {
          name: "Favoured of the ocean",
          text: "Everything improves at sea. Can move freely underwater for half an hour or more and cast a few water spells, some their own, some granted by the Lord of Storms.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A fist-sized ice-blue lump covered in strange lines and black dots." }],
    },
    {
      n: 6,
      name: "Wind-blessed",
      potion: "A half-real fist of something, wrapped in fine cyan threads.",
      main: ["6 crystal feathers of a Blue Shadow Falcon", "Eyes of a Dragon-Eyed Sea Condor"],
      sub: [
        "500 ml high-proof liquor",
        "A Blue Shadow Falcon bone",
        "2 Dragon-Eyed Sea Condor feathers",
        "30 ml rain that never touched the ground",
        "A breath of wind from the moment the sun lights the horizon but hasn't yet risen",
      ],
      acting: ["Act out the name and use the wind. Let yourself get stormy now and then, like a gale."],
      powers: [
        {
          name: "Gale",
          text: "Blasts of wind pressure from inside the body, hurricanes swirling around, spinning wind wrapped around fists, and wind under the feet that more than doubles running speed.",
        },
        {
          name: "Wind blades and cushions",
          text: "Fires thin blades of air and conjures cushions of it. Sees in the dark.",
        },
        {
          name: "Flight",
          text: "Glides on strong winds, ignoring rules against flying, hovers, flies short distances, floats in water and dives a hundred metres.",
        },
        { name: "Water control", text: "A modest command of water." },
      ],
      notes: [{ label: "Characteristic", text: "A huge feather made of pale cyan wind, marked with an eye." }],
    },
    {
      n: 5,
      name: "Ocean Songster",
      potion: "Blue as deep as the sea just before a storm.",
      main: ["A siren's windpipe", "Crystal of a Druse Jellyfish"],
      sub: [
        "500 ml high-proof liquor",
        "5 siren hairs",
        "5 Druse Jellyfish tentacles",
        "One Susurrant Conch",
        "A branch of porous coral",
      ],
      ritual: "Drink inside the belly of an Obninsk.",
      acting: ["Sing as you sail."],
      powers: [
        {
          name: "Lightning Arrow",
          text: "Hair rises and crackles with lightning, dark clouds gather overhead, and a bolt from the sky charges the arrow before it flies too fast to dodge. At this stage lightning needs something like an arrow to carry it.",
        },
        {
          name: "Lightning Strike",
          text: "A paralysing silver bolt that can't be dodged once it appears, only avoided beforehand. If it misses, it splits into countless little snakes of current. Good against the undead.",
        },
        {
          name: "Song",
          text: "A song that reaches the spirit, so earplugs only soften it and even the deaf hear it. Depending on the singer it lulls enemies into a daze, booms like thunder to cow them, or grates until they lose their temper.",
        },
        {
          name: "Sea tricks",
          text: "Longer and easier time underwater, deep-sea pressure doesn't matter, water membranes for cover, binding winds, slippery surfaces, and messages sent far away as lightning.",
        },
      ],
      notes: [
        {
          label: "Characteristic",
          text: "Like a jellyfish holding blue seawater, where small winds whirl, silver flashes, and faint singing drifts out.",
        },
      ],
    },
    {
      n: 4,
      name: "Cataclysmic Interrer",
      potion: "Blue so deep it's almost black, with storm waves forever rising inside.",
      main: ["Stomach of a Punishment Whale", "Blood crystal of a Whirlpool Terror Beast"],
      sub: [
        "500 ml Punishment Whale stomach fluid",
        "A Whirlpool Terror Beast tentacle",
        "50 ml water from the Spring of Elves",
        "10 drops of mucus from a Deep One leader",
        "A hair or nail from someone killed by a sea disaster",
      ],
      ritual: "Set off an earthquake and tsunami, drink in the middle of it, and hold on until it's done.",
      powers: [
        {
          name: "Disasters on command",
          text: "Hurricanes that tear up everything in their path and leave the ground bare. Ten-metre black waves. Earthquakes up to magnitude six, or worse where the earth is already strained. Blizzards, downpours and floods.",
        },
        {
          name: "Storm arsenal",
          text: "Swarms of hundreds of wind blades, chain lightning leaping between targets, walls of water and waves bent to their will.",
        },
        {
          name: "Sky and sea",
          text: "True flight at around 500 km/h, scales tough as armour, and clear sight in the black deep sea.",
        },
        {
          name: "Death song",
          text: "Songs grow lethal, able to unsettle everything nearby and even jam sealed artifacts.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A deep-blue pouch packed full of disasters." }],
    },
    {
      n: 3,
      name: "Sea King",
      potion: "Like a huge sea-blue gem with a deep stretch of ocean shining inside.",
      main: ["Skull of a Deep Sea Anaconda", "Eye of the King of Green Wings, a giant winged octopus"],
      sub: [
        "600 ml blue blood of the King of Green Wings",
        "A Deep Sea Anaconda fang",
        "A figurine that has gathered sea-god worship",
        "10 drops of paste boiled from more than a hundred kinds of fish roe",
        "50 g freshly sun-dried sea salt",
      ],
      ritual:
        "Pick a stretch of sea, raise a stone tower from the seabed to the surface on your own, then bring every powerful creature within 300 nautical miles to heel.",
      powers: [
        {
          name: "Sovereign of the sea",
          text: "In their own waters they rule: walk the seabed, raise 40–50 metre tsunamis, lift the sea level, command sea life and overpower any other demigod of the same rank.",
        },
        {
          name: "Lightning Storm",
          text: "A forest of silver lightning over hundreds of metres. Anything inside is vaporised, friend or foe.",
        },
        {
          name: "Fury of the Sea",
          text: "The whole sea turns against a target, battering them with tsunamis.",
        },
        {
          name: "The sea's memory",
          text: "Drives any creatures of the region, takes aquatic forms, scans the whole sea with the mind and makes the water replay what happened there.",
        },
        {
          name: "Destructive drop",
          text: "Splits or fuses water droplets to release fusion-grade force. Can also set off sonic booms from afar. Hurricanes grow into superstorms.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A sea-blue crystal pillar of endless reflections." }],
    },
    {
      n: 2,
      name: "Calamity",
      potion: "Like a hurricane squeezed into a bottle, laced with silver lightning.",
      main: [
        "What's left of Queen of Calamity Cohinem's characteristic, or that of the King of the Deep Sea or another Calamity",
      ],
      sub: [
        "An object from the ruins of a historic catastrophe",
        "600 ml blood of the King of the Deep Sea or another Calamity",
        "3 leaves from the elves' ancestral tree",
        "A hair each from a thousand people who died of fear",
      ],
      ritual:
        "Alone, start a disaster that strikes at least a million people. When their fear and despair are at their worst, step in and end it, also alone.",
      powers: [
        {
          name: "Storm Incarnation",
          text: "Hurricanes and rain big enough to flatten a great city. Lightning, snow and tsunami disasters can each wipe out a port or an island.",
        },
        {
          name: "Voice of Terror",
          text: "Its voice fills everything for hundreds of kilometres, living things and sealed artifacts alike, with fear until they submit.",
        },
        {
          name: "Source of Wrath",
          text: "By giving up thought for raw rage, the angel briefly fights one Sequence higher. It can also be turned on others.",
        },
        {
          name: "Electromagnetism",
          text: "Scrambles communications across a city or island, and pulls, pushes or spins targets with magnetic fields. Flies as fast as a missile.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A dark, dangerous cloud brewing terror." }],
    },
    {
      n: 1,
      name: "Thunder God",
      potion: "Water of Thunder, woven from lightning of many colours.",
      main: ["A Thunder God characteristic"],
      sub: [
        "A splinter of lightning from the Astral World",
        "The fallen nature of a Hanged Man angel",
        "A stone from the underground Nightmare Swamp",
      ],
      ritual:
        "Use lightning to wreck at least three rituals of angels trying to become Sequence 1. It works best if they belong to the Hanged Man, White Tower, Visionary, Sun or Tyrant pathways, and wrecking one while it's still being prepared counts.",
      powers: [
        {
          name: "Heavenly Punishment",
          text: "Colossal lightning that breaks down, purifies and destroys. It's especially deadly to anyone trying to escape into a non-physical form, like turning into symbols or information, and to creatures of darkness, death and filth.",
        },
        {
          name: "Light Incarnation",
          text: "Turns into pure energy and moves at almost the speed of light.",
        },
        {
          name: "Roar and storm hell",
          text: "A roar that travels like lightning and terrifies, and a storm hell over a city, island or sea that can rage forever.",
        },
        {
          name: "Lightning Sea and Dance of Thunder",
          text: "An ocean of lightning that covers an island, and formless thunder that wrecks electromagnetic systems and destroys information.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A sceptre of braided lightning." }],
    },
    {
      n: 0,
      name: "Tyrant",
      potion: "A towering human shape made of lightning and storm.",
      main: ["The Tyrant Uniqueness", "Three Thunder God characteristics"],
      sub: ["Enough divine blood to cover your whole body"],
      ritual:
        "Gather hundreds of thousands of followers who worship out of fear. Challenge another Sequence 0 alone and live. Then drink amid that fear and submission.",
      powers: [
        {
          name: "Thunder",
          text: "Command of electricity and magnetism, and electromagnetic storms that erase every structure of information.",
        },
        {
          name: "Tyranny",
          text: "King of Kings: the power to cow, to rage and to terrify, which also shapes the Tyrant's songs.",
        },
        {
          name: "Water",
          text: "Rule over oceans and sea life, with a faint reach into the Chaos Sea, the collective subconscious and the great rivers of fate and darkness.",
        },
        {
          name: "Matter and energy",
          text: "Turns matter into energy and back. Briefly becoming current at near light speed, the god can hit hard enough to shatter a planet.",
        },
        { name: "Calamity and wind", text: "Disasters and every wind." },
      ],
      notes: [
        { label: "Uniqueness", text: "A storm wrapped in lightning." },
        { label: "Mythical form", text: "A vast octopus-like being with huge tentacles, ringed in silver lightning." },
        {
          label: "Divine kingdoms",
          text: "The Paradise of Dread, a storm of total submission, and the Chasm of Storm.",
        },
      ],
    },
  ],
};

export default pathway;
