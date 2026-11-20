import type { PathwayDetail } from "../../types";

/** The Hanged Man / Secrets Suppliant. Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "secrets-suppliant",
  sequences: [
    {
      n: 9,
      name: "Secrets Suppliant",
      potion: "Black, bubbling now and then, strangely holy-looking and horribly bitter.",
      main: ["One singing black mushroom", "One Bat of Darkness"],
      sub: [
        "100 ml red wine",
        "A stub of candle offered in a cathedral",
        "Any poisonous mushroom",
        "10 g verbena powder",
      ],
      powers: [
        {
          name: "Sensing the hidden",
          text: "Spiritual perception jumps, enough to feel that certain hidden and horrifying beings exist.",
        },
        {
          name: "Forbidden knowledge",
          text: "The potion brings knowledge of sacrifice and ritual magic, along with a warped view of the world and a real risk of losing control. The knowledge includes honorific names of hidden entities, and some of those were tampered with on purpose.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A pair of black lips you can half see, which seem to be speaking." }],
    },
    {
      n: 8,
      name: "Listener",
      potion: "Swirling psychedelic colours around a dark heart. Drinking it hits like a wave of mental ecstasy.",
      main: ["Ear of a Misfortune Black Cat", "Heart of a Crypt Crawler, a creature like a pangolin"],
      sub: ["100 ml red wine", "A piece of bread", "Heart of a Misfortune Black Cat", "10 drops begonia oil"],
      powers: [
        {
          name: "Listening",
          text: "Hears the whispers of hidden beings and gets strange, powerful gifts from them. A Listener who can't advance rarely survives five years. Every Listener is mad inside, however normal they seem. Even without trying, they hear far more than other people, and the closer the voice, the deeper the danger.",
        },
        { name: "Keener spirit", text: "Spiritual perception sharpens again." },
      ],
      notes: [{ label: "Characteristic", text: "A pair of blackened, sinister ears." }],
    },
    {
      n: 7,
      name: "Shadow Ascetic",
      potion: "Grey-black, mirror-like, cold, bitter and stinging.",
      main: ["One Shadow Maggot", "Horn of a Bloodeye Black Goat"],
      sub: [
        "100 ml of someone else's blood",
        "Tail of a Bloodeye Black Goat",
        "Any object that has desecrated a cathedral",
        "10 drops wild rose extract",
      ],
      powers: [
        { name: "Shadow lurking", text: "Melts into shadows to hide, draw on them, and stalk prey unseen." },
        {
          name: "Summon shadow",
          text: "Calls creatures from the shadow world to hold or attack a target. It's risky: what comes might be uncontrollable, or hungry for the summoner.",
        },
        {
          name: "Shadow curse and capture",
          text: "Curses a target through their shadow, using a ritual or some of their blood. From inside the shadows, it can even try to seize someone's shadow.",
        },
        {
          name: "Shadow shaping",
          text: "Moulds shadow into weapons or beasts whose touch chills and corrupts.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A lump of grey-black shadow." }],
    },
    {
      n: 6,
      name: "Rose Bishop",
      potion:
        "Pale chunks of flesh soaking in blood. It feels like your skin is being stripped away and your body caving in.",
      main: ["One Undying Flesh Mushroom", "The largest fragment of a Shadow of Vengeance"],
      sub: [
        "100 ml of your own blood",
        "A length of the mushroom's companion vine",
        "Shadow of Vengeance dust",
        "10 g cinnamon",
      ],
      powers: [
        {
          name: "Flesh magic",
          text: "Masters of healing the body through control at the level of cells. Any physical change can be undone as long as the spirit is untouched. With enough flesh and the spirit intact, a Rose Bishop has no fatal spot. They must keep feeding on flesh, animal will do, or lose power and slide towards losing control.",
        },
        {
          name: "Flesh cloak and melting",
          text: "Weaves a spell-resistant cape of flesh. Melts like a candle to seep through the ground or hide inside someone else's body. Leaving kills the host, unless they hid in the stomach.",
        },
        {
          name: "Flesh bomb",
          text: "Makes a piece of their body, or someone else's, swell and burst into a corrosive storm of gore.",
        },
        {
          name: "Flesh curse and puppets",
          text: "Never let a Rose Bishop get hold of your blood. They also build strong flesh marionettes that ignore spiritual attacks and can explode.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A lump of rotting meat with veins and tissue showing." }],
    },
    {
      n: 5,
      name: "Shepherd",
      potion: "Greyish-white with swollen ghostly faces flickering inside. Drinking it tears the soul.",
      main: ["Crystal of a Blood Scarecrow", "Brain of a Herd Keeper, a monkey-like creature"],
      sub: [
        "80 ml Herd Keeper blood",
        "7 Blood Scarecrow stalks",
        "A leather whip that has lashed at least a hundred people",
        "10 g marigold balm",
      ],
      ritual: "Pull your soul out of your body, make the body drink the potion from outside, then return.",
      powers: [
        {
          name: "Grazing",
          text: "Swallows souls, wraiths and evil spirits included, and herds them like a flock. Up to seven at once, with three chosen powers from whichever one is active, swapped in an instant. Replacing a soul can't be undone. Demigod souls are sturdy enough to send out and fight, one at a time.",
        },
        {
          name: "The cost",
          text: "Borrowed powers are weaker than the originals and the souls slowly wear down. They burn their own spirituality, while the Shepherd's goes into keeping the herd. If the herd is stolen, the characteristics inside mix and break loose.",
        },
        {
          name: "Control shadow",
          text: "Grips deep shadows that belong to no one, giving them weight to bind, crush and dissolve a target.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A greyish-white palm you can half see through." }],
    },
    {
      n: 4,
      name: "Black Knight",
      potion: "Thick like liquid black gemstone. The body collapses again on drinking.",
      main: ["Remnant curtain of a Shadow Knight", "A clot of flesh from a Grigale, the Blood Giant"],
      sub: [
        "Shadow trace of a Grigale",
        "Black fluid of a Shadow Knight",
        "A drop of blood from each ritual target",
        "10 drops lemon balm oil",
      ],
      ritual:
        "Without violence, lead more than ten thousand people into depravity. Higher-Sequence victims and falls bunched close together in time make it work better.",
      powers: [
        {
          name: "The Black Knight",
          text: "Becomes a 2.3-metre giant in cold black armour with burning red eyes and a long greatsword. The armour, made of degeneration, breaks apart to soak up hits.",
        },
        {
          name: "Cull of Spiritual Flesh",
          text: "An arm-length blade that rots flesh, wipes out souls and cuts through barriers. It also strips the defences of anyone with corrupt thoughts.",
        },
        {
          name: "Shadow of Depravation",
          text: "Pulls their own dark thoughts out into a free-roaming shadow being. It can purge foreign voices from the mind, spread into corroding black tar, or harden into armour.",
        },
        {
          name: "Commandeering shadows",
          text: "Makes a target's own shadow rise and bind them. Cutting it off damages the spirit.",
        },
        {
          name: "Larger flock",
          text: "Nine grazed souls, and released souls can now use all their powers.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A crystal-clear black hand bone." }],
    },
    {
      n: 3,
      name: "Trinity Templar",
      potion: "A calm lake at night with a storm sweeping its depths. It feels like the soul is splitting in three.",
      main: ["Head of a Lord of Herds", "Heart of a Grigale chief"],
      sub: [
        "100 ml Lord of Herds blood",
        "Eye of a Grigale chief",
        "A stone holding a hundred sealed souls",
        "30 g fennel",
      ],
      ritual:
        "Deliberately grow a split personality without losing control. Anyone who already had one before this point loses control on advancing.",
      powers: [
        {
          name: "Three heads",
          text: "A shadowy head grows on each shoulder, one young, one old. Each can carry away a third of the body and regrow the rest instantly.",
        },
        { name: "Three shepherds", text: "Each head drives its own soul at the same time, from a flock of thirteen." },
        {
          name: "Shadow substitute",
          text: "Their shadow takes a hit in their place, as long as it hasn't been destroyed.",
        },
        {
          name: "Unkillable flesh",
          text: "With one cell left, other flesh to feed on and the spirit intact, the body can be rebuilt.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A blood-coloured skull with several pairs of eyes." }],
    },
    {
      n: 2,
      name: "Profane Presbyter",
      potion: "Filthy-looking and filthy-tasting, like sewer runoff.",
      main: ["Pus of a Shadow King", "Crystal of a Flesh and Blood Monarch"],
      sub: [
        "Shadow King dust",
        "100 ml blood and 50 g flesh of a Flesh and Blood Monarch",
        "A century-old legend of depravity that you created yourself, written down",
      ],
      ritual:
        "Split from your own shadow, defeat it and master it, then cross into the shadow world, a hidden dimension next to the mirror world, survive its dangers and found a kingdom of your own there.",
      powers: [
        {
          name: "Profane Words",
          text: "Speech carrying the authority of degeneration and corruption. Every word about themselves raises their power. They twist a target's answers into chains that imprison, corrupt or split, and any kind of communication, even sign language, can carry it.",
        },
        {
          name: "Curses",
          text: "Direct curses of rot and corruption, and a mental version of Cull of Spiritual Flesh that anyone with a corrupt thought can't resist.",
        },
        { name: "Deeper shadows", text: "Shadow and flesh powers grow stronger. Eighteen souls in the flock." },
      ],
      notes: [{ label: "Characteristic", text: "A filthy, paper-thin shadow, half real." }],
    },
    {
      n: 1,
      name: "Dark Angel",
      potion: "Pure black, with the occasional sliver of light leaking through.",
      main: ["A Dark Angel characteristic, or Sasrir's shadow or hands"],
      sub: [
        "A holy scripture of the Primordial God Almighty or the Ancient Sun God",
        "50 g of flesh from angels of two of these pathways: Sun, Tyrant, White Tower, Visionary",
      ],
      ritual:
        "Fly towards the mystical sun and hold out for fifteen minutes until you become part of the shadow cast by light.",
      powers: [
        {
          name: "Darkness",
          text: "Calls up a thick black sea of decay that swallows attacks whole, or smears foes with clinging black slime.",
        },
        {
          name: "Deeper profanity",
          text: "Its corrupt voice drains life from enemies, and the madness of its half-mythical form grows stronger.",
        },
        { name: "Ruler of Shadows", text: "Commands the shadow world, though it doesn't rule it yet." },
        {
          name: "Degenerate Beholden",
          text: "All twenty-two grazed souls can be sent out at once as willing servants, fighting at full strength.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A bloody ball of flesh sprouting black feathers." }],
    },
    {
      n: 0,
      name: "The Hanged Man",
      potion: "A dark shadow that cuts off all light around it.",
      main: ["The Hanged Man Uniqueness", "Three Dark Angel characteristics"],
      sub: ["The shadow world itself"],
      ritual:
        "Walk on the Chaos Sea and let your shadow dissolve into it, without your body fully sinking or your spirit fully falling.",
      powers: [
        {
          name: "God of degeneration",
          text: "A mass of shadow and writhing flesh with five heads and five shadows, holding authority over shadow, darkness, degeneration, corruption and mutation.",
        },
        {
          name: "Shadow and darkness",
          text: "Master of the shadow world. Its darkness is the kind that swallows everything, and the darkness of a fallen heart.",
        },
        {
          name: "Corruption",
          text: "Embodies every creature's fallen self. Tainted by the Chaos Sea and tainting everything in turn, it can let a trace of that sea's influence through.",
        },
        {
          name: "Mutation",
          text: "Breeds monsters out of the dark, comes back from death, and bends how things change. This overlaps with the Fool.",
        },
        {
          name: "Scapegoat and sacrifice",
          text: "Takes harm and death in someone else's place, draws every attack onto itself, and offers itself up in exchange for a certain hope.",
        },
      ],
      notes: [
        { label: "Uniqueness", text: "A shadow pressed into solid form." },
        { label: "Mythical form", text: "Writhing flesh wrapped in black shadow." },
      ],
    },
  ],
};

export default pathway;
