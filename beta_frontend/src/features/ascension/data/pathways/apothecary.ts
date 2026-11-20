import type { PathwayDetail } from "../../types";

/** The Moon / Apothecary. Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "apothecary",
  sequences: [
    {
      n: 9,
      name: "Apothecary",
      potion: "Tempting, splitting light into seven colours, and terribly bitter.",
      main: ["Horn of an adult Flying Unicorn", "3 g Crown Jellyfish venom crystal"],
      sub: [
        "100 ml adult Flying Unicorn blood",
        "7 Crown Jellyfish tentacles",
        "10 g arsenic powder",
        "10 g black henbane",
      ],
      powers: [
        {
          name: "Medicine",
          text: "Brews remedies from dead plants and animal parts. Terminal illness can be eased, not cured.",
        },
        { name: "Poison-proof", text: "Strong resistance to toxins, and Spirit Vision tuned to health." },
      ],
      notes: [{ label: "Characteristic", text: "A clear horn glinting like a rainbow." }],
    },
    {
      n: 8,
      name: "Beast Tamer",
      potion: "Rose-red like wine, sour, and a magnet for every bug nearby.",
      main: ["Marrow crystal of the Spring of Elves", "Fruit of a Giant Sword Flower"],
      sub: [
        "100 ml Spring of Elves water",
        "A Giant Sword Flower bloom",
        "10 drops wild eggplant extract",
        "10 g animal corpse oil",
      ],
      powers: [
        {
          name: "Taming",
          text: "Tames living animals, Beyonder creatures included, and can help animals survive a potion to become Beyonder creatures. Strong enough to wrestle many wild beasts.",
        },
        {
          name: "Animal Sense",
          text: "Reads beasts' thoughts, talks to them, shares their senses and slowly wins them as helpers.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A bamboo-joint shape glowing a dangerous red." }],
    },
    {
      n: 7,
      name: "Vampire",
      potion: "A cup of vivid, lively 'blood' tasting richly of it.",
      main: ["Blood essence of a Sequence 7 Sanguine, or the matching inheritance of a Sanguine or artificial vampire"],
      sub: [
        "100 ml Bloodthirsty Beast blood",
        "3 Red-Headed Bat teeth",
        "10 Long-Eared Rabbit tufts",
        "10 drops osmanthus extract",
      ],
      powers: [
        {
          name: "Coming of age",
          text: "Among Sanguine this is adulthood: up to 300 years of life, beauty and charm, speed, toughness and fierce healing. They avoid sunlight and feed on blood rich in spirituality.",
        },
        {
          name: "Dark magic",
          text: "Chains of shadow, misty bat wings for speed and short flight or a swarm of ghost bats, creeping black fire, and claws that slice steel and dissolve scales and hide.",
        },
        {
          name: "Blood Slaves",
          text: "Turns people into tougher, disease-free servants who can't disobey. It even cures some fatal illnesses.",
        },
      ],
      notes: [
        { label: "Characteristic", text: "A fist-sized crimson heart, faintly beating, with liquid moving inside." },
      ],
    },
    {
      n: 6,
      name: "Potions Professor",
      potion: "Like a crimson moon dropped into clear water: darkest at the centre, paler outward, and pungent.",
      main: ["Brain of a Troll Philosopher", "Wings of a Bat of Darkness"],
      sub: [
        "100 ml Troll Philosopher blood",
        "7 tufts of Bat of Darkness fluff",
        "10 drops Snow of June oil",
        "A potion you invented",
      ],
      acting: ["Teach herbs and medicine, and think about which potions to use in which fights."],
      powers: [
        {
          name: "Brewer",
          text: "A Sanguine Baron's longer life, speed and strength, plus a feel for spiritual materials. Brews potions and perfumes with real supernatural effects, for curing and for fighting. A well-prepared Professor who has drunk the right brews is a nightmare.",
        },
        {
          name: "Shelf life",
          text: "Like mystical items without characteristics, the brews spoil and can clash, so a careful Professor never turns into a walking explosive cocktail. Recipes are limited only by knowledge and materials: invisibility, scentless perfume, shadow draughts, fire breath, sun water, and new ones invented all the time.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A blood-red gem glowing like moonlight." }],
    },
    {
      n: 5,
      name: "Scarlet Scholar",
      potion: "Still, almost solid crimson. Tasteless, leaving you calm and hallucinating at once.",
      main: ["Blood crystal of a Moon-Worshipping Monster", "Wings of an Elder Bat"],
      sub: [
        "Heart of a Moon-Worshipping Monster",
        "Eyes of an Elder Bat",
        "100 ml water lit by the blood moon seven times",
        "10 drops Scarlet Praise flower extract",
      ],
      ritual: "Under the full moon, gather metals, gems and creature blood that stand for each phase of the moon.",
      acting: ["Truly love the moon. Worship it, and study it."],
      powers: [
        {
          name: "Moon-fed",
          text: "A Sanguine Viscount's terrifying speed and healing, with stronger dark spells and potions and resistance to nightmares. All of it scales with how well they understand the moon.",
        },
        {
          name: "Full Moon",
          text: "Makes an area feel the full moon, restoring spirituality and strengthening death, or banishes the moon entirely.",
        },
        {
          name: "Moonlight form",
          text: "Under moonlight they blink, or burst into a red haze of light and scales and re-form elsewhere, unless the heart is hit.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A simple crown seemingly woven from crimson feathers." }],
    },
    {
      n: 4,
      name: "Shaman King",
      potion: "Gold and red wrapped in thick darkness. It tears body and spirit apart.",
      main: ["Consciousness core of the Spring of Elves", "Dust of a Witchcraft Dark Spirit"],
      sub: [
        "100 ml golden spring water, or matching Sanguine blood",
        "10 g Witchcraft Dark Spirit contaminant, or Sanguine hair or nails",
        "10 drops moonflower oil",
        "An embryo of a darkness creature",
      ],
      ritual:
        "Win the Moon's true acknowledgement. Some Moons are always dangerous, some only sometimes, and some live in your own heart.",
      powers: [
        {
          name: "Long life",
          text: "A Sanguine Count, easily living a thousand years and usually not past twelve hundred without tricks like sleeping sealed in a coffin.",
        },
        {
          name: "Moon caster",
          text: "Master of moon, darkness and the bizarre, with rituals that borrow the Moon's own power. A strong body too, though more a caster.",
        },
        {
          name: "Substitutes",
          text: "Paper figures made of crimson moonlight take hits for it. Darkness Gaze links a target to its own eyeball: cover it to shield them, crush it to break them. It just grows a new eye.",
        },
        {
          name: "Bat swarm",
          text: "Breaks into half-real bats and re-forms unless every one dies. The heart is its weak spot, like the crimson moon inside it.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A fist-sized gem of clotted blood shining like a tiny crimson moon." }],
    },
    {
      n: 3,
      name: "High Summoner",
      potion: "Pale red, reflecting a ghostly Spirit World in rich patches of colour.",
      main: ["A Sanguine Marquis characteristic, or the matching artificial vampire inheritance"],
      sub: [
        "Something touched by the grey fog of Sefirah Castle",
        "One of your own moon paper figures",
        "100 ml Sanguine Marquis blood",
      ],
      ritual:
        "Find a piece of Spirit World information tied to your past, present and future and to the Moon, and claim it as your true name. Choose wrong and you become the Moon's slave.",
      powers: [
        {
          name: "Summoning",
          text: "Uses the moon's pull on the Spirit World to call powerful creatures, even angels with the right contracts. Sometimes something unknown comes instead, maybe from the dark cosmos. That can be deadly, or bring gifts no pathway has.",
        },
        {
          name: "Door of Summoning",
          text: "Pulls a ghostly door out of the air. Whatever comes through serves for about five minutes under contract, usually as strong as the caster, sometimes far weaker or stronger. Strong ones can fight the deal.",
        },
        { name: "Moon and darkness", text: "A great magician in both." },
      ],
      notes: [{ label: "Characteristic", text: "A ghostly dark-red crystal pillar." }],
    },
    {
      n: 2,
      name: "Life-Giver",
      potion: "Clear and pure with crimson bubbles drifting up.",
      main: ["A Sanguine Duke characteristic, or the matching artificial vampire inheritance"],
      sub: [
        "An amulet made by your mother",
        "10 hairs from a blood descendant you created",
        "One oak seed",
        "100 ml Sanguine Duke blood",
      ],
      ritual:
        "Cut yourself into five parts, destroy and seal them in different places, and before you fully die, have the part with the heart drink. Staying alive, and drinking while sealed, are the hard parts.",
      powers: [
        {
          name: "Creation",
          text: "Part of the authority of life. The strongest body, and everything nearby feels the joy of growth. Lifespans of plants, beasts, people and creatures stretch or shrink.",
        },
        {
          name: "Transformation and healing",
          text: "Remakes life without enslaving it. Strong wills resist, but are hurt. Heals anything not yet dead without potions, revives a whole city's land, and washes away corruption.",
        },
        {
          name: "Balance and spirit",
          text: "Steadies or unsettles those fighting corruption, and speeds, drains or destabilises anyone's spirituality.",
        },
      ],
      notes: [
        {
          label: "Characteristic",
          text: "A womb-like shape under a bloody membrane, full of crimson bubbles each nursing a life.",
        },
      ],
    },
    {
      n: 1,
      name: "Beauty Goddess",
      potion: "Bloodied liquid stretched into a hazy, impossibly beautiful human shape.",
      main: ["Auernia's characteristic, or another Beauty Goddess's"],
      sub: [
        "A widely acclaimed, unrivalled work of art",
        "The blood of a Son of God",
        "Freshly grown mistletoe",
        "The amniotic fluid you grew in, or an imagined or historical stand-in",
      ],
      ritual:
        "Let a moon paper double live as you for a long time, unexposed and remembered by as many as possible, while your real body lies buried in a coffin for three hundred years. Then the true body drinks.",
      powers: [
        {
          name: "Beauty",
          text: "A Sanguine Queen. Male drinkers become female, with strong instincts and a pull towards godhood. Her beauty overwhelms. The weak lose their minds, and even Great Old Ones may pause to admire her or hesitate to harm her.",
        },
        {
          name: "Moon's borrowed light",
          text: "Draws on the Moon within reason to shape the battlefield in her favour.",
        },
        {
          name: "Queen of the living",
          text: "Tames plants, beasts, people and creatures through life and beauty. No one can refuse her call, and darkness only adds to her dangerous charm.",
        },
      ],
      notes: [
        {
          label: "Characteristic",
          text: "A crimson mass of the very idea of beauty, with countless figures hidden inside.",
        },
      ],
    },
    {
      n: 0,
      name: "Moon",
      potion: "A ghostly pool reflecting the loveliest crimson moon.",
      main: ["The Moon Uniqueness", "Three Beauty Goddess characteristics"],
      sub: ["Blood of a child of a Great Old One or of a Sefirah"],
      ritual:
        "Enter the Astral World and claim the concept of the Moon, or carve your true name into it. Because another being already holds that concept, no true god of the Moon has ever been born.",
      powers: [
        {
          name: "Phases",
          text: "The Moon is closer to a symbol than an authority, a companion like a mother. The blood moon lets monsters loose. The crimson moon strengthens spirit and dark spells. The silver moon cuts that link off. The full moon brings life and calm. The crescent thickens darkness.",
        },
        {
          name: "Spirituality and life",
          text: "Source of all spiritual power: it can make a crowd's spirituality explode or stop it recovering. It grants or takes life, heals, purifies and reshapes the living.",
        },
        {
          name: "Darkness and the bizarre",
          text: "Moonborn dark spells, doubles, curses and moonlight forms.",
        },
        {
          name: "Beauty and taming",
          text: "The second most beautiful thing in the universe. Through blood it tames plants, beasts, people and creatures.",
        },
        { name: "Summoning", text: "Its call can draw in truly terrible beings." },
      ],
      notes: [{ label: "Uniqueness", text: "A crimson moon." }],
    },
  ],
};

export default pathway;
