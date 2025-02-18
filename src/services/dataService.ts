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
import { Technology } from '../types/technology'
import { Experience, Skill } from '../types/skill'
import { Project } from '../types/project'
import { Web } from '@mui/icons-material'
import kuki_home from '../assets/img/kuki/home.png'
import kuki_comments from '../assets/img/kuki/comments.png'
import kuki_login from '../assets/img/kuki/login.png'
import first from '../assets/img/kids-db/first.png'
import second from '../assets/img/kids-db/second.png'
import third from '../assets/img/kids-db/third.png'
import { TimelineItem } from '../components/Timeline'

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
    technology: Technology.React,
    category: 'Frontend',
    icon: React.createElement(FaReact),
    color: '#61DAFB',
  },
  {
    id: 'nest',
    title: 'Nest.js',
    experience: Experience.Basic,
    technology: Technology.NestJS,
    category: 'Backend',
    icon: React.createElement('i', { className: 'devicon-nestjs-plain' }),
    color: '#68A063',
  },
  {
    id: 'java',
    title: 'Java',
    experience: Experience.Expert,
    technology: Technology.Java,
    category: 'Languages',
    icon: React.createElement(FaJava),
    color: '#007396',
  },
  {
    id: 'python',
    title: 'Python',
    experience: Experience.Advanced,
    technology: Technology.Python,
    category: 'Languages',
    icon: React.createElement(FaPython),
    color: '#3776AB',
  },
  {
    id: 'dart',
    title: 'Dart',
    experience: Experience.Intermediate,
    technology: Technology.Dart,
    category: 'Languages',
    icon: React.createElement('i', { className: 'devicon-dart-plain' }),
    color: '#0175C2',
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    experience: Experience.Advanced,
    technology: Technology.JavaScript,
    category: 'Languages',
    icon: React.createElement(FaJs),
    color: '#F7DF1E',
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    experience: Experience.Advanced,
    technology: Technology.TypeScript,
    category: 'Languages',
    icon: React.createElement('i', { className: 'devicon-typescript-plain' }),
    color: '#007ACC',
  },
  {
    id: 'csharp',
    title: 'C#',
    experience: Experience.Basic,
    technology: Technology.CSharp,
    category: 'Languages',
    icon: React.createElement('i', { className: 'devicon-csharp-plain' }),
    color: '#00599C',
  },
  {
    id: 'flutter',
    title: 'Flutter',
    experience: Experience.Intermediate,
    technology: Technology.Flutter,
    category: 'Mobile',
    icon: React.createElement('i', { className: 'devicon-flutter-plain' }),
    color: '#02569B',
  },
  {
    id: 'django',
    title: 'Django',
    experience: Experience.Advanced,
    technology: Technology.Django,
    category: 'Backend',
    icon: React.createElement('i', { className: 'devicon-django-plain' }),
    color: '#092E20',
  },
  {
    id: 'express',
    title: 'Express.js',
    experience: Experience.Intermediate,
    technology: Technology.Express,
    category: 'Backend',
    icon: React.createElement('i', { className: 'devicon-express-original' }),
    color: '#000000',
  },
  {
    id: 'springboot',
    title: 'Spring Boot',
    experience: Experience.Advanced,
    technology: Technology.Spring,
    category: 'Backend',
    icon: React.createElement('i', { className: 'devicon-spring-plain' }),
    color: '#6DB33F',
  },
  {
    id: 'tailwindcss',
    title: 'TailwindCSS',
    experience: Experience.Intermediate,
    technology: Technology.TailwindCSS,
    category: 'Frontend',
    icon: React.createElement('i', { className: 'devicon-tailwindcss-plain' }),
    color: '#38B2AC',
  },
  {
    id: 'postgresql',
    title: 'PostgreSQL',
    experience: Experience.Advanced,
    technology: Technology.PostgreSQL,
    category: 'Database',
    icon: React.createElement('i', { className: 'devicon-postgresql-plain' }),
    color: '#4169E1',
  },
  {
    id: 'firebase',
    title: 'Firebase',
    experience: Experience.Advanced,
    technology: Technology.Firebase,
    category: 'Database',
    icon: React.createElement('i', { className: 'devicon-firebase-plain' }),
    color: '#FFCA28',
  },
  {
    id: 'mongodb',
    title: 'MongoDB',
    experience: Experience.Intermediate,
    technology: Technology.MongoDB,
    category: 'Database',
    icon: React.createElement('i', { className: 'devicon-mongodb-plain' }),
    color: '#47A248',
  },
  {
    id: 'mysql',
    title: 'MySQL',
    experience: Experience.Advanced,
    technology: Technology.MySQL,
    category: 'Database',
    icon: React.createElement('i', { className: 'devicon-mysql-plain' }),
    color: '#4479A1',
  },
  {
    id: 'docker',
    title: 'Docker',
    experience: Experience.Intermediate,
    technology: Technology.Docker,
    category: 'DevOps',
    icon: React.createElement(FaDocker),
    color: '#2496ED',
  },
  {
    id: 'git',
    title: 'Git',
    experience: Experience.Expert,
    technology: Technology.Git,
    category: 'DevOps',
    icon: React.createElement(FaGit),
    color: '#F05032',
  },
  {
    id: 'postman',
    title: 'Postman',
    experience: Experience.Advanced,
    technology: Technology.Postman,
    category: 'DevOps',
    icon: React.createElement('i', { className: 'devicon-postman-plain' }),
    color: '#FF6C37',
  },
  {
    id: 'vscode',
    title: 'VS Code',
    experience: Experience.Advanced,
    technology: Technology.VSCode,
    category: 'DevOps',
    icon: React.createElement('i', { className: 'devicon-vscode-plain' }),
    color: '#007ACC',
  },
  {
    id: 'figma',
    title: 'Figma',
    experience: Experience.Advanced,
    technology: Technology.Figma,
    category: 'DevOps',
    icon: React.createElement(FaFigma),
    color: '#F24E1E',
  },
  {
    id: 'junit',
    title: 'JUnit',
    experience: Experience.Intermediate,
    technology: Technology.JUnit,
    category: 'Testing',
    icon: React.createElement('i', { className: 'devicon-junit-plain' }),
    color: '#25A162',
  },
  {
    id: 'selenium',
    title: 'Selenium',
    experience: Experience.Intermediate,
    technology: Technology.Selenium,
    category: 'Testing',
    icon: React.createElement('i', { className: 'devicon-selenium-plain' }),
    color: '#43B02A',
  },
  {
    id: 'google-cloud',
    title: 'Google Cloud',
    experience: Experience.Intermediate,
    technology: Technology.GoogleCloud,
    category: 'DevOps',
    color: '#4285F4',
    icon: React.createElement('i', { className: 'devicon-googlecloud-plain' }),
  },
  // Add more skills as needed
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
  },
  {
    title: 'People-Database',
    subtitle: 'Database management system',
    body: 'A people database management system. It allows administrators to manage employees data and generate reports. Also, employees can manage clients data and visit reports. It includes user authentication, data validation and data visualization.',
    icon: React.createElement(Web),
    //flutter firebase sql google cloud
    skills: skills.filter(
      (skill) =>
        skill.title === 'Flutter' ||
        skill.title === 'Firebase' ||
        skill.title === 'Google Cloud'
    ),
    images: [first, second, third],
  },
]

export { skills, projects, timelineItems }
