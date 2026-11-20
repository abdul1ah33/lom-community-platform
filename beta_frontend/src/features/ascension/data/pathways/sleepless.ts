import type { PathwayDetail } from "../../types";

/** Darkness / Sleepless. Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "sleepless",
  sequences: [
    {
      n: 9,
      name: "Sleepless",
      potion: "Black and foul-smelling.",
      main: ["One Midnight Beauty flower", "A pair of Six-Legged Owl eyes"],
      sub: [
        "80 ml strong liquor",
        "10 drops night vanilla oil",
        "3 Midnight Beauty leaves",
        "A handful of coffee beans or tea leaves",
      ],
      powers: [
        {
          name: "Child of the night",
          text: "Sees well in the dark and needs only three or four hours of rest a day. The deeper the night, the more energy they have. Strength, speed, thinking and spiritual sense pull further ahead of ordinary people over time.",
        },
        {
          name: "Danger sense",
          text: "Feels unknown threats hiding in the dark. Against monsters beyond them, they still need demon-hunting bullets and similar gear.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A pair of eyes glinting with starlight." }],
    },
    {
      n: 8,
      name: "Midnight Poet",
      potion: "Like a lake under cold light, with a whirlpool inside giving off a faint, unclear sound.",
      main: ["Vocal cords of a Crimson Moon Growler", "One Soul-Sucking Bell Flower"],
      sub: [
        "100 ml red wine",
        "7 Crimson Moon Growler hairs",
        "13 g soil from where the Bell Flower grew",
        "10 g deep-red sandalwood",
      ],
      powers: [
        { name: "Night fighter", text: "Good at fighting, shooting, climbing and noticing things." },
        {
          name: "Verses",
          text: "Poems in different styles have different effects: putting foes in a trance, calming allies, or filling a target with dread.",
        },
      ],
      notes: [{ label: "Characteristic", text: "An eerie flower like a carving in clear crystal." }],
    },
    {
      n: 7,
      name: "Nightmare",
      potion: "Ghostly and full of fleeting images, like a dream in a bottle.",
      main: ["Heart of a Dream-Eating Black Raven", "A Shadow of Nightmare"],
      sub: [
        "100 ml Spirit World Moon Water",
        "A ghostly Dream-Eating Black Raven feather",
        "A page of your own nightmares from the last two weeks",
        "9 drops moonflower extract",
      ],
      powers: [
        { name: "Dream walking", text: "Moves freely through the dreams of every sleeper in a whole city." },
        {
          name: "Dream entry",
          text: "Drags people into a dream. Face to face it's quick. Within about a hundred metres it can still work, but slowly, like rocking a child to sleep.",
        },
        {
          name: "Dream shaping",
          text: "Bends the dream as they like, coaxing out secrets or breaking a will with terror.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A dark, deep, gem-like jelly." }],
    },
    {
      n: 6,
      name: "Soul Assurer",
      potion: "Black and calm, with a surface like a mirror.",
      main: ["Spirit crystal of a Rotting Shepherd", "Skull of an Exotic Sleeper"],
      sub: [
        "80 ml blessed holy water",
        "7 drops Rotting Shepherd pus",
        "17 g soil mixed with an Exotic Sleeper's shadow",
        "10 g slumber flower powder",
      ],
      powers: [
        {
          name: "Soul Assurance",
          text: "Lulls a spirit to rest: smoothing a foe's desires and feelings, settling restless nature spirits, or calming a friend's mind like a doctor would.",
        },
        { name: "Sight of spirits", text: "Sees spirit creatures directly. Nightmares now reach 150 metres." },
        {
          name: "Rounding out",
          text: "Until now the pathway knew only the simplest rituals. From here, its other skills start to fill in.",
        },
      ],
      notes: [
        { label: "Characteristic", text: "Black with a pure light flickering at its core, like a starry night sky." },
      ],
    },
    {
      n: 5,
      name: "Spirit Warlock",
      potion: "Pitch-black with small pale dots floating inside.",
      main: ["One Source of Mad Dreams", "One spirit hive"],
      sub: [
        "100 ml blood of a Source of Mad Dreams",
        "30 ml gas from a spirit hive",
        "A soul body about to fade away",
        "A baby tooth that fell out under a full moon",
      ],
      ritual:
        "Enter the Spirit World in the flesh, not just in spirit, merge with the key image of yourself cast there, and drink.",
      powers: [
        {
          name: "Spirits in the teeth",
          text: "Seals nature spirits, wraiths or shadows in their teeth and lets them out with a tap, so several things happen at once. Each kind of spirit has its own talents. Four or five can be kept at this stage, depending on the strength of the Warlock's own spirit.",
        },
        { name: "Wider dreams", text: "Nightmares reach 200 metres." },
      ],
      notes: [{ label: "Characteristic", text: "A ghostly black beehive full of holes." }],
    },
    {
      n: 4,
      name: "Nightwatcher",
      potion: "Dark, with countless black hairs sunk in it.",
      main: ["One Brain of Darkness", "Heart of an Evil Moon Guardian"],
      sub: [
        "90 ml Evil Moon Guardian blood",
        "A corrupted object from a Brain of Darkness",
        "A flame from a bonfire kept burning more than ten years",
        "10 drops crimson tree sap",
      ],
      ritual:
        "Use the bloodline traits of a true god's descendant to draw a soul-calming circle. Whose blood you use shapes the powers you get. Those switching in from the Death or Twilight Giant pathways must use one of those three bloodlines.",
      powers: [
        {
          name: "Dark-powered",
          text: "The darker it is, the stronger they are and the faster they heal, and noon sun weakens them badly. Their Evernight domain makes up for it. They can also bring others bad luck, and are deadly against spirit creatures.",
        },
        {
          name: "Evernight Domain",
          text: "A tide of darkness rises from within: armour that cancels harmful effects, a home ground for their spirits, a drain on enemies' life, and a curse of misfortune.",
        },
        {
          name: "Hair entanglement",
          text: "Countless strands, phantom or black, reach out of dream and dark. Their cold touch quiets the mind until the victim stops fighting and falls asleep. It hints at a link with the Demoness pathway.",
        },
        {
          name: "Lullaby of darkness",
          text: "Blots out light in one spot and fills it with soft poetry that puts even raging undead to rest.",
        },
        {
          name: "More reach",
          text: "Nightmares cover a kilometre and many targets, and they can drive as many spirits as they have teeth.",
        },
      ],
      notes: [
        { label: "Characteristic", text: "A black 'candle' with brain-like folds, wrapped in vessel-like threads." },
      ],
    },
    {
      n: 3,
      name: "Horror Bishop",
      potion: "A deep black cloud reeking of death and danger, with patches of dark red.",
      main: ["Skull of a Howling Wolf", "Spirit crystal of an Underworld Supplicant"],
      sub: [
        "70 ml Howling Wolf blood",
        "10 g Underworld Supplicant dust",
        "The leftover souls of nine creatures that died of terror",
        "10 drops chamomile oil",
      ],
      ritual:
        "Face a real, deadly danger and your deepest fear. Surviving isn't enough: you must overcome or accept the fear, or the potion brings no rebirth, only death.",
      powers: [
        {
          name: "Sword of Darkness",
          text: "A carved bone longsword, a gift of the Darkness that mixes eternal rest and fear. Each swing raises a tide of darkness that dissolves whatever it swallows. Unless prepared for, there's no dodging it.",
        },
        {
          name: "Aura of Fear",
          text: "Simply looking at the Bishop makes people shake. Weak Beyonders can die of fright or lose control, so new Bishops should keep away from weaker folk.",
        },
        { name: "Nightmare World", text: "A dream world that swallows everyone in a small city." },
      ],
      notes: [
        { label: "Characteristic", text: "A rotting skull in black mist that shows the face of whoever looks at it." },
      ],
    },
    {
      n: 2,
      name: "Servant of Concealment",
      potion: "A see-through shape outlined in strange lines, like a pencil sketch.",
      main: ["Hide of a Dark Demonic Wolf, or the characteristic of Fylania, Mother of the Sky"],
      sub: [
        "300 ml Dark Demonic Wolf blood",
        "Spirit World information about a hidden place",
        "A feathered serpent's feather",
        "10 drops of giant blood from the Warrior pathway",
      ],
      ritual:
        "Cut every tie to people and the world. Influence no one, let no one influence you, and live alone in darkness and silence for three years without going mad. Time tricks that speed things up don't count, because they influence the drinker.",
      powers: [
        {
          name: "Concealment",
          text: "Some authority to hide. Shields events from prying eyes or uncovers what's hidden, and holds some sway over its own traces in the Historical Void.",
        },
        {
          name: "Erasing",
          text: "Rubs a target out of the world's notice, willing or not. Someone hidden sees the world through dark fog and can neither affect it nor be affected. An image summoned from history that is then concealed can gain a mind of its own.",
        },
        {
          name: "Revealing",
          text: "Lifts concealment, and together with hiding can pull out characteristics that carry no mental imprint.",
        },
        {
          name: "Concealed Land",
          text: "A hidden realm of its own, where targets can be locked away. Nightmare World now covers a big city.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A sticky patch you can touch but never see." }],
    },
    {
      n: 1,
      name: "Knight of Misfortune",
      potion: "Total darkness, with nothing else in it.",
      main: ["A Knight of Misfortune characteristic"],
      sub: [
        "A blessing from Fate, written on paper",
        "A breath of air from the Underworld or the Nation of Twilight",
        "600 ml of your own blood from a serious wound",
      ],
      ritual: "Become the misfortune of an archangel, a civilisation, a continent or a planet.",
      powers: [
        { name: "Archangel knight", text: "Strength, speed and toughness of a knight at Archangel level." },
        { name: "Misfortune", text: "Darkness as bad luck, poured onto enemies." },
        {
          name: "Dark Servant",
          text: "At night they're almost impossible to kill for good, coming back out of the dark each time. In the end, though, they melt into it.",
        },
        {
          name: "Sword and spirits",
          text: "The Sword of Darkness brings eternal sleep, despair and ruin, and spirits and undead sleep or obey on command.",
        },
      ],
      notes: [{ label: "Characteristic", text: "A cluster of black, sinister crystals." }],
    },
    {
      n: 0,
      name: "Darkness",
      potion: "A soft black net, as gentle as a dream, calm and deep.",
      main: ["The Darkness Uniqueness", "Three Knight of Misfortune characteristics"],
      sub: ["A moon, or something that counts as one mystically"],
      ritual:
        "Put a Uniqueness, a divine kingdom or a true god into eternal sleep. The harder the target, the better the result.",
      powers: [
        {
          name: "Concealment",
          text: "Hides every trace, misleads spying and divination, sees through countless secrets, and grows a hidden land into a hidden world that can serve as a kingdom or a prison.",
        },
        {
          name: "Darkness",
          text: "Brings dreams, peace and endless sleep, or dissolves targets into the dark. Darkness is one of the universe's deepest themes, so this god can't die in it and returns through it.",
        },
        { name: "Fear", text: "Fear itself, shared in part with the Mother Tree of Desire." },
        {
          name: "Spirits",
          text: "Where spirits end up and who rules them, shared in part with the Mother and Death.",
        },
        { name: "Misfortune", text: "Disaster brought through bad luck, overlapping with several other pathways." },
      ],
      notes: [
        { label: "Uniqueness", text: "Pitch-black, shaped like a giant scythe." },
        { label: "Mythical form", text: "A demonic wolf with black-furred limbs growing from its ribs and waist." },
      ],
    },
  ],
};

export default pathway;
