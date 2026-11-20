import type { PathwayDetail } from "../../types";

/** Mother Goddess of Depravity / Villain (Outer Deity). Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "villain",
  sequences: [
    {
      n: 9,
      name: "Villain",
      powers: [
        {
          name: "Thug",
          text: "A strong body, sharp fighting skills, and a menacing air that frightens people the way a gang member does.",
        },
      ],
    },
    {
      n: 8,
      name: "Gardener",
      powers: [
        {
          name: "Brews and tools",
          text: "Knows plants well and mixes berserk draughts, bark-skin salves, scorpion venom and healing tonics. Basic healing, skill with hoe, hammer and shears, and plant spirits fear them.",
        },
      ],
    },
    {
      n: 7,
      name: "Heretic Spellmaster",
      powers: [
        {
          name: "Life as fuel",
          text: "Spells are powered by life force, its own or others' once they're under its control. Much stronger in its own domain, where lingering souls let it drain others to heal.",
        },
        {
          name: "Curses of the blood",
          text: "An evil word that sets hearts racing and stomachs heaving. A spring-bright flame that runs through a wounded foe's veins and drains them, or boosts the caster. A black flame that slowly eats vitality.",
        },
        {
          name: "Undying Lands",
          text: "A domain of the restless dead that share its wounds and let it hop from soul to soul. Also commands corpses and spirits, casts minor curses and knows a rebirth ritual.",
        },
      ],
    },
    {
      n: 6,
      name: "Sower",
      powers: [
        {
          name: "Source of life",
          text: "Gives life, heals and makes seeds. Skilled at surgery and direct healing, with rites that keep someone alive for a while without organs.",
        },
        {
          name: "Tree hiding",
          text: "Merges into trees and wood to hide and harden its skin.",
        },
        {
          name: "Swarming growth",
          text: "Spends its own life to make rats, fleas, bedbugs, fungi and plants grow and breed. Failed rituals to call down a divine child refill it, and every nine it needs a new set of organs.",
        },
      ],
    },
    {
      n: 5,
      name: "Banshee",
      acting: ["Bear a child to draw nearer to the Great Mother."],
      powers: [
        {
          name: "The Banshee",
          text: "Becomes female. Weakening curses, a Death Wail that kills the frail or already cursed, bird wings for flight, fierce regeneration, a resurrection ritual and black flames that eat life.",
        },
        {
          name: "Summons",
          text: "Calls up devils, evil spirits, wraiths and things from beyond the stars.",
        },
      ],
    },
    {
      n: 4,
      name: "Madame",
      powers: [
        {
          name: "False life",
          text: "Commands spirits and brings the dead back, rebuilding their bodies. What returns is half corpse, half aberration, with scraps of memory, and lasts at most seven days.",
        },
        {
          name: "Paramita World",
          text: "Pulls targets into a private realm built for its advantage, with higher evil creatures like devils sent to attack.",
        },
        { name: "Willow dew", text: "A healing gift that restores vitality. Every spell grows stronger." },
      ],
    },
    {
      n: 3,
      name: "Divine Bearer",
      powers: [
        {
          name: "Mother of a god",
          text: "A weaker echo of Sequence 0: carries a god-to-be in the womb without dying, swallowing storms to feed it. In return the unborn grants her divine traits early: a full mythical form without losing control, deep use of the Astral World, and moments at a god's level.",
        },
      ],
    },
    {
      n: 2,
      name: "The Supreme",
      powers: [
        {
          name: "Reality",
          text: "Embodies the authority of reality. Nearly impossible to kill, seal or banish, since reality itself strikes back at attackers. Begins to touch the power of giving everything a spirit.",
        },
      ],
    },
    {
      n: 1,
      name: "Tree God",
      powers: [
        {
          name: "Endless growth",
          text: "Also called the Valley God, the Root of Heaven and Earth, holding up the sky and joining the ground, always spreading. Rules reproduction: gives life, rebirth and resurrection. A true revival needs the right conditions and timing, or what returns is an identical aberration.",
        },
        {
          name: "Lasting corruption",
          text: "Quietly grows a new personality in a target. Once its power takes hold, it never leaves unless it chooses. It can give life, or take it back for instant death.",
        },
      ],
    },
    {
      n: 0,
      name: "Chaos Primogenitor",
      powers: [
        {
          name: "Original Sin",
          text: "The original sin of the whole universe, and the gestating Original Creator of the next one. Through it the Mother Goddess can descend into reality every 2,160 years, then weaken for centuries. If it is truly born, she dies. She gives spirit to everything, even attacks aimed at her.",
        },
      ],
    },
    {
      n: -1,
      name: "Mother Goddess of Depravity",
      powers: [
        {
          name: "Ruler of the real world",
          text: "Origin of evil, the Indestructible, holder of total depravity of body and mind. Besides the Mother and Moon pathways torn away to Earth, her other two lead to the Chaos Primogenitor and to the World.",
        },
      ],
      notes: [
        { label: "Mythical form", text: "A colossal winged female shape of layered organs of birth." },
        {
          label: "Followers",
          text: "The Holy Mother Society, the Mother of Grains, the Spirit-Only Society, the Great Mother, the Nightstalkers, the Tree God Sect, the School of God's Descent and the School of Existence.",
        },
      ],
    },
  ],
};

export default pathway;
