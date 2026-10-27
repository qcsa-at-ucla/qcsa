import type { CommitteeMember } from "../team/committee-members";

// Same shape as a committee member, so the speaker cards reuse team/member-card.
export type Speaker = CommitteeMember;

export const speakers: Speaker[] = [
  {
    id: "vsivak",
    name: "Volodymyr Sivak",
    role: "Research Scientist",
    affiliation: "Google Quantum AI", // TODO: affiliation
    bio: "Volodymyr Sivak is a Research Scientist at Google Quantum AI, where he works on the development of quantum algorithms and software.", // TODO: bio
    headshot: "/images/qecml/speakers/vsivak.jpg",
    // hyperlink: "https://...",
    headshotPositionY: 40,
  },
];
