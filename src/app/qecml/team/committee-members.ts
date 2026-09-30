export type CommitteeMember = {
  id: string;
  name: string;
  role?: string;
  affiliation?: string;
  bio: string;
  headshot?: string;
  hyperlink?: string;
  /** Vertical crop position: 0 is top, 50 is center, and 100 is bottom. */
  headshotPositionY?: number;
};

export const organizingCommittee: CommitteeMember[] = [
    {
    id: "kumar-saurav",
    name: "Kumar Saurav",
    role: "Graduate student",
    affiliation: "USC",
    bio: "Saurav works on quantum error correction and machine learning.",
    headshot: "/images/qecml/organizing-committee/ksaurav.jpeg",
    hyperlink: "",
    headshotPositionY: 50,
  },
    {
    id: "joseph-barreto",
    name: "Joseph Barreto",
    role: "Graduate student",
    affiliation: "USC",
    bio: "Joey works on quantum error correction and machine learning.",
    headshot: "/images/qecml/organizing-committee/jbarreto.jpeg",
    hyperlink: "",
    headshotPositionY: 0,
  },
    {
    id: "emanuel-dallas",
    name: "Emanuel Dallas",
    role: "Graduate student",
    affiliation: "USC",
    bio: "Manny works on quantum error correction and machine learning.",
    headshot: "/images/qecml/organizing-committee/edallas.jpg",
    hyperlink: "",
    headshotPositionY: 25,
  },
  {
    id: "cody-fan",
    name: "Cody Fan",
    role: "Graduate student",
    affiliation: "UCLA",
    bio: "Cody works on quantum error correction and machine learning.",
    headshot: "/images/qecml/organizing-committee/cfan.png",
    hyperlink: "",
    headshotPositionY: 35,
  },
];

export const scientificCommittee: CommitteeMember[] = [
    {
    id: "daniel-lidar",
    name: "Daniel Lidar",
    role: "Professor",
    affiliation: "USC",
    bio: "Daniel works on quantum error correction and machine learning.",
    headshot: "/images/qecml/scientific-committee/dlidar.jpg",
    hyperlink: "",
    headshotPositionY: 50,
  },
    {
    id: "todd-brun",
    name: "Todd Brun",
    role: "Professor",
    affiliation: "USC",
    bio: "Todd works on quantum error correction and machine learning.",
    headshot: "/images/qecml/scientific-committee/tbrun.jpg",
    hyperlink: "",
    headshotPositionY:0,
  },
  {
    id: "quntao-zhuang",
    name: "Quntao Zhuang",
    role: "Professor",
    affiliation: "USC",
    bio: "Quntao works on quantum error correction and machine learning.",
    headshot: "/images/qecml/scientific-committee/qzhuang.jpeg",
    hyperlink: "",
    headshotPositionY:0,
  }
];
