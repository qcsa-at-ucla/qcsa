export type Speaker = {
  id: string;
  name: string;
  role?: string;
  affiliation?: string;
  bio: string;
  headshot?: string;
  hyperlink?: string;
  /** Vertical crop position: 0 is top, 50 is center, and 100 is bottom. */
  headshotPositionY?: number;
  /** Shows an "Invited speaker" label at the bottom of the card. */
  invited?: boolean;
};

export const speakers: Speaker[] = [
  {
    id: "vsivak",
    name: "Volodymyr Sivak",
    role: "Research Scientist",
    affiliation: "Google Quantum AI",
    bio: "",
    headshot: "/images/qecml/speakers/vsivak.jpg",
    headshotPositionY: 40,
    invited: true,
  },
    {
    id: "rking",
    name: "Robbie King",
    role: "Research Scientist",
    affiliation: "Oratomic",
    bio: "",
    headshot: "/images/qecml/speakers/rking.jpg",
    headshotPositionY: 40,
    invited: false,
  },
  {
    id: "syelin",
    name: "Susanne Yelin",
    role: "Professor",
    affiliation: "Harvard University",
    bio: "",
    headshot: "/images/qecml/speakers/syelin.jpg",
    headshotPositionY: 40,
    invited: true,
  },
];
