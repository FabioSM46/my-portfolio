import {
  t3Stack,
  mernStack,
  prisma,
  react,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  mongodb,
  git,
  nextjs,
  ironhack,
  unipg,
  rice,
  bgs,
  audi,
  bingewatchr,
  sudoku,
  ironnotes,
  chat,
  twitterclone,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "React Developer",
    icon: react,
  },
  {
    title: "T3 Stack Developer",
    icon: t3Stack,
  },
  {
    title: "MERN Stack Developer",
    icon: mernStack,
  },
  {
    title: "Backend Developer",
    icon: nodejs,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "prisma",
    icon: prisma,
  },
  {
    name: "nextjs",
    icon: nextjs,
  },
];

const experiences = [
  {
    title: "Radiology Technologist",
    company_name: "Brugnoni Group Sanità",
    icon: bgs,
    iconBg: "#383E56",
    date: "2018-2023 | Perugia, Italy",
    points: [
      "Performed various radiographic procedures like X-rays, CT scans, and MRIs.",
      "Operated and maintained equipment to ensure accurate imaging and adherence to safety protocols.",
      "Collaborated with radiologists, I interpreted results for accurate diagnoses.",
      "Communicated effectively with patients, explaining procedures, addressing concerns, and ensuring their comfort throughout.",
    ],
  },
  {
    title: "Mechanic",
    company_name: "Audi Zentrum Perugia",
    icon: audi,
    iconBg: "#E6DEDD",
    date: "2012-2013 | Perugia, Italy",
    points: [
      "My role involved overseeing the care and maintenance of new cars from the garage to client delivery.",
      "Conducted inspections, diagnosed and repaired issues, performed routine maintenance.",
      "Ensured vehicles met Audi's quality standards before handing them over to clients.",
    ],
  },
];

const education = [
  {
    description:
      "The Web Developer Bootcamp at Ironhack is an intensive program that covers front-end and back-end development, using languages like HTML, CSS, JavaScript, Node.js, and frameworks like React and Express. Students work on projects, receive personalized feedback, and develop essential soft skills. Graduates are well prepared for roles as front-end, back-end, or full-stack developers.",
    title: "Web Development Bootcamp",
    company: "Ironhack",
    date: "May-June 2023",
    image: ironhack,
  },
  {
    description:
      "Deep understanding of radiographic imaging techniques, patient care, anatomy, medical terminology. We learn to operate advanced radiology equipment and utilize imaging technology to capture high-quality diagnostic images. The curriculum encompasses various imaging modalities, including X-ray, computed tomography (CT), magnetic resonance imaging (MRI), and ultrasound. Additionally, students study the principles of physics that underpin these imaging techniques, such as radiation physics, wave propagation, and imaging technology principles. This knowledge enables them to effectively utilize the equipment, optimize image quality, and ensure patient safety.",
    title: "Radiology Technology",
    company: "University Of Perugia",
    date: "2014-2017",
    image: unipg,
  },
  {
    description:
      "The ESL program helps non-native English speakers improve their language skills in listening, speaking, reading, and writing. It focuses on grammar, vocabulary, pronunciation, and comprehension. Students practice real-life communication and develop cultural awareness. The program promotes critical thinking and independent learning. Graduates gain confidence and proficiency in English for academic, professional, and everyday situations.",
    title: "ESL Program",
    company: "Rice University - Houston, TX",
    date: "May-July 2018",
    image: rice,
  },
];

const projects = [
  {
    name: "BingeWatchr | TV Series Browser",
    description:
      "Client-server web app built using React, Node.js, MongoDB, and Mongoose. It allows users to browse, review, and rate TV shows. User authentication enables personalized experiences, and users can create their own show lists. The app supports CRUD functionalities for writing, editing, and deleting reviews, and a star-based rating system allows users to express their opinions. It integrates with an external API to provide comprehensive TV show data, including titles, genres, cast, release dates, and episode lists.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "express",
        color: "pink-text-gradient",
      },
    ],
    image: bingewatchr,
    source_code_link: "https://github.com/BingWatchr/bingwatchr-cli",
  },
  {
    name: "Iron-Notes | Note Taking App",
    description:
      "A personal note-taking web application using Express.js, Node.js, MongoDB, and Mongoose. Inspired by popular applications like Google Keep and Apple Notes, this web app provides a user-friendly interface for organizing and managing personal thoughts and information. By the use of Express.js and Node.js, We implemented a robust backend that handles user interactions and data storage. MongoDB and Mongoose were utilized as the database solutions. With full CRUD capabilities, users can easily create new notes, retrieve existing ones, update their content, and delete unwanted entries.",
    tags: [
      {
        name: "javascript",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "bootstrap",
        color: "pink-text-gradient",
      },
    ],
    image: ironnotes,
    source_code_link: "https://github.com/Iron-Notes/iron-notes-mvp",
  },
  {
    name: "Chat | Realtime Chat App",
    description:
      "A Real-Time Chat App, cutting-edge platform built with Next.js, Redis, Pusher, Tailwind, and TypeScript. Seamlessly connecting users in real-time, the application offers a dynamic and visually appealing chatting experience. With Next.js as the foundation, the app boasts rapid development, server-side rendering. Redis ensures lightning-fast data retrieval, while Pusher empowers real-time communication. Tailwind CSS delivers a sleek and responsive user interface, complemented by TypeScript's robustness. Enjoy secure user authentication with Google OAuth 2.0 and NextAuth.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "typescript",
        color: "green-text-gradient",
      },
      {
        name: "tailwindcss",
        color: "pink-text-gradient",
      },
    ],
    image: chat,
    source_code_link: "https://github.com/FabioSM46/realtime-chat-app",
  },
  {
    name: "Twitter Clone | Social Media App",
    description:
      "Crafted using the T3 stack - Next.js, TypeScript, tRPC, Prisma, Tailwind CSS, and NextAuth. The application empowers users to post, like tweets and follow other users in real-time. Seamless user registration and authentication process through Discord. Its responsive design, driven by Tailwind CSS, ensures a smooth user experience across devices, while Prisma manages data modeling and database access efficiently.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "typescript",
        color: "green-text-gradient",
      },
      {
        name: "tailwindcss",
        color: "pink-text-gradient",
      },
    ],
    image: twitterclone,
    source_code_link: "https://github.com/FabioSM46/twitter-clone",
  },
  {
    name: "Sudoku | Game ",
    description:
      "Vanilla JavaScript game built using HTML, CSS. It features an awesome algorithm to always generate new games at various difficulties, error counter and timer to track the user's progress.",
    tags: [
      {
        name: "javascript",
        color: "blue-text-gradient",
      },
      {
        name: "css3",
        color: "green-text-gradient",
      },
      {
        name: "html5",
        color: "pink-text-gradient",
      },
    ],
    image: sudoku,
    source_code_link: "https://github.com/FabioSM46/sudoku",
  },
];

export { services, technologies, experiences, education, projects };
