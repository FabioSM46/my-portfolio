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
    eagle
} from '../assets';

export const navLinks = [
    {
        id: 'about',
        title: 'About'
    },
    {
        id: 'work',
        title: 'Work'
    },
    {
        id: 'contact',
        title: 'Contact'
    }
];

const services = [
    {
        title: 'React Developer',
        icon: react
    },
    {
        title: 'T3 Stack Developer',
        icon: t3Stack
    },
    {
        title: 'MERN Stack Developer',
        icon: mernStack
    },
    {
        title: 'Backend Developer',
        icon: nodejs
    }
];

const technologies = [
    {
        name: 'HTML 5',
        icon: html
    },
    {
        name: 'CSS 3',
        icon: css
    },
    {
        name: 'JavaScript',
        icon: javascript
    },
    {
        name: 'TypeScript',
        icon: typescript
    },
    {
        name: 'React JS',
        icon: reactjs
    },
    {
        name: 'Tailwind CSS',
        icon: tailwind
    },
    {
        name: 'Node JS',
        icon: nodejs
    },
    {
        name: 'MongoDB',
        icon: mongodb
    },
    {
        name: 'git',
        icon: git
    },
    {
        name: 'prisma',
        icon: prisma
    },
    {
        name: 'nextjs',
        icon: nextjs
    }
];

const experiences = [
    {
        title: 'Web Developer',
        company_name: 'Eagleprojects',
        icon: eagle,
        iconBg: '#383E56',
        date: '2023-Present | Perugia, Italy',
        points: [
            'Developed full-stack web applications using React, Node.js, and SQL and NoSQL databases (MongoDB, PostgreSQL).',
            'Inetrfaces for robotic systems management (robotic dogs, drones, etc.).',
            'Rendering maps (Deck.gl, Mapbox) and manage geospatial data(GeoServer, PostGIS).',
            'E2E and UI testing with Playwright.',
            'Built a component library with Storybook and Sass'
        ]
    },
    {
        title: 'Radiology Technologist',
        company_name: 'Brugnoni Group Sanità',
        icon: bgs,
        iconBg: '#383E56',
        date: '2018-2023 | Perugia, Italy',
        points: [
            'Performed various radiographic procedures like X-rays, CT scans, and MRIs.',
            'Operated and maintained equipment to ensure accurate imaging and adherence to safety protocols.',
            'Collaborated with radiologists, I interpreted results for accurate diagnoses.',
            'Communicated effectively with patients, explaining procedures, addressing concerns, and ensuring their comfort throughout.'
        ]
    }
];

const education = [
    {
        description:
            'The Web Developer Bootcamp at Ironhack is an intensive program that covers front-end and back-end development, using languages like HTML, CSS, JavaScript, Node.js, and frameworks like React and Express. Students work on projects, receive personalized feedback, and develop essential soft skills. Graduates are well prepared for roles as front-end, back-end, or full-stack developers.',
        title: 'Web Development Bootcamp',
        company: 'Ironhack',
        date: 'May-June 2023',
        image: ironhack
    },
    {
        description:
            'Deep understanding of radiographic imaging techniques, patient care, anatomy, medical terminology. We learn to operate advanced radiology equipment and utilize imaging technology to capture high-quality diagnostic images. The curriculum encompasses various imaging modalities, including X-ray, computed tomography (CT), magnetic resonance imaging (MRI), and ultrasound. Additionally, students study the principles of physics that underpin these imaging techniques, such as radiation physics, wave propagation, and imaging technology principles. This knowledge enables them to effectively utilize the equipment, optimize image quality, and ensure patient safety.',
        title: 'Radiology Technology',
        company: 'University Of Perugia',
        date: '2014-2017',
        image: unipg
    },
    {
        description:
            'The ESL program helps non-native English speakers improve their language skills in listening, speaking, reading, and writing. It focuses on grammar, vocabulary, pronunciation, and comprehension. Students practice real-life communication and develop cultural awareness. The program promotes critical thinking and independent learning. Graduates gain confidence and proficiency in English for academic, professional, and everyday situations.',
        title: 'ESL Program',
        company: 'Rice University - Houston, TX',
        date: 'May-July 2018',
        image: rice
    }
];

export { services, technologies, experiences, education };
