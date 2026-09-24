export type CommitteeMember = {
  id: string;
  name: string;
  role?: string;
  affiliation?: string;
  bio: string;
  headshot?: string;
};

export const organizingCommittee: CommitteeMember[] = [
    {
    id: "kumar-saurav",
    name: "Kumar Saurav",
    role: "Graduate student",
    affiliation: "University of Southern California",
    bio: "Saurav works on quantum error correction and machine learning.",
    headshot: "/images/qecml/organizing-committee/jane-doe.jpg",
  },
    {
    id: "joseph-barreto",
    name: "Joseph Barreto",
    role: "Graduate student",
    affiliation: "University of Southern California",
    bio: "Joey works on quantum error correction and machine learning.",
    headshot: "/images/qecml/organizing-committee/jane-doe.jpg",
  },
    {
    id: "emanuel-dallas",
    name: "Emanuel Dallas",
    role: "Graduate student",
    affiliation: "University of Southern California",
    bio: "Manny works on quantum error correction and machine learning.",
    headshot: "/images/qecml/organizing-committee/jane-doe.jpg",
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
  },
    {
    id: "todd-brun",
    name: "Todd Brun",
    role: "Professor",
    affiliation: "University of Southern California",
    bio: "Todd works on quantum error correction and machine learning.",
    headshot: "/images/qecml/organizing-committee/jane-doe.jpg",
  },
];
