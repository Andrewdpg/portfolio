import React from 'react'
import { HeroScroll } from '../../../components/HeroScroll'
import {
  projects,
  skills,
  experienceGroups,
} from '../../../services/dataService'
import { ProjectCard } from '../../../components/ProjectCard'
import { Section } from '../../../components/Section'
import { Presentation } from '../components/Presetation'
import { Navigation, NavSection } from '../../layout/components/Navigation'
import { AIWorkflow } from '../components/AIWorkflow'
import { Experience } from '../../../types/skill'

function Dashboard() {
  const sections: NavSection[] = [
    { id: 'intro', label: 'Home' },
    ...experienceGroups.map((group, idx) => ({
      id: `exp-${idx}`,
      label: group.place,
    })),
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'workflow', label: 'Workflow' },
  ]

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
              variant={group.variant || 'minimal'}
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
            variant="minimal"
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
            variant="minimal"
            containerStyle={{ backgroundColor: '#FFFFFF', color: '#1A1128' }}
            align="left"
          >
            <div className="flex flex-col gap-12 mt-12 w-full max-w-4xl mx-auto">
              {/* Featured skills */}
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-app-main block mb-6">
                  Core skills
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {skills
                    .filter(
                      (s) =>
                        s.experience === Experience.Expert ||
                        s.experience === Experience.Advanced
                    )
                    .map((skill, i) => {
                      const pct =
                        skill.experience === Experience.Expert ? 100 : 80
                      return (
                        <div
                          key={i}
                          className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-app-secondary/8 bg-app-secondary/3 hover:border-app-main/40 hover:bg-app-main/5 group"
                        >
                          <div className="text-3xl">{skill.icon}</div>
                          <span className="text-xs font-bold text-app-secondary text-center leading-tight">
                            {skill.title}
                          </span>
                          <span
                            className="text-[9px] font-bold tracking-widest uppercase"
                            style={{ color: skill.color }}
                          >
                            {skill.experience}
                          </span>
                          <div className="w-full h-1 rounded-full bg-app-secondary/10 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${pct}%`,
                                backgroundColor: skill.color,
                              }}
                            />
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>

              {/* Also proficient in */}
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-app-main block mb-4">
                  Also proficient in
                </span>
                <div className="flex flex-wrap gap-2">
                  {skills
                    .filter(
                      (s) =>
                        s.experience !== Experience.Expert &&
                        s.experience !== Experience.Advanced
                    )
                    .map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-full text-[11px] font-semibold border border-app-secondary/10 bg-app-secondary/4 text-app-secondary/70 hover:bg-app-main hover:text-white hover:border-app-main cursor-default"
                      >
                        {skill.title}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* AI Workflow Section */}
        <div id="workflow">
          <Section
            title="AI Workflow"
            variant="minimal"
            containerStyle={{ backgroundColor: '#000000', color: '#ffffff' }}
            align="left"
          >
            <AIWorkflow />
          </Section>
        </div>
      </HeroScroll>
    </div>
  )
}

export default Dashboard
