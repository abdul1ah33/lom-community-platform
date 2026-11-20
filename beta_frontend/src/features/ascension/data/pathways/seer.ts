import type { PathwayDetail } from "../../types";

/** The Fool / Seer. Retold from the official handbook; see data/codex.ts for sourcing notes. */
const pathway: PathwayDetail = {
  slug: "seer",
  sequences: [
    {
      n: 9,
      name: "Seer",
      potion: "Thick, dark-blue and strangely sticky: every drop stays joined to the rest and refuses to split.",
      main: ["50 g Star Crystal", "10 ml Lavos Squid blood"],
      sub: ["100 ml pure water", "13 drops Nightshade juice", "7 Gold Mint leaves", "9 g Dragon Blood Herb powder"],
      acting: [
        "Read omens for others and steer them towards good outcomes.",
        "Stay humble before fate. Divination is never all-powerful, so don't trust your readings blindly.",
      ],
      powers: [
        {
          name: "Divination",
          text: "The right, and the knack, to learn Beyonder-grade divination: astromancy, cartomancy, spirit pendulums, Spirit Numerology, dowsing rods and more. Also unlocks Cogitation, Spirit Vision and ritualistic magic.",
        },
        {
          name: "Spiritual perception",
          text: "A passive sixth sense that can't be shut off. The Seer's eyes and ears are no sharper, yet they still notice hidden things and faint footsteps, and get a warning before trouble arrives.",
        },
      ],
    },
    {
      n: 8,
      name: "Clown",
      potion:
        "Gold, yellow and red ribbons wind through each other without blurring. Bubbles keep rising, can't get out, and pop without a sound.",
      main: ["Horn crystal of an adult Hornacis Gray Mountain Goat", "One whole stalk of Human-Faced Rose"],
      sub: [
        "80 ml pure water",
        "5 drops Jimsonweed juice",
        "7 g black-rimmed thornapple powder",
        "10 g golden lady's mantle powder",
        "3 drops poison hemlock juice",
      ],
      acting: ["You can glimpse a little of fate but can't change it, so hide every sorrow behind a painted smile."],
      powers: [
        {
          name: "Acrobat's body",
          text: "Balance and body control that are extreme even among Beyonders of this level, plus speed, agility, fair strength and a talent for technical fighting.",
        },
        {
          name: "Mask of the face",
          text: "Full command of expression and body language. The Clown can picture their own face and posture in their mind and begin to sculpt them.",
        },
        {
          name: "Premonitions",
          text: "Intuition paints a picture of what a target is about to do, and a prickle of warning comes before danger.",
        },
        {
          name: "Paper daggers",
          text: "Soft paper hardens into throwing knives. This is the first of the pathway's spell-like tricks.",
        },
      ],
    },
    {
      n: 7,
      name: "Magician",
      potion:
        "Like fireworks inside a vial: red, orange, yellow and green sparks keep bursting, fading and lighting up again.",
      main: ["True root stem of a Mist Treant", "All the spinal fluid of a Dark-Patterned Black Panther"],
      sub: ["60 ml pure water", "30 ml Mist Treant sap", "3 g Droplet Gem powder", "4 drops Fantasy Grass oil"],
      acting: [
        "Never perform unprepared.",
        "Attempt the impossible, even if the result is only an illusion.",
        "Take the stage, win the applause and hold the audience's eye.",
      ],
      powers: [
        {
          name: "Quick casting",
          text: "No chanting and no spirituality to pour in. A flick of the hand sets off a spell or spell-like ability.",
        },
        {
          name: "Damage transfer",
          text: "As long as their hands still move, the Magician can shift a lethal wound from a vital spot to a limb, turning a fatal blow into a light one. At this stage it only works within one body, and only once.",
        },
        {
          name: "Flaming jump",
          text: "Blinks between fires within about thirty metres, slipping briefly through the Spirit World. While jumping, ordinary flame can't hurt them.",
        },
        {
          name: "Air bullets",
          text: "A snap of the fingers fires a shot as strong as a specially made revolver round.",
        },
        {
          name: "Paper figurine substitutes",
          text: "A carefully cut paper doll takes the Magician's place, swallowing a fatal strike, dulling curses and muddying the traces left at a scene.",
        },
        {
          name: "Flame control and illusions",
          text: "Fire within thirty metres obeys a gesture. The Magician can also weave illusions with colour, sound and smell that are hard to tell from reality.",
        },
        {
          name: "Escapist's kit",
          text: "An invisible breathing tube up to about five metres long for staying underwater, joints that soften to slip any binding, and paper that can briefly turn into a club or a brick as well as a blade.",
        },
      ],
    },
    {
      n: 6,
      name: "Faceless",
      potion:
        "Blackish-green and almost alive, burping up eye-sized bubbles every few seconds. Each one bursts in a flash of colour that sketches a face with mismatched features.",
      main: ["Mutated pituitary gland of a Thousand-Faced Hunter", "Characteristic of a Human-Skinned Shadow"],
      sub: [
        "80 ml Thousand-Faced Hunter blood",
        "5 drops black thornapple juice",
        "10 g Dragon Tooth grass powder",
        "3 strands of Deep-Sea Naga hair",
      ],
      acting: [
        "You can become anyone, but you may only ever be yourself.",
        "Go deep undercover, convince everyone, and learn from how people respond to the role.",
      ],
      powers: [
        {
          name: "Faceless",
          text: "One glance takes in a person's looks and bearing, and the Faceless can wear them. It's surface-deep only: height shifts by about ten centimetres at first, the head can only grow or shrink so far, and any ordinary voice heard once can be copied.",
        },
        {
          name: "Sharpened tricks",
          text: "Flame control and flaming jumps are about a third stronger. Air bullets hit twice as hard, rivalling the newest rifles. The breathing tube is twice as long. Substitutes and damage transfer don't get stronger but can be used more often. Divination and combat improve across the board.",
        },
      ],
    },
    {
      n: 5,
      name: "Marionettist",
      potion: "Pure black, and swarming with countless worms too small for the eye to make out.",
      main: ["Dust of Ancient Wraiths", "Core crystal of a Six-Winged Gargoyle"],
      sub: [
        "Leftover spirituality of Ancient Wraiths",
        "80 ml Golden Spring water from Sonia Island",
        "10 g drago bark",
        "A pair of Six-Winged Gargoyle eyes",
      ],
      ritual: "Drink the potion while a mermaid sings.",
      acting: [
        "Every puppet has a role. Respect it while pulling the strings.",
        "Stay offstage and quietly direct the play.",
        "Let your puppets lead the enemy into your show.",
      ],
      powers: [
        {
          name: "Spirit Body Threads",
          text: "The Marionettist sees the threads that bind every living thing's spirit and body, and can pull them. It's one of the hardest powers to deal with below the high Sequences. It finds anyone hiding within about a hundred metres, even the invisible or those hiding in shadow, and freezes thoughts and limbs within five metres.",
        },
        {
          name: "Making marionettes",
          text: "With time the grip tightens: first control takes about twenty seconds, and a full puppet about five minutes. Puppets keep their own Beyonder powers and can be steered from up to a hundred metres away. Anyone killed and turned this way stays a puppet even if they come back to life.",
        },
        {
          name: "Old tricks, stronger",
          text: "Every earlier ability grows by at least half. Air bullets now match a steam rifle.",
        },
      ],
    },
    {
      n: 4,
      name: "Bizarro Sorcerer",
      potion: "Wisps of black smoke that keep forming faces or animals, then vanishing and coming back.",
      main: ["Main eye of a Bizarro Bane", "True soul body of a Spirit World Plunderer"],
      sub: [
        "200 ml Bizarro Bane blood",
        "Spirit World Plunderer dust",
        "10 g Red-hair Birch bark",
        "A length of golden grapevine",
        "A finger-sized homemade rubber mask",
      ],
      ritual:
        "Plan and stage a grand play in front of a big crowd, mostly through your own strength and scheming. Use it to kill a demigod or a creature of equal standing, then drink the potion during the finale.",
      acting: [
        "Thrilling, terrifying, stage-managed and beyond understanding on the outside.",
        "Mysterious and unknowable on the inside, with a fate no one can pin down.",
      ],
      powers: [
        {
          name: "Shared threads",
          text: "A worm split off from the mythical form travels down the threads into a puppet, so the puppet can use every one of the master's powers. Control takes three seconds and a full puppet fifteen, at up to 150 metres, with a limit of fifty puppets. The sorcerer can swap places with any puppet within a kilometre. Enemies can never be sure who they really killed.",
        },
        {
          name: "Shapeshifting",
          text: "Can take the shape of animals of similar size. In spirit form, size no longer matters. Also gains some talent for hiding.",
        },
        {
          name: "Bigger tricks",
          text: "Illusions now fool Beyonders of the same level. Wounds and illnesses can be pushed into paper dolls. Flaming jumps reach almost a kilometre, and air shots hit like artillery.",
        },
      ],
      notes: [
        {
          label: "Limit",
          text: "Puppets get no mind or self-awareness of their own, so the chain can only reach as far as the master's own control.",
        },
      ],
    },
    {
      n: 3,
      name: "Scholar of Yore",
      potion: "Half liquid, half gas, dark red and about the size of a baby's head.",
      main: ["Eyes of a Hound of Fulgrim, a Sefirah Castle guardian", "Transformed heart of a Demonic Wolf of Fog"],
      sub: [
        "100 ml Hound of Fulgrim blood",
        "A large pile of genuine ancient historical records",
        "30 g white frost crystals of a Demonic Wolf of Fog",
      ],
      ritual:
        "Step out of reality for at least three hundred years, until you yourself have become history and no longer belong to this age. Then drink.",
      acting: [
        "A scholar out of the distant past.",
        "Someone who studies the old days and brings their lost achievements back.",
        "Watch fate and change the present, but never undo the past.",
      ],
      powers: [
        {
          name: "Borrow from the past",
          text: "Calls on a healthier past self, so they never have a weak moment until their spirituality runs dry. Near full digestion that's roughly ten five-minute borrowings a day.",
        },
        {
          name: "Images from the Historical Void",
          text: "Summons people or things out of history. The better the Scholar knows them, the lower their standing and the closer the bond, the more reliably they appear and the longer they stay. Anything above the Scholar's own level comes through only partly. No more than three can be held at once.",
        },
        {
          name: "Walking in history",
          text: "Can survive inside the Historical Void for a while, raise fog and chill the air.",
        },
        {
          name: "Old tricks, perfected",
          text: "Puppet control takes two seconds and a full puppet ten, at up to 500 metres, with swaps up to five kilometres. Paper doubles absorb illnesses, curses, prophecies and gazes, can lend a fake body part that works until someone sees through it, and block divination and tracking. Flaming jumps reach five kilometres, and air shots range up to coastal-artillery force.",
        },
      ],
    },
    {
      n: 2,
      name: "Miracle Invoker",
      potion:
        "Dark liquid with a clear, glassy skin. Deep down, black whirlpools churn, as if countless eyes were opening at once.",
      main: ["Heart of the Dark Demonic Wolf (the God of Wishes), or another Miracle Invoker's characteristic"],
      sub: ["One Worm of Time", "One Worm of Star", "300 ml Dark Demonic Wolf blood"],
      ritual: "Bring a lost stretch of history back into the present.",
      acting: [
        "Walk the real world as the greatest of magicians, granting wishes and letting people witness miracles.",
        "Leave legends behind.",
        "A miracle lasts a moment, but fate goes on and on.",
      ],
      powers: [
        {
          name: "Wishes",
          text: "Others' wishes come first, and small ones before big ones. Each granted wish builds up the power to make a wish of one's own come true in battle. Sealed artifacts can kick-start the process, but the same person can't have similar wishes granted again and again in a short time. Wishes can also extend the Invoker's life.",
        },
        {
          name: "Mastering the historical fog",
          text: "Can come back to life through Worms of Spirit hidden in the past, four times in all. Nudges the odds of future events, which amounts to meddling with a target's fate. Can summon familiar scenes from the Historical Void as well as objects, up to nine things in total, though only three of them can be at angel level.",
        },
      ],
    },
    {
      n: 1,
      name: "Attendant of Mysteries",
      potion: "As dark as the sea at night and as light as air.",
      main: ["An Attendant of Mysteries characteristic"],
      sub: ["Nine specialties of the Spirit World"],
      ritual:
        "Build a town where everyone is a puppet and write a fate for each of them. Let them live real-seeming lives with each other until a matching place forms in the Spirit World. The bigger the town and the richer and longer their lives, the stronger the ritual.",
      acting: ["Serve the master of Sefirah Castle."],
      powers: [
        {
          name: "Regeneration",
          text: "Wakes the dormant threads in anything that once had a spirit, turning it into a puppet, along with any living thing deeply tied to it.",
        },
        {
          name: "Grafting",
          text: "Also called tampering. Splices together physical things or abstract ideas that should never connect, rewriting definitions, logic, targets or rules.",
        },
        { name: "Mysteries Realm", text: "The seed of a divine kingdom, full of secret effects." },
      ],
      notes: [
        { label: "Characteristic", text: "A sheet of black velvet curtain you can almost see through." },
        { label: "Bonus", text: "Advancing to this Sequence resets the Miracle Invoker's four resurrections." },
      ],
    },
    {
      n: 0,
      name: "The Fool",
      potion:
        "A dark, shapeless mass that keeps stretching, almost into a hooded cloak, or into a person hollowed of flesh and organs.",
      main: ["The Fool Uniqueness", "Three Attendant of Mysteries characteristics"],
      sub: ["Command over at least a quarter of the historical fog"],
      ritual: "Fool time, history or fate, just once.",
      powers: [
        {
          name: "Fooling",
          text: "Makes the false come true. It can dull an enemy's mind, bend the surroundings to fit an idea, and shake loose from frozen time. It can also cut the self of one second off from the next. It doesn't speed time up or slow it down. It breaks the way time is expressed, so things that need time succeed or fail.",
        },
        {
          name: "Grafting",
          text: "The Fool's other core authority, born from the symbols of Change and the Bizarre. It joins real things and abstract ideas, the Fool included, into results that are completely real. It even works on authority itself. The low-Sequence damage transfer was just one small piece of it.",
        },
        {
          name: "Dominion of the Spirit World",
          text: "The Door pathway uses the Spirit World to travel and the Error pathway to decode it. The Fool commands most of it, almost a smaller Lord of the Spirit World. Pulling and waking threads are just two uses of that power.",
        },
        {
          name: "Miracles and history",
          text: "Miracles belong to the Bizarre, which is also called the Incredible: they can't be explained, which is exactly what makes them miracles. History can't be rewritten, but the Fool can still play with it.",
        },
        {
          name: "Fate Anchor",
          text: "Words the Fool speaks can become fixed points in fate's river. What He says will happen, though it may arrive twisted and not as He meant it.",
        },
      ],
      notes: [
        { label: "Uniqueness", text: "A translucent mask carved with the Fool's sign." },
        { label: "Mythical form", text: "Worm of Spirit." },
        {
          label: "Divine kingdom",
          text: "The Mysteries Realm, born from the Bizarre and the King of Space-Time. This is where the Fool's secrecy comes from.",
        },
        {
          label: "Weakness",
          text: "A strange extreme: strong enough to shatter a star, too fragile to stand in front of one. His defences are well below most Sequence 0s.",
        },
      ],
    },
  ],
};

export default pathway;
