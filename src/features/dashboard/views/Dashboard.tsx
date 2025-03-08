import React from 'react'
import { Presentation } from '../components/Presetation'
import Timeline from '../../../components/Timeline'
import { Section } from '../../../components/Section'
import { ProjectCard } from '../../../components/ProjectCard'
import { projects, skills, timelineItems } from '../../../services/dataService'
import { SkillButton } from '../../../components/SkillButton'
import { Skill } from '../../../types/skill'
import { SubSection } from '../../../components/SubSection'

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
        <div className="flex flex-col items-start sm:justify-center gap-y-2 m-4">
          <Section
            className="flex flex-wrap justify-around gap-x-8 gap-y-4 w-full"
            title="Projects"
          >
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </Section>
          <Section className="w-full" title="Skills">
            <div className="flex flex-wrap justify-center gap-2 w-full">
              {Object.entries(groupedSkills).map(([category, skills]) => (
                <SubSection title={category} key={category}>
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                    {skills.map((skill, index) => (
                      <SkillButton key={index} skill={skill} />
                    ))}
                  </div>
                </SubSection>
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
