import type { PathwayDetail } from "../../types";

/** High-Dimensional Overseer / Shaman (Outer Deity). Retold from the official handbook. */
const pathway: PathwayDetail = {
  slug: "shaman",
  sequences: [
    {
      n: 9,
      name: "Shaman",
      powers: [
        {
          name: "Territory",
          text: "Claims an area with totems and rites. Inside it, the Shaman speaks with sky, earth, water, trees and creatures and draws on their spirit for spells, fighting like a Sequence 7. Moving territory takes about three days. Away from home it weakens fast.",
        },
        {
          name: "Seeing beyond",
          text: "The mind starts sensing other dimensions, which draws strange things trying to get in.",
        },
      ],
    },
    {
      n: 8,
      name: "Reporter",
      powers: [
        {
          name: "Truth",
          text: "Observes, investigates and lays bare the world's true nature for a limited time. It sees through mirror tricks and Spirit Body Threads at its level, but can't touch them. Extremely fast, in feet and in hands.",
        },
      ],
    },
    {
      n: 7,
      name: "Painter",
      powers: [
        {
          name: "Painting reality",
          text: "Paints what it wants real and gives it Beyonder effects. A mark painted on a creature lets it steer that creature nearby. Its work can turn prophetic, but its mind begins to wobble, like painters poisoned by their pigments.",
        },
        {
          name: "Flat things",
          text: "Gives thin, flat, lower-dimensional beings in its art a doorway into the real world.",
        },
      ],
    },
    {
      n: 6,
      name: "Literature Enthusiast",
      powers: [
        {
          name: "Characters come alive",
          text: "Brings characters and scenes from books into reality with their looks, personality and simplified powers. Unlike the Spectator, it draws on other dimensions, not the mind.",
        },
      ],
    },
    {
      n: 5,
      name: "Pixie",
      powers: [
        {
          name: "Painted worlds",
          text: "Makes real worlds inside paintings, even with a false Spirit World, sealed off from outside. Anchors a dimension and slips in and out. While inside it's nearly untouchable, even by some Saints, and can do little to the real world.",
        },
      ],
    },
    {
      n: 4,
      name: "Visitor",
      powers: [
        {
          name: "From elsewhere",
          text: "A traveller from other dimensions and timelines, now living in another dimension, with wonders and horrors to match.",
        },
      ],
    },
    {
      n: 3,
      name: "String Performer",
      powers: [{ name: "Strings", text: "Plays the strings beneath reality to bend it." }],
    },
    {
      n: 2,
      name: "Dimensional Shadow",
      powers: [
        {
          name: "Higher being",
          text: "A complete higher-dimensional being. Moves freely up and down through all eleven dimensions and uses them without limit.",
        },
      ],
    },
    {
      n: 1,
      name: "Observer",
      powers: [{ name: "Observation", text: "How it watches decides how what it watches turns out." }],
    },
    {
      n: 0,
      name: "The Eye Overlooking the Mortal Realm",
      powers: [
        {
          name: "Seen and unseen",
          text: "Sees everything and every change of fate. When it looks, flowers bloom. When it looks away, all goes still, as good as gone. By seeing and imagining it makes real things vanish and illusions real.",
        },
      ],
    },
    {
      n: -1,
      name: "High-Dimensional Overseer",
      powers: [
        {
          name: "Lord of Dimensions",
          text: "Source of all illusions and maker of the Painting World. It holds a Fantasy pathway and a Dimension pathway. The Shaman's pathway is a blend granted from both.",
        },
      ],
      notes: [
        {
          label: "Followers",
          text: "The Aquaphobes, Strings, Hostel, Eye, the Fantasy Association, Real News, the Peaceful Development Society and Observer.",
        },
      ],
    },
  ],
};

export default pathway;
