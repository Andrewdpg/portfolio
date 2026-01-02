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
import { ExperienceGroup } from '../types/timeline'
import { Bluetooth, Cpu, Laptop, Search } from 'lucide-react'

// Images for hero backgrounds

const experienceGroups: ExperienceGroup[] = [
  {
    place: 'Academic Foundation',
    description:
      'Systems Engineering undergraduate studies focused on software architecture, AI research, and specialized certifications.',
    heroImage:
      'https://www.icesi.edu.co/wp-content/uploads/2025/02/trabaja-nosotros-icesi-movil.jpg',
    backgroundColor: '#5354ED',
    textColor: '#ffffff',
    align: 'left',
    variant: 'immersive',
    items: [
      {
        title: 'Systems Engineering Degree',
        subtitle: '2022 - 2026 (Expected)',
        body: 'Focused on Cloud Native architecture and agile development methodologies.',
        skills: ['Systems Engineering', 'Software Design', 'Agile'],
      },
      {
        title: 'AI & Biomedical Research',
        subtitle: '2024 - 2026',
        body: 'Developing machine learning models for early disease detection and pre-anesthetic evaluation.',
        skills: ['AI/ML', 'Data Science', 'Research'],
      },
      {
        title: 'Software Architecture Certification',
        subtitle: 'Perficient (2024)',
        body: 'Specialization in Microservices, Serverless design, and scalable architectural patterns.',
        skills: ['Microservices', 'System Design', 'Cloud'],
      },
    ],
  },
  {
    place: 'ICESI University',
    description:
      'Applied software engineering and technical support within institutional development centers.',
    heroImage:
      'https://www.valoraanalitik.com/wp-content/uploads/2025/09/La-Universidad-Icesi-celebra-una-etapa-de-crecimiento-1024x597.jpg',
    backgroundColor: '#5354ED',
    textColor: '#ffffff',
    align: 'right',
    variant: 'immersive',
    items: [
      {
        title: 'Fullstack Developer (SYRI)',
        subtitle: '2024 - 2025',
        body: 'Led the development of automated internal systems, streamlining institutional processes.',
        skills: ['Fullstack', 'Processes', 'Automation'],
      },
    ],
  },
  {
    place: 'Swiset',
    description:
      'A leading fintech platform delivering advanced analytics and trading engines for global prop firms.',
    heroImage:
      'https://hub.swiset.com/wp-content/uploads/2025/02/featured-image_Mesa-de-trabajo-1-copia.jpg',
    backgroundColor: '#28EA96',
    textColor: '#000000',
    align: 'left',
    variant: 'immersive',
    items: [
      {
        title: 'Software Developer',
        subtitle: 'Dec 2025 - Present',
        body: 'Developing high-performance fintech solutions with a focus on trader analytics and risk management.',
        skills: ['Fintech', 'Analytics', 'Prop Trading'],
      },
    ],
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
    id: 'nextjs',
    title: 'Next.js',
    experience: Experience.Advanced,
    category: 'UI/UX',
    icon: React.createElement('i', { className: 'devicon-nextjs-plain' }),
    color: '#000000',
  },
  {
    id: 'kubernetes',
    title: 'Kubernetes',
    experience: Experience.Basic,
    category: 'DevOps',
    icon: React.createElement('i', { className: 'devicon-kubernetes-plain' }),
    color: '#326CE5',
  },
  {
    id: 'jenkins',
    title: 'Jenkins',
    experience: Experience.Basic,
    category: 'DevOps',
    icon: React.createElement('i', { className: 'devicon-jenkins-plain' }),
    color: '#D24939',
  },
  {
    id: 'terraform',
    title: 'Terraform',
    experience: Experience.Basic,
    category: 'DevOps',
    icon: React.createElement('i', { className: 'devicon-terraform-plain' }),
    color: '#7B42BC',
  },
  {
    id: 'scikitlearn',
    title: 'Scikit-learn',
    experience: Experience.Intermediate,
    category: 'AI/ML',
    icon: React.createElement('i', { className: 'devicon-scikitlearn-plain' }),
    color: '#F7931E',
  },
  {
    id: 'tensorflow',
    title: 'TensorFlow',
    experience: Experience.Intermediate,
    category: 'AI/ML',
    icon: React.createElement('i', { className: 'devicon-tensorflow-line' }),
    color: '#FF6F00',
  },
  {
    id: 'pytorch',
    title: 'PyTorch',
    experience: Experience.Intermediate,
    category: 'AI/ML',
    icon: React.createElement('i', { className: 'devicon-pytorch-plain' }),
    color: '#EE4C2C',
  },
  {
    id: 'oracle',
    title: 'Oracle SQL',
    experience: Experience.Advanced,
    category: 'Database',
    icon: React.createElement('i', { className: 'devicon-oracle-original' }),
    color: '#F80000',
  },
  {
    id: 'linux',
    title: 'Linux',
    experience: Experience.Advanced,
    category: 'Tools',
    icon: React.createElement('i', { className: 'devicon-linux-plain' }),
    color: '#FCC624',
  },
  {
    id: 'analytical-reasoning',
    title: 'Analytical Reasoning',
    experience: Experience.Expert,
    category: 'Competencies',
    icon: React.createElement(Laptop),
    color: '#4CAF50',
  },
  {
    id: 'leadership',
    title: 'Leadership',
    experience: Experience.Advanced,
    category: 'Competencies',
    icon: React.createElement(Laptop),
    color: '#FF9800',
  },
  {
    id: 'problem-solving',
    title: 'Problem Solving',
    experience: Experience.Expert,
    category: 'Competencies',
    icon: React.createElement(Laptop),
    color: '#2196F3',
  },
  {
    id: 'ideation-design',
    title: 'Ideation & Design',
    experience: Experience.Advanced,
    category: 'Competencies',
    icon: React.createElement(Laptop),
    color: '#9C27B0',
  }
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
        skill.title === 'Docker' ||
        skill.title === 'Next.js'
    ),
    images: [kuki_home, kuki_comments, kuki_login],
    codeLink: 'https://github.com/Andrewdpg/kuki-social-network-back',
    siteLink: 'https://kuki-social-network-front.vercel.app/',
    warnings: [
      'Backend is hosted on free-tier render so it may take a few seconds/minutes to start',
    ],
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
        skill.title === 'Google Cloud' ||
        skill.title === 'Oracle SQL'
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
        skill.title === 'Linux'
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
        skill.title === 'TensorFlow' ||
        skill.title === 'Python' ||
        skill.title === 'Android'
    ),
    images: [arduino, movement, gyro],
    siteLink:
      'https://drive.google.com/file/d/1yFMc7df5MKc4jlOZC7zKR7on0HKm3EF7/view?usp=sharing',
    category: 'Research',
  },
]

export { skills, projects, experienceGroups }
