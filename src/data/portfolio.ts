import arka from "../assets/arka.webp";
import patitapp from "../assets/patitapp.webp";
import patiback from "../assets/patiback.gif";
import nexus from "../assets/nexusapp.webp";
import apple from "../assets/apple.webp";
import rviewer from "../assets/rviewer.webp";
import avatar from "../assets/yo.webp";

export const profile = {
  name: "Carlos Ramos",
  nick: "Capi",
  avatar,
  email: "carlosramos4dev@gmail.com",
  github: "https://github.com/capimaker",
  linkedin: "https://www.linkedin.com/in/carlos-ramos7/",
};

const CV_FILES = {
  es: "CarlosRamos_CV_ES.pdf",
  en: "Carlos_Ramoscv.pdf",
};

/** CV matching the UI language: Spanish for "es", English for everything else */
export function cvFor(lang: string) {
  const file = lang.startsWith("es") ? CV_FILES.es : CV_FILES.en;
  return { url: `/${file}`, file };
}

export interface Tech {
  name: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  type: ("frontend" | "backend")[];
  img: string;
  techs: Tech[];
  url?: string;
  repo: string;
}

export const projects: Project[] = [
  {
    id: "rviewer",
    title: "RViewer",
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
    id: "nexus",
    title: "Nexus",
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
    id: "patitapp",
    title: "PatitApp",
    type: ["frontend"],
    img: patitapp,
    techs: [
      { name: "React", icon: "/react-2.svg" },
      { name: "Redux", icon: "/redux.svg" },
      { name: "JavaScript", icon: "/js.png" },
      { name: "CSS", icon: "/css-3.svg" },
    ],
    repo: "https://github.com/capimaker/patitApp",
  },
  {
    id: "patitapp-api",
    title: "PatitApp API",
    type: ["backend"],
    img: patiback,
    techs: [
      { name: "Node.js", icon: "/nodejs-2.svg" },
      { name: "JavaScript", icon: "/js.png" },
      { name: "MongoDB", icon: "/mongodb.svg" },
    ],
    repo: "https://github.com/capimaker/PatitasBackend",
  },
  {
    id: "apple-clone",
    title: "Apple Clone",
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
    id: "arkascript",
    title: "ArkaScript",
    type: ["frontend"],
    img: arka,
    techs: [
      { name: "JavaScript", icon: "/js.png" },
      { name: "HTML", icon: "/html-1.svg" },
    ],
    url: "https://capimaker.github.io/Arkascript/",
    repo: "https://github.com/capimaker/Arkascript",
  },
];

export const skills: Tech[] = [
  { name: "TypeScript", icon: "/typescript-2.svg" },
  { name: "JavaScript", icon: "/js.png" },
  { name: "React", icon: "/react-2.svg" },
  { name: "Next.js", icon: "/nextjs.svg" },
  { name: "Node.js", icon: "/nodejs-2.svg" },
  { name: "PostgreSQL", icon: "/postgresql.svg" },
  { name: "MongoDB", icon: "/mongodb.svg" },
  { name: "Prisma", icon: "/prisma.svg" },
  { name: "Tailwind CSS", icon: "/tailwind.svg" },
  { name: "Redux", icon: "/redux.svg" },
  { name: "MySQL", icon: "/mysql-logo-pure.svg" },
  { name: "HTML", icon: "/html-1.svg" },
  { name: "CSS", icon: "/css-3.svg" },
];
