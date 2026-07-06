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
const methodusImages = import.meta.glob('../assets/img/methodus/*.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>
const kukiImages = import.meta.glob('../assets/img/kuki/*.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const methodusOrder = [
  'landing',
  'admin_dash',
  'admin_users',
  'admin_classes',
  'admin_resources',
  'admin_forms',
  'student_dash',
  'student_classes',
  'student_forms',
  'student_gamification',
]
const kukiOrder = [
  'home',
  'login',
  'post',
  'settings',
  'darkmode',
  'create_post_1',
  'create_post_2',
  'create_post_3',
  'comments',
]
import first from '../assets/img/kids-db/first.png'
import second from '../assets/img/kids-db/second.png'
import third from '../assets/img/kids-db/third.png'
import base from '../assets/img/lab/base.png'
import inew from '../assets/img/lab/new.png'
import arduino from '../assets/img/parkinson/arduino.png'
import movement from '../assets/img/parkinson/movement.png'
import gyro from '../assets/img/parkinson/gyro.png'
import preanesthesiaPipeline from '../assets/img/preanesthesia/pipeline.png'
import preanesthesiaRoc from '../assets/img/preanesthesia/roc_auc.png'
import preanesthesiaRanking from '../assets/img/preanesthesia/ranking.png'
import { ExperienceGroup } from '../types/timeline'
import {
  Bluetooth,
  Braces,
  Bug,
  Cpu,
  FlaskConical,
  Globe,
  Laptop,
  RefreshCw,
  Search,
  Terminal,
  TestTube,
} from 'lucide-react'

// Images for hero backgrounds

const experienceGroups: ExperienceGroup[] = [
  {
    place: 'Academic Foundation',
    navLabel: 'Education',
    category: 'Education',
    description:
      'Systems Engineering undergraduate studies focused on software architecture, AI research, and specialized certifications.',
    heroImage: '/img/heroes/icesi.webp',
    backgroundColor: '#7870ff',
    textColor: '#ffffff',
    lightBackgroundColor: '#5354ED',
    lightTextColor: '#ffffff',
    accentColor: '#ffffff',
    align: 'left',
    variant: 'immersive',
    items: [
      {
        title: 'B.S. Systems Engineering',
        subtitle: '2022 – 2026 (Expected) · GPA 4.6/5.0',
        body: "Focused on software architecture, cloud-native systems, and agile methodologies. Academic Excellence Scholarship awarded by the Mayor's Office of Cali. Honor Roll recognition.",
        skills: ['Software Architecture', 'Agile', 'Cloud Native'],
      },
      {
        title: 'Software Architecture Certification',
        subtitle: 'Perficient · 2024',
        body: 'Specialization in Microservices, Serverless design, and scalable architectural patterns.',
        skills: ['Microservices', 'Serverless', 'System Design', 'Cloud'],
      },
    ],
  },
  {
    place: 'ICESI University',
    navLabel: 'Work · ICESI',
    category: 'Work',
    description:
      'Applied software engineering and technical support within institutional development centers.',
    heroImage: '/img/heroes/valora.webp',
    backgroundColor: '#7870ff',
    textColor: '#ffffff',
    lightBackgroundColor: '#5354ED',
    lightTextColor: '#ffffff',
    accentColor: '#ffffff',
    align: 'right',
    variant: 'immersive',
    items: [
      {
        title: 'Software Development Intern',
        subtitle: 'Oct 2024 – Jun 2026',
        body: 'Led design and development of a survey management system for academic and administrative processes. Contributed to a certificate generation and validation system. Collaborated with Scrum teams ensuring timely delivery and quality standards.',
        skills: ['Fullstack', 'Scrum', 'Automation', 'Institutional Systems'],
      },
    ],
  },
  {
    place: 'Swiset',
    navLabel: 'Work · Swiset',
    category: 'Work',
    description:
      'A leading fintech platform delivering advanced analytics and trading engines for global prop firms.',
    heroImage: '/img/heroes/swiset.webp',
    backgroundColor: '#28EA96',
    textColor: '#000000',
    lightBackgroundColor: '#28EA96',
    lightTextColor: '#000000',
    accentColor: '#000000',
    align: 'left',
    variant: 'immersive',
    items: [
      {
        title: 'Software Developer',
        subtitle: 'Dec 2025 – Present',
        body: 'Developed and shipped features spanning backend, frontend, and infrastructure — including integrations with external trading services and real-time data flows.\n\nImproved system observability and incident response workflows. Operated in a CI/CD environment, collaborating with product and QA teams.',
        skills: [
          'Fintech',
          'Real-time Data',
          'Observability',
          'CI/CD',
          'Prop Trading',
        ],
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
    experience: Experience.Expert,
    category: 'UI/UX',
    icon: React.createElement(FaReact),
    color: '#61DAFB',
  },
  {
    id: 'nest',
    title: 'Nest.js',
    experience: Experience.Advanced,
    category: 'Backend',
    icon: React.createElement('img', {
      src: '/icons/devicon/nestjs.svg',
      alt: 'nestjs',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
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
    icon: React.createElement('img', {
      src: '/icons/devicon/dart.svg',
      alt: 'dart',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
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
    experience: Experience.Expert,
    category: 'Languages',
    icon: React.createElement('img', {
      src: '/icons/devicon/typescript.svg',
      alt: 'typescript',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
    color: '#007ACC',
  },
  {
    id: 'csharp',
    title: 'C#',
    experience: Experience.Basic,
    category: 'Languages',
    icon: React.createElement('img', {
      src: '/icons/devicon/csharp.svg',
      alt: 'csharp',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
    color: '#00599C',
  },
  {
    id: 'flutter',
    title: 'Flutter',
    experience: Experience.Intermediate,
    category: 'UI/UX',
    icon: React.createElement('img', {
      src: '/icons/devicon/flutter.svg',
      alt: 'flutter',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
    color: '#02569B',
  },
  {
    id: 'django',
    title: 'Django',
    experience: Experience.Advanced,
    category: 'Backend',
    icon: React.createElement('img', {
      src: '/icons/devicon/django.svg',
      alt: 'django',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
    color: '#092E20',
  },
  {
    id: 'express',
    title: 'Express.js',
    experience: Experience.Advanced,
    category: 'Backend',
    icon: React.createElement('img', {
      src: '/icons/devicon/express.svg',
      alt: 'express',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
    color: '#000000',
  },
  {
    id: 'springboot',
    title: 'Spring Boot',
    experience: Experience.Expert,
    category: 'Backend',
    icon: React.createElement('img', {
      src: '/icons/devicon/spring.svg',
      alt: 'spring',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
    color: '#6DB33F',
  },
  {
    id: 'tailwindcss',
    title: 'TailwindCSS',
    experience: Experience.Intermediate,
    category: 'UI/UX',
    icon: React.createElement('img', {
      src: '/icons/devicon/tailwindcss.svg',
      alt: 'tailwindcss',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
    color: '#38B2AC',
  },
  {
    id: 'postgresql',
    title: 'PostgreSQL',
    experience: Experience.Advanced,
    category: 'Database',
    icon: React.createElement('img', {
      src: '/icons/devicon/postgresql.svg',
      alt: 'postgresql',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
    color: '#4169E1',
  },
  {
    id: 'firebase',
    title: 'Firebase',
    experience: Experience.Advanced,
    category: 'Database',
    icon: React.createElement('img', {
      src: '/icons/devicon/firebase.svg',
      alt: 'firebase',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
    color: '#FFCA28',
  },
  {
    id: 'mongodb',
    title: 'MongoDB',
    experience: Experience.Intermediate,
    category: 'Database',
    icon: React.createElement('img', {
      src: '/icons/devicon/mongodb.svg',
      alt: 'mongodb',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
    color: '#47A248',
  },
  {
    id: 'mysql',
    title: 'MySQL',
    experience: Experience.Advanced,
    category: 'Database',
    icon: React.createElement('img', {
      src: '/icons/devicon/mysql.svg',
      alt: 'mysql',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
    color: '#4479A1',
  },
  {
    id: 'docker',
    title: 'Docker',
    experience: Experience.Advanced,
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
    icon: React.createElement('img', {
      src: '/icons/devicon/postman.svg',
      alt: 'postman',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
    color: '#FF6C37',
  },
  {
    id: 'vscode',
    title: 'VS Code',
    experience: Experience.Advanced,
    category: 'Tools',
    icon: React.createElement('img', {
      src: '/icons/devicon/vscode.svg',
      alt: 'vscode',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
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
    icon: React.createElement('img', {
      src: '/icons/devicon/junit.svg',
      alt: 'junit',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
    color: '#25A162',
  },
  {
    id: 'selenium',
    title: 'Selenium',
    experience: Experience.Intermediate,
    category: 'Testing',
    icon: React.createElement('img', {
      src: '/icons/devicon/selenium.svg',
      alt: 'selenium',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
    color: '#43B02A',
  },
  {
    id: 'vitest',
    title: 'Vitest',
    experience: Experience.Intermediate,
    category: 'Testing',
    icon: React.createElement(TestTube),
    color: '#6C9F2A',
  },
  {
    id: 'playwright',
    title: 'Playwright',
    experience: Experience.Intermediate,
    category: 'Testing',
    icon: React.createElement(Bug),
    color: '#45BA4B',
  },
  {
    id: 'google-cloud',
    title: 'Google Cloud',
    experience: Experience.Intermediate,
    category: 'Tools',
    color: '#4285F4',
    icon: React.createElement('img', {
      src: '/icons/devicon/googlecloud.svg',
      alt: 'googlecloud',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
  },
  {
    id: 'cpp',
    title: 'C++',
    experience: Experience.Intermediate,
    category: 'Languages',
    icon: React.createElement('img', {
      src: '/icons/devicon/cplusplus.svg',
      alt: 'cplusplus',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
    color: '#00599C',
  },
  {
    id: 'hpc',
    title: 'High-Performance Computing',
    experience: Experience.Intermediate,
    category: 'Data Science',
    icon: React.createElement(Laptop),
    color: '#008000',
  },
  {
    id: 'cache-optimization',
    title: 'Cache Optimization',
    experience: Experience.Intermediate,
    category: 'Data Science',
    icon: React.createElement(RefreshCw),
    color: '#FF5733',
  },
  {
    id: 'doe',
    title: 'Design of Experiments (DoE)',
    experience: Experience.Intermediate,
    category: 'Data Science',
    icon: React.createElement(FlaskConical),
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
    experience: Experience.Intermediate,
    category: 'Hardware',
    icon: React.createElement(Bluetooth),
    color: '#0082FC',
  },
  {
    id: 'arduino',
    title: 'Arduino',
    experience: Experience.Intermediate,
    category: 'Hardware',
    icon: React.createElement('img', {
      src: '/icons/devicon/arduino.svg',
      alt: 'arduino',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
    color: '#00979D',
  },
  {
    id: 'iot',
    title: 'IoT',
    experience: Experience.Intermediate,
    category: 'Hardware',
    icon: React.createElement(Cpu),
    color: '#FF6B35',
  },
  {
    id: 'sensor-processing',
    title: 'Sensor Data Processing',
    experience: Experience.Intermediate,
    category: 'Data Science',
    icon: React.createElement(Cpu),
    color: '#FFD700',
  },
  {
    id: 'data-acquisition',
    title: 'Data Acquisition',
    experience: Experience.Intermediate,
    category: 'Data Science',
    icon: React.createElement(Braces),
    color: '#DA5B0B',
  },
  {
    id: 'kotlin',
    title: 'Kotlin',
    experience: Experience.Intermediate,
    category: 'Languages',
    icon: React.createElement('img', {
      src: '/icons/devicon/kotlin.svg',
      alt: 'kotlin',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
    color: '#7F52FF',
  },
  {
    id: 'go',
    title: 'Go',
    experience: Experience.Advanced,
    category: 'Languages',
    icon: React.createElement(Terminal),
    color: '#00ADD8',
  },
  {
    id: 'nextjs',
    title: 'Next.js',
    experience: Experience.Advanced,
    category: 'UI/UX',
    icon: React.createElement('img', {
      src: '/icons/devicon/nextjs.svg',
      alt: 'nextjs',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
    color: '#000000',
  },
  {
    id: 'kubernetes',
    title: 'Kubernetes',
    experience: Experience.Intermediate,
    category: 'DevOps',
    icon: React.createElement('img', {
      src: '/icons/devicon/kubernetes.svg',
      alt: 'kubernetes',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
    color: '#326CE5',
  },
  {
    id: 'jenkins',
    title: 'Jenkins',
    experience: Experience.Intermediate,
    category: 'DevOps',
    icon: React.createElement('img', {
      src: '/icons/devicon/jenkins.svg',
      alt: 'jenkins',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
    color: '#D24939',
  },
  {
    id: 'terraform',
    title: 'Terraform',
    experience: Experience.Intermediate,
    category: 'DevOps',
    icon: React.createElement('img', {
      src: '/icons/devicon/terraform.svg',
      alt: 'terraform',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
    color: '#7B42BC',
  },
  {
    id: 'scikitlearn',
    title: 'Scikit-learn',
    experience: Experience.Intermediate,
    category: 'AI/ML',
    icon: React.createElement('img', {
      src: '/icons/devicon/scikitlearn.svg',
      alt: 'scikitlearn',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
    color: '#F7931E',
  },
  {
    id: 'tensorflow',
    title: 'TensorFlow',
    experience: Experience.Intermediate,
    category: 'AI/ML',
    icon: React.createElement('img', {
      src: '/icons/devicon/tensorflow.svg',
      alt: 'tensorflow',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
    color: '#FF6F00',
  },
  {
    id: 'pytorch',
    title: 'PyTorch',
    experience: Experience.Intermediate,
    category: 'AI/ML',
    icon: React.createElement('img', {
      src: '/icons/devicon/pytorch.svg',
      alt: 'pytorch',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
    color: '#EE4C2C',
  },
  {
    id: 'oracle',
    title: 'Oracle SQL',
    experience: Experience.Advanced,
    category: 'Database',
    icon: React.createElement('img', {
      src: '/icons/devicon/oracle.svg',
      alt: 'oracle',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
    color: '#F80000',
  },
  {
    id: 'linux',
    title: 'Linux',
    experience: Experience.Advanced,
    category: 'Tools',
    icon: React.createElement('img', {
      src: '/icons/devicon/linux.svg',
      alt: 'linux',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
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
    id: 'system-design',
    title: 'System Design & Architecture',
    experience: Experience.Expert,
    category: 'Competencies',
    icon: React.createElement(Laptop),
    color: '#6C5CE7',
  },
  {
    id: 'ideation-design',
    title: 'Ideation & Design',
    experience: Experience.Advanced,
    category: 'Competencies',
    icon: React.createElement(Laptop),
    color: '#9C27B0',
  },
  {
    id: 'vuejs',
    title: 'Vue.js',
    experience: Experience.Intermediate,
    category: 'UI/UX' as const,
    icon: React.createElement('img', {
      src: '/icons/devicon/vuejs.svg',
      alt: 'vuejs',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
    color: '#42B883',
  },
  {
    id: 'fastapi',
    title: 'FastAPI',
    experience: Experience.Advanced,
    category: 'Backend' as const,
    icon: React.createElement('img', {
      src: '/icons/devicon/fastapi.svg',
      alt: 'fastapi',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
    color: '#009688',
  },
  {
    id: 'dynamodb',
    title: 'DynamoDB',
    experience: Experience.Intermediate,
    category: 'Database' as const,
    icon: React.createElement('i', {
      className: 'devicon-amazonwebservices-plain',
    }),
    color: '#FF9900',
  },
  {
    id: 'aws',
    title: 'AWS',
    experience: Experience.Advanced,
    category: 'DevOps' as const,
    icon: React.createElement('i', {
      className: 'devicon-amazonwebservices-plain',
    }),
    color: '#FF9900',
  },
  {
    id: 'rabbitmq',
    title: 'RabbitMQ',
    experience: Experience.Intermediate,
    category: 'Tools' as const,
    icon: React.createElement('img', {
      src: '/icons/devicon/rabbitmq.svg',
      alt: 'rabbitmq',
      width: 32,
      height: 32,
      style: { display: 'inline-block' },
    }),
    color: '#FF6600',
  },
]
// Define projects
const projects: Project[] = [
  {
    title: 'People-Database',
    subtitle: 'Database management system',
    alone: true,
    year: 2021,
    group: 'Software',
    body: 'A people database management system. It allows administrators to manage employees data and generate reports. Also, employees can manage clients data and visit reports. It includes user authentication, data validation and data visualization.',
    icon: React.createElement(Globe),
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
    title: 'Kuki',
    subtitle: 'Social network for chefs',
    body: 'A cooking-focused social network for home and professional chefs. Users can share recipes, upload photos, interact, and get ingredient-based recommendations, creating a vibrant culinary community.',
    icon: React.createElement(Globe),
    year: 2023,
    group: 'Software',
    skills: skills.filter(
      (skill) =>
        skill.title === 'React' ||
        skill.title === 'Spring Boot' ||
        skill.title === 'PostgreSQL' ||
        skill.title === 'Postman' ||
        skill.title === 'Docker' ||
        skill.title === 'Next.js'
    ),
    images: kukiOrder.map(
      (name) => kukiImages[`../assets/img/kuki/${name}.webp`]
    ),
    codeLink: 'https://github.com/Andrewdpg/kuki-social-network-back',
    siteLink: 'https://kuki-social-network-front.vercel.app/',
    warnings: [
      'Backend is hosted on free-tier render so it may take a few seconds/minutes to start',
    ],
    category: 'Web',
  },
  {
    title: 'Memory Optimization in Matrix Multiplication',
    subtitle: 'High-performance computing research project',
    body: 'A research project focused on optimizing matrix multiplication by leveraging cache locality principles. It evaluates multiple algorithmic approaches and introduces a panel-based multiplication technique to improve performance. Statistical analysis and experimental design were applied to validate results.',
    icon: React.createElement(FlaskConical),
    year: 2024,
    group: 'Research & ML',
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
    body: "A research project focused on developing a system for early detection of Parkinson's disease using inertial sensors and a mobile application. The system utilizes Arduino Nano 33 IoT for data acquisition, Bluetooth Low Energy for wireless communication, and machine learning techniques to identify motor patterns.",
    icon: React.createElement(FlaskConical),
    year: 2024,
    group: 'Research & ML',
    skills: skills.filter(
      (skill) =>
        skill.title === 'Arduino' ||
        skill.title === 'Bluetooth Low Energy (BLE)' ||
        skill.title === 'TensorFlow' ||
        skill.title === 'Python'
    ),
    images: [arduino, movement, gyro],
    siteLink:
      'https://drive.google.com/file/d/1yFMc7df5MKc4jlOZC7zKR7on0HKm3EF7/view?usp=sharing',
    institution: {
      name: 'i2t Research Group — Universidad Icesi',
      url: 'https://i2t.icesi.edu.co',
    },
    category: 'Research',
  },
  {
    title: 'Methodus',
    subtitle: 'Adaptive ICFES preparation platform',
    body: 'Leading the full technical development of Methodus — an adaptive learning platform for ICFES exam preparation. Built with a focus on personalized experiences and real-time feedback. Managing release planning, QA coordination, and incident response as the platform prepares for pilot use with real students.',
    icon: React.createElement(Globe),
    year: 2026,
    inProgress: true,
    group: 'Software',
    siteLink: 'https://entrenamiento.methodus.online/',
    siteLabel: 'Production',
    skills: skills.filter(
      (skill) =>
        skill.title === 'React' ||
        skill.title === 'Next.js' ||
        skill.title === 'TypeScript' ||
        skill.title === 'PostgreSQL' ||
        skill.title === 'Docker'
    ),
    images: methodusOrder.map(
      (name) => methodusImages[`../assets/img/methodus/${name}.webp`]
    ),
    category: 'Web',
  },
  {
    title: 'Support Agent',
    subtitle: 'AI support agent for Methodus',
    body: 'An AI-powered support agent built with OpenClaw that handles tier-1 support tickets for Methodus. Designed to reduce response time and automate common inquiries — account issues, exercise explanations, and platform guidance — so the team can focus on product development.',
    icon: React.createElement(Globe),
    year: 2026,
    inProgress: true,
    relatedTo: 'Methodus',
    group: 'Software',
    skills: skills.filter(
      (skill) =>
        skill.title === 'Python' ||
        skill.title === 'React' ||
        skill.title === 'TypeScript' ||
        skill.title === 'Docker'
    ),
    images: [],
    category: 'AI',
  },
  {
    title: 'Pre-Anesthetic Predictive Screening',
    subtitle:
      "Bachelor's thesis — ML pipeline for perioperative risk stratification",
    body: 'End-to-end machine learning system that predicts adverse perioperative events from preoperative clinical records. Apache Airflow orchestrates the full pipeline — data validation, NLP-based medication normalization, feature engineering, training of up to 9 model families with probabilistic calibration, and threshold optimization. A FastAPI server exposes the trained models as a REST API for real-time patient risk scoring (low / medium / high). Deployed entirely in Docker.',
    icon: React.createElement(FlaskConical),
    year: 2026,
    group: 'Research & ML',
    skills: skills.filter(
      (skill) =>
        skill.title === 'Python' ||
        skill.title === 'FastAPI' ||
        skill.title === 'Docker' ||
        skill.title === 'Scikit-learn' ||
        skill.title === 'Statistical Analysis'
    ),
    images: [preanesthesiaPipeline, preanesthesiaRoc, preanesthesiaRanking],
    institution: {
      name: 'Fundación Valle del Lili',
      url: 'https://www.valledellili.org',
    },
    category: 'AI',
  },
]

export { skills, projects, experienceGroups }
