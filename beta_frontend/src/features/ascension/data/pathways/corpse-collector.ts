import type { PathwayDetail } from "../../types";

/** Death / Corpse Collector. Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "corpse-collector",
  sequences: [
    {
      n: 9,
      name: "Corpse Collector",
      potion: "Black, rotten-smelling corpse water.",
      main: ["A dried adult black-spotted frog", "Crystal of a Cloth-Shrouded Man"],
      sub: [
        "80 ml spirits distilled again and again",
        "10 drops black-spotted frog mucus",
        "10 drops black lily extract",
        "A used body bag",
      ],
      powers: [
        {
          name: "Half a corpse",
          text: "Cold, grim and low in body temperature, so mindless spirits of the dead leave them alone. The body is tougher and shrugs off cold, rot and the corrosive air of corpses.",
        },
        {
          name: "Spirit Vision",
          text: "Always on. Sees certain evil spirits and knows how undead creatures work and where they're weak.",
        },
      ],
      notes: [
        { label: "Characteristic", text: "Pale leather covered in rotten black spots." },
        { label: "Weakness", text: "From here on the pathway grows ever more afraid of sunlight and purification." },
      ],
    },
    {
      n: 8,
      name: "Gravedigger",
      potion: "Dark green with threads of blood running through it.",
      main: ["Eye of a Harbinger Raven", "One Cemetery Blood Rose"],
      sub: ["100 ml pure alcohol", "3 Harbinger Raven feathers", "5 Cemetery Blood Rose leaves", "9 drops corpse oil"],
      powers: [
        {
          name: "Stronger, sharper",
          text: "A tougher, quicker body and stronger Spirit Vision. Can talk with a few spirits nearby.",
        },
        {
          name: "Eye of Death",
          text: "Looks down on a foe as if from the land of the dead and spots the vital points. Quickly finds the weak spot of unfamiliar undead and Spirit World creatures.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A bloodstained eye." }],
    },
    {
      n: 7,
      name: "Spirit Medium",
      potion: "Clear, but swirling with psychedelic colour.",
      main: ["Front paw of a Specter Cat", "A Spirit World crystal"],
      sub: [
        "80 ml Specter Cat blood",
        "10 g soil tainted by the crystal",
        "5 ml brain matter from someone killed by possession",
        "A leaf blessed by a nature spirit",
      ],
      powers: [
        {
          name: "Spirit channeling",
          text: "Speaks directly with nature spirits and wandering dead, and uses different spirits to work different magic. It can reach the spirits of the living for honest answers too, at real risk.",
        },
        {
          name: "Friend of the dead",
          text: "To ghosts and nature spirits, the Medium feels like one of them, so friendly ones may offer up secrets. Can pass as a zombie and bear rot, cold and death.",
        },
        { name: "Deep perception", text: "Feels hidden spirits with eyes shut, and knows many spirit rituals." },
      ],
      notes: [
        { label: "Characteristic", text: "Half real, half not, like a mirror with unspeakable things behind it." },
      ],
    },
    {
      n: 6,
      name: "Spirit Guide",
      potion: "Yellow-green and thick with the stench of corpses.",
      main: ["A Shadow of Death", "Soul body of a Pale-White Lich"],
      sub: [
        "100 ml rot fluid of the dead",
        "A broken bone of a Pale-White Lich",
        "An object the Shadow of Death lived in",
        "One wandering specter",
      ],
      powers: [
        {
          name: "Spirit army",
          text: "Steps into the Spirit World instead of just seeing it, hires messengers and gets help from its creatures. Can command the dead and nature spirits ahead of time instead of channeling them on the spot. The hard part is keeping them close and unnoticed. How strong a Guide is depends on which spirits they've gathered.",
        },
        { name: "Raise the dead", text: "Wakes zombies and skeletons, with no will or life of their own." },
        {
          name: "Language of the Dead",
          text: "Speech that slips past the body to give the spirit orders, even enslave it.",
        },
        {
          name: "Undead shepherd",
          text: "Dominates zombies, wraiths and evil spirits and takes over ownerless undead of similar strength. Against a stronger member of the same pathway, both their servants and they themselves may switch sides.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A pale stone circled by shadows." }],
    },
    {
      n: 5,
      name: "Gatekeeper",
      potion: "Ghostly, with a dark whirlpool that reaches the bottom of the bottle.",
      main: ["Skull of an Underworld Traverser", "Crystal core of a Myriapod Specter"],
      sub: [
        "80 ml water steeped in the aura of death",
        "A piece of an Underworld Traverser's rotten flesh",
        "10 g Myriapod Specter dust",
        "10 drops crimson spider lily oil",
      ],
      ritual: "Find a place where the Underworld's aura spills over, touch it, and live.",
      powers: [
        {
          name: "Keeper of the door",
          text: "Senses the way into the Underworld and commands the dead inside, standing guard at the line between life and death. A brand on the palm can open that door at the right moment and suck a target through.",
        },
        {
          name: "Pocket Underworld",
          text: "The Gatekeeper's own body becomes a small Underworld, its door between the brows. The souls, dead and spirits kept there lend powers and help, with no need to march an army around.",
        },
        {
          name: "Death Envoy",
          text: "One known Gatekeeper keeps a creature whose faint sobbing numbs the body and chills the blood, leaving the victim to watch their life drain away.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A skull with a shattered face and a deadly ghostly door inside." }],
    },
    {
      n: 4,
      name: "Undying",
      potion: "Pale white and perfectly still. Not even wind or shaking makes it ripple.",
      main: ["Gallbladder of a rotten feathered serpent", "Shed skin of an Immortal Cicada"],
      sub: [
        "90 ml rotten feathered serpent fluid",
        "9 pieces of bark from the cicada's tree",
        "A stone of eternal darkness",
        "A pale white spider lily",
      ],
      ritual:
        "Find an underground river touched by death. Hold a real funeral on its bank and bury yourself there with the potion for sixty days. If you aren't alive and still somewhat sane at the end, it failed, and failure always breeds a dangerous Corpse King.",
      powers: [
        {
          name: "Death and return",
          text: "A long life, but every sixty years the Undying dies and wakes again with most memories gone, to be pieced back slowly. Each death leaves a mark in the River of Eternal Darkness. Too many, and the river washes the mind away until only a wandering monster is left.",
        },
        { name: "Hard to kill", text: "Physical wounds aren't fatal unless the body is completely destroyed." },
        {
          name: "Underworld anchor",
          text: "Uses the Underworld as a fixed point to cross the Spirit World, and its power to seal objects.",
        },
        {
          name: "Language of the Dead",
          text: "Grows into a full system of spells for death, souls, zombies, withering and slavery.",
        },
        {
          name: "Door to the Underworld",
          text: "Opens the door to shape the battlefield, dragging and maddening foes. With good connections or luck, it can even let dangerous undead back into the world.",
        },
      ],
      notes: [
        { label: "Characteristic", text: "A hollow, blackened, greenish snakeskin." },
        {
          label: "Eastern echo",
          text: "Some Western Continent cultivators value the failed version of this ritual for the terrible zombies it makes.",
        },
      ],
    },
    {
      n: 3,
      name: "Ferryman",
      potion: "Dark and deep. Dust that lands on it sinks out of sight.",
      main: ["Pus core of a Servant of the River Styx, or brain of a mature feathered serpent"],
      sub: [
        "90 ml of your own blood",
        "An undead from the depths of the Underworld",
        "A flower grown from your own rotting flesh",
        "9 drops Styx Servant pus, or 9 mature feathered serpent feathers",
      ],
      ritual:
        "Walk through a Door to the Underworld you summoned yourself, and drink while dying inside. From then on you are part of the Underworld and of death.",
      powers: [
        {
          name: "Deadly gaze",
          text: "Some authority over death. Meeting its eyes means death, and even beings with godhood are badly hurt. Anything it merely watches slowly withers, as if crossing the river.",
        },
        {
          name: "Left hand, right hand",
          text: "The left hand's touch pushes someone towards death, almost beyond saving. The right hand's touch brings them back.",
        },
        {
          name: "Between worlds",
          text: "Most attacks except purification fail against it, and it never dies of old age, slowly turning into a thinking undead. It floats on the Styx, and even on the great dark river for two seconds, and grows stronger near either.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A core smeared with yellowish grease, full of dark pus." }],
    },
    {
      n: 2,
      name: "Death Consul",
      potion: "Black liquid made of the aura of death, haughty-looking, with numb faces pushing out of it.",
      main: ["Skull of an ancient feathered serpent, or a Death Consul characteristic"],
      sub: [
        "100 ml ancient feathered serpent fluid",
        "A coffin you were once buried in",
        "A crown that stands for royal power",
        "A pale object from the depths of the Underworld",
      ],
      ritual:
        "Rule one layer of the Underworld, or turn a whole kingdom into a land of the dead and fix the Door to the Underworld inside it.",
      powers: [
        {
          name: "Absolute Death",
          text: "Drains all life from an area. Most resurrections and decoys fail against it, though not ones built on history and change.",
        },
        {
          name: "King of the Dead",
          text: "Its pocket Underworld holds a mighty undead army, and it can call helpers straight from the Underworld. Lower members of the pathway can barely refuse its orders, and undead, even angel-level ones, are fragile before it.",
        },
        {
          name: "Kingdom of the Dead",
          text: "A pale realm the size of a city where the weak die on the spot and rise as undead, and even the godly slowly wither.",
        },
        {
          name: "Death doesn't stop it",
          text: "A dead Death Consul is still a Death Consul. Only special means can truly erase one.",
        },
      ],
      notes: [
        { label: "Characteristic", text: "A crown of black bones." },
        { label: "Duty", text: "The office includes judging the dead." },
      ],
    },
    {
      n: 1,
      name: "Pale Emperor",
      potion: "Pure pale white and utterly quiet, without a trace of any other colour.",
      main: ["A Pale Emperor characteristic, Gregrace's left claw, or Salinger's right eye"],
      sub: ["9 drops of Styx water", "Remains of a dead angel (not the characteristic)", "A tomb deep underground"],
      ritual:
        "Make your name, tied to death and the afterlife, spoken and remembered by most thinking beings in your realm. Barriers that cut a region off make it count as its own realm, which makes this easier.",
      powers: [
        {
          name: "Sovereign of Spirits",
          text: "A trait, not a skill: unearthly nobility without the warmth of the living. Anything with a spirit can be cowed, enslaved or slowly killed into servitude.",
        },
        {
          name: "Pale World",
          text: "A realm drained to pale white where colours die and powers fade. Any coloured ability weakens and finally fails. Useful against worlds inside paintings.",
        },
        { name: "Death Pronouncement", text: "Whatever it looks at or points to dies instantly." },
        {
          name: "Soul Control",
          text: "May pull a spirit straight out of its body. Even when it fails, it scrambles the spirit and shortens life.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A throne of pale bones." }],
    },
    {
      n: 0,
      name: "Death",
      potion: "A ghostly sceptre of grease-stained feathers wound with snakes.",
      main: ["The Death Uniqueness", "Three Pale Emperor characteristics"],
      sub: ["Land tainted by a branch of the River of Eternal Darkness"],
      ritual:
        "Create or absorb a true final home for the dead, the place every death in the realm flows to. Whoever holds this authority feels driven to do it anyway.",
      powers: [
        {
          name: "Death",
          text: "Death becomes a concept. Life dies, memories die, bonds die, even the trace of having existed dies. Indestructible characteristics die briefly too.",
        },
        { name: "Pale", text: "The peak of withering: spirit, will and powers all fade to silence." },
        { name: "Slavery and the undead", text: "Enslaver of all things, the source and master of every undead." },
        {
          name: "The End",
          text: "Where everything goes and every life finishes. With the Door pathway's help, this gave rise to the Underworld.",
        },
      ],
      notes: [
        { label: "Uniqueness", text: "A ghostly book wrapped in feathered serpents." },
        {
          label: "Mythical form",
          text: "A feathered serpent with near-black scales and grease-stained feathers, each trailing thin dark tubes.",
        },
      ],
    },
  ],
};

export default pathway;
