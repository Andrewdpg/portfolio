import React from 'react'
import { Presentation } from '../components/Presetation'
import Timeline from '../../../components/Timeline'
import { Section } from '../../../components/Section'
import { ProjectCard } from '../../../components/ProjectCard'
import { projects, skills, timelineItems } from '../../../services/dataService'
import { SkillButton } from '../../../components/SkillButton'
import { Skill } from '../../../types/skill'
import Body from '../../../components/Body'

function Dashboard() {
  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>
  )

  return (
    <>
      <div className="w-full px-8 flex flex-col gap-4 transition-all duration-1000 ease-in-out">
        <Presentation />
        <div className="grid grid-cols-1 sm:grid-cols-2 items-start sm:justify-center gap-y-2 m-4">
          <Section className="w-full" title="Projects">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 justify-center w-full">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </Section>
          <Section className="w-full" title="Skills">
            <div className="flex flex-wrap justify-center gap-2 w-full">
              {Object.entries(groupedSkills).map(([category, skills]) => (
                <div key={category} className="flex flex-col">
                  <Body className="text-xl font-bold mb-2">{category}</Body>
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                    {skills.map((skill, index) => (
                      <SkillButton key={index} skill={skill} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>
          <Section className="w-full" title="My Journey">
            <Timeline items={timelineItems} />
          </Section>
        </div>
      </div>
    </>
  )
}

export default Dashboard
