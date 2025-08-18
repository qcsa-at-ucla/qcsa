'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import MainWebsiteFooter from "../Components/mainWebsiteFooter";


// Board member data - you can easily expand this to 12 members or more or less :D
const boardMembers = [
  {
    id: 1,
    name: "Victor Yu",
    role: "President",
    major: "Physics",
    year: "2nd Year",
    bio: "Victor is a second year at UCLA studying Electrical Engineering with a minor in Mathematics. He works in the Petta Group to model the effects of cosmic rays on semiconductor spin qubits and to perform automated tune-up of quantum dot systems. He enjoys teaching others about quantum science, such as through QCSA's involvement in ACM Quantum. In his free time, he enjoys playing the piano, reading fantasy & science fiction, eating good food, and calisthenics. ",
    image: "/images/Victor Yu.png"
  },
  {
    id: 2,
    name: "Alexander Jurgens",
    role: "President",
    major: "EECS",
    year: "PhD Student",
    bio: "Alex is an EECS PhD student at the Narang Lab. He completed his BSc in Physics and MSc in Quantum Engineering at ETH Zürich in Switzerland and worked at IBM and the German Aerospace Center before joining UCLA in 2024. In his research, Alexander focuses on Quantum Algorithms and Learning Theory as well as optimization techniques and Machine Learning. On the rare occasion that he quantum tunnels outside the office he enjoys water sports, Brazilian Jiu Jitsu and all things Italian in nature.",
    image: "/images/alexander Jurgens.png"
  },
  {
    id: 3,
    name: "Nicolas Dirnegger",
    role: "Quantum Devices",
    major: "Electrical Engineering",
    year: "PhD Student",
    bio: "Nicolas received a Bachelor of Science in Electrical Engineering at ETH Zurich, Switzerland in 2022 and a Master of Science in Physics at the University of California, Los Angeles in 2023. He is currently pursuing a PhD in Electrical Engineering in the NarangLab. Currently, his main research focus is on quantum sensing and quantum networks. He also has research interests in quantum error correction and quantum computation. Feel free to reach out if you want to go surfing!",
    image: "/images/Nicolas Dirnegger.png"
  },
  // Add 9 more members following the same structure
  {
    id: 4,
    name: "Cody Fan",
    role: "Quantum Devices",
    major: "EE & Physics",
    year: "PhD Student",
    bio: "Cody received a double Bachelor of Science in Electrical Engineering and Physics from UCLA and a Masters of Science in Electrical Engineering from UCLA with a Distinguished Masters Thesis Award. He is currently pursuing a PhD at the Mesoscopic Optics and Quantum Electronics Lab as an NSF Graduate Research Fellow. Currently, his main research focus is on superconducting bosonic qubits and silicon color centers. Before starting graduate school, he interned at Stanford Research Institute as a Quantum Machine Learning Intern. In his free time, he enjoys producing music, cooking, fashion, and raving.",
    image: "/images/Cody Fan.png"
  },
  {
    id: 5,
    name: "Mu (Luca) Niu",
    role: "Website & Outreach",
    major: "Engineering",
    year: "4th Year",
    bio: "Luca, a fourth-year undergraduate student, is pursuing a double major in Physics and Mathematics. Presently, he serves as a research assistant in the group led by Professor Hongwen Jiang. With a keen interest the intersection of condensed matter physics and quantum information science, Luca is particularly fascinated by strongly correlated material and topological materials.",
    image: "/images/Luca.png"
  },
  {
    id: 6,
    name: "John Ye",
    role: "Website & Outreach",
    major: "Computer Science",
    year: "PhD Student",
    bio: "John is a 2nd-year CS PhD student in Prof. Jens Palsberg’s group. Before starting his PhD, he completed his master’s through UCLA’s MQST program. He obtained his bachelor’s in CS from Shanghai Jiaotong University. John is deeply attracted by the idea of building a quantum computer. Designing a new programming language for a fault-tolerant quantum computer is the goal of his research and career.",
    image: "/images/John Ye.png"
  },
  {
    id: 7,
    name: "Drew Downing",
    role: "Compliance",
    major: "Law",
    year: "4th Year",
    bio: "Drew is a 4th-year law student at UCLA, concentrating in Business Law & Policy, as well as Media, Entertainment, Technology & Sports Law. He additionally serves as a Chief Managing Editor for the UCLA Journal of Law & Technology, the Vice President of the Law & Entrepreneurship Association, and an Alumni & Career Outreach Chair for the AI Law Association. Before law school, he received his bachelor's degree in Mathematics & Philosophy from Boston University, minoring in Economics. After law school, he expects to pursue a career in transactional law in entrepreneurial sectors.",
    image: "/images/Drew.png"
  },
  {
    id: 8,
    name: "Samuel Oh",
    role: "Finances",
    major: "Computer Science & Economics",
    year: "3rd Year",
    bio: "Samuel is a 3rd-year Computer Science and Economics student at UCLA. He serves as Sector Head at Bruin Capital Management and is actively involved in multiple finance organizations on campus. Samuel previously served 18 months in the Republic of Korea Army, where he worked in Korean-English interpretation and military logistics. His past experiences also include internships in corporate finance and consulting. After graduation, he hopes to pursue a career in the finance industry.",
    image: "/images/Samuel.png"
  },
  {
    id: 9,
    name: "Ilaana Khan",
    role: "Events & Advertisement",
    major: "Physics",
    year: "2nd Year",
    bio: "Ilaana is an undergraduate at UCLA studying Biophysics and on the QCSA leadership board. She is involved in the research of computational fluid dynamics to model blood vessels, talent development via mixed-methods psychology, and modeling distant stars in the Milky Way galaxy. Ilaana has previously worked with the American Cancer Society, ACM, City of Austin Law Department, Society of Robotic Surgeons, and Ascension Seton Medical Center in Austin. At UCLA, Ilaana is an editor at the Society and Genetics Research Journal and co-manager of the Upsilon Lab CFD group. She is also a nationally registered Emergency Medical Technician. Outside of her academic involvements, Ilaana loves Roblox, Minecraft, and caffeine. ",
    image: "/images/ilaana.png"
  },
  {
    id: 10,
    name: "Naren Sathishkumar",
    role: "",
    major: "Computer Science",
    year: "2nd Year",
    bio: "Naren is a 2nd-year undergraduate computer science major. He's interested quantum optimization algorithms and building the latest in quantum software. He's currently researching heuristics to solve the qubit mapping problem. Outside of programming, he enjoys mountain biking and skiing in the mountains..",
    image: "/images/Naren.png"
  },
  {
    id: 11,
    name: "Connor Engel",
    role: "Technology Officer",
    major: "Computer Science",
    year: "3rd Year",
    bio: "Connor is a third-year undergraduate student majoring in Physics. He currently works as a research assistant in Professor Qianhui Shi’s laboratory, where he contributes to condensed matter physics. Connor is passionate about exploring the fundamental principles of physics and is particularly fascinated by the potential of photonics in advancing quantum computing technologies. He also has an adorable dog who is terrified of Connor getting weird ideas about boxes and superpositions.",
    image: "/images/Connor.png"
  },
  {
    id: 12,
    name: "Shreya Shirsathe",
    role: "Events & Advertisement",
    major: "Physics",
    year: "3rd Year",
    bio: "Shreya is a 3rd-year undergraduate Computer Engineering student. She is interested in quantum algorithms and hybrid quantum-classical systems. She enjoys connecting with others who share a passion for quantum computing and exploring how classical and quantum systems can work together. Outside of school, she enjoys snowboarding, dancing, and playing the guitar.",
    image: "/images/Shreya.png"
  },
  {
    id: 13,
    name: "Harshita Kukreja",
    role: "Head of Digital infrastructure",
    major: "Computer Science and Engineering",
    year: "2nd Year",
    bio: "",
    image: "/images/harshita.png"
  },
  {
    id: 14,
    name: "Clyde Villacrusis",
    role: "Web Developer",
    major: "Computer Science",
    year: "4th Year",
    bio: "Helloo!! Clyde Villacrusis is an undergraduate 4th year Computer Science and Linguistics double major. He is apart of the QCSA's tech team and working on making an interactive and accessible website for all. He is extremely excited to learn more about Quantum Computing while also developing his tech skills. Besides QCSA. he also interned under UCLA Health to make their AI-powered application (still in progress) and he is also in fetch.ai x qcsa x bruin.ai research group to research more about predicting binding affinities using hybrid CNNs, traditional Machine learning modes, and quantum circuits! He also likes to play Valorant, Minecraft, nature, and caffeine. Hit him up anytime to learn or just to chat about anything!",
    image: "/images/clyde.png"
  },
  {
    id: 15,
    name: "Emma Zhang",
    role: "Web Developer",
    major: "Computer Science",
    year: "2nd Year",
    bio: "Emma is a second year undergraduate Computer Science student at UCLA with an interest in software development and AI. In her free time, she enjoys playing volleyball, visiting cafes, and learning Japanese.",
    image: "/images/emma.png"
  },
  {
    id: 16,
    name: "Kimberley Wu",
    role: "Designer",
    major: "Design Media Arts and Psychology",
    year: "2nd-Year",
    bio: "Kimberley is a second-year undergraduate studying Design Media Arts and Psychology. She is part of QCSA’s design team, creating engaging websites and developing their visual branding. She is excited to learn more about quantum science while building her design skills. Kimberley previously interned in communications at BOUSD and is currently involved in Daily Bruin, BruinLife, Adobe Creatives, and Stratist Prep. In her free time, she enjoys spontaneous side-quests, playing tennis, photography, and sketch-booking.",
    image: "/images/kimberley.png"
  },
  {
    id: 17,
    name: "Gina Namkung",
    role: "Designer",
    major: "Cognitive Science and Architecture",
    year: "2nd Year",
    bio: "Gina is a second year undergraduate Cognitive Science and Architecture student at UCLA. She is a part of the QCSA's design team and eager to create an intuitive and immersive website experience for all. Gina is passionate about learning more about the art of quantum while developing design skills. At UCLA Gina is involved in the Data-Graphics section of the Daily Bruin, secretary for the American Institute of Architecture Students, and worked as a designer for a journaling app called Rose Garden. In her free time you can find her exploring LA for new thrift finds and cafes.",
    image: "/images/gina.png"
  },
  {
    id: 18,
    name: "Sanskriti Shindadkar",
    role: "Researcher Lead",
    major: "Bioengineering",
    year: "4th Year",
    bio: "Sanskriti is a fourth year undergraduate bioengineering student at UCLA. She enjoys exploring quantum computing for chemistry and biological applications. She has previously led the industry collaboration with QCSA, BruinAI, and Fetch.ai to explore the use of hybrid quantum-CNNs for predicting protein-ligand binding energies. She loves hearing about projects other people are working on and are excited about, so contact her any time to chat over lunch :)",
    image: "/images/sanskriti.png"
  },
  {
    id: 19,
    name: "Sadman Ahmed Shanto",
    role: "President of USC QCSA",
    major: "PhD Candidate",
    year: "5th Year",
    bio: "Sadman Ahmed Shanto is a Ph.D. candidate in Physics at the University of Southern California, working in the Levenson-Falk Lab on superconducting quantum hardware. His research focuses on quasiparticle dynamics in superconducting circuits and the automation of quantum device design workflows. To learn more about his work and interests, you can visit https://sadmanahmedshanto.com/",
    image: "/images/shanto.png"
  },
 
];

