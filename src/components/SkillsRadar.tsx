import React, { useState, useMemo } from 'react'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts'
import { Skill, Experience } from '../types/skill'

const experienceLevel: Record<Experience, number> = {
  [Experience.Basic]: 1,
  [Experience.Intermediate]: 2,
  [Experience.Advanced]: 3,
  [Experience.Expert]: 4,
}

type SkillsRadarProps = {
  skills: Skill[]
  isDark: boolean
}

export function SkillsRadar({ skills, isDark }: SkillsRadarProps) {
  const [activeTab, setActiveTab] = useState<string>('all')

  const categories = useMemo(
    () => [...new Set(skills.map((s) => s.category))].sort(),
    [skills]
  )

  const radarData = useMemo(() => {
    if (activeTab === 'all') {
      return categories.map((cat) => ({
        name: cat,
        value: skills.filter((s) => s.category === cat).length,
      }))
    }
    return skills
      .filter((s) => s.category === activeTab)
      .map((s) => ({
        name: s.title,
        value: experienceLevel[s.experience],
      }))
  }, [activeTab, skills, categories])

  const selectedSkills = useMemo(
    () => skills.filter((s) => s.category === activeTab),
    [activeTab, skills]
  )

  const mutedColor = isDark
    ? 'rgba(232, 228, 240, 0.3)'
    : 'rgba(26, 17, 40, 0.3)'
  const gridColor = isDark
    ? 'rgba(232, 228, 240, 0.08)'
    : 'rgba(26, 17, 40, 0.08)'

  return (
    <div className="flex flex-col gap-10 w-full max-w-4xl mx-auto">
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setActiveTab('all')}
          className={`text-[11px] font-mono font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full transition-all ${
            activeTab === 'all'
              ? 'bg-app-main text-white'
              : 'text-app-secondary/50 dark:text-[#E8E4F0]/50 hover:text-app-secondary dark:hover:text-[#E8E4F0] border border-transparent hover:border-app-main/20'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`text-[11px] font-mono font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full transition-all ${
              activeTab === cat
                ? 'bg-app-main text-white'
                : 'text-app-secondary/50 dark:text-[#E8E4F0]/50 hover:text-app-secondary dark:hover:text-[#E8E4F0] border border-transparent hover:border-app-main/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="w-full max-w-lg mx-auto">
        <ResponsiveContainer width="100%" height={380}>
          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke={gridColor} />
            <PolarAngleAxis
              dataKey="name"
              tick={{
                fontSize: 10,
                fill: mutedColor,
                fontFamily: 'monospace',
                letterSpacing: '0.05em',
              }}
            />
            <PolarRadiusAxis
              domain={activeTab === 'all' ? [0, 'auto'] : [0, 4]}
              tick={false}
              axisLine={false}
            />
            <Radar
              dataKey="value"
              stroke="#9B76D3"
              fill="#9B76D3"
              fillOpacity={0.06}
              strokeWidth={1.5}
              dot={{ r: 3, fill: '#9B76D3', strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#9B76D3', strokeWidth: 0 }}
              animationDuration={400}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {activeTab !== 'all' && selectedSkills.length > 0 && (
        <div className="flex flex-col gap-5">
          <div className="h-px bg-app-secondary/10 dark:bg-white/10 w-full" />
          <div className="flex flex-wrap gap-2.5">
            {selectedSkills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-app-secondary/10 dark:border-white/10 bg-app-secondary/4 dark:bg-white/4 hover:border-app-main/40 hover:bg-app-main/5 transition-all"
              >
                <div className="w-5 h-5 rounded-md bg-white/60 dark:bg-white/15 flex items-center justify-center shrink-0 text-xs">
                  {skill.icon}
                </div>
                <span className="text-xs font-bold text-app-secondary dark:text-[#E8E4F0] whitespace-nowrap">
                  {skill.title}
                </span>
                <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-app-secondary/40 dark:text-white/40">
                  {skill.experience}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
