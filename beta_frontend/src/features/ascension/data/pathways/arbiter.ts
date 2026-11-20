import type { PathwayDetail } from "../../types";

/** Justiciar / Arbiter. Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "arbiter",
  sequences: [
    {
      n: 9,
      name: "Arbiter",
      potion: "Brownish-yellow with black specks floating in it.",
      main: ["Face skin of a lion-like White-Maned Hunter", "3 Crown Falcon tail feathers"],
      sub: ["100 ml White-Maned Hunter blood", "A Crown Falcon claw", "One green olive", "1 g gold"],
      powers: [
        {
          name: "Authority",
          text: "A natural keeper of order, with persuasive charm, real presence and the fighting skills to handle surprises. Anyone at odds with an Arbiter half wants to give in.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A brownish-yellow stone slab covered in black patterns." }],
    },
    {
      n: 8,
      name: "Sheriff",
      potion: "Three colours twisted together: iron black, dark red and silver white.",
      main: ["A pair of Terror Demon Worm eyes", "Right paw of a Silver War Bear"],
      sub: [
        "100 ml Silver War Bear blood",
        "20 ml Terror Demon Worm fluid",
        "A letter appointing someone as sheriff or similar (it needn't be yours)",
        "10 drops monkeyflower oil",
      ],
      powers: [
        {
          name: "Never forgets a face",
          text: "One look at a person, a photo or a sketch fixes them in mind with an extra sense to follow. Every road walked is remembered in the mystical sense too.",
        },
        {
          name: "Jurisdiction",
          text: "Claims an area about the size of a small town, or up to five times larger with an official post. The better they know it and the more its people trust them, the stronger they get there, and the place itself starts to help.",
        },
        {
          name: "Lawman's instincts",
          text: "Spots anomalies, faint traces and unhidden evil or madness nearby, and always knows when they're being watched. Tougher body, and skilled with pistols, shotguns and other handheld arms.",
        },
      ],
      notes: [
        { label: "Characteristic", text: "A child-fist-sized ball of iron black and dark red wrapped in silver." },
      ],
    },
    {
      n: 7,
      name: "Interrogator",
      potion: "Pale blue and see-through, crossed by silver flashes.",
      main: ["Horn of a Flash-Patterned Black Snake", "Dust of a Lake Spirit"],
      sub: [
        "90 ml Flash-Patterned Black Snake blood",
        "10 g Lake Spirit residue",
        "Wood scorched by lightning",
        "One tourmaline",
      ],
      powers: [
        {
          name: "Torturer's tools",
          text: "Ghostly branding irons and similar tools appear in hand and burn the spirit directly, by touch only. Also a skilled, explosive fighter with any weapon.",
        },
        {
          name: "Psychic Piercing",
          text: "Not mind control but a direct strike on the soul. It skips the body, stabs the spirit and floods it with pain, within five metres.",
        },
        {
          name: "Whip of Pain",
          text: "Like lightning lashing through the mind, numbing and agonising at once. The target shakes, their knees give, and they confess and can't lie.",
        },
      ],
      notes: [
        {
          label: "Characteristic",
          text: "A pale-blue hexagonal prism with lightning flickering inside, as if from deep in the mind.",
        },
      ],
    },
    {
      n: 6,
      name: "Judge",
      potion: "Black, pierced top to bottom by many copper pillars.",
      main: ["Scalp of a Lord of the Black Domain, an elf-like creature", "Tail of a Patterned Giant Tiger"],
      sub: [
        "120 ml Lord of the Black Domain blood",
        "2 Patterned Giant Tiger teeth",
        "A gavel used in court for over ten years",
        "One yellow everlasting flower",
      ],
      powers: [
        {
          name: "Verdicts",
          text: "Speaking a mystical tongue such as ancient Hermes, the Judge lays down rules or rulings over an area, and everything there must obey or be bound.",
        },
        {
          name: "Prohibition",
          text: "A pushed palm and a spoken rule ban certain actions or powers for everyone nearby. With preparation it can even trouble a Saint. It can suppress or banish someone but not kill them.",
        },
        {
          name: "Imprison and confine",
          text: "Layers of clear walls and thick clear liquid set a target solid, spirit and all. It can also seal a whole area.",
        },
        {
          name: "Flog, exile, death",
          text: "An invisible whip that strips cloth and flesh to the bone. A crushing force that can blow even spirits away. A death sentence that sends the Judge charging in for one unstoppable blow to the head.",
        },
        { name: "Secrecy", text: "A locked gaze binds someone to obey and keep quiet." },
      ],
      notes: [{ label: "Characteristic", text: "A clear branch banded in black and copper." }],
    },
    {
      n: 5,
      name: "Disciplinary Paladin",
      potion: "Black and seemingly frozen, bristling with spikes.",
      main: ["Heart of a Metal Giant Ape", "Brow spike of a Vengeance Stone Spirit"],
      sub: [
        "80 ml Metal Giant Ape pus",
        "20 g Vengeance Stone Spirit flakes",
        "A black lamb's tail",
        "13 drops dill oil",
      ],
      ritual:
        "Pick a wanted criminal of Sequence 5 or higher, confirm their crimes, hunt them down alone and execute them.",
      powers: [
        {
          name: "Discipline",
          text: "Marks a target: a lawbreaker, someone who broke the Paladin's rules, an attacker, or something that doesn't belong in this world. A dawn-like glow rises, and every blow against the marked hits harder.",
        },
        {
          name: "Stacked prohibitions",
          text: "Several bans at once. Anyone who breaks one is hit by an attack that can't miss.",
        },
        {
          name: "Iron will",
          text: "A sturdy body and mystical self-control: hard to interrogate, easy to talk to.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A spiked black stone shaped like a heart." }],
    },
    {
      n: 4,
      name: "Imperative Mage",
      potion: "Clear bronze crystal liquid with a greyish-white layer on top.",
      main: ["Crystal of a Bronze Fiend", "Stone fang of a Masked Spirit"],
      sub: [
        "100 ml Masked Spirit blood",
        "10 g Bronze Fiend rust",
        "An original copy of your country's main law code",
        "10 drops mandrake extract",
      ],
      ritual:
        "Write a new law that differs from, but doesn't contradict, existing ones. Get it passed properly, and drink once ten thousand people have broken it and been punished.",
      powers: [
        {
          name: "Law",
          text: "Broad rules over an area for thirty seconds to fifteen minutes, the broader the shorter. 'Mysticism fades, reality strengthens' cripples every Beyonder power nearby, including the Mage's, which makes it a key weapon for ordinary armies. The reverse works too. Laws can also let the Mage float or slow bullets and shells.",
        },
        {
          name: "Reading rank",
          text: "Tells ordinary people from Beyonders, and judges a Beyonder's Sequence by their place in the order.",
        },
        {
          name: "Contracts of order",
          text: "Pacts bound by the world's own rules, not a god's witness, that become limits on body and spirit.",
        },
        {
          name: "Judgments",
          text: "Strip a power, a loose left fist to imprison, stun in awe, exile into the void, or a falling right fist to execute.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A bronze prism with faint grey-white patches." }],
    },
    {
      n: 3,
      name: "Chaos Hunter",
      potion: "Bronze, with mercury-silver letters twisting together into columns.",
      main: ["Palm of a Bronze Elf", "Tongue of a Nature Guardian, a golden ape that keeps its land's natural order"],
      sub: [
        "120 ml Nature Guardian blood",
        "10 Bronze Elf hairs",
        "Part of a demigod you hunted yourself",
        "30 g shavings from a gallows that hanged at least a thousand criminals",
      ],
      ritual:
        "Settle a mystical incident of at least angel-level power by yourself and restore order. The less lost in lives and property, the better.",
      powers: [
        {
          name: "Sword of Judgment",
          text: "A verdict on a chaotic being that can't be dodged. The more something breaks the order, the harder it hits, and the Hunter can ride the world's order to appear right in front of it.",
        },
        {
          name: "Tracking disorder",
          text: "Senses, locks onto and follows chaos, and calms disorder in the surroundings quickly.",
        },
        {
          name: "Wider reach",
          text: "Divides the battlefield into balanced zones for a while, strips many more powers, and claims a whole city as jurisdiction, crossing familiar ground almost instantly.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A fist-sized bronze cube inscribed with mystical symbols." }],
    },
    {
      n: 2,
      name: "Balancer",
      potion: "Half black and half bronze, in perfect symmetry.",
      main: ["A characteristic of a God of Law, an Isle-Bearing Turtle or a Balancer"],
      sub: [
        "150 ml blood of a matching angel or subordinate god",
        "An object that does nothing but praise the sun",
        "A breath of the soul's abyss that tempts towards depravity",
        "150 g contaminant from a Duke of Entropy or similar",
      ],
      ritual:
        "End the strife on a continent and leave its factions balanced for at least a century. You needn't rule, but you must play a major part.",
      powers: [
        {
          name: "Balance",
          text: "Splits a battle into separate, evenly matched fights that angels and Saints can't cross into until their own fight ends. Anyone tipping a side too far is benched for ten seconds to two minutes.",
        },
        {
          name: "Fifty-fifty",
          text: "In a duel, drags the enemy's strength up or down to match its own for up to a minute, less against stronger foes. Even against a true god it holds even for three seconds.",
        },
        {
          name: "Sensing imbalance",
          text: "Finds hidden things by the imbalance they cause. Laws can now define a whole environment, layering many bans and boosts.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A black-and-yellow turtle shell cracked in strange patterns." }],
    },
    {
      n: 1,
      name: "Hand of Order",
      potion: "Pure, clear bronze without a single flaw.",
      main: ["A Hand of Order characteristic"],
      sub: [
        "A law code in force unchanged for over three hundred years",
        "9,000 portions of blood from people who broke order (fewer if they're important)",
        "Nine abolished, unnatural decrees",
        "100 g contaminant from a fallen true god",
      ],
      ritual:
        "Found a country of at least ten million, or take over one of fifty million, and make your will its order through a strict system of rules. More Beyonders lowers the number, never below a million.",
      powers: [
        {
          name: "Order Proxy",
          text: "Lays down new non-fundamental rules over a battlefield, all enemies, a city or a small country. Edits or suspends existing rules, though not permanently. Freezes chaotic anomalies in place and feels every shift in order.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A clenched bronze fist with sharp knuckles." }],
    },
    {
      n: 0,
      name: "Justiciar",
      potion: "A ghostly globe of a world held up by countless huge bronze pillars.",
      main: ["The Justiciar Uniqueness", "Three Hand of Order characteristics"],
      sub: ["A pocket dimension whose every rule has been replaced by your order"],
      ritual:
        "Judge a grave matter involving a true god fairly, by the rules you yourself set, make sure the verdict is carried out, then drink.",
      powers: [
        {
          name: "Order",
          text: "Edits the world's basic rules a little and writes permanent new ones over a country, a planet or a star system. It can remove existing rules and exempt chosen people from them.",
        },
        {
          name: "Judgment",
          text: "Anyone who breaks order can be judged, near or far, with the whole world's will and power behind the verdict.",
        },
        {
          name: "Balance",
          text: "Forces balance even between abstract things, such as reason and madness, for up to three minutes.",
        },
        { name: "Disorder", text: "Can bring back chaos, quiet it or wipe it out. Order can also create disorder." },
      ],
      notes: [
        { label: "Uniqueness", text: "A book made of bronze." },
        { label: "Mythical form", text: "A colossal bronze pillar engraved with rules." },
        { label: "Divine kingdom", text: "The Ancient Court of Judgment, or Law Heaven." },
      ],
    },
  ],
};

export default pathway;
