import type { PathwayDetail } from "../../types";

/** Chained / Prisoner. Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "prisoner",
  sequences: [
    {
      n: 9,
      name: "Prisoner",
      potion: "Blood red under a skin of pitch-black film.",
      main: ["One Silence Stone", "Blood source of a Pseudo-Human"],
      sub: [
        "80 ml dirty water",
        "The substance that forms beside a Silence Stone",
        "10 Pseudo-Human hairs",
        "10 drops cedar oil",
      ],
      powers: [
        {
          name: "The repressed",
          text: "Not just someone behind bars, but anyone whose spirit and desires are locked down by reason, body and the world. Quiet outside, wild inside.",
        },
        {
          name: "Prison skills",
          text: "A strong body, sharp senses, plenty of criminal know-how, and a knack for killing with whatever is at hand.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A slowly writhing lump of blackened blood." }],
    },
    {
      n: 8,
      name: "Lunatic",
      potion: "Greyish-white with flashes bursting through it.",
      main: ["Brain of a Doppelganger", "Tongue of a Man-Eating Hound"],
      sub: [
        "100 ml of your own blood",
        "A Doppelganger's face skin",
        "13 drops of Man-Eating Hound saliva",
        "The whole peel of one orange, dried",
      ],
      powers: [
        {
          name: "Unleashed",
          text: "Gives up reason on purpose and lets desire loose for a boost to everything. The head gets foggy, but it also resists powers that tamper with the mind.",
        },
      ],
      notes: [
        { label: "Characteristic", text: "A grey-white ball of light like a tiny brain." },
        {
          label: "Curse",
          text: "Letting desire loose so often keeps the spirit low, so Lunatics lose control more easily than most.",
        },
      ],
    },
    {
      n: 7,
      name: "Werewolf",
      potion: "Black-green with short hairs and traces of blood floating in it.",
      main: ["A Werewolf fang"],
      sub: ["100 ml Werewolf blood", "10 Werewolf hairs", "A full set of human organs", "One cursed object"],
      powers: [
        {
          name: "The beast",
          text: "The first Mutant. Huge strength and speed, faster than a sprinting wolf, and healing so good that a belly wound can be rinsed, stuffed back and pinched shut. Transformed, the arms swell with grey fur and the claws and fangs turn poisonous, tearing thin steel.",
        },
        {
          name: "Dark spells",
          text: "Turns anyone poisoned long enough into short-lived werewolf puppets, deepens the dark to snuff out faint light, and seeps cold fear into a target's bones.",
        },
        { name: "Hidden face", text: "Divination only shows a figure covered in thick black fur." },
      ],
      notes: [
        { label: "Characteristic", text: "A black-green fang." },
        {
          label: "Curse",
          text: "When the crimson moon is full, reason slips, fur covers the body and bloodlust peaks. Give in too often and the heart turns cold and twisted.",
        },
      ],
    },
    {
      n: 6,
      name: "Zombie",
      potion: "Grey-white, cold and lifeless in a faint ice-blue mist.",
      main: ["A Zombie's heart"],
      sub: ["90 ml blood from a living person", "30 g Zombie flesh", "A Zombie's eye", "3 Moon Flowers"],
      powers: [
        {
          name: "Living corpse",
          text: "Steel-hard flesh that shrugs off bullets and even shells. A revolver to the head only dizzies it, and it takes five hits in the same spot to break through. Only head wounds are fatal. Fire, drowning and much magic don't bother it, though spiritual attacks do. Runs faster than a steam train.",
        },
        {
          name: "Death and decay",
          text: "Withers life around it, rots with a touch, makes sludge, raises corpses and commands specters. Strength enough to tear foes apart.",
        },
        {
          name: "Ice",
          text: "Spreads frost underfoot, calls freezing winds and snow, and stiffens flesh with a touch.",
        },
      ],
      notes: [
        { label: "Characteristic", text: "A grey-white heart with ice blue showing through." },
        {
          label: "Curse",
          text: "Hungers for warm blood and fresh flesh, worst under the full crimson moon. Resisting hurts too much to fight. Giving in erodes their humanity.",
        },
      ],
    },
    {
      n: 5,
      name: "Wraith",
      potion: "Clear, holding many ghostly mirrors that all reflect the same face in thick layered colours.",
      main: ["Consciousness crystal of a Wraith"],
      sub: [
        "10 g Wraith dust",
        "One mirror",
        "Nine souls of humans or creatures",
        "100 ml Wraith blood, or cold water a Wraith has tainted",
      ],
      ritual:
        "Enter the Spirit World, find the part of it that is you, seal it for at least three minutes, and drink before the seal breaks.",
      powers: [
        {
          name: "Shadow body",
          text: "Spirit and flesh as one: becomes a true shadow that walks through walls, hides in mirrors and strikes souls, invisible even to Spirit Vision below the high Sequences. Ordinary weapons can't touch it, even the head isn't a weak spot, and poison means nothing.",
        },
        {
          name: "Possession",
          text: "Takes over a target from a distance, the Wraith's shape showing in their eyes. Kill them that way and their characteristic comes out faster.",
        },
        {
          name: "Death spells",
          text: "Summons undead to pin a target stiff, shrieks to burst eardrums and wound spirits, and fires ice arrows.",
        },
        {
          name: "Mirror blink and Spirit World",
          text: "Leaps between reflections up to 300 metres and walks the Spirit World freely. Divination and intuition sharpen, and divining them shows only a faint, nearly invisible face.",
        },
      ],
      notes: [
        { label: "Characteristic", text: "A clear stone with a twisted face pushing out of it." },
        { label: "Curse", text: "On full crimson moon nights it must devour human souls or grow very weak." },
      ],
    },
    {
      n: 4,
      name: "Puppet",
      potion: "Half-real liquid with many pitch-black eyes open inside.",
      main: ["A Puppet's eye"],
      sub: [
        "90 ml blood of someone killed by a curse",
        "13 Puppet hairs",
        "Clothing or a common object of a Puppet",
        "Shackles of someone imprisoned until death",
      ],
      ritual:
        "Prepare a true mummy made from a dead demigod of this pathway, with organs purified, curses written, bandages wrapped and a year in a tomb. Possess it and drink.",
      powers: [
        {
          name: "Master of objects",
          text: "Moves every lifeless thing nearby, including what a target carries and soulless mystical items. Tougher than anything at its level, except against the Sun's holy spells.",
        },
        {
          name: "Source of curses",
          text: "Becomes a cursed doll or paper figure and curses through any link. Whatever hurts one hurts the other, the Puppet included for now.",
        },
        {
          name: "Performance",
          text: "Plays any earlier role, Prisoner to Wraith, at a weak demigod level, such as a Wraith that can possess objects.",
        },
        {
          name: "Objectification",
          text: "Turns itself into an object to lock down its own madness, defended only by prepared curses and puppets. Can do the same to a willing person by touch.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A pair of deep black eyes that reflect whoever is near." }],
    },
    {
      n: 3,
      name: "Disciple of Silence",
      potion: "Pale, with unreadable symbols, black eyes and bloody mouths spinning inside.",
      main: ["Throat of a Cursed Object"],
      sub: [
        "100 ml madness-tainted water",
        "Something a Cursed Object has cursed, even if dead",
        "A whole sheep or rabbit skin",
        "A statue of yourself with an anchor attached",
      ],
      ritual:
        "Found a cult of at least a thousand who read your glance, know your thoughts and speak your words for you. Higher-status followers mean fewer are needed.",
      powers: [
        {
          name: "Silence",
          text: "Possesses objects, and long silence breeds curses almost no one can resist.",
        },
        {
          name: "Transfiguration Curse",
          text: "A soundless scream turns a target into another creature for a while, stripping most of its traits and powers. It even catches a Demoness together with her mirror self, unless that self is cut off and hidden.",
        },
        {
          name: "One-way curses",
          text: "Hurting an enemy no longer hurts itself, and curses can now banish, freeze or put to sleep.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A pale, throat-like thing dripping black fluid streaked with blood." }],
    },
    {
      n: 2,
      name: "Ancient Bane",
      potion: "Ghastly white mist, every drop full of evil and madness.",
      main: ["A spirit cluster of an Ancient Bane"],
      sub: [
        "An object an Ancient Bane used often",
        "Nine ancient bones",
        "A vicious curse never fully lifted (older is better)",
        "A sculpture that means binding",
      ],
      ritual: "Find an ancient, uncanny object strong enough to hold an angel's power.",
      powers: [
        {
          name: "Eternal transformation",
          text: "Anything reflected in its eyes becomes a true animal, almost indefinitely, until an equal resists or the right cure is found. Body parts left behind can't be restored.",
        },
        {
          name: "Living curse",
          text: "In mythical form it becomes its anchor, every pattern on it a curse that strikes whoever sees it and warps the land around. With core information it curses from afar through dolls, even to sudden death.",
        },
        {
          name: "Bane",
          text: "Even in normal form, being near it or just seeing it can bring evil thoughts, a warped worldview, exploding desire or instant madness.",
        },
        {
          name: "Dwelling place",
          text: "It needs a home that binds it, which is also the surest way to find and destroy its anchor.",
        },
      ],
      notes: [
        { label: "Characteristic", text: "A head-sized cloud of ghastly white mist flecked with blood and black." },
      ],
    },
    {
      n: 1,
      name: "Abomination",
      potion: "A sickening ball of pitch-black slime.",
      main: ["An Abomination characteristic"],
      sub: [
        "Nine kinds of curse taint left by an Abomination",
        "The corpse of a true Child of God",
        "900 ml blood from Beyonders who died young",
        "Something from a shattered or fallen divine kingdom",
      ],
      ritual:
        "Receive a real blessing from a true god, or at least a King of Angels with a Uniqueness. The one blessing you is maddened by curses during the ritual, so it's very dangerous for them.",
      powers: [
        {
          name: "Aberration",
          text: "A howl that stabs the spirit, freezing and blanking the mind. Silent curses harden spirituality so the body becomes a cage for the soul, and stir the surroundings into layered barriers or black sludge that blurs reality and the Spirit World.",
        },
        {
          name: "Mutant puppets",
          text: "Curses turn nearby creatures into werewolves, zombies, Puppets and more, briefly, before madness rots them.",
        },
        {
          name: "Abomination",
          text: "A wave of evil and madness that cracks the ground and infects minds, causing sudden death, mutation or attacks on allies.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A strange tree-like figure smothered in black slime." }],
    },
    {
      n: 0,
      name: "Chained",
      potion: "Layers of black thorns, yellowed greasy bandages and sharp, bright roses.",
      main: ["The Chained Uniqueness", "Three Abomination characteristics"],
      sub: ["A cage that once held a true god"],
      ritual:
        "Have yourself mummified alive with the potion poured in as your organs, then die and lie sealed in coffin and tomb for a century without your will fading. The body cages the mind, the tomb cages the body.",
      powers: [
        {
          name: "Curses",
          text: "Curses by symbol alone, unnoticed, in every form, while almost nothing can curse it back without a very strong link.",
        },
        {
          name: "King of Aberrations",
          text: "Becomes any Mutant at will. Every Mutant can pray to it for help, and all Aberrations, Devils and lost-control Beyonders included, bow before it. Weaker ones become its servants.",
        },
        {
          name: "Binding",
          text: "Holds back madness, desire, objects, creatures and the pull of characteristics. Short of sealing it beats Door, at sealing Door wins. It can also cut restraints loose.",
        },
        { name: "Objects", text: "Commands every object, with a spirit or without." },
      ],
      notes: [
        { label: "Uniqueness", text: "A ghostly little figure wrapped in bandages, thorns and roses." },
        {
          label: "Mythical form",
          text: "A shapeless knot of curses that takes whatever shape its anchor and self-image give it: an oil tree, a doll, a mummy.",
        },
        {
          label: "Divine kingdom",
          text: "The Thorns Paradise, where curses sleep in objects and Aberrations stand as statues that can wake.",
        },
      ],
    },
  ],
};

export default pathway;
