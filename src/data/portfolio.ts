import arka from "../assets/arka.webp";
import patitapp from "../assets/patitapp.webp";
import patiback from "../assets/patiback.gif";
import enike from "../assets/enike.webp";
import nexus from "../assets/nexusapp.webp";
import apple from "../assets/apple.svg";
import rviewer from "../assets/rviewer.png";
import avatar from "../assets/yo.webp";

export const profile = {
  name: "Carlos Ramos",
  nick: "Capi",
  avatar,
  email: "carlosramos4dev@gmail.com",
  github: "https://github.com/capimaker",
  linkedin: "https://www.linkedin.com/in/carlos-ramos7/",
  cvUrl: "/Carlos_Ramoscv.pdf",
};

export interface Tech {
  name: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  tag: string;
  type: ("frontend" | "backend")[];
  img: string;
  techs: Tech[];
  url?: string;
  repo: string;
}

export const projects: Project[] = [
  {
    id: "apple-clone",
    title: "Apple Clone",
    tag: "Macbook Product Page Clone",
    type: ["frontend"],
    img: apple,
    techs: [
      { name: "React", icon: "/react-2.svg" },
      { name: "Tailwind", icon: "/tailwind.svg" },
      { name: "Three.js", icon: "/three.svg" },
    ],
    url: "https://appleclone-sooty.vercel.app/",
    repo: "https://github.com/capimaker/appleclone",
  },
  {
    id: "enike",
    title: "Enike",
    tag: "Ecommerce Web App",
    type: ["frontend", "backend"],
    img: enike,
    techs: [
      { name: "Next.js", icon: "/nextjs.svg" },
      { name: "Tailwind CSS", icon: "/tailwind.svg" },
    ],
    url: "https://enike-eta.vercel.app/",
    repo: "https://github.com/capimaker/enike",
  },
  {
    id: "nexus",
    title: "Nexus",
    tag: "TS + PostgreSQL + Node.js",
    type: ["backend"],
    img: nexus,
    techs: [
      { name: "TypeScript", icon: "/typescript-2.svg" },
      { name: "Node.js", icon: "/nodejs-2.svg" },
      { name: "PostgreSQL", icon: "/postgresql.svg" },
    ],
    repo: "https://github.com/capimaker/nexusbk",
  },
  {
    id: "rviewer",
    title: "RViewer",
    tag: "Practice your Job Interviews with AI",
    type: ["frontend", "backend"],
    img: rviewer,
    techs: [
      { name: "React", icon: "/react-2.svg" },
      { name: "Next.js", icon: "/nextjs.svg" },
      { name: "Tailwind CSS", icon: "/tailwind.svg" },
      { name: "Neon", icon: "/neon.png" },
      { name: "Stripe", icon: "/stripe.svg" },
      { name: "Prisma", icon: "/prisma.svg" },
    ],
    url: "https://rviewer-hazel.vercel.app/",
    repo: "https://github.com/capimaker/rhviewer",
  },
  {
    id: "patitapp",
    title: "PatitApp",
    tag: "Social Web App React",
    type: ["frontend"],
    img: patitapp,
    techs: [
      { name: "React", icon: "/react-2.svg" },
      { name: "CSS", icon: "/css-3.svg" },
    ],

    repo: "https://github.com/capimaker/patitApp",
  },
  {
    id: "patitapp-api",
    title: "PatitApp API",
    tag: "Node.js + Express + MongoDB",
    type: ["backend"],
    img: patiback,
    techs: [
      { name: "Node.js", icon: "/nodejs-2.svg" },
      { name: "Express", icon: "/express-109.svg" },
      { name: "MongoDB", icon: "/mongodb.svg" },
    ],
    repo: "https://github.com/capimaker/PatitasBackend",
  },
  {
    id: "arkascript",
    title: "ArkaScript",
    tag: "JavaScript Vanilla Game",
    type: ["frontend"],
    img: arka,
    techs: [{ name: "JavaScript", icon: "/js.png" }],
    url: "https://capimaker.github.io/Arkascript/",
    repo: "https://github.com/capimaker/Arkascript",
  },
];

export const skills: Tech[] = [
  { name: "React", icon: "/react-2.svg" },
  { name: "Node.js", icon: "/nodejs-2.svg" },
  { name: "MongoDB", icon: "/mongodb.svg" },
  { name: "TypeScript", icon: "/typescript-2.svg" },
  { name: "JavaScript", icon: "/js.png" },
  { name: "HTML", icon: "/html-1.svg" },
  { name: "CSS", icon: "/css-3.svg" },
  { name: "MySQL", icon: "/mysql-logo-pure.svg" },
  { name: "PostgreSQL", icon: "/postgresql.svg" },
  { name: "Express", icon: "/express-109.svg" },
  { name: "Redux", icon: "/redux.svg" },
];
