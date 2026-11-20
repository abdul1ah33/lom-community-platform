import type { PathwayDetail } from "../../types";

/** Paragon (Perfector) / Savant. Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "savant",
  sequences: [
    {
      n: 9,
      name: "Savant",
      potion: "Ice blue and oddly tempting, like a sweet treat.",
      main: ["Brain core of a Mountain Yeti", "Crystal of a Library Shadow Spirit"],
      sub: [
        "100 ml Mountain Yeti blood",
        "Something stained by a Library Shadow Spirit",
        "A basic school textbook",
        "One carnelian",
      ],
      powers: [
        {
          name: "Total recall",
          text: "Wakes the memory so that everything ever seen can be recalled. Learning and hands-on skill soar.",
        },
        {
          name: "Knowledge is power",
          text: "Knows a little about everything, mysticism a bit, chemistry and machinery much better: aqua regia, nitroglycerin, intricate gearwork.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A clear, ice-blue brain." }],
    },
    {
      n: 8,
      name: "Archaeologist",
      potion: "Like rotting, yellow-green pus.",
      main: ["Crystal of an Ancient Tomb Shadow", "Spinal cord of a humanoid Ruins Wanderer"],
      sub: [
        "20 g Ancient Tomb Shadow dust",
        "150 ml Ruins Wanderer blood",
        "An ancient document",
        "An ancient object with a trace of mystical power (choose badly and it's dangerous)",
      ],
      powers: [
        {
          name: "Field scholar",
          text: "History, wilderness survival and the taboos of ruins, plus a sturdy body for trouble. Ritual magic is still shaky.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A clear crystal that smells musty." }],
    },
    {
      n: 7,
      name: "Appraiser",
      potion: "Black and white, woven together.",
      main: ["A Spirit World Evil Eye", "A Human Skin Scroll"],
      sub: ["9 Evil Eye tears", "100 ml Human Skin Scroll blood", "An illustrated reference book", "9 drops mint oil"],
      powers: [
        {
          name: "Appraisal",
          text: "Sizes up mystical items quickly without divination, grasps most of their powers and flaws by instinct, and uses them while dodging their dangers.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A black-and-white eye covered in strange symbols." }],
    },
    {
      n: 6,
      name: "Machinery Specialist",
      potion: "Seemingly made of crimson fire, with iron-black objects floating in it.",
      main: ["Brain of a Four-Armed Madman", "Ember of a Corpse-Eating Furnace Fire"],
      sub: [
        "150 ml Four-Armed Madman blood",
        "30 g Corpse-Eating Furnace Fire ash",
        "A gear or part you polished yourself",
        "A sound blueprint for a brand-new machine",
      ],
      powers: [
        {
          name: "Master maker",
          text: "Also called Gear Master, or in ancient times Artisan. Builds mechanical marvels and modest mystical items that work well and have mild side effects. Otherwise, only ritual skill improves.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A fist-sized wrinkled egg shape burning with crimson fire." }],
    },
    {
      n: 5,
      name: "Astronomer",
      potion: "Reflects a dreamy starry sky.",
      main: ["Eye of a Star-Scar Elephantman", "Crystal shell of an Enchanted Dancing Giant Turtle"],
      sub: [
        "200 ml Star-Scar Elephantman blood",
        "3 pieces of ordinary turtle shell",
        "A full set of convex and concave lenses",
        "10 drops star-seeking flower extract",
      ],
      ritual: "Discover and name an astronomical phenomenon or a celestial body.",
      powers: [
        {
          name: "False Star Chart",
          text: "Paints a fake sky to confuse a target or spoil their astrology, and its changes stir real tides or magnetic disturbances within a hundred metres.",
        },
        {
          name: "Star blessing and curse",
          text: "Starlight that changes gravity on an area or a target, and a focused beam that weakens, mutates or wounds.",
        },
        {
          name: "Astronomy",
          text: "Uses real sky events within limits, like gathering a solar storm's energy to attack or calling down a fiery rain during a meteor shower. The cosmos is dangerous, though. Study the blood moon carelessly and you may wake up pregnant, or no longer yourself.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A flaky crystal full of cracks and points of starlight." }],
    },
    {
      n: 4,
      name: "Alchemist",
      potion: "Thick black liquid split into chunks with gaps between, like frozen porridge cut with a knife.",
      main: ["Heart of a humanoid Soul Eater", "Core of a Machine Spirit"],
      sub: [
        "100 ml Soul Eater blood",
        "A core part from a Machine Spirit's creation",
        "A piece of your own flesh",
        "Something that stands for good luck",
      ],
      ritual: "Drain every bit of life from an area until the soil turns to desert and the lakes dry up.",
      powers: [
        {
          name: "Transmutation",
          text: "Turns whatever is around into instant puppets and tools, or carefully prepared stronger ones. With high-Sequence materials, its creations can stand up to angels.",
        },
        {
          name: "Alchemical life",
          text: "Gives creations a soul and some life, though not from nothing: from soul fragments in the Spirit World and life drained from nearby beings. Not as good as the Mother pathway's alchemy.",
        },
        {
          name: "Everyday wonders",
          text: "Even more useful outside combat, which is part of why the Paragon's kingdom is called the Mechanical Paradise.",
        },
      ],
      notes: [{ label: "Characteristic", text: "An iron-black 'mechanism' of strange interlocking shapes." }],
    },
    {
      n: 3,
      name: "Arcane Scholar",
      potion: "Clear, with sparks constantly popping into being and vanishing.",
      main: ["An Arcane Fiend characteristic or a Spirit World Spark", "Crystal of an Annihilation Specter"],
      sub: [
        "90 ml water tainted by the Spirit World",
        "50 g highly radioactive material",
        "Spirit World Spark residue and Annihilation Specter dust, or Arcane Fiend dust and one of its possessions",
      ],
      ritual: "Choose some special Spirit World knowledge, bind yourself closely to it, and merge with it in spirit.",
      powers: [
        { name: "Siphon", text: "Draws life from every creature within five kilometres." },
        {
          name: "Disintegrate",
          text: "A beam that undoes the structure of most things, leaving them in pieces with even their colour boiled away.",
        },
        {
          name: "Environmental master",
          text: "Reads the history out of a place, such as what fought there, at what Sequence and what lingers. Turns any terrain to its own advantage.",
        },
        {
          name: "Knowledge Sprite",
          text: "Becomes a piece of knowledge for five minutes to five days. Whoever reads it lets it into their mind, where it quietly bends or corrupts their thinking. It can lurk in the Spirit World to mislead seekers too.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A ghostly flower of flame holding countless pieces of knowledge." }],
    },
    {
      n: 2,
      name: "Knowledge Master",
      potion: "Ice-coloured liquid stretched into a warped human shape.",
      main: ["A Knowledge Mentor characteristic, or an Otherworld Brain that makes realms with different physics"],
      sub: [
        "A work of yours cited or used by over 100,000 people",
        "A blessing from one of the Spirit World's Seven Lights",
        "At least a thousand heartfelt thank-you gifts from students",
        "5 litres from the Sea of Knowledge left when such a being dies",
      ],
      ritual: "Make a groundbreaking, systematic contribution to any field.",
      powers: [
        {
          name: "Principles",
          text: "Rewrites physics a little: fire without flame, frost that warms, ground that won't hold weight.",
        },
        { name: "Analysis", text: "Sees an angel's essence and plans to beat it." },
        {
          name: "Creation and learning",
          text: "Makes almost anything imaginable, even supernatural things, with stand-ins when materials run short. Learns anything at a glance.",
        },
        {
          name: "Mentor",
          text: "Can 'test' others and teaches brilliantly. Can become a being of information shaped like the scroll of civilisation, though not the whole scroll yet.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A half-real book made of every kind of knowledge." }],
    },
    {
      n: 1,
      name: "Enlightener",
      potion: "A faint, clear light shining in black liquid.",
      main: ["An Enlightener characteristic"],
      sub: [
        "100,000 souls lost as a civilisation declined",
        "A historical record of a civilisation",
        "Your finest, near-perfect machine",
        "Twelve figurines of you made by devoted students",
      ],
      ritual: "Spread new knowledge that transforms the civilisation of at least one country.",
      powers: [
        {
          name: "Civilisation",
          text: "Also called the Light of Darkness. Unfurls the full scroll of civilisation. Draws a thread of order from chaos, new life from ruin and first light from darkness, and strikes, binds or crushes with civilisation's weight.",
        },
        {
          name: "Enlightenment",
          text: "Raises wisdom, gives flashes of insight, or traps foes in mazes of mathematics.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A scroll of civilisation, solid and ghostly at once." }],
    },
    {
      n: 0,
      name: "Paragon",
      potion: "A flawless, ghostly human figure glowing softly.",
      main: ["The Paragon Uniqueness", "Three Enlightener characteristics"],
      sub: ["Knowledge analysed from a Great Old Dominator's aura or remains"],
      ritual:
        "Raise a civilisation and witness and record all of it, from first enlightenment to its end or transformation.",
      powers: [
        {
          name: "Practical knowledge",
          text: "Commands all knowledge the real world has found and can change it: instantly across a continent, quickly across a planet, slowly across a star system. It can make targets forget, make knowledge reject them, or turn what they know into a hidden trap.",
        },
        {
          name: "Civilisation",
          text: "Holds a people, nation, continent or planet in endless ignorance, or makes its civilisation leap ahead.",
        },
        {
          name: "Teaching",
          text: "Gives knowledge through enlightenment, guidance and testing. Shares the Spirit World with the Hermit.",
        },
        {
          name: "Learn, create, analyse",
          text: "Learns or blocks learning at a glance, combines knowledge into near-divine items, and sees to the heart of anything to use it.",
        },
      ],
      notes: [
        { label: "Uniqueness", text: "A perfect, hazy glow made of vast information." },
        { label: "Mythical form", text: "A being of information made of many scrolls of civilisation." },
        {
          label: "Divine kingdom",
          text: "The Mechanical Paradise, the Cemetery of Civilisations, or the Land of Perfection.",
        },
      ],
    },
  ],
};

export default pathway;
