import type { PathwayDetail } from "../../types";

/** Mother / Planter. Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "planter",
  sequences: [
    {
      n: 9,
      name: "Planter",
      potion: "Looks like golden oat porridge.",
      main: ["Brain of a Golden-Haired Giant Ape", "Eye of a Rain-Announcing Bird"],
      sub: [
        "Brain of a Golden-Haired Giant Ape",
        "3 Rain-Announcing Bird feathers",
        "Nine seeds",
        "100 g bread or rice",
      ],
      powers: [
        {
          name: "Farmer's strength",
          text: "Great physical strength. Farm tools suit them better than knives or guns.",
        },
        {
          name: "Reading the sky",
          text: "Forecasts the weather from clouds and wind, and is an expert at telling seeds apart and raising them.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A golden grain the size of half a fist." }],
    },
    {
      n: 8,
      name: "Doctor",
      potion: "Pale green-blue, crystal clear and sweet-smelling.",
      main: ["Green bark of a Blessed Poplar", "Spring core of Life Water"],
      sub: [
        "100 ml Life Water",
        "5 Blessed Poplar leaves",
        "Nine different kinds of herbs",
        "100 ml oat porridge or similar",
      ],
      powers: [
        {
          name: "Healing",
          text: "Diagnoses through Spirit Vision, or just by looking. A great surgeon who can reattach limbs and transplant organs. A glowing palm closes wounds it can reach, and deeper ones need surgery.",
        },
        {
          name: "Sewing souls",
          text: "Stitches spiritual wounds that won't heal by themselves, if the patient opens up fully. It can also cut a soul, which works as an attack, or cuts away the part a curse has rotted.",
        },
        { name: "Give Life", text: "Slowly restores energy to the weak." },
      ],
      notes: [{ label: "Characteristic", text: "A blue-green twig hung with glistening drops." }],
    },
    {
      n: 7,
      name: "Harvest Priest",
      potion: "Golden and rich with the smell of wheat.",
      main: ["Kidney of an ordinary Harvest Giant", "Root crystal of a Life Oak"],
      sub: [
        "100 ml milk of any mammal",
        "Reproductive organ of a Harvest Giant",
        "A Life Oak fruit",
        "An Alinga water plant",
      ],
      powers: [
        {
          name: "Harvest",
          text: "Boosts growth and breeding to bring a good harvest, and heals sick plants and fields.",
        },
        {
          name: "Quickening",
          text: "Hands on the ground make everything within thirty metres grow and multiply faster, though not seed to wilt in seconds. A seed in hand bursts at once into binding vines. With mutant seeds, that's a real weapon.",
        },
        {
          name: "Friend of the field",
          text: "Plants and insects within thirty metres help as much as they can, plus rituals for rain or sunshine.",
        },
      ],
      notes: [{ label: "Characteristic", text: "Golden liquid with a thick white head, like beer." }],
    },
    {
      n: 6,
      name: "Biologist",
      potion: "Brown with floating wisps of matter.",
      main: ["Brain of a Harvest Giant Scholar", "Stomach of a Poison-Eating Bat"],
      sub: [
        "100 ml Poison-Eating Bat blood",
        "Tip of a Harvest Giant Scholar's tongue",
        "Three toxins from different creatures",
        "Eggs or embryos of nine species",
      ],
      powers: [
        {
          name: "Life's secrets",
          text: "Understands living things deeply and crossbreeds them into strange creations, soulless until demigod level.",
        },
        { name: "Toxins", text: "Brews powerful poisons and releases them through hair and other means." },
      ],
      notes: [{ label: "Characteristic", text: "Wrinkled tan leather with strange patterns." }],
    },
    {
      n: 5,
      name: "Druid",
      potion: "Brown, sparkling with blue-green motes.",
      main: ["Head of a Harvest Giant Guard", "Spine of a Tree Warden"],
      sub: [
        "150 ml Harvest Giant Guard blood",
        "A Tree Warden pelt",
        "A leaf from a century-old oak",
        "10 drops animal-luring perfume",
      ],
      ritual: "Learn the habits and anatomy of many common animals and three supernatural creatures.",
      powers: [
        {
          name: "Nature's favourite",
          text: "Guardian of the oaks, getting things done through plants and animals. Becomes a giant bear, or briefly the creatures from the ritual, without their powers.",
        },
        {
          name: "Earth magic",
          text: "Sinks into softened ground and moves through it, turns ground within thirty metres into swamp, and grows a skin of stone or bark.",
        },
        {
          name: "Nature's Wrath",
          text: "Marks up to fifty enemies for the land to turn on. Any danger already there, like loose rocks on a cliff, is far more likely to strike them.",
        },
        {
          name: "Combined arts",
          text: "Mutant vines burst from the ground under a foe, and flung hairs burn into unknown black poison. Feeds on soil and air.",
        },
      ],
      notes: [{ label: "Characteristic", text: "Looks like brown earth." }],
    },
    {
      n: 4,
      name: "Classical Alchemist",
      potion: "Clear as the source of life, with a dreamy thread of pale red.",
      main: ["Life crystal of a Desolation Attendant", "Heart of a Harvest Giant Priest"],
      sub: [
        "200 ml Harvest Giant Priest blood",
        "9 Desolation Attendant hairs",
        "A broken, lost soul",
        "100 g flesh of a Beyonder who lost control",
      ],
      ritual: "Refine a Stone of Life with your own hands.",
      powers: [
        {
          name: "True alchemical life",
          text: "From soul fragments and materials it makes lasting ordinary humans, and golems of stone, earth or iron with matching earth powers. It also commands and calms dim-witted supernatural creatures.",
        },
        {
          name: "Life and madness",
          text: "Its touch fully heals any creature not already losing control, its blows push enemies towards madness and mutation, and the area around it bursts with life.",
        },
        {
          name: "Borrowed forms",
          text: "Briefly becomes a supernatural creature without godhood, if it understands that creature well enough.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A bright red crystal glowing with life." }],
    },
    {
      n: 3,
      name: "Pallbearer",
      potion: "Dark, full of ghostly figures.",
      main: ["Heart of a Gloomy Treant", "Human skin of a Harvest Giant Elder"],
      sub: [
        "200 ml Harvest Giant Elder blood",
        "A Gloomy Treant fruit",
        "A rotting plank from a tomb's coffin",
        "A memorial offering of food or flowers",
      ],
      ritual:
        "Bury a Sequence 3 of the Darkness, Death or Giant pathway, or one of their mythical creatures, yourself, and witness the whole passage from life to death to earth.",
      powers: [
        {
          name: "Keeper of the cycle",
          text: "Part of the Mother's cycle of life, tied to death and return. Turns every corpse within ten kilometres into a fighting evil spirit, fifty for those who ate its food.",
        },
        {
          name: "Life Deprivation",
          text: "Each blow is a trial of death: fail and die, pass and still lose much life. Life drains away nearby even without a touch.",
        },
        {
          name: "Return to the earth",
          text: "Undead within ten kilometres crumble back into the Mother's embrace. Even divine ones last only seconds, though full mythical creatures are spared. Coffin and soil can seal angel-level undead.",
        },
        { name: "Earth golems", text: "Up to three living golems, as strong as Sequence 4." },
      ],
      notes: [{ label: "Characteristic", text: "A dark, weightless, blurry human figure." }],
    },
    {
      n: 2,
      name: "Desolate Matriarch",
      potion: "Brownish-yellow like rotting remains. Deeply nauseating.",
      main: [
        "Reproductive organ of a Harvest Child, heart of a Desolation Daughter, or a Desolate Matriarch characteristic",
      ],
      sub: [
        "10,000 souls of creatures that starved",
        "Residue from an oasis turned to desert",
        "A limb from a creature with great vitality and healing",
        "300 ml Harvest Child or Desolation Daughter blood",
      ],
      ritual: "Conceive, give birth to and raise a whole race.",
      powers: [
        {
          name: "Earth, harvest and life",
          text: "Male drinkers become female. Grows food anywhere and boosts harvests over fifty kilometres. For three hundred kilometres she makes the land fertile and life fruitful, or barren and dying until the curse lifts. Angel-level purification can confine it.",
        },
        {
          name: "Her domain",
          text: "Fills fifty kilometres with poisons and helpful supernatural plants, tames every animal, and pushes Beyonders towards losing control.",
        },
        {
          name: "Desolation",
          text: "Within thirty kilometres life drains to death, other powers wither, and lifeless dead return to the earth.",
        },
        {
          name: "Greater works",
          text: "Up to nine demigod puppets of earth, plant, magma or metal, evil spirits over fifty to three hundred kilometres, blows that test both death and control, and brief mythical-creature forms.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A clump of brown earth covered in grass, grain and vines." }],
    },
    {
      n: 1,
      name: "Naturewalker",
      potion: "Thick and lush green, bursting with life.",
      main: ["A Naturewalker characteristic"],
      sub: [
        "A flame from the earth's core",
        "A branch of a thousand-year oak",
        "10 drops divine blood",
        "100 g newly formed gold",
        "100 g soil blessed by your mother, real or mystical",
      ],
      ritual:
        "Create a world with no nature or elements, made only of concepts, wrap it around you completely, ride it into the Astral World, and drink.",
      powers: [
        {
          name: "Child of Nature",
          text: "Makes any place livable, even the Abyss. Becomes one with earth, forest, water, mountains and ore to travel through them and draw on their power. As the Mother is mother of concepts too, fire, lightning, sun and moon answer as well.",
        },
        {
          name: "World Creation",
          text: "Conceives and makes a whole world of 'nature', like a world inside a painting or a mirror, or a fuller pocket dimension.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A crystal cluster of red, green, gold, black and brown." }],
    },
    {
      n: 0,
      name: "Mother",
      potion: "A blood-red nest under a clear birth membrane, with a ghostly infant growing inside.",
      main: ["The Mother Uniqueness", "Three Naturewalker characteristics"],
      sub: ["A divine kingdom with a simple but complete cycle"],
      ritual: "Truly give birth to a god, or do its mystical equivalent.",
      powers: [
        {
          name: "Mother",
          text: "Mother of all things, nurturing gods, concepts and worlds.",
        },
        {
          name: "Earth",
          text: "The origin of life, the hive of all things and where everything returns. It can split the ground and drop a target into the Chaos Sea at the planet's core.",
        },
        {
          name: "Nature",
          text: "Part of reality itself, almost impossible to destroy or seal. Wild growth can make barriers that stop true gods.",
        },
        {
          name: "Life and death",
          text: "Coming from the source is life, going back is death. Below these lie desolation, healing, transmutation, return and harvest. For example, she can turn an enemy into a plant and let it wither back into her embrace.",
        },
      ],
      notes: [
        {
          label: "Uniqueness",
          text: "A mass of brown earth covered in grain, grass, trees, mushrooms and organs of birth.",
        },
        {
          label: "Mythical form",
          text: "A mass of flesh grown over with birthing organs, golden wheat, mushrooms, vines and soil.",
        },
        {
          label: "Divine kingdom",
          text: "The Bountiful Paradise, where she defines nature, life and death, though the full cycle isn't finished yet.",
        },
      ],
    },
  ],
};

export default pathway;
