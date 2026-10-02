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
    bio: "Saurav joined Prof. Lidar’s group in 2023 under the ECE PhD program and is a Viterbi Graduate Fellowship recipient. Prior to USC, Saurav completed his Bachelor’s degree with Honors in Computer Science from IIT Bombay finishing a bachelor’s thesis in the research area of Natural Language Processing, following which worked as a Software Engineer at Google for 2.5 years. His current research interests mainly include quantum control and quantum error correction.",
    headshot: "/images/qecml/organizing-committee/ksaurav.jpeg",
    hyperlink: "https://www.linkedin.com/in/krsaurav/",
    headshotPositionY: 50,
  },
    {
    id: "joseph-barreto",
    name: "Joseph Barreto",
    role: "Graduate student",
    affiliation: "USC",
    bio: "Joseph (Joey) Barreto joined Prof. Lidar’s group in 2023 as part of the physics PhD program. Prior to USC, he completed a master’s degree in quantum computing at TU Delft in the Netherlands (2021) under the supervision of Prof. Johannes Borregaard. He has also worked at Bleximo Corp., a startup focusing on hardware design for superconducting qubits, and at NASA’s Quantum AI Lab, on topics in quantum algorithms and open systems. He holds bachelor degrees in physics and computer science from UC Berkeley (2017), where he worked on experimental condensed-matter physics in the group of Prof. Alex Zettl. His current interests lie at the intersection of quantum error correction, open systems, and novel qubits/gates, with an emphasis on pratical QEC schemes for near-term devices.",
    headshot: "/images/qecml/organizing-committee/jbarreto.jpeg",
    hyperlink: "https://www.linkedin.com/in/joey-barreto/",
    headshotPositionY: 0,
  },
    {
    id: "emanuel-dallas",
    name: "Emanuel Dallas",
    role: "Graduate student",
    affiliation: "USC",
    bio: "Emanuel began his PhD in 2021 and works under the supervision of Prof. Paolo Zanardi. He graduated magna cum laude from Brown University in 2018 with an Sc.B. in physics. Prior to the PhD, Emanuel worked for several years as a trader at a financial derivatives market-making firm. His research has broadly focused on characterizing and quantifying quantum information scrambling in many-body systems. More recently, he has worked on experimentally measuring scrambling-induced phenomena on NISQ processors.",
    headshot: "/images/qecml/organizing-committee/edallas.jpg",
    hyperlink: "https://www.linkedin.com/in/emanuel-dallas-3a6a23138/",
    headshotPositionY: 25,
  },
  {
    id: "cody-fan",
    name: "Cody Fan",
    role: "Graduate student",
    affiliation: "UCLA",
    bio: "Cody received a double Bachelor of Science in Electrical Engineering and Physics from UCLA and a Masters of Science in Electrical Engineering from UCLA with a Distinguished Masters Thesis Award. He is currently pursuing a PhD at the Mesoscopic Optics and Quantum Electronics Lab as an NSF Graduate Research Fellow. Currently, his main research focus is on superconducting bosonic qubits and silicon color centers. Before starting graduate school, he interned at Stanford Research Institute as a Quantum Machine Learning Intern. In his free time, he enjoys producing music, cooking, fashion, and raving.",
    headshot: "/images/qecml/organizing-committee/cfan.png",
    hyperlink: "https://www.linkedin.com/in/cody-fan-09717a167/",
    headshotPositionY: 35,
  },
  // {
  //   id: "dibyesh-ganguly",
  //   name: "Dibyesh Ganguly",
  //   role: "Undergraduate student",
  //   affiliation: "UCLA",
  //   bio: "Dibyesh works on quantum error correction and machine learning.",
  //   headshot: "/images/qecml/organizing-committee/dganguly.jpg",
  //   hyperlink: "",
  //   headshotPositionY: 35,
  // },
];

export const scientificCommittee: CommitteeMember[] = [
    {
    id: "daniel-lidar",
    name: "Daniel Lidar",
    role: "Professor",
    affiliation: "USC",
    bio: "Lidar's research focuses on quantum information processing, with a particular emphasis on quantum computation and quantum computers. His recent work spans quantum error correction, open quantum systems, quantum algorithms, quantum control, superconducting qubits, quantum phase transitions, adiabatic quantum computation, quantum annealing, and quantum machine learning.",
    headshot: "/images/qecml/scientific-committee/dlidar.jpg",
    hyperlink: "https://viterbi.usc.edu/directory/faculty/Lidar/Daniel",
    headshotPositionY: 50,
  },
    {
    id: "todd-brun",
    name: "Todd Brun",
    role: "Professor",
    affiliation: "USC",
    bio: "Brun works in the areas of quantum computation and quantum information theory. He is especially interested in quantum open systems, decoherence, and the effects of environmental noise on quantum information processing and quantum error correction. He has done recent work on fault-tolerant quantum computation, entanglement-assisted quantum error-correcting codes, quantum walks, continuous measurements and quantum control, orbital angular momentum of photons, weak measurements, quantum mechanics with closed timelike curves, and the arrow of time.",
    headshot: "/images/qecml/scientific-committee/tbrun.jpg",
    hyperlink: "https://viterbi.usc.edu/directory/faculty/Brun/Todd",
    headshotPositionY:0,
  },
  {
    id: "quntao-zhuang",
    name: "Quntao Zhuang",
    role: "Professor",
    affiliation: "USC",
    bio: "Zhuang's research focuses on quantum engineering with optical systems with applications in sensing, communication and computing.",
    headshot: "/images/qecml/scientific-committee/qzhuang.jpeg",
    hyperlink: "https://viterbi.usc.edu/directory/faculty/Zhuang/Quntao",
    headshotPositionY:0,
  }
];
