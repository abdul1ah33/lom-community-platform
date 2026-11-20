import type { PathwayDetail } from "../../types";

/** Monarch of Decay / Patient (Outer Deity). Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "patient",
  sequences: [
    {
      n: 9,
      name: "Patient",
      powers: [
        {
          name: "Rotting Patient",
          text: "Its bodily fluids carry germs, spread by touch or by opening rotting wounds that fill the air nearby. Its own body grows much tougher against disease.",
        },
      ],
    },
    {
      n: 8,
      name: "Secretary",
      powers: [
        {
          name: "Bureaucracy",
          text: "A master of paperwork and fine words who finds the gaps in any procedure and reads the boss's mind. Over time it stops caring, and comes to resent anyone whose fair request means extra work. Mighty inside an organisation, nearly powerless outside it.",
        },
      ],
    },
    {
      n: 7,
      name: "Vermin",
      powers: [
        {
          name: "Corruption aura",
          text: "Feeds on its organisation and gives off an air that quietly turns people greedy and into members of its crooked circle. It can also make one person drop their principles for pure self-interest.",
        },
        {
          name: "Hollowing out",
          text: "Weak against one person, deadly to a group. It breeds thousands of fellow vermin until the organisation looks fine but is rotten through, ready to fall at one push. That collapse is its finest offering to its god.",
        },
      ],
    },
    {
      n: 6,
      name: "Disease Envoy",
      powers: [
        {
          name: "Personal plague",
          text: "Less an epidemic than its own illnesses passed on, bringing rot, bloat and sloth.",
        },
      ],
    },
    {
      n: 5,
      name: "Child of Decay",
      powers: [
        {
          name: "Living pathogen",
          text: "Makes others decay, inflicting its own diseases in greater number and variety. Like germs that split and copy, it's very hard to wipe out completely.",
        },
      ],
    },
    {
      n: 4,
      name: "Doomed One",
      powers: [
        {
          name: "Pathogen form",
          text: "Spreads disease and rot for three kilometres. Coated in yellow-green pus, it splits into countless germs that scatter and re-form, shrugging off ordinary blows.",
        },
        {
          name: "Equal avatars",
          text: "Turns severed limbs into full-strength copies, up to a limit. Only killing them all at once, by curses or the like, ends it.",
        },
        {
          name: "Sure Hit and Certain Death",
          text: "A dark-yellow beam that can't miss unless the target swapped to a decoy or blinded the shooter first. Or a green-black beam that kills on a real hit, even against higher ranks. Not both at once. Avatars can burst into these beams to attack or escape.",
        },
      ],
    },
    {
      n: 3,
      name: "Left Hand of Decay",
      powers: [
        {
          name: "The left hand",
          text: "A swollen, half-clear cyan hand full of yellow-green pus, its veins and lines forming symbols. Its power, a weakened gift of angel rank, exceeds Sequence 3, while the rest of the body falls below Sequence 4.",
        },
        {
          name: "Seen, then rotted",
          text: "Whoever sees the hand freezes, loses their powers, feels their thoughts rot, and soon decays to death. Seeing it through an avatar or projection still cripples the real body and drags every copy down with it, unless the link was cut. Most Saints simply die.",
        },
        {
          name: "Withering touch",
          text: "Rots things around it, withers incoming powers, and flicks stones as hard as rifle bullets.",
        },
      ],
    },
    {
      n: 2,
      name: "Time Giant",
      powers: [
        {
          name: "Time",
          text: "First grip on the authority of time: scramble, speed, slow or shatter it, though never stop it. It cuts an event's start, middle and end apart to sow chaos.",
        },
      ],
    },
    {
      n: 1,
      name: "God of Decay",
      powers: [
        {
          name: "Inevitable age",
          text: "Decay and time combined: everyone must age and rot, and time hurries it along. Aging becomes the most terrible disease of all.",
        },
      ],
    },
    {
      n: 0,
      name: "The Second Law",
      powers: [
        {
          name: "Entropy",
          text: "The law that everything decays and entropy only rises. The day it all ends is also the end of the river of time. Maybe the universe itself will fall sick and die.",
        },
      ],
    },
    {
      n: -1,
      name: "Monarch of Decay",
      powers: [
        {
          name: "End of the river of time",
          text: "Symbol of all decay, ruler of rot, irreversible entropy. Three pathways: Decay, which rots matter and organisations alike; Time, under which even supreme rulers end; and Disease, personal and contagious, the source of rot.",
        },
      ],
      notes: [
        {
          label: "Mythical form",
          text: "A vast, rotting body of countless germs, swollen dark green and black, oozing yellow-green pus.",
        },
        {
          label: "Followers",
          text: "The Order of All Extinction, the Apocalyptic Sect, the Aging Society, Doomed One, the Elder Council, the Sick Church, the Decayers and the Astral Study Society.",
        },
      ],
    },
  ],
};

export default pathway;
