import type { PathwayDetail } from "../../types";

/** Black Emperor / Lawyer. Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "lawyer",
  sequences: [
    {
      n: 9,
      name: "Lawyer",
      potion: "Sticky black liquid that stains even the air around it.",
      main: ["One Wisdom Fruit", "Tongue of a Maze Parrot"],
      sub: ["90 ml Maze Parrot blood", "One black olive", "9 drops cypress bark oil", "One white jasmine"],
      acting: ["Spot the gaps in the rules and use them. Lead people where you want them to go."],
      powers: [
        {
          name: "Silver tongue",
          text: "Sharp speaking and reasoning that bend or steer a listener's thoughts until the Lawyer feels familiar and trustworthy.",
        },
        {
          name: "Loopholes",
          text: "Finds the cracks in rules and the weak spots in opponents, then wins by turning order itself against them.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A black, fruit-like object sprouting three strange tongues." }],
    },
    {
      n: 8,
      name: "Barbarian",
      potion: "See-through black, with tiny guts and tongues floating in it.",
      main: ["Grass of Madness", "Horn crystal of a Land Rhinoceros"],
      sub: ["One deep-grained walnut", "One Fragrance Hornet Grass", "10 ml poplar bark soak", "100 ml liquor"],
      powers: [
        {
          name: "Force",
          text: "Huge strength, a powerful frame and great stamina. When the law can't solve it, fists will.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A crystal horn covered in short black hairs." }],
    },
    {
      n: 7,
      name: "Briber",
      potion: "Black, fizzy and refreshing-looking, almost inviting.",
      main: ["One Weeping Infant Flower", "A Strange-Faced Cannabis crystal"],
      sub: [
        "80 ml red wine",
        "5 drops golden jimsonweed juice",
        "5 drops black thornapple juice",
        "4 drops Fantasy Grass oil",
      ],
      powers: [
        {
          name: "Bribe",
          text: "Works through a real gift or a symbolic gesture, in four forms. Weaken: the target's attack, defence and control drop for a while. Charm: they feel such fondness they don't want to fight, and very rarely turn on their friends. Hubris: they grow proud and careless and misjudge. Connection: it forges a link between giver and receiver.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A black flower with a deathly white face pushing out of it." }],
    },
    {
      n: 6,
      name: "Baron of Corruption",
      potion: "Pale, see-through black, sweet-smelling and alluring, glittering with crystal specks.",
      main: ["Nose of a Human-Faced Baboon", "One Corpse Flower"],
      sub: ["60 ml Human-Faced Baboon blood", "10 drops ambergris perfume", "60 ml fruit liquor", "10 g lead powder"],
      powers: [
        {
          name: "Distortion",
          text: "Looks like following the rules, but really bends them. Twists a target's words, actions and intent into an order that favours the Baron, and can even turn an attack aside or onto someone else.",
        },
        {
          name: "Corrosion",
          text: "Within ten metres, hearts turn dark and greedy and choices turn foolish. The body grows tougher still.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A swollen, rotting black organ from a body's surface, often a nose." }],
    },
    {
      n: 5,
      name: "Mentor of Disorder",
      potion: "Pitch-black, whirling and heaving, swelling and shrinking on its own.",
      main: ["A Sprite Spark with its own mind", "Head of a Son of Forest, a near-black baboon with crown-like horns"],
      sub: [
        "100 ml Son of Forest blood",
        "7 drops cedar extract",
        "An ear from someone who has betrayed at least twice",
        "One frangipani",
      ],
      ritual:
        "Take control of a city's underworld and push its crime rate past ten times normal, keeping it there for at least three months.",
      powers: [
        {
          name: "Presence",
          text: "Greater dignity and a tougher body. People nearby lower themselves before the Mentor without noticing.",
        },
        {
          name: "Disorder",
          text: "Attacks struggle to land, enemies 'choose' wrong, and even the sense of distance stops making sense.",
        },
        {
          name: "Shared harm",
          text: "Distortion now bends the concepts of self and target, so both split the damage, curses and illnesses either one receives.",
        },
      ],
      notes: [
        {
          label: "Characteristic",
          text: "A see-through black fist, clenched tight, ordinary in every line yet full of a sinister charm, madness and chaos.",
        },
      ],
    },
    {
      n: 4,
      name: "Earl of the Fallen",
      potion: "Black, with a half-solid eye at its centre always oozing pus.",
      main: ["Eye of a Forest Giant Fiend, a four-armed black baboon", "Tongue of a humanoid Felid Specter"],
      sub: [
        "150 ml Forest Giant Fiend blood",
        "3 Felid Specter claws",
        "10 drops camellia oil",
        "13 hairs from a depraved person",
      ],
      ritual:
        "Become a mid-to-high official of a nation, corrupt seven peers into a ring of shared interests, and push through a national policy that helps you and hurts the people.",
      powers: [
        {
          name: "Domain of rules",
          text: "Everything runs on rules, and every rule has a gap. The Earl marks out an area where they can change, boost and use rules to make a battlefield that favours them, sometimes reaching what only the Justiciar pathway should.",
        },
        {
          name: "Gift",
          text: "Hands a target unwanted side effects: sluggishness, recklessness, greed or a lost will to fight, until they can think of nothing but money.",
        },
        {
          name: "Exploit",
          text: "Stretches or cuts short a state. Stretching the moment after a jump, for example, means floating.",
        },
        {
          name: "Magnify",
          text: "Blows one action up: a normal strike becomes an execution, a hug from afar becomes a bind. One at a time. It can also swell a mystical item's drawbacks.",
        },
        {
          name: "Stronger disorder and distortion",
          text: "Buildings crumble, distances shrink to a few steps, attacks miss, lethal blows become merely serious, and a fleeing foe charges back instead.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A fist-sized, very sticky black figure with eyes, mouth and tongue." }],
    },
    {
      n: 3,
      name: "Frenzied Mage",
      potion: "Red magma split into three unequal parts by black slime.",
      main: ["Heart of a Black Mountain Sovereign, a huge six-armed baboon", "Tail of a Wild Ape"],
      sub: [
        "200 ml Black Mountain Sovereign blood",
        "4 Wild Ape teeth",
        "15 g gold",
        "Nine face skins of people killed by ritual mutation",
      ],
      ritual:
        "Pick three rituals of at least angel-level power, rewrite their key wording on pure instinct, beyond what you understand, perform all three, and live.",
      powers: [
        {
          name: "Hierarchy",
          text: "Rank, title and strength are power, now solid enough to wield as a weapon. The Mage's voice makes lesser beings tremble and obey without being able to lift their heads.",
        },
        {
          name: "Disorder",
          text: "Waves of madness randomly change everyone's powers, usually for the better for the Mage and the worse for foes. Not even the Mage knows exactly what will happen.",
        },
        {
          name: "Greater distortion",
          text: "Bends the path of artillery shells, and twists a charging enemy's will so they can't stop.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A cracked black heart with magma-like blood boiling deep inside." }],
    },
    {
      n: 2,
      name: "Duke of Entropy",
      potion: "Clear, with black words and symbols woven into a crown inside.",
      main: ["A Duke of Entropy characteristic, or one of Solomon's knuckles"],
      sub: [
        "110 ml Duke of Entropy blood",
        "A real, valid martial law decree of a kingdom or empire",
        "140 g of contaminant from a Balancer or similar",
        "One glowing gemstone",
      ],
      ritual:
        "Make a country of at least ten million rot from within and slowly fall apart with no direct outside push. More and stronger Beyonders in the country means fewer people needed.",
      powers: [
        {
          name: "Entropy",
          text: "The longer anyone fights the Duke, the more random and chaotic their powers, thoughts and condition get, until everything falls apart into a strange stillness. It works on enemies, surroundings and rules alike.",
        },
        {
          name: "Exploit, unbound",
          text: "Rules stretched far enough to jump from the ground to the crimson moon.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A strange badge of woven black hair that feels like metal." }],
    },
    {
      n: 1,
      name: "Prince of Abolition",
      potion: "See-through black, reflecting a twisted, brass-coloured figure.",
      main: ["A Prince of Abolition characteristic"],
      sub: [
        "130 ml blood of a real king or emperor",
        "An original copy of an empire's laws",
        "Corpse fluid of a true god who fell through betrayal",
        "Money you issued yourself that circulates widely",
      ],
      ritual:
        "In an empire where you aren't the strongest, quietly swap part of its order for yours and keep it that way for three years.",
      powers: [
        {
          name: "Definition and distortion",
          text: "Redefines words to bend order its way: who is the original and who the copy, what counts as a bribe, who is corrupt. The original instantly becomes the substitute, or an innocent act becomes a bribe, and the rules, short of the most basic ones, twist to match.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A see-through black sceptre in nine sections." }],
    },
    {
      n: 0,
      name: "Black Emperor",
      potion: "The reflection of a world falling apart.",
      main: ["The Black Emperor Uniqueness", "Three Prince of Abolition characteristics"],
      sub: ["A pocket dimension where order has completely collapsed"],
      ritual:
        "Rule your own country, with your name known everywhere as Emperor. Impose strict, bizarre rules down to the architecture. Have your people secretly build nine pyramid-like tombs, enter one, and drink while most of your citizens hold matching rites in cities across the land.",
      powers: [
        {
          name: "Dictator",
          text: "The shadow of order. Distortion, exploitation, definition and hierarchy all serve the Emperor through order's loopholes and twisted intentions. Death is the deepest rule of reality, which is why the Black Emperor can come back to life.",
        },
        {
          name: "Disorder",
          text: "No longer just living off order, it throws order and rules themselves into chaos, and can build a whole new order fit for humans in lifeless wastes. The Justiciar does this by rewriting the deep rules, the Black Emperor by twisting them.",
        },
      ],
      notes: [
        { label: "Uniqueness", text: "A crown set with many sombre gems." },
        { label: "Mythical form", text: "A giant nine-armed black baboon wearing a sombre crown." },
        { label: "Divine kingdom", text: "The Hell of Order, or the Heaven of False Law." },
      ],
    },
  ],
};

export default pathway;
