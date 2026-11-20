import type { PathwayDetail } from "../../types";

/** Supernova Dominator / Astronomy Aficionado (Outer Deity). Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "astronomy-aficionado",
  sequences: [
    {
      n: 9,
      name: "Astronomy Aficionado",
      powers: [
        {
          name: "Stargazer",
          text: "Knows the night sky, spots changes among the stars and calculates their patterns and the timing of sky events. A sturdier body and a first sense for what's real.",
        },
      ],
    },
    {
      n: 8,
      name: "Star Worshiper",
      powers: [
        {
          name: "Star Language",
          text: "Reads fate's guidance in tides, waves and the paths of stars to dodge danger and wrong choices.",
        },
      ],
    },
    {
      n: 7,
      name: "Star Sacrificer",
      powers: [
        {
          name: "Gravity",
          text: "Pins a target to the ground or lifts it into the air. Also magnet-like pulls.",
        },
        {
          name: "Weakening Ray",
          text: "Rays from the sky that break down a body. Without matching powers to treat it, the victim dies slowly and in agony. Combined with the Sun pathway, it becomes solar rays.",
        },
        {
          name: "Empty Cosmos",
          text: "A half-real space made by gravitational lensing, mostly illusion at this stage, walled in like a barrier of spirituality. It turns the Sun's holy light into wider but weaker starlight.",
        },
      ],
    },
    {
      n: 6,
      name: "Navigator",
      powers: [
        {
          name: "Guidance",
          text: "A guide of sea and stars who understands space and dimensions, finds hidden passages in the void, fixes routes among the stars for itself and others, and guides some beings from beyond in to help. Commands one more kind of cosmic ray.",
        },
      ],
    },
    {
      n: 5,
      name: "Tidal Scholar",
      powers: [
        {
          name: "Tides",
          text: "Gravity strong enough to raise tides and huge waves, to fly, or to set the air shaking.",
        },
      ],
    },
    {
      n: 4,
      name: "Heavybringer",
      powers: [
        {
          name: "Source of gravity",
          text: "Pulls in and steers everything for hundreds to thousands of metres. Lays crushing weight on a target, enough to collapse the weak, and packs dust into meteors. Its own body becomes dense and very hard.",
        },
        {
          name: "Deeper cosmos",
          text: "Commands many cosmic rays. Empty Cosmos becomes a real, if fragile, disorienting pocket space.",
        },
      ],
    },
    {
      n: 3,
      name: "Star Shepherd",
      powers: [
        {
          name: "Herding stars",
          text: "Herds asteroids and has a little sway over planets. Draws on the motion of stars to make fusion, with materials prepared. Even mystical stars obey, such as calling a Hunter's disaster star early, or helping related pathways digest potions.",
        },
      ],
    },
    {
      n: 2,
      name: "Radiant Angel",
      powers: [
        {
          name: "Fusion",
          text: "Starlight comes from fusion, a branch of the fundamental forces, so touching it makes the angel shine. Its body is many magnetically held fusion clusters.",
        },
      ],
    },
    {
      n: 1,
      name: "Star Dragon",
      powers: [
        {
          name: "Gravity and time",
          text: "Space is time and time is space: weight brings slowness, starlight brings chaos. It shifts planetary orbits, fights in a true deep-space environment near absolute zero and full of radiation, hurls asteroids that could wipe out a planet, and stirs electromagnetic storms.",
        },
      ],
    },
    {
      n: 0,
      name: "Densifier",
      powers: [
        {
          name: "Weight and density",
          text: "Holds density, weight and the fundamental forces, even over abstract things like the River of Fate. It orders star systems, briefly reaches white dwarf or neutron star density, and by sacrificing itself can become a black hole.",
        },
      ],
    },
    {
      n: -1,
      name: "Supernova Dominator",
      powers: [
        {
          name: "Ruler of stars",
          text: "Lord of the stars, weight and density made flesh, wielder of the fundamental forces, law of the boundless cosmos. Grounded in physical reality, it has only this one pathway.",
        },
      ],
      notes: [
        {
          label: "Mythical form",
          text: "Countless fusion clusters that can take the shape of a giant, a dragon or something indescribable.",
        },
        {
          label: "Followers",
          text: "The School of Tide, Star Shepherd, the Cosmic Research Society, the Star Worship Sect, Celestial Waymarks, the Society of Human Insignificance and Guide.",
        },
      ],
    },
  ],
};

export default pathway;
