import React from 'react'
import { HeroScroll } from '../../../components/HeroScroll'
import {
  projects,
  skills,
  experienceGroups,
} from '../../../services/dataService'
import { ProjectCard } from '../../../components/ProjectCard'
import { SkillButton } from '../../../components/SkillButton'
import { Skill } from '../../../types/skill'
import { Section } from '../../../components/Section'
import { SubSection } from '../../../components/SubSection'
import { Presentation } from '../components/Presetation'
import { Navigation, NavSection } from '../../layout/components/Navigation'

function Dashboard() {
  const sections: NavSection[] = [
    { id: 'intro', label: 'Home' },
    ...experienceGroups.map((group, idx) => ({
      id: `exp-${idx}`,
      label: group.place,
    })),
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
  ]
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
    <div className="max-h-screen overflow-hidden">
      <Navigation sections={sections} />
      <HeroScroll>
        {/* Presentation Section */}
        <div id="intro">
          <Presentation />
        </div>

        {/* Scrollable Experience Sections (Grouped by Place) */}
        {experienceGroups.map((group, idx: number) => (
          <div id={`exp-${idx}`} key={idx}>
            <Section
              title={group.place}
              subtitle={group.description}
              containerStyle={{
                backgroundColor: group.backgroundColor,
                color: group.textColor,
              }}
              heroImage={group.heroImage}
              align={group.align}
              variant={group.variant || 'immersive'}
            >
              <div className="flex flex-col gap-8 w-full">
                {group.items.map((item, i: number) => (
                  <div
                    key={i}
                    className="relative pl-8 border-l transition-all duration-500 group/item pb-2"
                    style={{ borderColor: `${group.textColor}33` }}
                  >
                    {/* Timeline Dot */}
                    <div
                      className="absolute top-2 -left-[5px] w-2.5 h-2.5 rounded-full transition-all duration-300 group-hover/item:scale-150"
                      style={{
                        backgroundColor: group.textColor,
                        boxShadow: `0 0 15px ${group.textColor}66`,
                      }}
                    />

                    <h3 className="text-2xl font-black leading-tight uppercase tracking-tighter">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono uppercase tracking-[0.3em] mt-1 opacity-40">
                      {item.subtitle}
                    </p>

                    <p className="mt-4 text-lg font-light leading-relaxed whitespace-pre-line opacity-70">
                      {item.body}
                    </p>

                    {item.skills && (
                      <div className="flex flex-wrap gap-2 mt-6">
                        {item.skills.map((skill: string, sIdx: number) => (
                          <span
                            key={sIdx}
                            className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 hover:bg-white hover:text-black"
                            style={{
                              borderColor: `${group.textColor}33`,
                              backgroundColor: `${group.textColor}08`,
                              color: group.textColor,
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          </div>
        ))}

        {/* Projects Section */}
        <div id="projects">
          <Section
            title="Projects"
            containerStyle={{
              backgroundColor: '#1A1128', // Brand Deep Purple
              color: '#FFFFFF',
            }}
            align="right"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 w-full">
              {projects.map((project, idx: number) => (
                <ProjectCard key={idx} project={project} />
              ))}
            </div>
          </Section>
        </div>

        {/* Skills Section */}
        <div id="skills">
          <Section
            title="Skills"
            containerStyle={{ backgroundColor: '#FFFFFF', color: '#1A1128' }}
            align="left"
          >
            <div className="flex flex-wrap justify-center gap-12 mt-12 w-full">
              {Object.entries(groupedSkills).map(([category, skills]) => (
                <SubSection
                  title={category}
                  key={category}
                  className="flex-1 min-w-[300px]"
                >
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
                    {skills.map((skill: Skill, i: number) => (
                      <SkillButton key={i} skill={skill} />
                    ))}
                  </div>
                </SubSection>
              ))}
            </div>
          </Section>
        </div>
      </HeroScroll>
    </div>
  )
}

export default Dashboard
