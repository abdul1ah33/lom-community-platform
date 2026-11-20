import type { PathwayDetail } from "../../types";

/** Twilight Giant / Warrior. Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "warrior",
  sequences: [
    {
      n: 9,
      name: "Warrior",
      potion: "Blood-coloured and thick with a fishy stink.",
      main: ["Muscle core of a Giant Warrior, or a Mutated Black Bear's eyes plus a Bloodthirsty Rhino's horn"],
      sub: [
        "100 ml Giant Warrior or Mutated Black Bear blood",
        "Heart of a Giant Warrior or Bloodthirsty Rhino",
        "10 drops basil oil",
        "One piece of onyx",
      ],
      powers: [
        {
          name: "Born to fight",
          text: "Stronger and quicker than any ordinary person, and a natural with every weapon, armour and fighting style there is.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A slowly wriggling knot of flesh." }],
    },
    {
      n: 8,
      name: "Pugilist",
      potion: "Pure white pus streaked with blood.",
      main: [
        "Hand bone of a Giant Attendant, or a Giant Black Bear's heart plus the middle finger of a Forest Wanderer, a golden-brown ape that loves to hunt",
      ],
      sub: [
        "100 ml Giant Attendant or Forest Wanderer blood",
        "Gallbladder of a Giant Attendant or Giant Black Bear",
        "One amethyst",
        "An enemy's eyeball",
      ],
      powers: [
        {
          name: "Bare-handed master",
          text: "Better at close fighting than any other pathway, and tough enough to blunt some Beyonder powers with sheer body.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A glossy white bone clenched into a fist." }],
    },
    {
      n: 7,
      name: "Weapon Master",
      potion: "Black, with flecks of rust floating in it. It goes down like a handful of needles.",
      main: ["Spine of a Blue Giant, or an Iron Bear's left paw plus a Six-Armed Gray Ape's ear"],
      sub: [
        "100 ml Blue Giant or Iron Bear blood",
        "10 Blue Giant hairs, or 20 Six-Armed Gray Ape hairs",
        "10 arrowheads dug out of a battlefield",
        "A lock of hair from someone you defeated",
      ],
      powers: [
        {
          name: "Any weapon, mastered",
          text: "Remarkable strength, toughness and speed. Anything they pick up, from swords and guns to Beyonder weapons and sealed artifacts, they wield like a master, and they suffer less from those items' side effects.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A grim, bloodstained spine shaped like a longsword." }],
    },
    {
      n: 6,
      name: "Dawn Paladin",
      potion: "Clear, as if lit by sunrise.",
      main: ["Blood crystal of a Dawn Giant, or a Dawn Bird's breastbone plus a Silver Giant Bear's right paw"],
      sub: [
        "100 ml Dawn Giant spinal fluid, or Silver Giant Bear bile",
        "3 Dawn Giant nails, or a Dawn Bird claw",
        "One opal",
        "One purified object",
      ],
      powers: [
        {
          name: "Dawn",
          text: "Fills 40–50 metres with holy morning light that breaks illusions, drives off wraiths and shadows, weakens evil spirits and clears evil energy. It's weaker at holiness than the Sun's priests, but also cleans disease from the air, damps radiation and scrambles electrical signals. Plus the strength of a giant.",
        },
        {
          name: "Dawn Armor",
          text: "Full plate made of light, weightless and unrestricting. It takes a while to come back if broken.",
        },
        {
          name: "Sword of Dawn",
          text: "Conjured weapons of light, the strongest a two-handed greatsword whose every cut purifies.",
        },
        {
          name: "Hurricane of Light",
          text: "Drive the sword into the ground and it shatters into a raging storm of light shards that shred shadows and evil, kill people and wraiths, and wound evil spirits. It can be roughly aimed, but the sword can't be summoned again for a while after.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A crystal formed from countless flecks of dawn light." }],
    },
    {
      n: 5,
      name: "Guardian",
      potion: "Pale blood wrapped in solid-looking dawn light.",
      main: ["Heart of a Gray Giant, or a Stone Giant core plus the ear of a Forest Guardian, a walking giant tree"],
      sub: [
        "200 ml Gray Giant blood, or 200 g Stone Giant dust in pure water",
        "An eye of a Gray Giant or a Forest Guardian",
        "A weapon you've used for a long time",
        "9 drops of a sharp-smelling oil",
      ],
      ritual: "Choose a person or group to protect, and faithfully protect them for at least a year.",
      powers: [
        {
          name: "Unbreakable",
          text: "Kneel and plant the greatsword, and walls of dawn rise on either side. In full defence, almost nothing below the high Sequences gets through, whatever the attack. Even attacking, they're tougher than the best plate armour, shrug off steam-rifle rounds and walk out of a war alive unless heavy artillery aims right at them.",
        },
        {
          name: "Shield-bearer",
          text: "Takes blows meant for allies nearby. Hurts any kind of monster and sees through illusions.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A fist-sized, hole-riddled heart glowing like dawn." }],
    },
    {
      n: 4,
      name: "Demon Hunter",
      potion: "Dark green and deep, with a strong smell of herbs.",
      main: ["Eye of a Godhood Giant, or the exposed heart of a Dragon Eater plus the vertical eye of a Devil Hunter"],
      sub: [
        "200 ml Godhood Giant or Dragon Eater blood",
        "Skull of a Godhood Giant or a Devil Hunter",
        "49 different monster parts or herbs",
        "10 g purifying holy ointment",
      ],
      ritual: "Put an end to a crisis caused by a powerful demon or evil being, one with godhood.",
      powers: [
        {
          name: "Half god in body",
          text: "Immense strength, a spirit somewhere between god and human, and running speed that kicks up a gale. Dawn can shape more than weapons. Their earth-rooted walls barely budge and can block Spirit World travel. They also hide their plans from divination and danger sense.",
        },
        {
          name: "Hunter's alchemy",
          text: "Knows every monster's weak spots and every herb's use. In a special trance, they brew potions, ointments, oils and seals that cause lightning, frost, purification, decay or exorcism, each aimed at one kind of prey. That's why classic Demon Hunters fight with two swords: two ointments at once.",
        },
        {
          name: "Eye of the Demon Hunter",
          text: "Senses, spirit and long experience read a target's nature, weaknesses, condition and whether it is possessed or tainted, often whether it's lying too. Green sigils glow in their eyes when they use it.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A vertical eye woven with dark green symbols." }],
    },
    {
      n: 3,
      name: "Silver Knight",
      potion: "Pale, with what look like beads of mercury scattered through it.",
      main: ["Aurmir's blood essence, or the heart of a Court Chaser or Court Keeper giant"],
      sub: [
        "300 ml water tainted by death",
        "Something worn or carried by a Sequence 3+ of this pathway (one armour plate is enough)",
        "Amber with an ancient insect inside",
        "A record of your hundred kills",
      ],
      ritual:
        "Build an elaborate altar, set the remains of six powerful creatures you hunted in their proper places, and receive a god's blessing.",
      powers: [
        {
          name: "Silver armour",
          text: "Protection hardens into a full suit of silver plate, tougher than dragon hide. The god who blesses them shapes the details.",
        },
        {
          name: "Mercury Liquefaction",
          text: "Melts into flowing quicksilver to slip away, or pours over an enemy as a seamless suit of metal that tries to smother them.",
        },
        {
          name: "Sword of Dawn, perfected",
          text: "No longer short-lived. A permanent, purifying blade that can split a hill.",
        },
        {
          name: "Silver Rapier",
          text: "A blade that blinks past most barriers and strikes from almost nowhere, even from inside the target.",
        },
        { name: "Light Concealment", text: "Hides inside light itself." },
      ],
      notes: [{ label: "Characteristic", text: "A mass of silver radiance like a heart and a small sun at once." }],
    },
    {
      n: 2,
      name: "Glory",
      potion: "Made of pure, holy, heavy light.",
      main: ["A crystal of a Glory Giant, Aurmir's crown, or a Glory characteristic"],
      sub: [
        "300 ml Glory Giant blood",
        "An object worn away by darkness",
        "A corpse buried over a thousand years",
        "A poem in your praise that has been sung for at least ten years",
      ],
      ritual:
        "Slay an angel or an equal creature with your own hands (magic items allowed), or kill enough of your patron god's important enemies and blasphemers.",
      powers: [
        {
          name: "Twilight",
          text: "Can age its body to dust, be reborn in the Spirit World and slip away, or slow its own aging. It can age a target or a crowd towards death, and since death by age foils most resurrections, never get into a long fight with a Glory.",
        },
        {
          name: "Combat",
          text: "The best straight-up fighter among angels. Guardian walls become cages that seal and decay. The Silver Rapier becomes the Twilight Sword, an orange-red greatsword that leaps out from where the target stands. Hurricane of Light becomes an orange storm that levels a wasteland.",
        },
        {
          name: "Holy",
          text: "Glory is part of holiness, and death is among life's holiest moments. A Glory's glory is dawn and dusk, ruin and cleansing at once.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A pure square stone flowing with holy light." }],
    },
    {
      n: 1,
      name: "Hand of God",
      potion: "Bluish-black with a twilight tinge, see-through faces trapped inside.",
      main: ["A Hand of God characteristic, or one of the hands of an ancient giant king"],
      sub: [
        "100 ml of a true god's blood, without characteristics",
        "9 drops of Styx water or something like it",
        "Scripture recording your legends and loyalty",
        "A flower from a true god's kingdom",
      ],
      ritual: "Swear yourself to a god, or become a servant of a branch of the River of Eternal Darkness.",
      powers: [
        {
          name: "Proxy",
          text: "Channels the might of the god, Uniqueness or Great Old One they serve to hand out divine punishment. Only briefly and carefully, or they slowly become nothing but a servant. Because of this, the Sequence gains no other authority, only stronger versions of what came before.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A huge, half-clear blue-black hand covered in divine markings." }],
    },
    {
      n: 0,
      name: "Twilight Giant",
      potion: "A towering orange-red phantom that seems to drag dusk along behind it.",
      main: ["The Twilight Giant Uniqueness", "Three Hand of God characteristics"],
      sub: ["The remains of a true god"],
      ritual: "Witness and take part in a whole race or continent rising, declining and dying out.",
      powers: [
        {
          name: "Twilight",
          text: "Made of light, space-time and decay. Its very presence makes matter, will and even emptiness crumble and fade. It freezes dusk and slows time, ages targets to rot, beats any resurrection bound by a lifespan, slowly weakens even gods, pushes foes towards losing control, and stalls doors from opening.",
        },
        {
          name: "Combat",
          text: "The greatest strength, the largest giant form, the strongest destruction and the toughest guard. As God of Combat it can strip an enemy's skill, leaving them only instinct.",
        },
        {
          name: "Holy",
          text: "The end of life, and of the world, is the most solemn thing there is. It purifies and sniffs out evil.",
        },
        {
          name: "Proxy",
          text: "The giant is the one pathway that can actually wield a little of its Sefirah's power of enslavement.",
        },
      ],
      notes: [
        { label: "Uniqueness", text: "A great longsword wrapped in orange-red light, the sword of twilight." },
        {
          label: "Mythical form",
          text: "A one-eyed giant of knotted bluish-black flesh, put together in a way that hurts to look at.",
        },
      ],
    },
  ],
};

export default pathway;
