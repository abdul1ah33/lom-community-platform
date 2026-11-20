import type { PathwayDetail } from "../../types";

/** Sun / Bard. Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "bard",
  sequences: [
    {
      n: 9,
      name: "Bard",
      potion: "Crimson and never still, always seething and rolling.",
      main: [
        "A Crystal Sunflower, or a tail feather from an adult Flint Bird or a Fire Bird",
        "A Siren Rock or a Singing Sunflower",
      ],
      sub: ["80 ml red wine", "A blade of Midsummer Grass", "5 drops July Wine juice", "An Elf Dark Leaf"],
      powers: [
        {
          name: "Songs of the Sun",
          text: "Songs that lift the singer and their allies: courage instead of fear, more strength, quicker feet and a little spirituality back. Sun believers listening grow more devout and obedient. For now, that's all a song can do.",
        },
        { name: "Sturdier body", text: "A tougher constitution than an ordinary person." },
      ],
      notes: [{ label: "Characteristic", text: "A crimson crystal that sings." }],
    },
    {
      n: 8,
      name: "Light Suppliant",
      potion: "Like magma glowing white-hot.",
      main: [
        "A piece of Brilliance Rock, or Dazzling Soul powder",
        "Mirror Hedgehog blood, or the heart of a Magma Titan",
      ],
      sub: ["100 ml red wine", "3 drops aconite juice", "One object from the Sun faith", "A gold-edged sunflower"],
      powers: [
        {
          name: "Sun rites",
          text: "Spells and rituals of the Sun that hit corpses and spirits hard. Can make holy water, and ritual magic opens up tricks normally reserved for higher Sequences.",
        },
        { name: "Daylight", text: "Lights up ten metres around, and the glow spreads further on its own." },
        {
          name: "Blessing",
          text: "Wards self and allies against fear, cold, darkness and death, and makes their blows bite harder against the undead.",
        },
        {
          name: "Sunlight",
          text: "A blast as bright as high noon that sears the undead and blinds everything else.",
        },
      ],
      notes: [{ label: "Characteristic", text: "Half-hardened magma giving off white light." }],
    },
    {
      n: 7,
      name: "Solar High Priest",
      potion: "Golden and burning hot.",
      main: ["The red comb of a Dawn Rooster", "Fruit of a Radiance Spirit Pact Tree"],
      sub: ["100 ml Dawn Rooster blood", "10 drops Sun oil", "8 g fingered citron powder", "5 g hardened lava"],
      powers: [
        {
          name: "Hardier still",
          text: "A stronger body that shrugs off disease and harsh places. Every Sun spell and rite grows much stronger.",
        },
        {
          name: "Holy Light",
          text: "Calls a pillar of light from the sky that burns away the undead and hurts anything else it touches.",
        },
        {
          name: "Holy water and Fire of Light",
          text: "A little Sun holy water that drives off spirits and cold, and a dense golden flame from nowhere.",
        },
        { name: "Cleave of Purification", text: "A strike that cuts wraiths apart, and can be loaded into bullets." },
        {
          name: "Courage and oaths",
          text: "Removes a target's fear, briefly boosts strength, speed and fire and holy damage, and spreads a halo that steels allies within twenty metres and cleanses evil from their bodies.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A golden sphere streaked with red." }],
    },
    {
      n: 6,
      name: "Notary",
      potion: "Clear dark gold, as if it could reflect a person's heart.",
      main: ["Crystallised roots of the Tree of Elders", "5 Spirit Pact Bird feathers"],
      sub: [
        "A gold-edged sunflower",
        "100 ml Radiance Spirit Pact Tree sap",
        "A white-edged sunflower",
        "5 drops Aqua Fern juice",
      ],
      powers: [
        {
          name: "Notarisation",
          text: "Certifies whether Beyonder knowledge, potion formulas included, is genuine. An ability certified as valid is temporarily strengthened, and one ruled invalid weakens or breaks.",
        },
        {
          name: "Contracts",
          text: "A contract the Notary signs and approves can't be broken by a Sequence 5, and even a demigod pays dearly to force it. Because contracts make trade safe, Notaries end up rich and respected. Some envious rivals call it the Sun's money luck.",
        },
        { name: "Stronger body", text: "Much tougher physically, though still a support role." },
      ],
      notes: [{ label: "Characteristic", text: "A dark golden object shaped like a page from a book." }],
    },
    {
      n: 5,
      name: "Priest of Light",
      potion: "Golden, giving off both light and heat.",
      main: ["The red comb of a King of Dawn Roosters", "A piece of pure white Brilliance Rock"],
      sub: ["5 g rosemary", "7 drops fingered citron juice", "10 ml Rock Water", "60 ml King of Dawn Roosters blood"],
      ritual: "In total darkness, bury your whole body in ice that never melts, then drink.",
      acting: ["Drive out the darkness. Praise the Sun."],
      powers: [
        {
          name: "Light of Holiness",
          text: "Arms thrown wide as if to embrace the sun, the priest calls down a vast pillar of pure light that boils enemies away. Two tiny suns in the eyes give night vision.",
        },
        {
          name: "Purification Halo",
          text: "Gold spreads outward in rings, warming allies, filling them with courage and driving out evil. It can be shaped precisely.",
        },
        {
          name: "Bane of the undead",
          text: "Cleanses the undead and the corrupted across an area. Every other Sun spell simply hits harder.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A pure, glowing crystal that feels holy." }],
    },
    {
      n: 4,
      name: "Unshadowed",
      potion: "Pure gold with not a single speck of impurity.",
      main: [
        "A Holy Brilliance Rock",
        "A drop of the Sun's divine blood, or three tail feathers of an adult Sun Divine Bird and another Holy Brilliance Rock",
      ],
      sub: [
        "60 ml Sun Divine Bird blood",
        "30 ml liquid that formed alongside the Holy Brilliance Rock",
        "7 drops mutated fingered citron juice",
        "10 g Heart of Magma powder",
      ],
      ritual:
        "Draw out the strongest feelings you could never bear to lose before drinking, and pour them back in as the potion takes hold.",
      powers: [
        {
          name: "Sun warrior",
          text: "From healer to fighter. Body, strength, speed and agility all reach a new level.",
        },
        {
          name: "Purification",
          text: "Waves of warm light melt away rot, corruption, darkness, evil and disease. Deadly to wraiths and the fallen, it even strips the madness from Beyonder characteristics, and slowly drives other characteristics out.",
        },
        {
          name: "Unshadowed Domain",
          text: "Floods the area with light until no shadow is left and nothing can hide. It cracks light-based concealment, cripples shadow and darkness powers, and blocks dark attacks, though it's no physical wall.",
        },
        {
          name: "Unshadowed Spear",
          text: "A spear of pure sunlight that bursts into a small sun bright enough to light a city.",
        },
        {
          name: "Flaring Sun",
          text: "A huge orb of light ringed with holy fire drops onto the enemy, melting and burning them. It can wipe out undying and corrupted things outright, and anyone else caught in its wide blast.",
        },
        {
          name: "Holy Armor and Sun Oath",
          text: "Golden light hardens into armour, and an oath strengthens everyone nearby. Notarisation grows much stronger too.",
        },
      ],
      notes: [{ label: "Characteristic", text: "One blazing, sacred, frightening drop of golden blood." }],
    },
    {
      n: 3,
      name: "Justice Mentor",
      potion: "Dark-gold strands of light twisted together but never blending.",
      main: [
        "A stamen from a Praiser of All Things, a monster shaped like a huge flower",
        "The head of a Blazing Giant, or a jet-black tail feather of a King of Sun Divine Birds",
      ],
      sub: [
        "100 ml Blazing Giant blood",
        "9 Praiser of All Things petals",
        "A notebook of your own idea of justice",
        "One ray of sunlight each from morning, noon and evening",
      ],
      ritual: "Decide what justice means to you, then live by it for three years without breaking it once.",
      powers: [
        {
          name: "A personal order",
          text: "The Mentor's code of justice becomes a contract with self, gods and world. It grants some authority over contracts and order, contracts being a branch of order.",
        },
        {
          name: "Justice Halo",
          text: "For ten kilometres around, actions that fit the code grow stronger and ones that break it falter or fail. Evil spirits can't come near unless the halo is held back. Break your own code and your power turns on you, and can push you towards losing control.",
        },
        {
          name: "Justice Judgment",
          text: "A focused verdict on one target, twice the halo's strength, that weakens or cancels unjust powers even in angels.",
        },
        {
          name: "Holy Contract",
          text: "A pact even angels won't dare break, enforced by the Sun's Uniqueness itself even without a living god.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A heart or head made of pure light." }],
    },
    {
      n: 2,
      name: "Lightseeker",
      potion: "Like many streams of pure light flowing together.",
      main: ["Heart of a Blazing Giant leader, or a Lightseeker characteristic"],
      sub: [
        "Eyes of a Blazing Giant leader",
        "A book of hymns to the sun you copied out by hand with devotion",
        "Blood from nine fallen clergy",
        "300 ml blood (both can be replaced by parts of a Lightseeker)",
      ],
      ritual:
        "Take an angel-level item deeply tied to the Sun, bind to it your most precious memory, one tied to your idea of justice, and keep it in front of you. It anchors you through the chase after the light so you don't go mad before the change is done.",
      powers: [
        {
          name: "Becoming light",
          text: "Some authority over the Sun and light. The Lightseeker flies as weightless light, dissolves into light to dodge harm and re-forms, and always knows the sun's direction, so space-time mazes can't hold them for long. Darkness, cold, corruption, death and decay all hit softer.",
        },
        {
          name: "Envoy of the Sun",
          text: "Turns into a small sun pouring out searing light and purification.",
        },
        { name: "Praise the Sun", text: "Total purification, and a leap in every ability." },
        {
          name: "Sharpened judgment",
          text: "Once their core justice is clear, the Lightseeker's verdicts deal three to five times the halo's harm to anyone who breaks it. Every older spell grows stronger.",
        },
      ],
      notes: [{ label: "Characteristic", text: "Darkness wrapped around a core of light that won't go out." }],
    },
    {
      n: 1,
      name: "White Angel",
      potion: "Blazing, pure white, with nothing else mixed in.",
      main: ["A White Angel characteristic, or Aucuses's rib"],
      sub: [
        "300 ml of your own blood",
        "One unstable miniature sun",
        "Angel blood from the Spectator, Sailor, Reader or Secrets Suppliant pathway",
        "A symbol of yourself as a figure of worship, such as a Sun emblem kept for ten years in a cathedral where you are the patron angel",
      ],
      ritual:
        "Be praised and worshipped with total devotion by a million people, yourself among them. The higher your rank, the fewer people are needed, but you must never lose yourself.",
      powers: [
        {
          name: "Holy Kingdom",
          text: "A phantom kingdom big enough to cover a capital city, full of sunlight and holiness. No darkness, no undead, and the Darkness pathway's resurrections fail inside it.",
        },
        {
          name: "Incarnation of Order",
          text: "As long as the trade and order tied to them still stand, the angel can draw on them to heal and hold steady.",
        },
        {
          name: "Pure White Light",
          text: "Here destroying and purifying are the same thing. Under this light, everything that isn't white or the sun falls apart and is set free.",
        },
        {
          name: "Servant of Faith",
          text: "Fills self or believers with fervour that briefly blocks darkness, corruption and death, or slowly turns listeners into devout worshippers of the Sun.",
        },
      ],
      notes: [
        { label: "Characteristic", text: "A pure white human figure, or a holy rib." },
        { label: "Scale", text: "In theory, a White Angel could already light an entire Earth-sized planet." },
      ],
    },
    {
      n: 0,
      name: "Sun",
      potion: "Like a star bursting in a storm.",
      main: ["The Sun Uniqueness", "Three White Angel characteristics"],
      sub: ["The idea of the sun, taken from the Astral World"],
      ritual:
        "Drink either in the darkness that everything ends in, or inside the all-colour of the Chaos Sea. The darkness is extremely dangerous, even when an ally is the one providing it.",
      powers: [
        {
          name: "Holy",
          text: "Purges every discord and raises every holy act to its peak. Faith flows from this: purity of body and mind, fervour of spirit, in others and in oneself.",
        },
        {
          name: "Light",
          text: "Wherever there is light, the Sun is there. It lights everything and can burn anything, even a whole star system over time. Light is energy at its root, which makes the true Sun extremely hard to destroy for good.",
        },
        {
          name: "Order and contracts",
          text: "A warmer, more personal order than the Black Emperor's, grown from the god's own code of justice. A contract it signs binds even a Great Old One that lacks the matching symbol.",
        },
        {
          name: "The true sun",
          text: "Holy and Light together make a real sun, both physically and mystically. It sheds world-ending light, burning heat and endless energy, and burns away every kind of corruption.",
        },
      ],
      notes: [
        { label: "Uniqueness", text: "A miniature sun." },
        { label: "Mythical form", text: "A Sunbird like a sphere of light, its feathers burning with golden fire." },
      ],
    },
  ],
};

export default pathway;
