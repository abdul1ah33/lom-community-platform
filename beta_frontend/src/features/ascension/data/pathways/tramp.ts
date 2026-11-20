import type { PathwayDetail } from "../../types";

/** Primordial Hunger / Tramp (Outer Deity). Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "tramp",
  sequences: [
    {
      n: 9,
      name: "Tramp",
      powers: [
        {
          name: "Nothing but hunger",
          text: "Loses everything else and roams looking for food, barely getting by. Adapts to anywhere, scraps well on the street and digests almost anything. Hunger pushes out other desires, so it resists them.",
        },
      ],
    },
    {
      n: 8,
      name: "Glutton",
      powers: [
        {
          name: "Built to eat",
          text: "Hunger rebuilds the body: better stomach, harder teeth, a monstrous bite and appetite, and more power drawn from every meal. Resists toxins and germs in food, but only up to a point. Many Gluttons die from eating the wrong thing.",
        },
      ],
    },
    {
      n: 7,
      name: "Gourmet",
      powers: [
        {
          name: "Palate",
          text: "Knows what's edible, what isn't, what transforms you and what needs pairing. Tastes knowledge and information out of whatever it eats.",
        },
      ],
    },
    {
      n: 6,
      name: "Chef",
      powers: [
        {
          name: "Extraordinary dishes",
          text: "Cooks food, pastries and drinks with supernatural effects from special ingredients, each Chef shaped by what they've found and made. Fully embracing hunger and greed makes the traits gained from those dishes permanent and unlimited, though far weaker than grazing or recording.",
        },
        { name: "Knife work", text: "Spots weak points and cuts, chops and carves with precision." },
      ],
    },
    {
      n: 5,
      name: "Depriver",
      powers: [
        {
          name: "Deprive",
          text: "Strips one to three powers from a target for a time. Eat some of their flesh and one of those powers becomes the Depriver's forever, lost to the victim unless they drink the potion again or kill the Depriver.",
        },
        { name: "Wider menu", text: "Can eat things once inedible, including some corruption, fire and lightning." },
      ],
    },
    {
      n: 4,
      name: "Sea Monster",
      powers: [
        {
          name: "Colossus",
          text: "A true sea monster that eats tens of tonnes in one sitting, with matching strength and stamina, and swallows attacks whole.",
        },
        {
          name: "Eating power",
          text: "Devours Beyonder characteristics and mystical items and uses them without losing control, though it piles up madness and hunger. Ones from unrelated pathways stay partly walled off inside.",
        },
      ],
    },
    {
      n: 3,
      name: "Hydra",
      powers: [
        {
          name: "Many heads",
          text: "Eaten characteristics and items are digested into extra bodies and heads, nine different attacks at once.",
        },
      ],
    },
    {
      n: 2,
      name: "Angel of Devouring",
      powers: [{ name: "Unrecorded", text: "The handbook leaves this Sequence blank." }],
    },
    {
      n: 1,
      name: "Chaos Gastric Juices",
      powers: [
        {
          name: "Cosmic cleanser",
          text: "Everything except the Great Old Ones' undying imprints, Uniquenesses, Sefirot and characteristics themselves can be eaten, digested and erased, even endless spreading corruption, even its own brain.",
        },
      ],
    },
    {
      n: 0,
      name: "Tail Devourer",
      powers: [
        {
          name: "Convergence and hunger",
          text: "Forever driven to eat everything while endlessly eating itself, chasing more convergence and the fullness after it. Convergence also lets it nudge fate a little without having eaten the power.",
        },
      ],
    },
    {
      n: -1,
      name: "Primordial Hunger",
      powers: [
        {
          name: "The hunger that never ends",
          text: "Devouring made flesh, the convergence never satisfied, the cleanser of all things. Unlike concealment, what it erases can't come back. It has just one pathway, because it is convergence and has eaten the very idea of division.",
        },
      ],
      notes: [
        {
          label: "Mythical form",
          text: "A dim whirlpool with pale bared teeth and a fluid of every colour, like an abstract stomach.",
        },
        {
          label: "Followers",
          text: "Food Compendium, Food Comes First, Devouring Whirlpool, Hunter, the Sacred Stomach Society, Hydra and the School of Deliciousness.",
        },
      ],
    },
  ],
};

export default pathway;
