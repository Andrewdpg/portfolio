import React from 'react'
import {
  FaReact,
  FaDocker,
  FaJava,
  FaPython,
  FaJs,
  FaGit,
  FaFigma,
} from 'react-icons/fa'
import { Experience, Skill } from '../types/skill'
import { Project } from '../types/project'
import { Cached, DataArray, Science, Web } from '@mui/icons-material'
import kuki_home from '../assets/img/kuki/home.png'
import kuki_comments from '../assets/img/kuki/comments.png'
import kuki_login from '../assets/img/kuki/login.png'
import first from '../assets/img/kids-db/first.png'
import second from '../assets/img/kids-db/second.png'
import third from '../assets/img/kids-db/third.png'
import base from '../assets/img/lab/base.png'
import inew from '../assets/img/lab/new.png'
import arduino from '../assets/img/parkinson/arduino.png'
import movement from '../assets/img/parkinson/movement.png'
import gyro from '../assets/img/parkinson/gyro.png'
import { TimelineItem } from '../components/Timeline'
import { Bluetooth, Cpu, Laptop, Search } from 'lucide-react'

const timelineItems: TimelineItem[] = [
  {
    title: 'Software Engineering Degree',
    subtitle: 'ICESI University (2022 - 2026)',
    body: 'Undergraduate program in Software Engineering, focused on software development, architecture, and agile methodologies.',
    align: 'left',
  },
  {
    title: 'Academic Honors',
    subtitle: 'ICESI University (2023)',
    body: 'Recognized for outstanding academic performance during the Software Engineering program.',
    align: 'left',
  },
  {
    title: 'Multimedia Support Monitor',
    subtitle: 'ICESI University (2023 - 2024)',
    body: 'Provided technical support for multimedia equipment to ensure smooth operation in academic environments.',
    align: 'right',
  },
  {
    title: 'Software Architecture Certification',
    subtitle: 'Perficient (2024)',
    body: 'Completed a course on software architecture design, patterns, and best practices.',
    align: 'left',
  },
  {
    title: 'Software Development Intern',
    subtitle: 'Syri Development - ICESI University (2024 - Present)',
    body: 'Software development using different programming languages, adapting to project requirements. Working with agile methodologies and Scrum teams.',
    align: 'right',
  },
]

// Define skills

