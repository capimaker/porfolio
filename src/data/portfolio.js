import arkaWebp from "../assets/arka.webp";
import arkaAvif from "../assets/arka.avif";
import patitappWebp from "../assets/patitapp.webp";
import patitappAvif from "../assets/patitapp.avif";
import patiback from "../assets/patiback.gif";
import akibaWebp from "../assets/akibamarkt.webp";
import akibaAvif from "../assets/akibamarkt.avif";
import mentorshipWebp from "../assets/mentorship.webp";
import mentorshipAvif from "../assets/mentorship.avif";
import Chewbooka from "../assets/chewbooka.svg";
import nexusWebp from "../assets/nexusapp.webp";
import nexusAvif from "../assets/nexusapp.avif";

export const projects = [
  {
    title: "AkibaMart",
    tag: "E-commerce React + Context",
    type: "frontend",
    img: akibaWebp,
    imgWebp: akibaWebp,
    imgAvif: akibaAvif,
    demo: "Live Demo",
    url: "https://akibamart.vercel.app/",
    repo: "https://github.com/capimaker/akibamart",
  },
  {
    title: "ChewBooka",
    tag: "Social App Node.js + Express/sequelize + MongoDB",
    type: "backend",
    img: Chewbooka,
    repo: "https://github.com/capimaker/Chewbooka_back",
  },
  {
    title: "Nexus",
    tag: "TS + PostgreSQL + Node.js",
    type: "backend",
    img: nexusWebp,
    imgWebp: nexusWebp,
    imgAvif: nexusAvif,
    repo: "https://github.com/capimaker/nexusbk", // cambialo cuando tengas repo real de Nexus
  },
  {
    title: "Mentorship",
    tag: "Dashboard React + Redux",
    type: "frontend",
    img: mentorshipWebp,
    imgWebp: mentorshipWebp,
    imgAvif: mentorshipAvif,
    repo: "https://github.com/capimaker/startApp",
  },
  {
    title: "PatitApp",
    tag: "Social Web App React ",
    type: "frontend",
    img: patitappWebp,
    imgWebp: patitappWebp,
    imgAvif: patitappAvif,
    demo: "Live Demo",
    url: "https://patit-app.vercel.app/",
    repo: "https://github.com/capimaker/patitApp",
  },
  {
    title: "PatitApp API",
    tag: "Social Web App Node.js + Express + MongoDB",
    type: "backend",
    img: patiback,
    repo: "https://github.com/capimaker/PatitasBackend",
  },
  {
    title: "ArkaScript",
    tag: "Javascript Vanilla Game",
    type: "frontend",
    img: arkaWebp,
    imgWebp: arkaWebp,
    imgAvif: arkaAvif,
    demo: "Live Demo",
    url: "https://capimaker.github.io/Arkascript/",
    repo: "https://github.com/capimaker/Arkascript",
  },
];
