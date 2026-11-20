import type { PathwayDetail } from "../../types";

/** Error / Marauder. Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "marauder",
  sequences: [
    {
      n: 9,
      name: "Marauder",
      potion: "Deep blue-black and bitter.",
      main: ["One Blood-Speckled Black Mosquito", "Core of a Candle Devourer"],
      sub: [
        "100 ml of someone else's blood",
        "Nail clippings from nine different people",
        "One sapphire",
        "10 g verbena powder",
      ],
      powers: [
        {
          name: "Steal",
          text: "Lifts things out of pockets without anyone noticing. They steal less for gain than as if carrying out a duty.",
        },
        {
          name: "Nimble hands",
          text: "Steady, flexible wrists and fingers, and a real gift with daggers and short swords. The body gets a little tougher too.",
        },
        {
          name: "Eye for value",
          text: "Senses anything valuable within ten metres without knowing exactly what it is.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A black severed finger you can half see through." }],
    },
    {
      n: 8,
      name: "Swindler",
      potion: "Dreamy and full of red bubbles. Tastes fresh and sweet, then hurts unbearably.",
      main: ["One Human-Faced Pitcher Plant", "A larva from a Disoriented Insect Colony"],
      sub: ["100 ml pure water", "20 ml of someone else's tears", "One lapis lazuli", "10 g white chestnut balm"],
      acting: ["Enjoy fooling people."],
      powers: [
        {
          name: "Reading people",
          text: "Picks up tiny expressions and movements, which is enough to tell how a mark is feeling.",
        },
        {
          name: "Charm and a silver tongue",
          text: "Easy to like and easy to believe. The words carry a touch of the supernatural, so people stay convinced.",
        },
        {
          name: "Misdirection",
          text: "Points thoughts the wrong way with words, gestures, poses or how a room is set up. A skilled Swindler hardly needs the power for it.",
        },
        { name: "Mental disruption", text: "Brings on brief hallucinations. Speed and agility also rise sharply." },
      ],
      notes: [{ label: "Characteristic", text: "A pair of clear red lips." }],
    },
    {
      n: 7,
      name: "Cryptologist",
      potion: "Like a cup of mist with crystal light inside. Drinking it feels like your brain is being peeled.",
      main: ["Brain of a Sphinx", "An adult worm from a Disoriented Insect Colony"],
      sub: [
        "80 ml Sphinx blood",
        "10 drops of the colony's mucus",
        "One moonstone",
        "One wild rose",
        "A cipher of your own design, written on paper",
      ],
      powers: [
        {
          name: "Decryption",
          text: "Mystical knowledge, sharp intuition and strong reasoning working together. The Cryptologist rebuilds what really happened from clues, predicts how things will unfold, reads dreams and illusions, and can track an enemy down by analysis alone. It isn't prophecy: without enough clues there is nothing to work from.",
        },
        { name: "Eye for traces", text: "Observation now picks up faint clues and tracks." },
      ],
      notes: [{ label: "Characteristic", text: "A colourless crystal that gives off mist." }],
    },
    {
      n: 6,
      name: "Prometheus",
      potion: "Red-gold and tempting, with flames swirling inside, like drinking real fire.",
      main: ["One Crystal Threadworm", "The attachment of a Cloaked Specter"],
      sub: [
        "100 ml freshly stolen fine wine",
        "10 g Cloaked Specter remains",
        "One topaz",
        "10 drops larch oil",
        "Tinder",
      ],
      powers: [
        {
          name: "Stealing powers",
          text: "Takes one Beyonder power from someone within fifty metres. Knowing the target makes choosing easier. Otherwise it's down to luck, picking among coloured lights. Stronger Sequences resist more often. For ten minutes the victim loses the power and the thief uses it well, and the victim gets it back the next day. Even the madness inside a mystical item can be stolen, though that's risky.",
        },
        {
          name: "Long-range pickpocket",
          text: "Swipes objects from fifty metres away, or slips something dangerous into a target's hand.",
        },
        {
          name: "Treasure sense",
          text: "Feels every valuable within fifty metres, roughly what it's worth and what it might be. Only real concealment hides anything from this nose.",
        },
        { name: "Hardened", text: "Stronger body, more power and speed, and better resistance to mental corruption." },
      ],
      notes: [{ label: "Characteristic", text: "A small crystal torch that has never been lit." }],
    },
    {
      n: 5,
      name: "Dream Stealer",
      potion: "Deep and dark, as if it could tie up every thought. Drinking it feels like suffocating.",
      main: ["Heart of a Dream-Eating Rat", "Spirit of a Fallen Breath"],
      sub: [
        "30 ml Dream-Eating Rat blood",
        "30 ml de-spiritualised Fallen Breath",
        "One azurite",
        "10 drops lavender extract",
        "50 ml tears cried over broken dreams",
      ],
      ritual:
        "Be a key supporting character or the main villain in the dreams of at least thirty sleeping people, all dreaming at the moment you drink.",
      powers: [
        {
          name: "Stealing dreams",
          text: "Steals ideals, dreams and memories, and can keep or pass on stolen dreams without ever entering one. Can snatch the thought someone is about to act on and leave them blank for a moment, but at this level has to act it out personally.",
        },
        {
          name: "Longer reach",
          text: "The range grows to eighty metres. A stolen power works for half an hour in one go, or can be kept for a week, and the victim can't use it until then.",
        },
        {
          name: "Theft of providence",
          text: "Poses as another god's follower to slip past defences, steal answers to prayers and make charms. The cleverer the god, the more likely it fails.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A small, pale, darkened palm, like a baby's." }],
    },
    {
      n: 4,
      name: "Parasite",
      potion:
        "Yellow-green, as if squeezed from worms, with bits of them still floating in it. It feels like your soul is being taken over and your skin peeled off layer by layer. If you fail and survive, you become the potion's host.",
      main: ["The crystal a Soul Snatcher leaves when it dies", "One Parasitic Larva"],
      sub: [
        "100 ml Soul Snatcher blood",
        "9 drops of larva secretion",
        "One amethyst",
        "10 drops cherry plum juice",
        "One imprisoned soul",
      ],
      ritual: "Make someone willingly give you everything they have. Do it nine times.",
      powers: [
        {
          name: "Parasitism",
          text: "Plants a piece of itself inside a host. It's theft grown up: stealing life itself. In a shallow host the Parasite hides, heals and extends its life through someone else's senses, without touching their thoughts. A deep host is fully controlled, mind and body, and can become an avatar. The higher the Sequence, the more hosts at once.",
        },
        {
          name: "Weak spot",
          text: "Friends can still warn a shallow host through dreams. A deep host can only be freed by what they pray to, if they don't know it's coming.",
        },
        {
          name: "Stealing concepts",
          text: "Steals ideas such as position or distance, and keeps what it steals for later. Takes up to three powers from one target and picks them fairly precisely, holding each for two hours.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A diamond with clear worms burrowing through it." }],
    },
    {
      n: 3,
      name: "Mentor of Deceit",
      potion: "Jade green and crystal clear, cool as a summer drink, and it breaks body and soul if you aren't ready.",
      main: ["Both hands of a Swamp Giant", "Core of a Blasphemous Priest"],
      sub: [
        "80 ml Swamp Giant blood",
        "20 g Blasphemous Priest fungus shroud",
        "30 g gold",
        "10 drops water violet extract",
        "Nine wraiths who died because of your lies",
      ],
      ritual:
        "Without violence, find loopholes in the rules and use them to bring down order across an area at least the size of a village.",
      powers: [
        {
          name: "Deceit",
          text: "Leads enemies into wrong judgements and can even cheat the rules of nature. This is the first taste of the authority of deception.",
        },
        {
          name: "Triple theft",
          text: "Steals three powers in one move, and borrows other gods' blessings mid-fight through chants or preparation.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A colourless curtain woven from worms." }],
    },
    {
      n: 2,
      name: "Trojan Horse of Destiny",
      potion:
        "Mercury-coloured, full of linked symbols that form worm-shaped ghosts. It tastes of everything and feels like drowning in the River of Fate.",
      main: [
        "The crystal of a dead Court Priest of the Giant King's Court, the vertical eye of the King of Soul Snatchers, or another Trojan Horse's characteristic",
      ],
      sub: [
        "One Worm of Star",
        "100 ml water from the River of Ancient",
        "One Worm of Spirit",
        "A stack of false history that people believe",
      ],
      ritual:
        "Become someone else by plain disguise and lies alone. Win the trust of everyone in that person's life and keep it up until that identity dies naturally. The higher the person's status, the shorter the time needed, half a year at the least. A target who was already about to die doesn't count.",
      powers: [
        {
          name: "Fate's loopholes",
          text: "Part of the authorities of fate and theft. Edits someone's fate so they make particular mistakes. Learns from an avatar's death where a disturbance in fate came from.",
        },
        {
          name: "Grafting fate",
          text: "Swaps the Trojan Horse's near future with a target's, steps into other people's identities, and leaves its victims cut off from the world until they fade away.",
        },
        {
          name: "Grand theft",
          text: "Fate, identity, self-awareness and even Beyonder characteristics can be stolen. Six powers at once, held for a week. Can also live inside mystical items that have a will of their own, which cuts down their side effects.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A mirror-faceted crystal showing a different picture on every face." }],
    },
    {
      n: 1,
      name: "Worm of Time",
      potion: "Shimmering, bluish-black and tasteless. Afterwards, time scours and cuts the drinker.",
      main: ["A Worm of Time characteristic, or Aurmir's right eye"],
      sub: ["One ancient clock", "One used almanac", "A hidden thread of fate"],
      ritual: "Throw a city into temporal chaos for at least seven days.",
      powers: [
        {
          name: "Time",
          text: "A weaker form of the King of Space-Time's authority over time. Summons a huge, weathered stone wall clock and shows the recent or distant past of a place as moving pictures.",
        },
        {
          name: "Stealing time",
          text: "Briefly steals time, anchors and even authorities. Slows or speeds things caught inside the effect, and can wear down how long a timed power lasts.",
        },
        {
          name: "Aging",
          text: "Steals years of life. It doesn't make anyone grow, only shortens how long they have left. The wrinkles are just what that looks like.",
        },
        {
          name: "Fallback self",
          text: "If the main body dies, a Sequence 2 avatar can take over its spirit, mind, fate, anchors and identity, and become the real one.",
        },
      ],
      notes: [
        {
          label: "Characteristic",
          text: "A pillar of light and shadow with twelve-segment worms racing inside. Everything around it seems frozen.",
        },
      ],
    },
    {
      n: 0,
      name: "Error",
      potion: "Flaky, built from countless segmented worms layered like scales.",
      main: ["The Error Uniqueness", "Three Worm of Time characteristics"],
      sub: ["Three beacons drawn from the River of Fate"],
      ritual: "At someone else's apotheosis, take their place.",
      powers: [
        {
          name: "Conditions of Error",
          text: "Error works when the stand-in resembles the target, the two are connected, something contains a contradiction, a rule has a flaw, or the god builds a whole kingdom of mistakes around the target.",
        },
        {
          name: "False for true",
          text: "Steals and copies the permissions of whatever it imitates, and slips attacks through openings it creates.",
        },
        {
          name: "Blurred self",
          text: "Avatar and main body stop being separate: if one escapes, so has the other, and hitting one hits both. It can split off two Sequence 1 avatars.",
        },
        {
          name: "Authorities",
          text: "Deceit, theft (whole authorities included), time and part of space, since time and space can't be fully pulled apart.",
        },
      ],
      notes: [
        { label: "Uniqueness", text: "Once a crystal monocle, now a pair of black gloves." },
        { label: "Mythical form", text: "Worm of Time." },
      ],
    },
  ],
};

export default pathway;