// Define skills
const skills: Skill[] = [
  {
    id: 'react',
    title: 'React',
    experience: Experience.Advanced,
    category: 'UI/UX',
    icon: React.createElement(FaReact),
    color: '#61DAFB',
  },
  {
    id: 'nest',
    title: 'Nest.js',
    experience: Experience.Basic,
    category: 'Backend',
    icon: React.createElement('i', { className: 'devicon-nestjs-plain' }),
    color: '#68A063',
  },
  {
    id: 'java',
    title: 'Java',
    experience: Experience.Expert,
    category: 'Languages',
    icon: React.createElement(FaJava),
    color: '#007396',
  },
  {
    id: 'python',
    title: 'Python',
    experience: Experience.Advanced,
    category: 'Languages',
    icon: React.createElement(FaPython),
    color: '#3776AB',
  },
  {
    id: 'dart',
    title: 'Dart',
    experience: Experience.Intermediate,
    category: 'Languages',
    icon: React.createElement('i', { className: 'devicon-dart-plain' }),
    color: '#0175C2',
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    experience: Experience.Advanced,
    category: 'Languages',
    icon: React.createElement(FaJs),
    color: '#F7DF1E',
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    experience: Experience.Advanced,
    category: 'Languages',
    icon: React.createElement('i', { className: 'devicon-typescript-plain' }),
    color: '#007ACC',
  },
  {
    id: 'csharp',
    title: 'C#',
    experience: Experience.Basic,
    category: 'Languages',
    icon: React.createElement('i', { className: 'devicon-csharp-plain' }),
    color: '#00599C',
  },
  {
    id: 'flutter',
    title: 'Flutter',
    experience: Experience.Intermediate,
    category: 'UI/UX',
    icon: React.createElement('i', { className: 'devicon-flutter-plain' }),
    color: '#02569B',
  },
  {
    id: 'django',
    title: 'Django',
    experience: Experience.Advanced,
    category: 'Backend',
    icon: React.createElement('i', { className: 'devicon-django-plain' }),
    color: '#092E20',
  },
  {
    id: 'express',
    title: 'Express.js',
    experience: Experience.Intermediate,
    category: 'Backend',
    icon: React.createElement('i', { className: 'devicon-express-original' }),
    color: '#000000',
  },
  {
    id: 'springboot',
    title: 'Spring Boot',
    experience: Experience.Advanced,
    category: 'Backend',
    icon: React.createElement('i', { className: 'devicon-spring-plain' }),
    color: '#6DB33F',
  },
  {
    id: 'tailwindcss',
    title: 'TailwindCSS',
    experience: Experience.Intermediate,
    category: 'UI/UX',
    icon: React.createElement('i', { className: 'devicon-tailwindcss-plain' }),
    color: '#38B2AC',
  },
  {
    id: 'postgresql',
    title: 'PostgreSQL',
    experience: Experience.Advanced,
    category: 'Database',
    icon: React.createElement('i', { className: 'devicon-postgresql-plain' }),
    color: '#4169E1',
  },
  {
    id: 'firebase',
    title: 'Firebase',
    experience: Experience.Advanced,
    category: 'Database',
    icon: React.createElement('i', { className: 'devicon-firebase-plain' }),
    color: '#FFCA28',
  },
  {
    id: 'mongodb',
    title: 'MongoDB',
    experience: Experience.Intermediate,
    category: 'Database',
    icon: React.createElement('i', { className: 'devicon-mongodb-plain' }),
    color: '#47A248',
  },
  {
    id: 'mysql',
    title: 'MySQL',
    experience: Experience.Advanced,
    category: 'Database',
    icon: React.createElement('i', { className: 'devicon-mysql-plain' }),
    color: '#4479A1',
  },
  {
    id: 'docker',
    title: 'Docker',
    experience: Experience.Intermediate,
    category: 'Tools',
    icon: React.createElement(FaDocker),
    color: '#2496ED',
  },
  {
    id: 'git',
    title: 'Git',
    experience: Experience.Expert,
    category: 'Tools',
    icon: React.createElement(FaGit),
    color: '#F05032',
  },
  {
    id: 'postman',
    title: 'Postman',
    experience: Experience.Advanced,
    category: 'Tools',
    icon: React.createElement('i', { className: 'devicon-postman-plain' }),
    color: '#FF6C37',
  },
  {
    id: 'vscode',
    title: 'VS Code',
    experience: Experience.Advanced,
    category: 'Tools',
    icon: React.createElement('i', { className: 'devicon-vscode-plain' }),
    color: '#007ACC',
  },
  {
    id: 'figma',
    title: 'Figma',
    experience: Experience.Advanced,
    category: 'Tools',
    icon: React.createElement(FaFigma),
    color: '#F24E1E',
  },
  {
    id: 'junit',
    title: 'JUnit',
    experience: Experience.Intermediate,
    category: 'Testing',
    icon: React.createElement('i', { className: 'devicon-junit-plain' }),
    color: '#25A162',
  },
  {
    id: 'selenium',
    title: 'Selenium',
    experience: Experience.Intermediate,
    category: 'Testing',
    icon: React.createElement('i', { className: 'devicon-selenium-plain' }),
    color: '#43B02A',
  },
  {
    id: 'google-cloud',
    title: 'Google Cloud',
    experience: Experience.Intermediate,
    category: 'Tools',
    color: '#4285F4',
    icon: React.createElement('i', { className: 'devicon-googlecloud-plain' }),
  },
  {
    id: 'cpp',
    title: 'C++',
    experience: Experience.Basic,
    category: 'Languages',
    icon: React.createElement('i', { className: 'devicon-cplusplus-plain' }),
    color: '#00599C',
  },
  {
    id: 'hpc',
    title: 'High-Performance Computing',
    experience: Experience.Basic,
    category: 'Data Science',
    icon: React.createElement(Laptop),
    color: '#008000',
  },
  {
    id: 'cache-optimization',
    title: 'Cache Optimization',
    experience: Experience.Intermediate,
    category: 'Data Science',
    icon: React.createElement(Cached),
    color: '#FF5733',
  },
  {
    id: 'doe',
    title: 'Design of Experiments (DoE)',
    experience: Experience.Intermediate,
    category: 'Data Science',
    icon: React.createElement(Science),
    color: '#FFD700',
  },
  {
    id: 'statistics',
    title: 'Statistical Analysis',
    experience: Experience.Intermediate,
    category: 'Data Science',
    icon: React.createElement(Search),
    color: '#1D6F42',
  },
  {
    id: 'ble',
    title: 'Bluetooth Low Energy (BLE)',
    experience: Experience.Basic,
    category: 'Hardware',
    icon: React.createElement(Bluetooth),
    color: '#0082FC',
  },
  {
    id: 'arduino',
    title: 'Arduino',
    experience: Experience.Basic,
    category: 'Hardware',
    icon: React.createElement('i', { className: 'devicon-arduino-plain' }),
    color: '#00979D',
  },
  {
    id: 'sensor-processing',
    title: 'Sensor Data Processing',
    experience: Experience.Basic,
    category: 'Data Science',
    icon: React.createElement(Cpu),
    color: '#FFD700',
  },
  {
    id: 'data-acquisition',
    title: 'Data Acquisition',
    experience: Experience.Intermediate,
    category: 'Data Science',
    icon: React.createElement(DataArray),
    color: '#DA5B0B',
  },
  {
    id: 'kotlin',
    title: 'Kotlin',
    experience: Experience.Intermediate,
    category: 'Languages',
    icon: React.createElement('i', { className: 'devicon-kotlin-plain' }),
    color: '#7F52FF',
  },
  {
    id: 'Android',
    title: 'Android',
    experience: Experience.Intermediate,
    category: 'UI/UX',
    icon: React.createElement('i', { className: 'devicon-android-plain' }),
    color: '#3DDC84',
  },
]
// Define projects
const projects: Project[] = [
  {
    title: 'Kuki',
    subtitle: 'Social network for chefs',
    body: 'A cooking-focused social network for home and professional chefs. Users can share recipes, upload photos, interact, and get ingredient-based recommendations, creating a vibrant culinary community.',
    icon: React.createElement(Web),
    skills: skills.filter(
      (skill) =>
        skill.title === 'React' ||
        skill.title === 'Spring Boot' ||
        skill.title === 'PostgreSQL' ||
        skill.title === 'Postman' ||
        skill.title === 'JUnit' ||
        skill.title === 'Docker'
    ),
    images: [kuki_home, kuki_comments, kuki_login],
    codeLink: 'https://github.com/Andrewdpg/kuki-social-network-back',
    siteLink: 'https://kuki-social-network-front-production.up.railway.app/',
    category: 'Web',
  },
  {
    title: 'People-Database',
    subtitle: 'Database management system',
    alone: true,
    body: 'A people database management system. It allows administrators to manage employees data and generate reports. Also, employees can manage clients data and visit reports. It includes user authentication, data validation and data visualization.',
    icon: React.createElement(Web),
    skills: skills.filter(
      (skill) =>
        skill.title === 'Flutter' ||
        skill.title === 'Firebase' ||
        skill.title === 'Google Cloud'
    ),
    images: [first, second, third],
    category: 'Multiplatform',
  },
  {
    title: 'Memory Optimization in Matrix Multiplication',
    subtitle: 'High-performance computing research project',
    body: 'A research project focused on optimizing matrix multiplication by leveraging cache locality principles. It evaluates multiple algorithmic approaches and introduces a panel-based multiplication technique to improve performance. Statistical analysis and experimental design were applied to validate results.',
    icon: React.createElement(Science),
    skills: skills.filter(
      (skill) =>
        skill.title === 'C++' ||
        skill.title === 'High-Performance Computing' ||
        skill.title === 'Cache Optimization' ||
        skill.title === 'Design of Experiments (DoE)' ||
        skill.title === 'Statistical Analysis'
    ),
    images: [base, inew],
    siteLink:
      'https://drive.google.com/file/d/1s01Nf1VwsXHdgxaaLZ1bJD09BXW0Do7r/view?usp=sharing',
    category: 'Research',
  },
  {
    title: 'Early Parkinson Detection',
    subtitle: 'Research project on biomedical signal processing',
    body: 'A research project focused on developing a system for early detection of Parkinson’s disease using inertial sensors and a mobile application. The system utilizes Arduino Nano 33 IoT for data acquisition, Bluetooth Low Energy for wireless communication, and machine learning techniques to identify motor patterns.',
    icon: React.createElement(Science),
    skills: skills.filter(
      (skill) =>
        skill.title === 'Arduino' ||
        skill.title === 'Bluetooth Low Energy (BLE)' ||
        skill.title === 'Sensor Data Processing' ||
        skill.title === 'Data Acquisition' ||
        skill.title === 'Android'
    ),
    images: [arduino, movement, gyro],
    siteLink:
      'https://drive.google.com/file/d/1yFMc7df5MKc4jlOZC7zKR7on0HKm3EF7/view?usp=sharing',
    category: 'Research',
  },
]

export { skills, projects, timelineItems }
