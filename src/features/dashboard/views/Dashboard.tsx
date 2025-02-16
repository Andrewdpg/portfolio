import React from 'react'
import { Presentation } from '../components/Presetation'
import Timeline, { TimelineItem } from '../../../components/Timeline'
import { Section } from '../../../components/Section'
import { ProjectCard } from '../../../components/ProjectCard'
import kuki_home from '../../../assets/img/kuki/home.png'
import kuki_comments from '../../../assets/img/kuki/comments.png'
import kuki_login from '../../../assets/img/kuki/login.png'
import { Web } from '@mui/icons-material'
import { Project } from '../../../types/project'

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

const projects: Project[] = [
  {
    title: 'Kuki',
    subtitle: 'Social network for chefs',
    body: 'A cooking-focused social network for home and professional chefs. Users can share recipes, upload photos, interact, and get ingredient-based recommendations, creating a vibrant culinary community.',
    icon: <Web />,
    images: [kuki_home, kuki_comments, kuki_login],
  },
  {
    title: 'Project 2',
    subtitle: 'Subtitle 2',
    body: 'Body 2',
    icon: <div>Icon</div>,
    images: ['image1', 'image2'],
  },
]

function Dashboard() {
  return (
    <>
      <div className="w-full p-4 flex flex-col gap-4 transition-all duration-1000 ease-in-out">
        <Presentation />
        <div className="flex flex-wrap items-start sm:justify-center gap-y-2 m-4">
          <Section className="sm:w-10/12 md:w-4/6 lg:w-1/2" title="My Journey">
            <Timeline items={timelineItems} />
          </Section>
          <Section className="sm:w-10/12 md:w-4/6 lg:w-1/2" title="Projects">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </Section>
          <Section className="sm:w-10/12 md:w-4/6 lg:w-1/2" title="Languages">
            <Timeline items={timelineItems} />
          </Section>
          <Section className="sm:w-10/12 md:w-4/6 lg:w-1/2" title="Skills">
            <Timeline items={timelineItems} />
          </Section>
        </div>
      </div>
    </>
  )
}

export default Dashboard
