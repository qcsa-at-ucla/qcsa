export type CommitteeMember = {
  id: string;
  name: string;
  role?: string;
  affiliation?: string;
  bio: string;
  headshot?: string;
  /** Vertical crop position: 0 is top, 50 is center, and 100 is bottom. */
  headshotPositionY?: number;
};

export const organizingCommittee: CommitteeMember[] = [
    {
    id: "kumar-saurav",
    name: "Kumar Saurav",
    role: "Graduate student",
    affiliation: "University of Southern California",
    bio: "Saurav works on quantum error correction and machine learning.",
    headshot: "/images/qecml/organizing-committee/ksaurav.jpeg",
    headshotPositionY: 50,
  },
    {
    id: "joseph-barreto",
    name: "Joseph Barreto",
    role: "Graduate student",
    affiliation: "University of Southern California",
    bio: "Joey works on quantum error correction and machine learning.",
    headshot: "/images/qecml/organizing-committee/jbarreto.jpeg",
    headshotPositionY: 0,
  },
    {
    id: "emanuel-dallas",
    name: "Emanuel Dallas",
    role: "Graduate student",
    affiliation: "University of Southern California",
    bio: "Manny works on quantum error correction and machine learning.",
    headshot: "/images/qecml/organizing-committee/edallas.jpg",
    headshotPositionY: 25,
  },
];

export const scientificCommittee: CommitteeMember[] = [
    {
    id: "daniel-lidar",
    name: "Daniel Lidar",
    role: "Professor",
    affiliation: "University of Southern California",
    bio: "Daniel works on quantum error correction and machine learning.",
    headshot: "/images/qecml/organizing-committee/jane-doe.jpg",
    headshotPositionY: 50,
  },
    {
    id: "todd-brun",
    name: "Todd Brun",
    role: "Professor",
    affiliation: "University of Southern California",
    bio: "Todd works on quantum error correction and machine learning.",
    headshot: "/images/qecml/organizing-committee/jane-doe.jpg",
    headshotPositionY: 50,
  },
];
