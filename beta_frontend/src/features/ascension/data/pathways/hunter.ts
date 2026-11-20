import type { PathwayDetail } from "../../types";

/** Red Priest / Hunter. Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "hunter",
  sequences: [
    {
      n: 9,
      name: "Hunter",
      potion: "Deep red and bubbling, as if blood were staining the whole glass.",
      main: ["A Hunter characteristic"],
      sub: ["80 ml red wine", "A Red Chestnut flower (or 10 drops of its oil)", "5 g poplar leaf powder", "10 g basil"],
      acting: [
        "A big city is the darkest forest. Everyone in it is both prey and hunter, and even the weakest hunter can bring down bigger prey.",
        "Be careful, calm and patient, use the ground to your advantage, and above all have courage: to face surprises, to never give up, and to charge towards death to find a way to live.",
      ],
      powers: [
        {
          name: "Built to hunt",
          text: "Strength like a bear and agility like a cat, with fast reflexes and fine body control, and the biggest gains are in anything to do with fighting.",
        },
        { name: "Tracker", text: "Picks up traces no one else can when focused, though only faintly otherwise." },
        {
          name: "Trapper",
          text: "Reads a place for its key points, like where a wall will fall or where a trap should go, and reads people and monsters the same way.",
        },
        {
          name: "Wild lore",
          text: "Knows plants and animal parts for surviving in the wild, healing fast and brewing poison for blades. Sharper intuition too.",
        },
      ],
      notes: [
        { label: "Characteristic", text: "A smooth, springy, blood-red jelly whose smell stirs up sudden violence." },
      ],
    },
    {
      n: 8,
      name: "Provoker",
      potion:
        "Pitch-black, sticky, foul-tasting and reeking. Just seeing it makes you want to throw it down and stamp on it.",
      main: ["A Provoker characteristic"],
      sub: ["50 ml distilled liquor", "10 drops honeysuckle extract", "5 g grapevine powder", "10 g fern powder"],
      acting: ["Provoking is a tool, not a goal.", "Provoking is a sign of a spirit that won't bow."],
      powers: [
        {
          name: "Provocation",
          text: "Always senses what someone is touchy about. Used on purpose, the right insult or gesture, the more personal the better, drives them mad with rage. Even a plain swear word works. Beasts and lost-control monsters instead smell an aura they can't stand.",
        },
        {
          name: "Tougher",
          text: "A slightly stronger, faster body that heals well, and more spirituality.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A stinking black 'stone' whose surface seems to flow." }],
    },
    {
      n: 7,
      name: "Pyromaniac",
      potion: "Yellowish with red bubbles, a 'heart' at the centre wrapped in a haze of blood.",
      main: ["Gland of a Fire Salamander", "Core of a Magma Elf"],
      sub: [
        "50 ml Fire Salamander blood",
        "10 g Magma Pyroxene powder",
        "10 g Redcrown Balsam powder",
        "10 drops Sun Star extract",
      ],
      acting: [
        "Fire burns others, and can burn you too.",
        "One spark can light the whole prairie.",
        "A Pyromaniac isn't an arsonist. Dare to burn yourself before you burn others.",
        "Bring ruin, and choose who it falls on.",
      ],
      powers: [
        {
          name: "Inner fire",
          text: "Every flame comes from within. It burns bodies and, a little, spirits. Crimson fire comes fast. Packed tight for a while, it turns white-hot. Nearly immune to fire, though blast waves still hurt.",
        },
        {
          name: "Fire arsenal",
          text: "Fireballs that grow with charging, a fire shield against frost and gas, burning blades for attack only, timed fire bombs, flames kept under control in an area, fire pushed into a foe's body mid-grapple, and blazing weapons.",
        },
        {
          name: "Signature spells",
          text: "A flock of steerable fire ravens, a quick white-hot spear, twin fire serpents that wall a target in, and a giant fireball built over ten to twenty seconds.",
        },
        {
          name: "Hunter's eye",
          text: "Spirit Vision reads the colours of the Ether Body to gauge someone's condition. Better danger sense and better at shaking pursuit.",
        },
      ],
      notes: [
        { label: "Characteristic", text: "A crimson heart that slowly beats, with tiny flames from every pore." },
      ],
    },
    {
      n: 6,
      name: "Conspirer",
      potion: "Iron black with lots of reddish rust floating on top.",
      main: ["Compound eyes of a Black Hunting Spider", "Brain of a Sphinx"],
      sub: ["A Black Hunting Spider venom gland", "80 ml Sphinx blood", "10 g amber powder", "2 white oak acorns"],
      acting: [
        "The core of a Conspirer is the mind, not Beyonder powers.",
        "Hide your true aims.",
        "Gather information, analyse, find the answers.",
        "Use what others don't know, and make sure they don't know it.",
      ],
      powers: [
        {
          name: "Schemer",
          text: "Sharper insight and thinking, better excuses, plus Beyonder misdirection, confusion and deceit. A good Conspirer uses those rarely and subtly so backed opponents never sense the supernatural.",
        },
        {
          name: "Freer flame",
          text: "Fire takes any shape now, and white-hot fire takes just one to three seconds. Can merge with a launched fireball to dart up to ten metres.",
        },
        {
          name: "Keener senses",
          text: "Better at gathering intelligence, with all five senses and spiritual sense sharper.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A filthy brain-like lump covered in rust and eyes." }],
    },
    {
      n: 5,
      name: "Reaper",
      potion: "Fresh red blood with black iron-like flecks, as if a weapon had shattered in it.",
      main: ["Front claw of a Gray Demonic Wolf", "Tongue of a Forest Hunter"],
      sub: [
        "80 ml Gray Demonic Wolf blood",
        "2 Forest Hunter fangs",
        "10 drops Colourful Bearded Horned Lizard venom",
        "10 drops hornbeam oil",
      ],
      ritual:
        "Plot against and capture alive someone of a higher Sequence. Reveal the whole plot to them, then drink while they glare at you in fear and hate. More, stronger and angrier captives make it better.",
      acting: ["Reap enemies' lives. The stronger the foe, the better.", "To cull is to destroy so you can harvest."],
      powers: [
        {
          name: "Weakness Investigation",
          text: "Spots a target's mystical weaknesses and gaps in their defence.",
        },
        {
          name: "Cull",
          text: "Added to any attack, it makes every wound land like a vital hit. A true weak spot can mean one-hit death, and few survive three in a row, even demigods, if they don't block, dodge or shield themselves.",
        },
        {
          name: "Precision",
          text: "Every strike lands exactly where aimed, and fireballs can be steered after launch, even split into a hundred smaller ones each hitting its own target.",
        },
        {
          name: "Fire travel",
          text: "White-hot fire in an instant, and riding a flaming spear across tens or hundreds of metres. More spirit and vigour, a little tougher.",
        },
      ],
      notes: [
        { label: "Characteristic", text: "A razor-sharp white bone blade fused with a finger. Handle with care." },
      ],
    },
    {
      n: 4,
      name: "Iron-blooded Knight",
      potion: "Glowing red like molten iron.",
      main: ["Core of a Magma Giant", "One Stone of Catastrophe"],
      sub: [
        "80 ml scorching magma",
        "20 g plants tainted by the Stone of Catastrophe",
        "20 g soil from a battlefield soaked in soldiers' blood",
        "One oak acorn",
      ],
      ritual:
        "Form a team of at least thirty. Build deep bonds, help each of them grow strong, and train until a glance is enough to share intent, then have them perform the ritual together. The stronger and tighter the team, the better.",
      powers: [
        {
          name: "Steel",
          text: "Courage of steel and a body that can turn to steel. Commands cyan flame. Women who drink it become men.",
        },
        {
          name: "Iron team",
          text: "A mystical bond with the team pools their strength and spirit, though not their powers, into the Knight, shares their sight, and spreads damage among them.",
        },
        {
          name: "Weaponisation",
          text: "Turns any object into a deadly weapon, or a stable shell for a fireball that flame-boosted speed can hurl at several times the speed of sound across five to ten kilometres.",
        },
      ],
      notes: [
        {
          label: "Characteristic",
          text: "A heavy, iron-black sword shape fused with an arm bone, burning on its own.",
        },
      ],
    },
    {
      n: 3,
      name: "War Bishop",
      potion: "Half red, half black, with light flickering between them.",
      main: ["Heart of a Bipolar Centaur", "Core of a War Comet, which streaks across the sky before every war"],
      sub: [
        "100 ml Bipolar Centaur blood",
        "Pieces of a War Comet",
        "A blood-red Tudor iris",
        "8 g Flame Giant Tree bark",
      ],
      ritual: "Lead your team to victory over a powerful army in war. The stronger the enemy, the better.",
      powers: [
        {
          name: "Army of anchors",
          text: "War is the art of the many, and only a War Bishop truly harnesses an army. Every soldier is an anchor. Within three kilometres, the Bishop uses the team's powers and lends out his own, one holder at a time. The team talks mind to mind, and he can filter what passes.",
        },
        {
          name: "Fog of War",
          text: "Shrinks sight, muffles hearing and smell, and clouds the Spirit World, dulling every spiritual warning.",
        },
        {
          name: "War cries and sacrifice",
          text: "Songs that lift morale and strength and shake the enemy. Once per war, with the right offerings, he can pray to the source of war for aid. Flames burn pure cyan.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A ghostly core of woven red flame and black metal." }],
    },
    {
      n: 2,
      name: "Weather Warlock",
      potion: "Purple liquid, burning.",
      main: ["Skull of a Weather Giant, a Cloud Jellyfish core, or a Weather Warlock characteristic"],
      sub: [
        "30 ml blood from three people killed by three different extreme weathers",
        "500 Weather Giant hairs",
        "5 Cloud Jellyfish crystals",
        "A branch of a lightning-struck tree",
        "20 ml of a region's first snow of the year",
      ],
      ritual: "With no outside help, change the weather over a whole region in a very short time.",
      acting: [
        "Travel and fix bad weather, leaving legends behind.",
        "Weather is for bringing disaster and forcing surrender.",
      ],
      powers: [
        {
          name: "Weather",
          text: "Part of the authority to change a region's weather: thunderstorms, hurricanes, deluges, hail, blizzards and fog. Not earthquakes or tsunamis themselves, but a hurricane can set one off. Also frost powers.",
        },
        {
          name: "Flame body",
          text: "Splits into streams of fire and re-forms, hurt only in strength if some are put out. Becomes a lance, a meteor or a rocket of flame faster than sound. Purple-cyan fire can rain meteors over tens of kilometres, and fireballs reach thousands of kilometres.",
        },
        {
          name: "Steel symbol",
          text: "The body becomes the idea of steel, holding up to what would melt real steel. Courage always wins over fear.",
        },
        {
          name: "Total command",
          text: "Within ten kilometres everyone shares everyone's powers at once. The fog of war spans twenty kilometres and blocks outside divination. Sacrifice works every seven days.",
        },
        {
          name: "Whole-target culls",
          text: "Weakness Investigation now sees substitutes and avatars too, so a big enough strike erases them all at once.",
        },
      ],
      notes: [
        {
          label: "Characteristic",
          text: "A palm-sized purple pillar full of holes, each holding its own tiny weather.",
        },
      ],
    },
    {
      n: 1,
      name: "Conqueror",
      potion: "A blinding purple ball of light shaped like a crown.",
      main: ["A Conqueror characteristic"],
      sub: [
        "90 ml Conqueror blood or matching contaminant",
        "A real crown",
        "A drop of fingertip blood from every member of your team",
        "The heads of nine strong enemies, Sequence 4 or above",
      ],
      ritual:
        "Conquer a country of over thirty million and fill every living thing in it with fear, obedience and awe.",
      powers: [
        {
          name: "Conquest",
          text: "Body, mind and soul long to submit. Once fully conquered, they're loyal forever. It can knock someone out, or drive a body like a puppet with or without its mind inside.",
        },
        {
          name: "War Commander",
          text: "An unlimited temporary team with nearly all the benefits of a real one, across fifty kilometres.",
        },
        {
          name: "A scatter of many",
          text: "Conquers objects into soldiers that share its powers. Prepared with other pathways' characteristics, they gain those powers too.",
        },
        {
          name: "Spear of Destruction",
          text: "Cull at its peak: one target or a whole area, hitting through avatars to the real body, and a weak spot means death.",
        },
        {
          name: "Gathering multitudes",
          text: "Pooled strength, once there's enough, turns into something greater, up to the force of an awakened Uniqueness. Flames burn pure purple.",
        },
      ],
      notes: [{ label: "Characteristic", text: "An oddly shaped crown, bloodstained and rusty." }],
    },
    {
      n: 0,
      name: "Red Priest",
      potion: "A crimson pillar wrapped in shapeless fire.",
      main: ["The Red Priest Uniqueness", "Three Conqueror characteristics"],
      sub: ["Your country's deep reflection inside the mirror world"],
      ritual: "Start a war that sweeps a continent and win enough of it.",
      powers: [
        {
          name: "Conquest and charm",
          text: "Conquers lands and even ideas. Any region fully conquered becomes its divine kingdom, where unprotected visitors simply become its soldiers. Also the most charismatic of men.",
        },
        {
          name: "War",
          text: "War breaks out wherever it looks, at the scale it chooses. It shares power and status, even the Uniqueness, with its team anywhere on a planet, though only one may use the Uniqueness at a time.",
        },
        {
          name: "Destruction",
          text: "At most it ends a planet, at least it kills a true god. Those it destroys don't come back without special preparation. Its fire is formless and turns all to ash, and it rules every disaster.",
        },
        {
          name: "Sacrifice",
          text: "Prays to the Sefirot for power or a descent, even to Sefirot other than its own, which keeps it always on the edge of corruption. It can meddle with any sacrifice in its star system.",
        },
        {
          name: "Masculinity and courage",
          text: "Must be male, the strongest and most virile, and can turn anything male. Courage of mind means no fear. Courage of body means almost unbreakable.",
        },
      ],
      notes: [
        { label: "Uniqueness", text: "A blood-spattered banner on an iron-black pole." },
        { label: "Mythical form", text: "A giant of disaster made of flame and other symbols." },
      ],
    },
  ],
};

export default pathway;
