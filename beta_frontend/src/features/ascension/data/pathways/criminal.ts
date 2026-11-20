import type { PathwayDetail } from "../../types";

/** Abyss / Criminal. Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "criminal",
  sequences: [
    {
      n: 9,
      name: "Criminal",
      potion: "Blood-red, tasting of both blood and sugar.",
      main: ["Head of a Ferocious Hound", "Crystal feather of a Murderous Raven"],
      sub: [
        "70 ml Ferocious Hound blood",
        "60 ml Murderous Raven blood",
        "Something obtained by crime",
        "10 drops of a victim's tears",
      ],
      powers: [
        {
          name: "Ruled by desire",
          text: "Unlike a Prisoner, a Criminal doesn't hold back. Dark desires rule body and mind, though some conscience still lingers.",
        },
        {
          name: "Criminal craft",
          text: "A strong body, sharp senses and every criminal trick. Swords, daggers, bows, revolvers, rifles and machine guns all come easily.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A reddish quartz-like stone with black patches." }],
    },
    {
      n: 8,
      name: "Coldblooded",
      potion: "Ice blue with many black dots hanging in it.",
      main: ["Remains of a Rat Swarm Lord", "Heart of a Skinless Blood Cat"],
      sub: [
        "40 ml Rat Swarm Lord blood",
        "90 ml Skinless Blood Cat blood",
        "The heart of the first of your own kind you murdered",
        "13 drops twinflower extract",
      ],
      powers: [
        {
          name: "No conscience",
          text: "Conscience is gone, and desire is in charge. The body grows less human.",
        },
        {
          name: "Devil's gifts",
          text: "Some devilish spell-like tricks that vary from person to person: poison flame, a petty curse of spiteful words, black smoke, or most commonly, Slowness.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A dark heart with ice-blue blood running through it." }],
    },
    {
      n: 7,
      name: "Serial Killer",
      potion: "Black with chunks of ice floating in it. Sharp, yet intoxicating.",
      main: ["Beak of a Cannibal Vulture", "Fang of a Shadow Serpent"],
      sub: [
        "80 ml Cannibal Vulture blood",
        "50 ml Shadow Serpent blood",
        "The whole skin of someone you killed yourself",
        "Organs of seven victims",
      ],
      powers: [
        {
          name: "Devil lore",
          text: "Knows the rituals of devils and stages special serial murders, partly as acting and partly to please the devils of the Abyss. When a case is complete, the last step of the ritual summons a devil's projection to grant what they want. It works because of the Abyss's nature, not the killer's rank.",
        },
        { name: "Muddying traces", text: "Interferes with divination and spirit channeling." },
      ],
      notes: [{ label: "Characteristic", text: "A sharp-edged block of ice with black smoke frozen inside." }],
    },
    {
      n: 6,
      name: "Devil",
      potion: "Dark, with sulphurous flame forever burning on top.",
      main: ["Tongue of a Red-Eyed Evil Leopard", "Horn of a Magma Devil"],
      sub: [
        "100 ml Red-Eyed Evil Leopard blood",
        "30 ml molten fluid of a Magma Devil",
        "10 drops black lily essence",
        "13 fingers of infants killed by their parents",
      ],
      powers: [
        {
          name: "The first great change",
          text: "Stronger, faster and armoured in hardened skin and rubbery flesh. Shrugs off most poisons and partly resists curses and fire. Cold, fearless and brutal up close. The danger is losing control: bloodlust and the urge to kill take over easily. Every Devil is different, because malice is different in everyone.",
        },
        {
          name: "Devilization",
          text: "Swells to nearly three metres, with curling goat horns, huge bat wings wreathed in pale blue fire, and black armoured skin.",
        },
        {
          name: "Malice perception",
          text: "Senses anyone who has started a move that could kill them soon, and from where. Depending on the Devil, it covers minutes to a day, a few kilometres to a whole city.",
        },
        {
          name: "Fire, poison, filth",
          text: "A lava greatsword that melts stone, poisonous blue fireballs (three normally, twenty in devil form), flame that traps bullets, toxic steam and volcanic bursts.",
        },
        {
          name: "Words of Filth",
          text: "Abyssal words: 'Slow' freezes everyone within eight metres for two seconds. 'Die' clenches a heart until it rusts. 'Depravity' smears foes in black tar that bursts into foul mist.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A soft black horn covered in uncanny patterns." }],
    },
    {
      n: 5,
      name: "Desire Apostle",
      potion: "Beautiful layers of colour, like a rainbow cocktail.",
      main: ["Skin of a Succubus", "Eye of a Child of Pain"],
      sub: [
        "60 ml Succubus blood",
        "70 ml Child of Pain blood",
        "3 pure white poppies",
        "Pituitary glands of nine kinds of thinking beings",
      ],
      ritual:
        "Kill people who have already fallen into depravity, between thirteen and forty-nine of them, three to nine days apart, eating their organs each time. Too soon risks losing control, too late resets the count. In between, bloodlust never leaves.",
      powers: [
        {
          name: "Desire Control",
          text: "Grabs hold of any strong emotion or obvious desire, even from afar: plants seeds, feeds it, or makes it explode until the body can't take it. Inflamed caution and nerves even ruin a target's sense of time.",
        },
        {
          name: "Mental shock",
          text: "Burns their own horns to blast an enemy's mind with forced emotion. Once the horns are gone, so is this.",
        },
        {
          name: "Desire Incarnation",
          text: "Turns into a thick black flood of shameful desires that dodges harm, hides and pollutes everything it touches. Some Devils grow other gifts, like living inside a victim's desire until it dies.",
        },
      ],
      notes: [
        {
          label: "Characteristic",
          text: "A spiky cluster of black crystals with faces trapped inside, raging, suffering or lost.",
        },
      ],
    },
    {
      n: 4,
      name: "Demon",
      potion: "Bright red, sweet-smelling and harmless-looking.",
      main: ["Blood crystal of an Archdevil", "Reproductive organ of a Demon of Lust"],
      sub: [
        "130 ml Demon of Lust blood",
        "One of an Archdevil's black hearts",
        "A consecrated holy emblem from a true god's church",
        "99 Beyonder hearts",
      ],
      ritual:
        "Get at least ten thousand thinking beings to sell you their souls willingly, and collect them. Higher-status souls count for more.",
      powers: [
        {
          name: "Partial forms",
          text: "Keeps parts of its mythical form out for long stretches to gain strange powers without losing control.",
        },
        {
          name: "Cunning",
          text: "Cold, sharp, treacherous and delighted by deceit. Dulls the minds of everyone nearby so they get careless.",
        },
        {
          name: "Breaking minds",
          text: "No need to wait for feelings to flare. A voice, a look or a gesture plunges one target or a crowd into hallucination, swelling emotion until the mind bursts or loses control.",
        },
        {
          name: "Hellish spells",
          text: "Acid swamps, hellfire, corrosive fog, filthy illusions and projections without needing the Abyss, plus new words: Confusion, Sloth, Blasphemy.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A blood-red, half-open, enticing flower." }],
    },
    {
      n: 3,
      name: "Blatherer",
      potion: "Countless sound-filled bubbles stacked into an almost unreal liquid.",
      main: ["Brain of a Word Devil", "Soul stone of a Mind Fiend"],
      sub: [
        "100 ml Word Devil fluid",
        "A curse attachment of a Mind Fiend",
        "A primordial being from the Sea of Mind",
        "Nine tear-catchers from nine despairing people",
      ],
      ritual:
        "Bind yourself in a 'live together, die together' pact with a demigod of a purifying pathway like the Sun or Twilight Giant, or a life pathway like the Mother, and drink while it holds.",
      powers: [
        {
          name: "Contamination",
          text: "Some authority to pollute minds and spirits. Each word can make a Beyonder lose control, take grave damage, go mad or be cursed.",
        },
        {
          name: "Whisper from afar",
          text: "Once linked, its voice reaches a target's ear from far away and drops them dead somewhere safe. Seeing where danger comes from, it can strike back on the spot.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A wrinkled lump of condensed black fog." }],
    },
    {
      n: 2,
      name: "Blood Grand Duke",
      potion: "Thick, sickening, clotting blood.",
      main: ["A Blood Grand Duke characteristic, or a Devil Prince's head plus a Twin Serpent Sovereign's heart"],
      sub: [
        "Blood from 49 people of different races, ranks and roles",
        "A drop of a true god's blood",
        "1,000 ml Blood Grand Duke blood, or the acid and poison blood of the two creatures above",
      ],
      ritual:
        "Sacrifice thirteen settlements of ten thousand or more to the Abyss, no more than three months apart, by Blood Ritual: kill every creature one by one and redraw the altar's symbols in their blood.",
      powers: [
        {
          name: "Malice Incarnation",
          text: "While malice lives, so does the Duke. It plants malice in a heart and, if destroyed, regrows there, feeding on that person's desires and blood. It whips up cold cruelty that drags people towards the Abyss, and pure dread that blanks the mind.",
        },
        {
          name: "Blood Dominance",
          text: "Commands its own and others' blood and fluids, corroding everything with them. One surviving drop is enough to come back.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A huge misshapen black heart that never stops dripping blood." }],
    },
    {
      n: 1,
      name: "Filthy King",
      potion: "Deep black pus giving off dark green, corrosive fumes.",
      main: ["A Filthy King characteristic"],
      sub: [
        "A warped being from a place of ruin, filth or curses",
        "300 ml blood of an angel losing control",
        "Nine completely corrupted divine creatures",
        "A hundred souls drowned in desire",
      ],
      ritual:
        "Drive a nation of ten million into depravity: the rich ruled by desire like devils, the poor without hope until even their children and organs belong to others, the middle class forever clawing up a collapsing cliff while the rich watch for fun.",
      powers: [
        {
          name: "Deeper malice",
          text: "The Grand Duke's undying malice and mastery of blood, taken further. Rebirth inside any heart that holds its seed, terror that empties the mind, and blood that corrupts all it touches.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A corrosive, strangely unreal sheet of black." }],
    },
    {
      n: 0,
      name: "Abyss",
      potion: "Layers of black heart-shapes forming a darkness with no bottom.",
      main: ["The Abyss Uniqueness", "Three Filthy King characteristics"],
      sub: ["A fallen region within the Sea of Mind"],
      ritual: "Turn an entire continent into the Abyss.",
      powers: [
        {
          name: "I am the Abyss",
          text: "Parts of depravity, filth, contamination, desire, curses and aberration, each completed by a touch of mind. It's the abyss inside every heart.",
        },
        {
          name: "Depravity and filth",
          text: "The Hanged Man is the fall waiting inside everyone. The Abyss is the place that makes falling unavoidable, and builds it. Filth corrupts body, spirit and mind.",
        },
        {
          name: "Desire and curses",
          text: "It doesn't so much hold desire as stoke and detonate it. Its curses strike mind and spirit.",
        },
        {
          name: "Aberration",
          text: "Every Devil mutates its own way, and the Abyss holds all of those mutations. Below it lie corrosion, malice, poison, cursed flame and command of the body.",
        },
      ],
      notes: [
        { label: "Uniqueness", text: "A dense, black, bottomless abyssal sea of countless layers." },
        {
          label: "Mythical form",
          text: "Devils share huge bodies, uncanny black skin, curled goat horns and blue sulphur fire. The Abyss has no fixed shape: you see whatever you fear or crave most.",
        },
        {
          label: "Divine kingdom",
          text: "The Mind Abyss, which is really the Abyss itself in whatever shape its god prefers.",
        },
      ],
    },
  ],
};

export default pathway;
