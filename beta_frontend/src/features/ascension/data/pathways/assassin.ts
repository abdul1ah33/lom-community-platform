import type { PathwayDetail } from "../../types";

/** Demoness / Assassin. Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "assassin",
  sequences: [
    {
      n: 9,
      name: "Assassin",
      potion: "Dull and forgettable, yet it leaves you strangely thirsty.",
      main: ["Root of a Shadow Poison Flower", "Black feather of a Serpent-Bodied Strange Bird"],
      sub: ["100 ml strong vinegar", "3 Shadow Poison Flower petals", "10 drops buttercup oil", "One live spider"],
      acting: [
        "An assassination puts your own life on the scales. It is the final sentence, the disaster that falls on the guilty.",
      ],
      powers: [
        {
          name: "Light as a feather",
          text: "Can make the body as light as a feather for a while. Eagle-sharp eyes that see in the dark, quiet feet and a gift for hiding in shadows.",
        },
        { name: "Mighty Blow", text: "Everything they have, poured into one strike." },
      ],
      notes: [{ label: "Characteristic", text: "A clump of shadow that seems covered in spikes." }],
    },
    {
      n: 8,
      name: "Instigator",
      potion: "Glossy, gleaming pitch-black with tiny bubbles, like the malice hidden in every heart.",
      main: ["Heart of a Demon Throat Honeyguide", "Venom sac of a Dark Prowler"],
      sub: [
        "Syrinx of a Demon Throat Honeyguide",
        "Blue jimsonweed juice",
        "Water fern powder",
        "Walnut and pure water",
      ],
      acting: [
        "Played straight it's encouragement. Turned around it's incitement.",
        "Instigating is a means, not the goal.",
        "It comes from seeing to the heart of people and situations, not from powers.",
        "It always brings disaster. You only choose who gets it.",
      ],
      powers: [
        {
          name: "Instigation",
          text: "Reads people's feelings, wants and grudges, and thinks faster. Used actively it makes the Instigator seem reliable and likeable. Paired with the right words, it stirs up buried urges and steers choices. Not much use in a fight, very powerful everywhere else.",
        },
        {
          name: "Charm, misdirection, persuasion",
          text: "Masters of fanning conflict, starting feuds and setting off bloodshed. The body also grows much tougher.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A crystal sculpture of full, beautiful lips." }],
    },
    {
      n: 7,
      name: "Witch",
      potion: "Rose-red, dreamy and romantic-looking.",
      main: ["All the blood of an Abyss Demonic Fish", "An Agate Peacock egg"],
      sub: ["3 Shadow Lizard scales", "10 drops daffodil juice", "80 ml pure water", "5 drops golden jimsonweed juice"],
      acting: [
        "A Witch isn't simply evil. Darkness can do good: use it to grant wishes, and in doing so tempt people to fall.",
      ],
      powers: [
        {
          name: "Transformation",
          text: "The drinker becomes fully female, far more beautiful and charming. Gains invisibility.",
        },
        {
          name: "Black magic",
          text: "Curses through blood and similar links, and a talent for spoiling other people's divination.",
        },
        {
          name: "Black flame and frost",
          text: "Black fire shot like bullets that burns spirit and spirituality, harmless to lifeless things. Clear lances of frost that freeze where they hit.",
        },
        {
          name: "Mirrors and wands",
          text: "Mirror magic blocks divination and makes stand-ins. A wand works as a focus, and as a stand-in too.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A sapphire-blue gem like a vertical eye, traced with fine lines." }],
    },
    {
      n: 6,
      name: "Demoness of Pleasure",
      potion: "Streaked with pinkish-red blood.",
      main: ["A pair of Succubus eyes", "Silk gland of an adult Giant Widow Spider"],
      sub: [
        "100 ml pure water",
        "5 drops black thornapple juice",
        "All the Succubus's remaining hair",
        "10 g Feynapotter fly powder",
        "5 g real mummy ash",
      ],
      acting: ["Pleasure you can't escape or resist is a kind of pain.", "Pleasure is for giving and for feeling."],
      powers: [
        {
          name: "Combined witchcraft",
          text: "Black flame, frost, curses and mirror magic all grow and can be chained, like locking onto someone through a mirror and cursing them with black fire. New charms ward off fatal wounds and start healing.",
        },
        {
          name: "Pleasure",
          text: "Even more beautiful, deeply versed in the body, and able to give partners unforgettable pleasure.",
        },
        { name: "Spider silk", text: "Invisible threads that bind and control enemies. Fire is their weakness." },
      ],
      notes: [{ label: "Characteristic", text: "A pink gem with countless threads tangled inside." }],
    },
    {
      n: 5,
      name: "Demoness of Affliction",
      potion: "Near-black blood that turns pitch-black, burping sickly green foam, like a jar of germs.",
      main: ["Head of a Flower-Faced Bat", "Gallbladder of a Double-Tailed Black Snake"],
      sub: [
        "30 ml Flower-Faced Bat blood",
        "50 ml blood from a gravely ill person",
        "Tail tip of a Double-Tailed Black Snake",
        "10 drops eucalyptus oil",
      ],
      ritual: "With no stand-in, burn at the stake for fifteen minutes and come out alive and sane.",
      acting: [
        "Destroy the beauty someone wants to protect and leave them in agony.",
        "Hurt the body and the heart. Pain is a Demoness's essence.",
        "Doubt and imagination torture more than truth.",
      ],
      powers: [
        {
          name: "Disease",
          text: "Spreads germs across thirty to fifty metres and makes them work fast: ten seconds hidden, ten of sniffles and fever, then pneumonia-like illness that can kill or cripple within two or three minutes. A Hunter's fire burns many of them away.",
        },
        {
          name: "Active charm",
          text: "Charm is now something she turns on. Enemies hesitate, hold back, even give up. Used on someone over time, they truly fall in love.",
        },
        {
          name: "Hair and silk",
          text: "Silk as nimble as an arm. Hair that pierces, injects black flame and stiffens what it touches.",
        },
        {
          name: "Sharper curses",
          text: "A mirror needs only part of a person: whatever happens to the reflected part happens to them. Mirror mazes build illusions.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A beautiful eye." }],
    },
    {
      n: 4,
      name: "Demoness of Despair",
      potion: "Deep purple with rose-red ripples.",
      main: ["Venom sac of a Plague Mother Serpent", "Crystal of a Silver Hunter"],
      sub: [
        "10 ml Plague Mother Serpent bile",
        "3 Silver Hunter fragments",
        "A fresh mistletoe branch",
        "10 ml blood from seven people who died of seven different plagues",
      ],
      ritual:
        "Plunge over thirty thousand people into a terrible plague. More deaths and deeper despair make it stronger.",
      powers: [
        {
          name: "Three plagues",
          text: "Over three kilometres. Disease strikes heart, brain and lungs in seconds. Debilitation drains strength and spirituality, so it works even on spirits and undead. Stiffness slowly turns even zombies rigid.",
        },
        {
          name: "Mirror world",
          text: "Finds any mirror within five kilometres, or ever visited, walks the mirror world, sends messages through mirrors, and projects herself through them anywhere in a city.",
        },
        {
          name: "Petrifying silk",
          text: "Tough silk that binds and carries pleasure, black flame and curses. Hair turns whatever it touches towards stone.",
        },
        {
          name: "Seeing weakness",
          text: "Sees weak spots not just in body, spirit, defence and fate, but in emotions and desires too.",
        },
      ],
      notes: [
        {
          label: "Characteristic",
          text: "A shrivelled, blackened, see-through heart that becomes a weeping clear eye if set against a real one.",
        },
      ],
    },
    {
      n: 3,
      name: "Demoness of Unaging",
      potion: "Greyish-white, clearly reflecting the mirror world around it.",
      main: ["Heart of a Mirror God", "A pair of Gorgon eyes"],
      sub: [
        "9 Mirror God fragments",
        "80 ml Gorgon blood",
        "A mirror more than five hundred years old with its own mirror region",
        "22 drops of water from a drowned person's lungs",
      ],
      ritual:
        "Find your mirror self and, alone, enslave it, make it fall in love with you, or make peace with it. Peace means you never have to fight it again.",
      acting: ["Through hundreds, even thousands of years, keep a heart that never grows old."],
      powers: [
        {
          name: "Undying",
          text: "Ageless and young for at least two thousand years. Killing the body or one mirror self is only a wound. Many mirror selves can exist at once, plus a sleeper hidden in a secret warded mirror. Until that mirror is found, she comes back.",
        },
        {
          name: "Petrification",
          text: "Turns things to stone, spreading from her or along her silk. In half-mythical form her hair becomes snakes with black-and-white eyes that petrify whatever they see.",
        },
        {
          name: "Cursing eyes",
          text: "Her eyes are mirrors that curse whatever they see, even a target's close family given a link. With grand rituals, even angels.",
        },
        {
          name: "Mirror mastery",
          text: "Pulls weaker beings, whole buildings or streets into the mirror world unnoticed, and projects up to Sequence 4 power through mirrors across fifteen kilometres.",
        },
        {
          name: "Rejuvenation",
          text: "Lends youth to others for up to half an hour. Plague reaches ten kilometres and spreads on its own.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A fist-sized crystal like a spring, or exquisite on human skin." }],
    },
    {
      n: 2,
      name: "Demoness of Catastrophe",
      potion: "As if the whole sky before a storm had been moved into a bottle.",
      main: ["Lilith's hair, or a Demoness of Catastrophe characteristic"],
      sub: [
        "30 g fertile soil",
        "100 ml rain from the year's first flood",
        "A shard of the mirror world",
        "Ten thousand curses from disaster victims (fewer if they mattered more)",
      ],
      ritual: "Help create a catastrophe that covers a continent, and advance in the middle of it.",
      powers: [
        {
          name: "Catastrophe",
          text: "Natural disasters from blizzards to meteors, and human ones too: derailed trains, collapsing buildings, misfiring guns. More broadly, it makes any fragile system crack, so an unstable Beyonder can be tipped into losing control.",
        },
        {
          name: "Fate curse",
          text: "A cursed object or a few spoken words bring a lifetime of disasters to whoever touches or hears them.",
        },
        { name: "Mythic plagues", text: "Germs strong enough to eat into a full mythical creature." },
      ],
      notes: [{ label: "Characteristic", text: "A clear crystal ball made of scenes of disaster." }],
    },
    {
      n: 1,
      name: "Demoness of Apocalypse",
      potion: "Deep black, thick with destruction.",
      main: ["A Demoness of Apocalypse characteristic"],
      sub: [
        "A patch of lifeless darkness",
        "81 people obsessed with you",
        "An apocalypse you made that is still going on",
        "60 ml Weather Warlock blood",
      ],
      ritual:
        "Advance at the turn of an epoch, during the coming of an apocalypse, or when you've helped bring a god down. Any one will do.",
      powers: [
        {
          name: "Apocalypse",
          text: "Ends everything in an area at once, fate included: every contradiction bursts at the same time. Catastrophe is about how disasters look. Apocalypse is about the final result arriving.",
        },
        {
          name: "Pleasure",
          text: "Pleasure so deep it drowns you, followed by an emptiness that makes you crave more, to the point of dying for it.",
        },
        {
          name: "Disease, flame, frost, mirrors",
          text: "Commands everything that causes illness, not just germs. Black flame comes from Chaos, frost from Catastrophe, and reality can swap places with its reflection.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A dark sphere." }],
    },
    {
      n: 0,
      name: "Primordial Demoness",
      potion: "A woman's skin of ultimate allure.",
      main: ["The Demoness Uniqueness", "Three Apocalypse characteristics"],
      sub: ["A true love born from yourself, made half real", "Half of the mirror world"],
      ritual:
        "Go deep underground to the Chaos Sea and endure its taint without falling or mutating. Or combine the power of five Sequence 1s tied to the Chaos Sea into something like it, and master that.",
      powers: [
        {
          name: "Chaos",
          text: "Everything returning to the primordial one, an ending unlike death or decay. It can't hit stable things directly. First comes catastrophe, then apocalypse, and the vortex of chaos left behind melts whatever it draws in into one of many unborn possibilities.",
        },
        {
          name: "Primordial",
          text: "Chaos is the end, the Primordial is the beginning, and for the feminine side of the Creator they're nearly the same. Here it means stillness and stasis, which is where petrification comes from.",
        },
        {
          name: "Mirrors",
          text: "Everything mirrored is hers, along with agelessness and rebirth. While any mirror world survives, she can't truly die.",
        },
        {
          name: "Charm",
          text: "Charm as a concept: everything is drawn to her, even Great Old Ones. Those who want her Uniqueness may come to want to devour her.",
        },
        {
          name: "Femininity, black magic and plague",
          text: "Everything she sees is female. All curses and dark spells weaken or bend in her favour, and she can lay the very idea of plague over a land.",
        },
      ],
      notes: [
        { label: "Uniqueness", text: "A statue of a woman seemingly made of white bone." },
        {
          label: "Mythical form",
          text: "A Medusa whose thick serpent hair ends in black-and-white eyes or hissing heads.",
        },
        {
          label: "Divine kingdom",
          text: "Tied to the mirror world. Only women can exist there, so even gods become female. Those who see what they shouldn't turn to stone.",
        },
      ],
    },
  ],
};

export default pathway;
