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
import { Experience } from '../../../types/skill'
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
            <div className="flex flex-col gap-12 mt-12 w-full max-w-4xl mx-auto">
              {/* Featured skills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {skills
                  .filter(
                    (s) =>
                      s.experience === Experience.Expert ||
                      s.experience === Experience.Advanced
                  )
                  .map((skill, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-app-secondary/10 dark:border-white/8 bg-app-secondary/3 dark:bg-white/3 hover:border-app-main/40 hover:bg-app-main/5 group transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/60 dark:bg-white/10 flex items-center justify-center text-2xl shrink-0">
                        {skill.icon}
                      </div>
                      <span className="text-xs font-bold text-app-secondary dark:text-[#E8E4F0] text-center leading-tight">
                        {skill.title}
                      </span>
                      <span className="text-[9px] font-bold tracking-widest uppercase text-app-secondary/40 dark:text-white/40">
                        {skill.experience}
                      </span>
                    </div>
                  ))}
              </div>

              {/* Also proficient in */}
              <div className="pt-2 border-t border-app-secondary/8 dark:border-white/8">
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
                        className="px-3 py-1.5 rounded-full text-[11px] font-semibold border border-app-secondary/10 dark:border-white/10 bg-app-secondary/4 dark:bg-white/4 text-app-secondary/70 dark:text-[#E8E4F0]/70 hover:bg-app-main hover:text-white hover:border-app-main cursor-default transition-all duration-200"
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
