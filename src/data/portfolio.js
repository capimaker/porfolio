import arkaWebp from "../assets/arka.webp";
import arkaAvif from "../assets/arka.avif";
import patitappWebp from "../assets/patitapp.webp";
import patitappAvif from "../assets/patitapp.avif";
import patiback from "../assets/patiback.gif";

import mentorshipWebp from "../assets/mentorship.webp";
import mentorshipAvif from "../assets/mentorship.avif";
import enike from "../assets/enike.webp";
import nexusWebp from "../assets/nexusapp.webp";
import nexusAvif from "../assets/nexusapp.avif";
import apple from "../assets/apple.svg";



export const projects = [
  {
    title: "Apple Clone",
    tag: "Macbook Product Page Clone",
    type: "frontend",
    img: apple,
    techs: [
      { name: "React", icon: "/react-2.svg" },
      { name: "tailwind", icon: "/tailwind.svg" },
      { name: "three", icon: "/three.svg" },
    ],
    demo: "Live Demo",
    url: "https://appleclone-sooty.vercel.app/",
    repo: "https://github.com/capimaker/appleclone",
  },
  {
    title: "Enike",
    tag: "Ecommece Web App ",
    type: ["frontend", "backend"],
    img: enike,
    imgClass: "project-img-contain",
    techs: [
      { name: "Next.js", icon: "/nextjs.svg" },
      { name: "Tailwind CSS", icon: "/tailwind.svg" },
    ],
    demo: "Live Demo",
    url: "https://enike-eta.vercel.app/",
    repo: "https://github.com/capimaker/enike",
  },
  {
    title: "Nexus",
    tag: "TS + PostgreSQL + Node.js",
    type: "backend",
    img: nexusWebp,
    imgWebp: nexusWebp,
    imgAvif: nexusAvif,
    techs: [
      { name: "TypeScript", icon: "/typescript-2.svg" },
      { name: "Node.js", icon: "/nodejs-2.svg" },
      { name: "PostgreSQL", icon: "/postgresql.svg" },
    ],
    repo: "https://github.com/capimaker/nexusbk", // cambialo cuando tengas repo real de Nexus
  },
  {
    title: "Mentorship",
    tag: "Dashboard React + Redux",
    type: "frontend",
    img: mentorshipWebp,
    imgWebp: mentorshipWebp,
    imgAvif: mentorshipAvif,
    techs: [
      { name: "React", icon: "/react-2.svg" },
      { name: "Redux", icon: "/redux.svg" },
    ],
    repo: "https://github.com/capimaker/startApp",
  },
  {
    title: "PatitApp",
    tag: "Social Web App React ",
    type: "frontend",
    img: patitappWebp,
    imgWebp: patitappWebp,
    imgAvif: patitappAvif,
    techs: [
      { name: "React", icon: "/react-2.svg" },
      { name: "CSS", icon: "/css-3.svg" },
    ],
    demo: "Live Demo",
    url: "https://patit-app.vercel.app/",
    repo: "https://github.com/capimaker/patitApp",
  },
  {
    title: "PatitApp API",
    tag: "Social Web App Node.js + Express + MongoDB",
    type: "backend",
    img: patiback,
    techs: [
      { name: "Node.js", icon: "/nodejs-2.svg" },
      { name: "Express", icon: "/express-109.svg", class: "icon-express" },
      { name: "MongoDB", icon: "/mongodb.svg" },
    ],
    repo: "https://github.com/capimaker/PatitasBackend",
  },
  {
    title: "ArkaScript",
    tag: "Javascript Vanilla Game",
    type: "frontend",
    img: arkaWebp,
    imgWebp: arkaWebp,
    imgAvif: arkaAvif,
    techs: [
      { name: "JavaScript", icon: "/js.png" },
    ],
    demo: "Live Demo",
    url: "https://capimaker.github.io/Arkascript/",
    repo: "https://github.com/capimaker/Arkascript",
  },
  /* {
    title: "Apple Clone",
    tag: "Macbook Product Page Clone",
    type: "frontend",
    img: apple,
    techs: [
      { name: "React", icon: "/react-2.svg" },
      { name: "tailwind", icon: "/tailwind.svg" },
      { name: "three", icon: "/three.svg" },
    ],
    demo: "Live Demo",
    url: "https://appleclone-sooty.vercel.app/",
    repo: "https://github.com/capimaker/appleclone",
  },
  {
    title: "Coming Soon",
    tag: "New project on the way",
    type: "backend",
    img: placeholder,
    techs: [
      
    ],
  },
  */
];
