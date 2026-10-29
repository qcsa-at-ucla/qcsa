import type { CommitteeMember } from "../team/committee-members";

// Same shape as a committee member, so the speaker cards reuse team/member-card.
export type Speaker = CommitteeMember;

export const speakers: Speaker[] = [
  {
    id: "vsivak",
    name: "Volodymyr Sivak",
    role: "Research Scientist",
    affiliation: "Google Quantum AI",
    bio: "",
    headshot: "/images/qecml/speakers/vsivak.jpg",
    headshotPositionY: 40,
  },
    {
    id: "rking",
    name: "Robbie King",
    role: "Research Scientist",
    affiliation: "Oratomic",
    bio: "",
    headshot: "/images/qecml/speakers/rking.jpg",
    headshotPositionY: 40,
  },
];
