import placeholder from "../assets/placeholder.jpg";
import arka from "../assets/arka.png";
import patitapp from "../assets/patitapp.png";
import patiback from "../assets/patiback.gif";
import akiba from "../assets/akibamarkt.png";
import Mentorship from "../assets/mentorship.png";
import Chewbooka from "../assets/chewbooka.svg";

export const projects = [
  {  title: "AkibaMart",
    tag: "E-commerce React + Context",
    type: "frontend",
     img: akiba, 
      repo: "https://github.com/capimaker/akibamart" 
    
  },
  { title: "ChewBooka",
     tag:"Social App",
      img: Chewbooka, 
      type: "backend",
     repo: "https://github.com/capimaker/Chewbooka_back",
  },

  { title: "Nexus", tag:"API + Front", img: placeholder, links: [
      { label: "Live Demo", url: "https://akibamart.vercel.app/" },
      { label: "GitHub", url: "https://github.com/capimaker/akibamart" }
    ]
  },
 { title: "Mentorship",
   tag:"Dashboard",
    img: Mentorship,
    type: "frontend",
     repo: "https://github.com/capimaker/startApp"  },
  {
    title: "PatitApp",
    tag: "Social Web App React ",
    type: "frontend",
    img: patitapp,
    demo: "https://patit-app.vercel.app/",
    repo: "https://github.com/capimaker/patitApp",
  },
  {
    title: "PatitApp",
    tag: "Social Web App Node.js ",
    type: "backend",
    img: patiback,
    
    repo: "https://github.com/capimaker/PatitasBackend",
  },

  { title: "ArkaScript",
     tag:"Javascript Vanilla Game",
      type: "frontend",
      img: arka, 
    demo:"Live Demo", url: "https://capimaker.github.io/Arkascript/" ,
     repo:"https://github.com/capimaker/Arkascript"  },
];