const facultyLeadership = [
  {
    id: 21,
    name: "Professor Mark Gyure",
    role: "Faculty Director",
    bio: "In addition to coordinating the day-to-day activities of the CQSE, Gyure’s research is focused on the theory and simulation of solid-state quantum information processing devices and architectures, specifically electrostatically-defined semiconductor quantum dots. He and collaborators at UCLA and HRL Laboratories, LLC in Malibu have developed a sophisticated device modeling code that employs the full configuration-interaction (FCI) method to solve the multi-electron Schrodinger equation self consistently with the electrostatic potential generated from realistic device geometries, enabling highly accurate calculations of the energy spectrum of coupled quantum dot systems. He came to UCLA recently from HRL Laboratories where he was the Principal Investigator and Chief Scientist for over 15 years on numerous programs in the quantum information science and technology area.",
    image: "/images/mark.png"
  }
];

export default function AboutPage() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#F3F8FF]">
      {/* Mission Statement Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold text-[#234285] mb-8 font-[Kantumruy]">
                Mission Statement
              </h2>
              <div className="space-y-4 text-lg text-[#234285] font-[Kantumruy]">
                <p>We want to empower the next generation of students through hands-on learning, collaboration, and prepare them to lead in the field.</p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                <Image
                  src={'/images/Final_QCSA_Logo-13.png'}
                  alt="QCSA Logo"
                  width={400}
                  height={200}
                  className="object-contain"
                  onError={(e) => { e.currentTarget.src = '/images/placeholder-logo.jpg'; }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#234285] text-center mb-16">
            Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Collaboration */}
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="text-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg width="67" height="55" viewBox="0 0 67 55" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M14.5 20.5C16.6217 20.5 18.6566 19.6571 20.1569 18.1569C21.6571 16.6566 22.5 14.6217 22.5 12.5C22.5 10.3783 21.6571 8.34344 20.1569 6.84315C18.6566 5.34285 16.6217 4.5 14.5 4.5C12.3783 4.5 10.3434 5.34285 8.84315 6.84315C7.34285 8.34344 6.5 10.3783 6.5 12.5C6.5 14.6217 7.34285 16.6566 8.84315 18.1569C10.3434 19.6571 12.3783 20.5 14.5 20.5ZM14.5 24.5C16.0759 24.5 17.6363 24.1896 19.0922 23.5866C20.5481 22.9835 21.871 22.0996 22.9853 20.9853C24.0996 19.871 24.9835 18.5481 25.5866 17.0922C26.1896 15.6363 26.5 14.0759 26.5 12.5C26.5 10.9241 26.1896 9.36371 25.5866 7.9078C24.9835 6.45189 24.0996 5.12902 22.9853 4.01472C21.871 2.90042 20.5481 2.0165 19.0922 1.41345C17.6363 0.81039 16.0759 0.5 14.5 0.5C11.3174 0.5 8.26516 1.76428 6.01472 4.01472C3.76428 6.26516 2.5 9.3174 2.5 12.5C2.5 15.6826 3.76428 18.7348 6.01472 20.9853C8.26516 23.2357 11.3174 24.5 14.5 24.5Z" fill="#234285"/>
<path fillRule="evenodd" clipRule="evenodd" d="M9.916 20.0842C10.1023 20.27 10.25 20.4907 10.3509 20.7337C10.4517 20.9767 10.5036 21.2371 10.5036 21.5002C10.5036 21.7633 10.4517 22.0238 10.3509 22.2667C10.25 22.5097 10.1023 22.7304 9.916 22.9162L8.564 24.2642C5.96214 26.8668 4.50034 30.3961 4.5 34.0762V41.5002C4.5 42.0306 4.28929 42.5393 3.91421 42.9144C3.53914 43.2895 3.03043 43.5002 2.5 43.5002C1.96957 43.5002 1.46086 43.2895 1.08579 42.9144C0.710714 42.5393 0.5 42.0306 0.5 41.5002V34.0762C0.500567 29.3353 2.38394 24.7888 5.736 21.4362L7.084 20.0842C7.26978 19.898 7.49048 19.7502 7.73347 19.6494C7.97645 19.5485 8.23693 19.4966 8.5 19.4966C8.76307 19.4966 9.02355 19.5485 9.26653 19.6494C9.50952 19.7502 9.73022 19.898 9.916 20.0842ZM57.084 18.8842C56.8977 19.07 56.75 19.2907 56.6492 19.5337C56.5483 19.7767 56.4964 20.0371 56.4964 20.3002C56.4964 20.5633 56.5483 20.8238 56.6492 21.0667C56.75 21.3097 56.8977 21.5304 57.084 21.7162L58.436 23.0642C61.0379 25.6668 62.4997 29.1961 62.5 32.8762V41.5002C62.5 42.0306 62.7107 42.5393 63.0858 42.9144C63.4609 43.2895 63.9696 43.5002 64.5 43.5002C65.0304 43.5002 65.5391 43.2895 65.9142 42.9144C66.2893 42.5393 66.5 42.0306 66.5 41.5002V32.8762C66.4994 28.1353 64.6161 23.5888 61.264 20.2362L59.916 18.8842C59.7302 18.698 59.5095 18.5502 59.2665 18.4494C59.0236 18.3485 58.7631 18.2966 58.5 18.2966C58.2369 18.2966 57.9764 18.3485 57.7335 18.4494C57.4905 18.5502 57.2698 18.698 57.084 18.8842Z" fill="#234285"/>
<path fillRule="evenodd" clipRule="evenodd" d="M50.5 20.5C48.3783 20.5 46.3434 19.6571 44.8431 18.1569C43.3429 16.6566 42.5 14.6217 42.5 12.5C42.5 10.3783 43.3429 8.34344 44.8431 6.84315C46.3434 5.34285 48.3783 4.5 50.5 4.5C52.6217 4.5 54.6566 5.34285 56.1569 6.84315C57.6571 8.34344 58.5 10.3783 58.5 12.5C58.5 14.6217 57.6571 16.6566 56.1569 18.1569C54.6566 19.6571 52.6217 20.5 50.5 20.5ZM50.5 24.5C48.9241 24.5 47.3637 24.1896 45.9078 23.5866C44.4519 22.9835 43.129 22.0996 42.0147 20.9853C40.9004 19.871 40.0165 18.5481 39.4134 17.0922C38.8104 15.6363 38.5 14.0759 38.5 12.5C38.5 10.9241 38.8104 9.36371 39.4134 7.9078C40.0165 6.45189 40.9004 5.12902 42.0147 4.01472C43.129 2.90042 44.4519 2.0165 45.9078 1.41345C47.3637 0.81039 48.9241 0.5 50.5 0.5C53.6826 0.5 56.7348 1.76428 58.9853 4.01472C61.2357 6.26516 62.5 9.3174 62.5 12.5C62.5 15.6826 61.2357 18.7348 58.9853 20.9853C56.7348 23.2357 53.6826 24.5 50.5 24.5ZM32.5 37.5C29.8478 37.5 27.3043 38.5536 25.4289 40.4289C23.5536 42.3043 22.5 44.8478 22.5 47.5V52.7C22.5 53.2304 22.2893 53.7391 21.9142 54.1142C21.5391 54.4893 21.0304 54.7 20.5 54.7C19.9696 54.7 19.4609 54.4893 19.0858 54.1142C18.7107 53.7391 18.5 53.2304 18.5 52.7V47.5C18.5 43.787 19.975 40.226 22.6005 37.6005C25.226 34.975 28.787 33.5 32.5 33.5C36.213 33.5 39.774 34.975 42.3995 37.6005C45.025 40.226 46.5 43.787 46.5 47.5V52.7C46.5 53.2304 46.2893 53.7391 45.9142 54.1142C45.5391 54.4893 45.0304 54.7 44.5 54.7C43.9696 54.7 43.4609 54.4893 43.0858 54.1142C42.7107 53.7391 42.5 53.2304 42.5 52.7V47.5C42.5 46.1868 42.2413 44.8864 41.7388 43.6732C41.2362 42.4599 40.4997 41.3575 39.5711 40.4289C38.6425 39.5003 37.5401 38.7638 36.3268 38.2612C35.1136 37.7587 33.8132 37.5 32.5 37.5Z" fill="#234285"/>
<path fillRule="evenodd" clipRule="evenodd" d="M32.5 31.4998C34.6217 31.4998 36.6566 30.6569 38.1569 29.1566C39.6571 27.6563 40.5 25.6215 40.5 23.4998C40.5 21.378 39.6571 19.3432 38.1569 17.8429C36.6566 16.3426 34.6217 15.4998 32.5 15.4998C30.3783 15.4998 28.3434 16.3426 26.8431 17.8429C25.3429 19.3432 24.5 21.378 24.5 23.4998C24.5 25.6215 25.3429 27.6563 26.8431 29.1566C28.3434 30.6569 30.3783 31.4998 32.5 31.4998ZM32.5 35.4998C35.6826 35.4998 38.7348 34.2355 40.9853 31.985C43.2357 29.7346 44.5 26.6824 44.5 23.4998C44.5 20.3172 43.2357 17.2649 40.9853 15.0145C38.7348 12.764 35.6826 11.4998 32.5 11.4998C29.3174 11.4998 26.2652 12.764 24.0147 15.0145C21.7643 17.2649 20.5 20.3172 20.5 23.4998C20.5 26.6824 21.7643 29.7346 24.0147 31.985C26.2652 34.2355 29.3174 35.4998 32.5 35.4998Z" fill="#234285"/>
</svg>

                </div>
                <h3 className="text-2xl font-bold text-[#234285] mb-4 font-[Kantumruy]">Collaboration</h3>
              </div>
              <p className="text-gray-700 text-center font-[Kantumruy]">
                We believe that progress in quantum computing comes from interdisciplinary teamwork. QCSA 
                fosters a supportive community that brings together students, researchers, and industry leaders.
              </p>
            </div>

            {/* Educate */}
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="text-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                 <svg width="67" height="55" viewBox="0 0 67 55" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M14.5 20.5C16.6217 20.5 18.6566 19.6571 20.1569 18.1569C21.6571 16.6566 22.5 14.6217 22.5 12.5C22.5 10.3783 21.6571 8.34344 20.1569 6.84315C18.6566 5.34285 16.6217 4.5 14.5 4.5C12.3783 4.5 10.3434 5.34285 8.84315 6.84315C7.34285 8.34344 6.5 10.3783 6.5 12.5C6.5 14.6217 7.34285 16.6566 8.84315 18.1569C10.3434 19.6571 12.3783 20.5 14.5 20.5ZM14.5 24.5C16.0759 24.5 17.6363 24.1896 19.0922 23.5866C20.5481 22.9835 21.871 22.0996 22.9853 20.9853C24.0996 19.871 24.9835 18.5481 25.5866 17.0922C26.1896 15.6363 26.5 14.0759 26.5 12.5C26.5 10.9241 26.1896 9.36371 25.5866 7.9078C24.9835 6.45189 24.0996 5.12902 22.9853 4.01472C21.871 2.90042 20.5481 2.0165 19.0922 1.41345C17.6363 0.81039 16.0759 0.5 14.5 0.5C11.3174 0.5 8.26516 1.76428 6.01472 4.01472C3.76428 6.26516 2.5 9.3174 2.5 12.5C2.5 15.6826 3.76428 18.7348 6.01472 20.9853C8.26516 23.2357 11.3174 24.5 14.5 24.5Z" fill="#234285"/>
<path fillRule="evenodd" clipRule-="evenodd" d="M9.916 20.0842C10.1023 20.27 10.25 20.4907 10.3509 20.7337C10.4517 20.9767 10.5036 21.2371 10.5036 21.5002C10.5036 21.7633 10.4517 22.0238 10.3509 22.2667C10.25 22.5097 10.1023 22.7304 9.916 22.9162L8.564 24.2642C5.96214 26.8668 4.50034 30.3961 4.5 34.0762V41.5002C4.5 42.0306 4.28929 42.5393 3.91421 42.9144C3.53914 43.2895 3.03043 43.5002 2.5 43.5002C1.96957 43.5002 1.46086 43.2895 1.08579 42.9144C0.710714 42.5393 0.5 42.0306 0.5 41.5002V34.0762C0.500567 29.3353 2.38394 24.7888 5.736 21.4362L7.084 20.0842C7.26978 19.898 7.49048 19.7502 7.73347 19.6494C7.97645 19.5485 8.23693 19.4966 8.5 19.4966C8.76307 19.4966 9.02355 19.5485 9.26653 19.6494C9.50952 19.7502 9.73022 19.898 9.916 20.0842ZM57.084 18.8842C56.8977 19.07 56.75 19.2907 56.6492 19.5337C56.5483 19.7767 56.4964 20.0371 56.4964 20.3002C56.4964 20.5633 56.5483 20.8238 56.6492 21.0667C56.75 21.3097 56.8977 21.5304 57.084 21.7162L58.436 23.0642C61.0379 25.6668 62.4997 29.1961 62.5 32.8762V41.5002C62.5 42.0306 62.7107 42.5393 63.0858 42.9144C63.4609 43.2895 63.9696 43.5002 64.5 43.5002C65.0304 43.5002 65.5391 43.2895 65.9142 42.9144C66.2893 42.5393 66.5 42.0306 66.5 41.5002V32.8762C66.4994 28.1353 64.6161 23.5888 61.264 20.2362L59.916 18.8842C59.7302 18.698 59.5095 18.5502 59.2665 18.4494C59.0236 18.3485 58.7631 18.2966 58.5 18.2966C58.2369 18.2966 57.9764 18.3485 57.7335 18.4494C57.4905 18.5502 57.2698 18.698 57.084 18.8842Z" fill="#234285"/>
<path fillRule="evenodd" clipRule="evenodd" d="M50.5 20.5C48.3783 20.5 46.3434 19.6571 44.8431 18.1569C43.3429 16.6566 42.5 14.6217 42.5 12.5C42.5 10.3783 43.3429 8.34344 44.8431 6.84315C46.3434 5.34285 48.3783 4.5 50.5 4.5C52.6217 4.5 54.6566 5.34285 56.1569 6.84315C57.6571 8.34344 58.5 10.3783 58.5 12.5C58.5 14.6217 57.6571 16.6566 56.1569 18.1569C54.6566 19.6571 52.6217 20.5 50.5 20.5ZM50.5 24.5C48.9241 24.5 47.3637 24.1896 45.9078 23.5866C44.4519 22.9835 43.129 22.0996 42.0147 20.9853C40.9004 19.871 40.0165 18.5481 39.4134 17.0922C38.8104 15.6363 38.5 14.0759 38.5 12.5C38.5 10.9241 38.8104 9.36371 39.4134 7.9078C40.0165 6.45189 40.9004 5.12902 42.0147 4.01472C43.129 2.90042 44.4519 2.0165 45.9078 1.41345C47.3637 0.81039 48.9241 0.5 50.5 0.5C53.6826 0.5 56.7348 1.76428 58.9853 4.01472C61.2357 6.26516 62.5 9.3174 62.5 12.5C62.5 15.6826 61.2357 18.7348 58.9853 20.9853C56.7348 23.2357 53.6826 24.5 50.5 24.5ZM32.5 37.5C29.8478 37.5 27.3043 38.5536 25.4289 40.4289C23.5536 42.3043 22.5 44.8478 22.5 47.5V52.7C22.5 53.2304 22.2893 53.7391 21.9142 54.1142C21.5391 54.4893 21.0304 54.7 20.5 54.7C19.9696 54.7 19.4609 54.4893 19.0858 54.1142C18.7107 53.7391 18.5 53.2304 18.5 52.7V47.5C18.5 43.787 19.975 40.226 22.6005 37.6005C25.226 34.975 28.787 33.5 32.5 33.5C36.213 33.5 39.774 34.975 42.3995 37.6005C45.025 40.226 46.5 43.787 46.5 47.5V52.7C46.5 53.2304 46.2893 53.7391 45.9142 54.1142C45.5391 54.4893 45.0304 54.7 44.5 54.7C43.9696 54.7 43.4609 54.4893 43.0858 54.1142C42.7107 53.7391 42.5 53.2304 42.5 52.7V47.5C42.5 46.1868 42.2413 44.8864 41.7388 43.6732C41.2362 42.4599 40.4997 41.3575 39.5711 40.4289C38.6425 39.5003 37.5401 38.7638 36.3268 38.2612C35.1136 37.7587 33.8132 37.5 32.5 37.5Z" fill="#234285"/>
<path fillRule="evenodd" clipRule="evenodd" d="M32.5 31.4998C34.6217 31.4998 36.6566 30.6569 38.1569 29.1566C39.6571 27.6563 40.5 25.6215 40.5 23.4998C40.5 21.378 39.6571 19.3432 38.1569 17.8429C36.6566 16.3426 34.6217 15.4998 32.5 15.4998C30.3783 15.4998 28.3434 16.3426 26.8431 17.8429C25.3429 19.3432 24.5 21.378 24.5 23.4998C24.5 25.6215 25.3429 27.6563 26.8431 29.1566C28.3434 30.6569 30.3783 31.4998 32.5 31.4998ZM32.5 35.4998C35.6826 35.4998 38.7348 34.2355 40.9853 31.985C43.2357 29.7346 44.5 26.6824 44.5 23.4998C44.5 20.3172 43.2357 17.2649 40.9853 15.0145C38.7348 12.764 35.6826 11.4998 32.5 11.4998C29.3174 11.4998 26.2652 12.764 24.0147 15.0145C21.7643 17.2649 20.5 20.3172 20.5 23.4998C20.5 26.6824 21.7643 29.7346 24.0147 31.985C26.2652 34.2355 29.3174 35.4998 32.5 35.4998Z" fill="#234285"/>
</svg>  

                </div>
                <h3 className="text-2xl font-bold text-[#234285] mb-4 font-[Kantumruy]">Educate</h3>
              </div>
              <p className="text-gray-700 text-center font-[Kantumruy]">
                We are committed to making quantum computing accessible to all students. Through workshops, 
                talks, and hands-on learning, we help break down complex topics and spark curiosity.
              </p>
            </div>

            {/* Innovation */}
            <div className="bg-white rounded-lg p-8 shadow-lg relative">
              {/* <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                QCSA
              </div> */}
              <div className="text-center mb-6">
                <div className="w-16 h-16  flex items-center justify-center mx-auto mb-4">
                  <svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M33.5 6.34375C34.9012 6.34375 36.9074 6.86755 39.002 7.60059C41.0737 8.32567 43.1515 9.22588 44.665 9.92188C45.852 10.4675 46.6833 11.4998 46.8984 12.7373L46.9336 12.9873C47.0946 14.5393 47.25 16.8737 47.25 20.0938C47.25 22.9111 47.1308 25.0505 46.9932 26.5811L46.9336 27.2002C46.7929 28.5472 45.9308 29.6852 44.667 30.2656C43.1524 30.9611 41.0733 31.8616 39.001 32.5869C36.9061 33.3201 34.9003 33.8438 33.5 33.8438C32.0996 33.8438 30.0939 33.3199 27.999 32.5869C25.9267 31.8618 23.8474 30.9617 22.333 30.2656H22.334C21.1483 29.72 20.3167 28.6877 20.1016 27.4502L20.0664 27.2002C19.9054 25.6482 19.75 23.3138 19.75 20.0938C19.75 17.2764 19.8692 15.137 20.0068 13.6064L20.0664 12.9873C20.2071 11.6403 21.0692 10.5023 22.333 9.92188C23.8476 9.22642 25.9267 8.3259 27.999 7.60059C30.0939 6.8674 32.0997 6.34375 33.5 6.34375Z" fill="white" stroke="#234285" stroke-width="1.375"/>
