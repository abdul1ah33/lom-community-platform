import type { PathwayDetail } from "../../types";

/** Door / Apprentice. Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "apprentice",
  sequences: [
    {
      n: 9,
      name: "Apprentice",
      potion: "Dark and thick, like the most old-fashioned herbal medicine.",
      main: ["One Gem-Devouring Insect", "One Illusion Crystal"],
      sub: [
        "10 drops Goat's Beard hydrosol",
        "90 ml ancient well water",
        "Any flower grown out of a corpse",
        "5 g soil tainted by Spirit World creatures",
      ],
      acting: ["You're still learning. Study hard, never show off, and remember how small your power still is."],
      powers: [
        {
          name: "Door Opening",
          text: "This is where every mage starts, on a road that is all about freedom. Walls and doors don't stop an Apprentice, as long as no Beyonder power holds them back and the barrier is something an ordinary person would still call a wall. A mountain doesn't count.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A yellow-black stone shaped like a key." }],
    },
    {
      n: 8,
      name: "Trickmaster",
      potion: "Loud and colourful, like a poisonous mushroom turned to liquid.",
      main: ["Stomach pouch of a Spirit Eater", "20 ml Deep Sea Marlin blood"],
      sub: ["80 ml pure water", "5 ml hornbeam oil", "10 g String Grass powder", "One blooming Red Chestnut flower"],
      powers: [
        {
          name: "A circus of small spells",
          text: "More stage show than battle magic: a flash many times brighter than an old camera's, a curtain of total darkness, a booming noise out of nowhere, fifteen metres of fog, a gale-force gust and fingertip sparks that light things within three metres.",
        },
        {
          name: "Ice and lightning",
          text: "Frost by touch, or a ray as fast as an arrow out to ten metres. A shock that has to pass through a conductor, about as strong as a household jolt.",
        },
        { name: "Gas transfer", text: "Moves poisonous gas away, or towards a target, within fifteen metres." },
        {
          name: "Slips and strings",
          text: "Makes a five-metre patch feel greased, or one person's feet slide out from under them. Can also jiggle and toss objects within five metres.",
        },
        { name: "Escape trick", text: "Draw the eye with a flash, a bang or a curtain, then vanish." },
      ],
      notes: [{ label: "Characteristic", text: "A clear crystal that throws rainbows." }],
    },
    {
      n: 7,
      name: "Astrologer",
      potion: "Crystal clear and almost solid.",
      main: ["A meteorite crystal", "Blood crystal of a Lavos Squid"],
      sub: ["10 g clematis powder", "A withered length of grapevine", "A pair of octopus eyes", "80 ml strong liquor"],
      powers: [
        {
          name: "Intuition",
          text: "Strong spiritual intuition that warns of danger and can be asked direct questions. Can also jam other people's divination and intuition.",
        },
        { name: "Astromancy", text: "Reads the future in a crystal ball." },
      ],
      notes: [{ label: "Characteristic", text: "A 'diamond' about the size of an eye." }],
    },
    {
      n: 6,
      name: "Scribe",
      potion: "Clear and nearly solid.",
      main: ["One whole Brain of Asmann", "A cursed artifact of an Ancient Wraith"],
      sub: [
        "Three diary pages more than twenty-two years old",
        "10 ml mercury",
        "10 drops honeysuckle oil",
        "30 ml each of seawater, lake water and glacier water",
      ],
      powers: [{ name: "Record", text: "Writes down other Beyonders' powers and uses them once later." }],
      notes: [
        { label: "Characteristic", text: "Unreal-looking eyes with grey-white patterns, flecked with starlight." },
      ],
    },
    {
      n: 5,
      name: "Traveler",
      potion: "Pale and see-through like half-melted snow, with green bubbles now and then.",
      main: ["One Siskun Demon Worm", "Heart of a Shadowless Demonic Wolf"],
      sub: [
        "10 g powder from a trapped ghost's remains",
        "10 g lemon balm powder",
        "A star map drawn in spirit blood",
        "80 ml Shadowless Demonic Wolf blood",
      ],
      ritual: "Set special markers in four very different places far apart in the depths of the Spirit World.",
      powers: [
        {
          name: "Traveler's Door",
          text: "Cuts through the Spirit World while still sensing the world outside and knowing exactly where they are. They're only as good a navigator as the person using the door, though.",
        },
        {
          name: "Blink",
          text: "Short hops over and over, as if a single Traveler had surrounded you. It costs more spirituality than a long jump.",
        },
        { name: "Invisible Hand", text: "Grabs things from a distance." },
        {
          name: "Deeper records",
          text: "Can store four demigod-level powers, which then work at close to Sequence 4 strength.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A crystal so clear it almost isn't there." }],
    },
    {
      n: 4,
      name: "Secrets Sorcerer",
      potion: "Layers of rippling starlight, as if the Milky Way had been poured into a flask.",
      main: ["Eye of a Golden Phoenix, or a Siskun Demon Worm leader"],
      sub: [
        "A Siskun Demon Worm nest",
        "Ashes from Ankh's Gate",
        "One walnut",
        "100 ml lake water that has just reflected the stars",
      ],
      ritual: "Seal a hostile demigod-level creature. The less outside help you use, the better.",
      powers: [
        {
          name: "Secrets",
          text: "Keeps secrets and blocks sensing. By breaking a crystal ball, the Sorcerer can turn into a secret and throw off mystical tracking. Mirror worlds and painted worlds belong to this power too.",
        },
        {
          name: "Hidden space",
          text: "Folds a patch of space in two and hides one half. The only ways out are through a door or by lifting the fold. Handy as a pocket dimension.",
        },
        {
          name: "Doors as a body",
          text: "Turns into a string of ghostly doors and steps out behind one, so attacks land in a different world from the one the Sorcerer stands in.",
        },
        {
          name: "Exile",
          text: "Throws a target through a ghostly door into the turbulence of space and time. Each door leads somewhere different, some dangerous, some useful. At this level the exile lasts twenty seconds before the target comes back the same way.",
        },
        {
          name: "Afterimage blink",
          text: "Moves so fast an afterimage stays behind, and casts faster while blinking. Records can now hold powers up to Archangel level.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A crystal ball made of worms coiled around each other." }],
    },
    {
      n: 3,
      name: "Wanderer",
      potion: "Deep black, scattered with countless glittering specks.",
      main: ["A Wandering Skin", "Crystal left by a Mist Watcher"],
      sub: [
        "10 ml Wandering Skin pus",
        "Eyelids of a Mist Watcher",
        "9 white mustard seeds",
        "90 ml star water from the ritual site",
      ],
      ritual:
        "Find three kinds of starlight information cast into the Spirit World, enter the dangerous scenes they create, and record every one of them so completely you can never forget.",
      powers: [
        {
          name: "Wandering",
          text: "The Spirit World can no longer hold them. They can walk out into the cosmos, cross the astral world and visit other planets, blending into strange skies and alien spaces.",
        },
        { name: "Space prison", text: "Hidden space now works as a short-term seal." },
        { name: "Doors everywhere", text: "Very few powers can stop a Wanderer's Door Opening." },
        { name: "Space tearing", text: "Rips a dangerous crack into the void. Needs touch." },
      ],
      notes: [{ label: "Characteristic", text: "A tiny door made of starlight." }],
    },
    {
      n: 2,
      name: "Planeswalker",
      potion: "Colourless and built entirely out of ghostly doors.",
      main: ["Active Void", "Brain of an Interdimension Hunter, or eyes of a Purple Phoenix"],
      sub: ["One Worm of Time", "One Worm of Star", "One Worm of Spirit"],
      ritual: "Leave legends in nine places beyond this planet.",
      powers: [
        {
          name: "Teleportation",
          text: "A first, smaller grip on the authority of space. Opens doors straight to any destination and can be in several places at once.",
        },
        {
          name: "Re-enactment",
          text: "Records places, people and powers. Can carry everyone nearby into a recorded place, as long as it still exists, or drop that place around a target. Recorded people strike once, and copied high-level powers fall well short of the real thing.",
        },
        {
          name: "Symbolization",
          text: "Becomes a living symbol to travel the astral world to other planets and worlds.",
        },
        {
          name: "Dimension sight",
          text: "Shrinks objects or whole places, up to the size of a city, into tiny storable models.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A seed of fire that burns quietly and brightly." }],
    },
    {
      n: 1,
      name: "Key of Stars",
      potion: "Deep and lightless, yet it pulls in starlight.",
      main: ["A Key of Stars characteristic, or Gregrace's left claw"],
      sub: [
        "The core of a wandering asteroid",
        "Your own favourite food or drink",
        "A compass or similar object tied to the astral world",
      ],
      ritual:
        "Find a heavy, spinning planet that sends out signals. Land on it and build a strong enough mystical bond with it.",
      powers: [
        {
          name: "Position",
          text: "The Key never loses track of where it is, and can make enemies lose theirs. This reaches beyond space alone.",
        },
        {
          name: "Space-time maze",
          text: "To the Key, time is space and space is time. It builds mazes where time is scrambled or space loops back on itself.",
        },
        {
          name: "Space shattering",
          text: "Uses the weight of stars to bend and break space, which some call gravity control. The Key also gains a first grip on Sealing, and every older power grows stronger.",
        },
      ],
      notes: [{ label: "Characteristic", text: "An oddly shaped key you can half see through." }],
    },
    {
      n: 0,
      name: "Door",
      potion: "A sphere of liquid that seems to hide one world behind another.",
      main: ["The Door Uniqueness", "Three Key of Stars characteristics"],
      sub: ["Mastery of the astronomy, geography and folklore of at least three river civilisations"],
      ritual: "Escape a true god's seal or exile.",
      powers: [
        {
          name: "The concept of Door",
          text: "Opens or shuts anything in the world that counts as a door, breaking or strengthening seals for a time.",
        },
        {
          name: "Space",
          text: "Raises prisons out of nothing. Can make space fall apart so a target is swallowed by darkness along with the void around it, which is enough to end a planet in one blow. Goes anywhere in an instant and opens new spaces of its own, such as a special mirror world.",
        },
        {
          name: "Sealing",
          text: "Seals made of space, time and mazes. Can lock away stars, and even hold a Great Old One for a moment if it doesn't resist. Almost nothing can trap Door in return.",
        },
        { name: "Omnipresence", text: "Blink taken to its limit: being everywhere at once." },
        {
          name: "Conceptualisation",
          text: "Twists into a gate of starlight, more symbol than body: wandering, astral roads, keys and doors.",
        },
      ],
      notes: [
        {
          label: "Uniqueness",
          text: "Two eyes that seem made of pure starlight, holding layer after layer of ghostly doors.",
        },
        { label: "Mythical form", text: "Worm of Spirit." },
      ],
    },
  ],
};

export default pathway;
