import React from 'react'
import type {
  ActionData,
  Project,
  Skill,
  ExperienceItem,
  ContactInfo,
} from '../../../../services/chatService'
import { useContactModal } from '../../../../context/ContactModalContext'

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="rounded-2xl p-3 hover:border-app-main/30 transition-colors"
      style={{
        backgroundColor: 'rgba(155,118,211,0.08)',
        border: '1px solid rgba(155,118,211,0.15)',
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-tight text-white truncate">
            {project.title}
          </p>
          <p
            className="text-[10px] font-mono uppercase tracking-widest mt-0.5 truncate"
            style={{ color: 'rgba(155,118,211,0.6)' }}
          >
            {project.subtitle}
          </p>
        </div>
        <span
          className="shrink-0 text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: 'rgba(155,118,211,0.15)',
            color: 'rgba(155,118,211,0.8)',
          }}
        >
          {project.category}
        </span>
      </div>
      <div className="flex flex-wrap gap-1 mt-2">
        {project.skills.slice(0, 3).map((s) => (
          <span
            key={s}
            className="text-[9px] px-1.5 py-0.5 rounded-md text-white/40"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
          >
            {s}
          </span>
        ))}
      </div>
      <div className="flex gap-3 mt-2">
        {project.siteLink && (
          <a
            href={project.siteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold uppercase tracking-widest transition-colors"
            style={{ color: '#28EA96' }}
          >
            Live →
          </a>
        )}
        {project.codeLink && (
          <a
            href={project.codeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors"
          >
            Code →
          </a>
        )}
      </div>
    </div>
  )
}

function SkillsCard({ data }: { data: Record<string, Skill[]> }) {
  return (
    <div className="flex flex-col gap-3 mt-1">
      {Object.entries(data).map(([category, skills]) => (
        <div key={category}>
          <p
            className="text-[9px] font-mono font-bold uppercase tracking-[0.25em] mb-1.5"
            style={{ color: 'rgba(155,118,211,0.5)' }}
          >
            {category}
          </p>
          <div className="flex flex-wrap gap-1">
            {skills.map((s) => (
              <span
                key={s.id}
                className="text-[10px] px-2 py-0.5 rounded-full text-white/70"
                style={{
                  border: '1px solid rgba(155,118,211,0.2)',
                  backgroundColor: 'rgba(155,118,211,0.06)',
                }}
                title={s.level}
              >
                {s.title}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ExperienceCard({ items }: { items: ExperienceItem[] }) {
  return (
    <div className="flex flex-col gap-3 mt-1">
      {items.map((item) => (
        <div
          key={item.id}
          className="pl-3"
          style={{ borderLeft: '2px solid rgba(155,118,211,0.3)' }}
        >
          <p className="text-xs font-black uppercase tracking-tight text-white leading-tight">
            {item.role}
          </p>
          <p
            className="text-[10px] font-mono uppercase tracking-widest mt-0.5"
            style={{ color: 'rgba(155,118,211,0.5)' }}
          >
            {item.company} · {item.period}
          </p>
          {item.skills.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {item.skills.map((s) => (
                <span
                  key={s}
                  className="text-[9px] px-1.5 py-0.5 rounded-md text-white/35"
                  style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function ContactCard({ data }: { data: ContactInfo }) {
  const { openContactModal } = useContactModal()

  return (
    <div
      className="rounded-2xl p-3 flex flex-col gap-2"
      style={{
        backgroundColor: 'rgba(40,234,150,0.06)',
        border: '1px solid rgba(40,234,150,0.15)',
      }}
    >
      <p className="text-xs font-black uppercase tracking-tight text-white">
        {data.name}
      </p>
      <a
        href={`mailto:${data.email}`}
        className="text-[10px] font-bold transition-colors"
        style={{ color: '#28EA96' }}
      >
        {data.email}
      </a>
      <a
        href={data.github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[10px] text-white/40 hover:text-white/70 transition-colors"
      >
        {data.github}
      </a>
      <p className="text-[10px] text-white/30">
        {data.location} · {data.openTo}
      </p>
      <button
        onClick={openContactModal}
        className="mt-1 w-full py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
        style={{
          backgroundColor: 'rgba(40,234,150,0.12)',
          border: '1px solid rgba(40,234,150,0.25)',
          color: '#28EA96',
        }}
      >
        Send me a message →
      </button>
    </div>
  )
}

export function ActionCards({ actions }: { actions: ActionData[] }) {
  if (!actions.length) return null

  return (
    <div className="mt-3 flex flex-col gap-3">
      {actions.map((action, i) => {
        if (action.type === 'show_projects') {
          return (
            <div key={i} className="flex flex-col gap-2">
              {(action.data as Project[]).map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )
        }
        if (action.type === 'show_skills') {
          return (
            <SkillsCard key={i} data={action.data as Record<string, Skill[]>} />
          )
        }
        if (action.type === 'show_experience') {
          return (
            <ExperienceCard key={i} items={action.data as ExperienceItem[]} />
          )
        }
        if (action.type === 'get_contact') {
          return <ContactCard key={i} data={action.data as ContactInfo} />
        }
        return null
      })}
    </div>
  )
}