<path d="M33.5 6C34.3625 6 35.4785 6.22545 36.7314 6.60645C37.9746 6.98445 39.3102 7.50231 40.5967 8.05762C43.1494 9.15947 45.4718 10.3915 46.4404 10.9199H46.4414C46.4792 10.9423 46.5109 10.9743 46.5322 11.0127C46.5535 11.0511 46.5645 11.0948 46.5635 11.1387L46.5625 11.1553V11.1729C46.5635 11.2165 46.5533 11.2596 46.5322 11.2979C46.5117 11.3349 46.4812 11.3654 46.4453 11.3877C45.4806 11.9144 43.1545 13.1506 40.5967 14.2549C39.3101 14.8103 37.9746 15.3279 36.7314 15.7061C35.4784 16.0871 34.3624 16.3125 33.5 16.3125C32.6375 16.3124 31.5214 16.087 30.2686 15.7061C29.0255 15.3281 27.6907 14.8101 26.4043 14.2549C23.8473 13.1512 21.5216 11.9166 20.5557 11.3896C20.5195 11.3674 20.4894 11.3369 20.4688 11.2998C20.4475 11.2614 20.4365 11.2177 20.4375 11.1738V11.1562C20.4375 11.0237 20.502 10.954 20.5381 10.9336C21.4923 10.4122 23.8314 9.16844 26.4043 8.05762C27.6907 7.50226 29.0255 6.98452 30.2686 6.60645C31.5215 6.22535 32.6376 6.00005 33.5 6Z" fill="white" stroke="#234285" stroke-width="1.375"/>
<path d="M19.0625 31.4375C20.4629 31.4375 22.4686 31.9613 24.5635 32.6943C26.6354 33.4193 28.7142 34.3187 30.2285 35.0146V35.0156C31.4142 35.5613 32.2458 36.5935 32.4609 37.8311L32.4961 38.0811C32.6571 39.6331 32.8125 41.9675 32.8125 45.1875C32.8125 48.0049 32.6933 50.1442 32.5557 51.6748L32.4961 52.2939C32.3554 53.6409 31.4933 54.779 30.2295 55.3594C28.7149 56.0548 26.6358 56.9554 24.5635 57.6807C22.4686 58.4138 20.4628 58.9375 19.0625 58.9375C17.662 58.9375 15.6563 58.4137 13.5615 57.6807C12.0076 57.1369 10.45 56.4949 9.12988 55.9141L7.89746 55.3594C6.71055 54.8137 5.87919 53.7814 5.66406 52.5439L5.62891 52.2939C5.46789 50.7419 5.3125 48.4075 5.3125 45.1875C5.3125 42.3701 5.43168 40.2308 5.56934 38.7002L5.62891 38.0811C5.76958 36.7341 6.63173 35.596 7.89551 35.0156C9.41008 34.3202 11.4892 33.4196 13.5615 32.6943C15.6564 31.9612 17.6622 31.4375 19.0625 31.4375Z" fill="white" stroke="#234285" stroke-width="1.375"/>
<path d="M19.0625 31.4375C19.9254 31.4375 21.0419 31.6629 22.2949 32.0439C23.538 32.4219 24.8728 32.9399 26.1592 33.4951C28.7119 34.597 31.0342 35.829 32.0029 36.3574H32.0039C32.0417 36.3798 32.0734 36.4118 32.0947 36.4502C32.116 36.4886 32.127 36.5323 32.126 36.5762L32.125 36.5928V36.6104C32.126 36.654 32.1158 36.6971 32.0947 36.7354C32.0742 36.7724 32.0437 36.8029 32.0078 36.8252C31.0431 37.3519 28.717 38.5881 26.1592 39.6924C24.8726 40.2478 23.5371 40.7654 22.2939 41.1436C21.0409 41.5246 19.9249 41.75 19.0625 41.75C18.1997 41.7499 17.0839 41.5245 15.8311 41.1436C14.5879 40.7656 13.2523 40.2477 11.9658 39.6924C9.40918 38.5888 7.08403 37.3541 6.11816 36.8271C6.08204 36.8049 6.05187 36.7744 6.03125 36.7373C6.01 36.6989 5.99895 36.6552 6 36.6113V36.5938C6 36.4612 6.06451 36.3915 6.10059 36.3711C7.05476 35.8497 9.39387 34.6059 11.9668 33.4951C13.2532 32.9398 14.588 32.422 15.8311 32.0439C17.084 31.6628 18.2001 31.4376 19.0625 31.4375Z" fill="white" stroke="#234285" stroke-width="1.375"/>
<path d="M47.9375 31.4375C49.3393 31.4375 51.3451 31.9613 53.4395 32.6943C55.5112 33.4194 57.5889 34.3196 59.1025 35.0156C60.2894 35.5613 61.1208 36.5936 61.3359 37.8311L61.3711 38.0811C61.5321 39.6331 61.6875 41.9675 61.6875 45.1875C61.6875 48.0049 61.5683 50.1442 61.4307 51.6748L61.3711 52.2939C61.2304 53.6409 60.3683 54.779 59.1045 55.3594C57.5899 56.0548 55.5108 56.9554 53.4385 57.6807C51.3436 58.4138 49.3378 58.9375 47.9375 58.9375C46.537 58.9375 44.5313 58.4137 42.4365 57.6807C40.3645 56.9555 38.2856 56.0554 36.7705 55.3594H36.7715C35.5858 54.8137 34.7542 53.7815 34.5391 52.5439L34.5039 52.2939C34.3429 50.7419 34.1875 48.4075 34.1875 45.1875C34.1875 42.3701 34.3067 40.2308 34.4443 38.7002L34.5039 38.0811C34.6446 36.7341 35.5067 35.596 36.7705 35.0156C38.2851 34.3202 40.3642 33.4196 42.4365 32.6943C44.5314 31.9612 46.5372 31.4375 47.9375 31.4375Z" fill="white" stroke="#234285" stroke-width="1.375"/>
<path d="M47.9375 31.4375C48.8 31.4375 49.916 31.6629 51.1689 32.0439C52.4121 32.422 53.7477 32.9398 55.0342 33.4951C57.5869 34.597 59.9093 35.829 60.8779 36.3574H60.8789C60.9167 36.3798 60.9484 36.4118 60.9697 36.4502C60.991 36.4886 61.002 36.5323 61.001 36.5762L61 36.5928V36.6104C61.001 36.654 60.9908 36.6971 60.9697 36.7354C60.9492 36.7724 60.9187 36.8029 60.8828 36.8252C59.9181 37.3519 57.592 38.5881 55.0342 39.6924C53.7476 40.2478 52.4121 40.7654 51.1689 41.1436C49.9159 41.5246 48.7999 41.75 47.9375 41.75C47.075 41.7499 45.9589 41.5245 44.7061 41.1436C43.463 40.7656 42.1282 40.2476 40.8418 39.6924C38.2848 38.5887 35.9591 37.3541 34.9932 36.8271C34.957 36.8049 34.9269 36.7744 34.9062 36.7373C34.885 36.6989 34.874 36.6552 34.875 36.6113V36.5938C34.875 36.4612 34.9395 36.3915 34.9756 36.3711C35.9298 35.8497 38.2689 34.6059 40.8418 33.4951C42.1282 32.9398 43.463 32.422 44.7061 32.0439C45.959 31.6628 47.0751 31.4376 47.9375 31.4375Z" fill="white" stroke="#234285" stroke-width="1.375"/>
<path d="M19.3829 27.2712C19.5506 28.88 20.5791 30.2151 22.0463 30.8902C25.0946 32.2914 30.4475 34.5312 33.5 34.5312C36.5525 34.5312 41.9054 32.29 44.9538 30.8902C46.4209 30.2165 47.4494 28.8786 47.6171 27.2712C47.7807 25.6941 47.9375 23.336 47.9375 20.0938C47.9375 16.8515 47.7807 14.4934 47.6171 12.9162C47.4494 11.3075 46.4209 9.97237 44.9524 9.29725C41.9054 7.89612 36.5539 5.65625 33.5 5.65625C30.4475 5.65625 25.0946 7.8975 22.0463 9.29725C20.5791 9.971 19.5506 11.3089 19.3829 12.9162C19.2192 14.4934 19.0625 16.8515 19.0625 20.0938C19.0625 23.336 19.2192 25.6941 19.3829 27.2712Z" stroke="#234285" stroke-width="4.125" stroke-linejoin="round"/>
<path d="M19.0625 11.4316C19.0625 11.4316 30.585 17.2066 33.5 17.2066C36.415 17.2066 47.9375 11.4316 47.9375 11.4316" stroke="#234285" stroke-width="4.125" stroke-linejoin="round"/>
<path d="M33.5 17.2063V34.5313" stroke="#234285" stroke-width="4.125" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.94538 52.365C5.11313 53.9738 6.14163 55.3089 7.61013 55.984C10.6571 57.3851 16.01 59.625 19.0625 59.625C22.115 59.625 27.4679 57.3838 30.5162 55.984C31.9834 55.3103 33.0119 53.9724 33.1796 52.365C33.3433 50.7879 33.5 48.4298 33.5 45.1875C33.5 41.9452 33.3433 39.5871 33.1796 38.01C33.0119 36.4013 31.9834 35.0661 30.5162 34.391C27.4679 32.9899 22.115 30.75 19.0625 30.75C16.01 30.75 10.6571 32.9913 7.60875 34.391C6.14163 35.0648 5.11313 36.4026 4.94538 38.01C4.78175 39.5871 4.625 41.9452 4.625 45.1875C4.625 48.4298 4.78175 50.7879 4.94538 52.365Z" stroke="#234285" stroke-width="4.125" stroke-linejoin="round"/>
<path d="M4.625 36.5254C4.625 36.5254 16.1475 42.3004 19.0625 42.3004C21.9775 42.3004 33.5 36.5254 33.5 36.5254" stroke="#234285" stroke-width="4.125" stroke-linejoin="round"/>
<path d="M19.0625 42.3V59.625" stroke="#234285" stroke-width="4.125" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M33.8204 52.365C33.9881 53.9738 35.0166 55.3089 36.4838 55.984C39.5335 57.3851 44.885 59.625 47.9375 59.625C50.99 59.625 56.3429 57.3838 59.3913 55.984C60.8584 55.3103 61.8869 53.9724 62.0546 52.365C62.2182 50.7879 62.375 48.4298 62.375 45.1875C62.375 41.9452 62.2182 39.5871 62.0546 38.01C61.8869 36.4013 60.8584 35.0661 59.3899 34.391C56.3429 32.9899 50.9927 30.75 47.9375 30.75C44.885 30.75 39.5321 32.9913 36.4838 34.391C35.0166 35.0648 33.9881 36.4026 33.8204 38.01C33.6567 39.5871 33.5 41.9452 33.5 45.1875C33.5 48.4298 33.6567 50.7879 33.8204 52.365Z" stroke="#234285" stroke-width="4.125" stroke-linejoin="round"/>
<path d="M33.5 36.5254C33.5 36.5254 45.0225 42.3004 47.9375 42.3004C50.8525 42.3004 62.375 36.5254 62.375 36.5254" stroke="#234285" stroke-width="4.125" stroke-linejoin="round"/>
<path d="M47.9375 42.3V59.625" stroke="#234285" stroke-width="4.125" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                </div>
                <h3 className="text-2xl font-bold text-[#234285] mb-4 font-[Kantumruy]">Innovation</h3>
              </div>
              <p className="text-gray-700 text-center font-[Kantumruy]">
                QCSA encourages creative problem-solving and forward thinking. We empower students to 
                explore new ideas, contribute to cutting-edge research, and shape the future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CQSE Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#234285] text-center mb-16 font-[Kantumruy]">
            CQSE
          </h2>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="w-full h-80 bg-gradient-to-br from-blue-100 to-blue-300 rounded-lg flex items-center justify-center">
                <Image
                  src={"/images/CQSE LOGO.png"}
                  alt="CQSE Logo"
                  width={800}
                  height={300}
                  className="object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "/images/placeholder-logo.jpg";
                  }}
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <h3 className="text-3xl font text-black mb-6 font-[Kantumruy]">Who is CQSE?</h3>
              <p className="text-lg text-gray-800 mb-8 leading-relaxed font-[Kantumruy]">
                The Center for Quantum Science and Engineering (CQSE) leads UCLA&apos;s research and education in 
                quantum information science. QCSA is an undergraduate and graduate student organization 
                under CQSE, focused on all areas of quantum information science.
              </p>
              <button className="bg-[#234285] text-white px-8 py-3 rounded text-lg font-medium hover:bg-blue-700 transition-colors duration-200 font-[Kantumruy]">
                <a href="https://www.cqse.ucla.edu/" target="_blank" rel="noopener noreferrer" className="block w-full h-full">Learn More</a>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#234285] text-center mb-16 font-[Kantumruy]">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 font-[Kantumruy]">
            {boardMembers.map((member) => (
              <div
                key={member.id} 
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                
                <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105">
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center overflow-hidden">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={256}
                        height={256}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 text-2xl">📷</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 text-center font-[Kantumruy]">
                    <h3 className="font-bold text-lg text-gray-800 mb-1">{member.name}</h3>
                    <p className="text-[#234285] font-medium mb-1">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.major}, {member.year}</p>
                  </div>
                </div>

                {/* Hover Popup */}
                {hoveredMember === member.id && (
                  <div className="absolute z-50 top-0 left-0 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 p-6 transform -translate-x-2 -translate-y-2 font-[Kantumruy]">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <Image
                          src={member.image || "/images/placeholder-member.jpg"}
                          alt={member.name}
                          width={64}
                          height={64}
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-800 mb-1">{member.name}</h3>
                        <p className="text-[#234285] font-medium mb-2">{member.role}</p>
                        <p className="text-gray-600 text-sm mb-3">{member.major}, {member.year}</p>
                        <p className="text-gray-700 text-sm leading-relaxed">{member.bio}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Leadership Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#234285] text-center mb-16 font-[Kantumruy]">
            Faculty Leadership
          </h2>
            {facultyLeadership.length === 1 ? (
              <div className="flex justify-center">
                {facultyLeadership.map((faculty) => (
                  <div
                    key={faculty.id}
                    className="relative group cursor-pointer w-full max-w-sm"
                    onMouseEnter={() => setHoveredMember(faculty.id)}
                    onMouseLeave={() => setHoveredMember(null)}
                  >
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105">
                      <div className="w-full h-64 bg-gray-200 flex items-center justify-center overflow-hidden">
                        {faculty.image ? (
                          <Image
                            src={faculty.image}
                            alt={faculty.name}
                            width={256}
                            height={256}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-400 rounded-full flex items-center justify-center">
                            <span className="text-gray-600 text-3xl">📷</span>
                          </div>
                        )}
                      </div>
                      <div className="p-6 text-center font-[Kantumruy]">
                        <h3 className="font-bold text-lg text-gray-800 mb-1">{faculty.name}</h3>
                        <p className="text-[#234285] font-medium mb-1">{faculty.role}</p>
                      </div>
                    </div>

                    {/* Hover Popup for Faculty */}
                    {hoveredMember === faculty.id && (
                      <div className="absolute z-50 top-0 left-0 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 p-6 transform -translate-x-2 -translate-y-2 font-[Kantumruy]">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                            <Image
                              src={faculty.image || "/images/placeholder-member.jpg"}
                              alt={faculty.name}
                              width={64}
                              height={64}
                              className="rounded-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-800 mb-1">{faculty.name}</h3>
                            <p className="text-[#234285] font-medium mb-2">{faculty.role}</p>
                            <p className="text-gray-700 text-sm leading-relaxed">{faculty.bio}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 font-[Kantumruy] justify-items-center">
                {facultyLeadership.map((faculty) => (
                  <div
                    key={faculty.id}
                    className="relative group cursor-pointer w-full max-w-sm"
                    onMouseEnter={() => setHoveredMember(faculty.id)}
                    onMouseLeave={() => setHoveredMember(null)}
                  >
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105">
                      <div className="w-full h-64 bg-gray-200 flex items-center justify-center overflow-hidden">
                        {faculty.image ? (
                          <Image
                            src={faculty.image}
                            alt={faculty.name}
                            width={256}
                            height={256}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-400 rounded-full flex items-center justify-center">
                            <span className="text-gray-600 text-3xl">📷</span>
                          </div>
                        )}
                      </div>
                      <div className="p-6 text-center font-[Kantumruy]">
                        <h3 className="font-bold text-lg text-gray-800 mb-1">{faculty.name}</h3>
                        <p className="text-[#234285] font-medium mb-1">{faculty.role}</p>
                      </div>
                    </div>

                    {/* Hover Popup for Faculty */}
                    {hoveredMember === faculty.id && (
                      <div className="absolute z-50 top-0 left-0 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 p-6 transform -translate-x-2 -translate-y-2 font-[Kantumruy]">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                            <Image
                              src={faculty.image || "/images/placeholder-member.jpg"}
                              alt={faculty.name}
                              width={64}
                              height={64}
                              className="rounded-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-800 mb-1">{faculty.name}</h3>
                            <p className="text-[#234285] font-medium mb-2">{faculty.role}</p>
                            <p className="text-gray-700 text-sm leading-relaxed">{faculty.bio}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
        </div>
      </section>
            <MainWebsiteFooter />
    </div>
  );
}