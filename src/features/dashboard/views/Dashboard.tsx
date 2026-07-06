import React, { useEffect } from 'react'
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
import { ChatWidget } from '../components/Chat'
import { SkillsRadar } from '../../../components/SkillsRadar'
import { useTheme } from '../../../context/ThemeContext'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

function Dashboard() {
  const { isDark } = useTheme()

  useEffect(() => {
    navigator.sendBeacon(
      `${API_URL}/api/andres/visit`,
      new Blob([JSON.stringify({ referrer: document.referrer })], {
        type: 'application/json',
      })
    )
  }, [])

  const sections: NavSection[] = [
    { id: 'intro', label: 'Home' },
    ...experienceGroups.map((group, idx) => ({
      id: `exp-${idx}`,
      label: group.navLabel || group.place,
    })),
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'workflow', label: 'Workflow' },
  ]

  return (
    <div className="max-h-screen overflow-hidden">
      <Navigation sections={sections} />
      <ChatWidget />
      <HeroScroll>
        {/* Presentation Section */}
        <div id="intro">
          <Presentation />
        </div>

        {/* Scrollable Experience Sections (Grouped by Place) */}
        {experienceGroups.map((group, idx: number) => (
          <div id={`exp-${idx}`} key={idx}>
            {(() => {
              const bg = isDark
                ? group.backgroundColor
                : (group.lightBackgroundColor ?? '#F8F7FB')
              const fg = isDark
                ? group.textColor
                : (group.lightTextColor ?? '#1A1128')
              const accent = group.accentColor ?? group.textColor ?? '#9B76D3'
              return (
                <Section
                  title={group.place}
                  subtitle={group.description}
                  containerStyle={{ backgroundColor: bg, color: fg }}
                  heroImage={group.heroImage}
                  align={group.align}
                  variant={group.variant || 'minimal'}
                >
                  <div className="flex flex-col gap-8 w-full">
                    {group.category && (
                      <span
                        className="self-start px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border"
                        style={{
                          borderColor: `${accent}30`,
                          color: accent,
                          backgroundColor: `${accent}12`,
                        }}
                      >
                        {group.category}
                      </span>
                    )}
                    {group.items.map((item, i: number) => (
                      <div
                        key={i}
                        className="relative pl-8 border-l transition-all duration-500 group/item pb-2"
                        style={{ borderColor: `${accent}33` }}
                      >
                        <div
                          className="absolute top-2 -left-[5px] w-2.5 h-2.5 rounded-full transition-all duration-300 group-hover/item:scale-150"
                          style={{
                            backgroundColor: accent,
                            boxShadow: `0 0 15px ${accent}66`,
                          }}
                        />
                        <h3 className="font-display text-2xl font-black leading-tight uppercase tracking-tight">
                          {item.title}
                        </h3>
                        <p
                          className="text-xs font-mono uppercase tracking-[0.3em] mt-1 opacity-60"
                          style={{ color: accent }}
                        >
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
                                className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all duration-300"
                                style={{
                                  borderColor: `${accent}33`,
                                  backgroundColor: `${accent}10`,
                                  color: accent,
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
              )
            })()}
          </div>
        ))}

        {/* Projects Section */}
        <div id="projects">
          <Section
            title="Projects"
            variant="minimal"
            containerStyle={{
              backgroundColor: '#1A1128',
              color: '#FFFFFF',
            }}
            align="right"
          >
            <div className="flex flex-col gap-16 mt-12 w-full">
              {(['Software', 'Research & ML'] as const).map((group) => {
                const groupProjects = projects.filter((p) => p.group === group)
                if (!groupProjects.length) return null
                return (
                  <div key={group} className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-display font-bold uppercase tracking-wider text-white/50">
                        {group}
                      </span>
                      <div className="flex-1 h-px bg-white/10" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                      {groupProjects.map((project, idx) => (
                        <ProjectCard key={idx} project={project} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </Section>
        </div>

        {/* Skills Section */}
        <div id="skills">
          <Section
            title="Skills"
            variant="minimal"
            containerStyle={{
              backgroundColor: isDark ? '#141414' : '#FFFFFF',
              color: isDark ? '#E8E4F0' : '#1A1128',
            }}
            align="left"
          >
            <SkillsRadar skills={skills} isDark={isDark} />
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
