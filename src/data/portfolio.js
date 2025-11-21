import placeholder from "../assets/placeholder.jpg";
import arka from "../assets/arka.png";
import patitapp from "../assets/patitapp.png";
import patiback from "../assets/patiback.gif";
import akiba from "../assets/akibamarkt.png";
import Mentorship from "../assets/mentorship.png";
import Chewbooka from "../assets/chewbooka.svg";

export const projects = [
  {
    title: "AkibaMart",
    tag: "E-commerce React + Context",
    type: "frontend",
    img: akiba,
    demo: "Live Demo",
    url: "https://akibamart.vercel.app/",
    repo: "https://github.com/capimaker/akibamart",
  },
  {
    title: "ChewBooka",
    tag: "Social App",
    type: "backend",
    img: Chewbooka,
    repo: "https://github.com/capimaker/Chewbooka_back",
  },
  {
    title: "Nexus",
    tag: "API + Front",
    type: "backend", 
    img: placeholder,
    // Si en el futuro tienes demo:
    // demo: "Live Demo",
    // url: "https://tu-demo-de-nexus.com",
    repo: "https://github.com/capimaker/nexusbk", // cámbialo cuando tengas repo real de Nexus
  },
  {
    title: "Mentorship",
    tag: "Dashboard",
    type: "frontend",
    img: Mentorship,
    repo: "https://github.com/capimaker/startApp",
  },
  {
    title: "PatitApp",
    tag: "Social Web App React",
    type: "frontend",
    img: patitapp,
    demo: "Live Demo",
    url: "https://patit-app.vercel.app/",
    repo: "https://github.com/capimaker/patitApp",
  },
  {
    title: "PatitApp API",
    tag: "Social Web App Node.js",
    type: "backend",
    img: patiback,
    repo: "https://github.com/capimaker/PatitasBackend",
  },
  {
    title: "ArkaScript",
    tag: "Javascript Vanilla Game",
    type: "frontend",
    img: arka,
    demo: "Live Demo",
    url: "https://capimaker.github.io/Arkascript/",
    repo: "https://github.com/capimaker/Arkascript",
  },
];
