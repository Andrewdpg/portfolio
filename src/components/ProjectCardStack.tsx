import React from 'react'
import { Project } from '../types/project'
import { useDrawer } from '../context/DrawerContext'
import { ProjectDetail } from './ProjectCard'

type ProjectCardStackProps = {
  parent: Project
  components: Project[]
}

export const ProjectCardStack: React.FC<ProjectCardStackProps> = ({
  parent,
  components,
}) => {
  const { openDrawer } = useDrawer()

  return (
    <div className="h-[380px] w-full flex flex-col rounded-[32px] overflow-hidden border border-white/10 bg-app-secondary">
      <div
        className="flex-1 min-h-0 relative group cursor-pointer overflow-hidden"
        onClick={() =>
          openDrawer({
            title: parent.title,
            body: <ProjectDetail project={parent} />,
          })
        }
      >
        <div className="absolute inset-0 z-0">
          <img
            src={parent.images[0]}
            alt={parent.title}
            loading="lazy"
            className="w-full h-full object-cover transition-[transform,opacity] duration-500 opacity-50 group-hover:opacity-70 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-app-secondary via-app-secondary/40 to-transparent" />
        </div>

        <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
          <div className="flex flex-col gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-app-main/70">
              {parent.subtitle}
            </span>
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none">
                {parent.title}
              </h3>
              <span className="text-[10px] font-mono font-bold text-white/30 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10 shrink-0">
                {parent.year}
              </span>
            </div>
          </div>
        </div>

        <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full border border-white/10 flex items-center justify-center text-white/20 text-xs">
          {parent.icon}
        </div>
      </div>

      <div className="h-px bg-white/10 shrink-0" />

      {components.map((child, idx) => (
        <div
          key={idx}
          className="h-[105px] shrink-0 group cursor-pointer relative bg-app-secondary hover:bg-white/5 transition-colors px-5 py-3 flex items-center"
          onClick={() =>
            openDrawer({
              title: child.title,
              body: <ProjectDetail project={child} />,
            })
          }
        >
          <div className="flex items-start gap-3 w-full min-w-0">
            <div className="shrink-0 w-7 h-7 rounded-lg bg-app-main/15 flex items-center justify-center text-app-main text-xs mt-0.5">
              {child.icon}
            </div>
            <div className="flex flex-col gap-0.5 min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white tracking-tight">
                  {child.title}
                </h4>
                <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-white/20 px-1.5 py-0.5 rounded-full border border-white/10">
                  {child.year}
                </span>
              </div>
              <p className="text-[11px] text-white/40 line-clamp-1 font-light">
                {child.body}
              </p>
              {child.warnings && child.warnings.length > 0 && (
                <span className="text-[9px] text-amber-400/50 font-mono mt-0.5">
                  {child.warnings[0]}
                </span>
              )}
            </div>
            <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-app-main/50 shrink-0 self-center">
              Agent
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
