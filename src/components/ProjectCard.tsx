import React from 'react'
import { Project } from '../types/project'
import { useDrawer } from '../context/DrawerContext'
import { ImageGallery } from './ImageGallery'
import { SkillButton } from './SkillButton'
import { Info, ExternalLink, Users, User, Building2 } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'

type ProjectCardProps = {
  project: Project
}

const ProjectDetail: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="flex flex-col gap-8 text-app-secondary">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="overflow-hidden rounded-3xl shadow-2xl border border-app-main/10 bg-app-main/5 aspect-video self-start">
          <ImageGallery
            images={project.images}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-xs font-mono uppercase tracking-widest text-app-main mb-1">
                {project.subtitle}
              </span>
              <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">
                {project.title}
              </h3>
            </div>
            {!project.alone ? (
              <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-app-main/10 text-app-main px-3 py-1.5 rounded-full shrink-0">
                <Users size={12} /> Team
              </div>
            ) : (
              <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-app-main/10 text-app-main px-3 py-1.5 rounded-full shrink-0">
                <User size={12} /> Solo
              </div>
            )}
          </div>

          <p className="text-app-secondary/70 text-lg leading-relaxed font-light">
            {project.body}
          </p>

          <div className="h-px bg-app-main/10 w-full" />

          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-app-main">
              Technologies Stack
            </span>
            <div className="flex flex-wrap gap-3">
              {project.skills.map((skill, index) => (
                <SkillButton key={index} skill={skill} />
              ))}
            </div>
          </div>

          {project.institution && (
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-app-main">
                Institution
              </span>
              {project.institution.url ? (
                <a
                  href={project.institution.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-fit px-4 py-2.5 rounded-xl border border-app-main/20 bg-app-main/5 hover:bg-app-main/10 hover:border-app-main/40 transition-colors group/inst"
                >
                  {project.institution.logoUrl ? (
                    <img
                      src={project.institution.logoUrl}
                      alt={project.institution.name}
                      className="h-5 w-auto object-contain"
                    />
                  ) : (
                    <Building2 size={14} className="text-app-main shrink-0" />
                  )}
                  <span className="text-sm font-medium text-app-secondary group-hover/inst:text-app-main transition-colors">
                    {project.institution.name}
                  </span>
                  <ExternalLink
                    size={12}
                    className="text-app-main/40 group-hover/inst:text-app-main transition-colors"
                  />
                </a>
              ) : (
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-app-main/20 bg-app-main/5 w-fit">
                  {project.institution.logoUrl ? (
                    <img
                      src={project.institution.logoUrl}
                      alt={project.institution.name}
                      className="h-5 w-auto object-contain"
                    />
                  ) : (
                    <Building2 size={14} className="text-app-main shrink-0" />
                  )}
                  <span className="text-sm font-medium text-app-secondary">
                    {project.institution.name}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {project.warnings && (
        <div className="bg-amber-50/50 border border-amber-200/50 p-6 rounded-2xl flex flex-col gap-3">
          {project.warnings.map((warning, index) => (
            <div
              key={index}
              className="flex items-start gap-3 text-amber-900/60 text-sm italic leading-relaxed"
            >
              <Info size={18} className="mt-0.5 shrink-0 text-amber-500" />
              <span>{warning}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-4 mt-4">
        {project.codeLink && (
          <button
            onClick={() => window.open(project.codeLink, '_blank')}
            className="flex-1 min-w-[200px] py-5 bg-app-secondary text-white rounded-full font-bold flex items-center justify-center gap-3 hover:bg-app-main transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-black/10"
          >
            <FaGithub size={20} /> Repository
          </button>
        )}
        {project.siteLink && (
          <button
            onClick={() => window.open(project.siteLink, '_blank')}
            className="flex-1 min-w-[200px] py-5 border-2 border-app-main text-app-main rounded-full font-bold flex items-center justify-center gap-3 hover:bg-app-main hover:text-white transition-all hover:scale-[1.02] active:scale-95"
          >
            <ExternalLink size={20} /> Live Demo
          </button>
        )}
      </div>
    </div>
  )
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { openDrawer } = useDrawer()

  return (
    <div
      className="group relative h-[380px] w-full overflow-hidden rounded-[32px] bg-app-secondary border border-white/10 hover:border-app-main/40 cursor-pointer"
      onClick={() =>
        openDrawer({
          title: project.title,
          body: <ProjectDetail project={project} />,
        })
      }
    >
      <div className="absolute inset-0 z-0">
        <img
          src={project.images[0]}
          alt={project.title}
          loading="lazy"
          width={600}
          height={380}
          className="w-full h-full object-cover transition-[transform,opacity] duration-500 opacity-50 group-hover:opacity-70 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-app-secondary via-app-secondary/40 to-transparent" />
      </div>

      <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
        <div className="flex flex-col gap-3 translate-y-6 group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <div className="flex items-center gap-4">
            {/* Removed backdrop-blur-xl — was creating a GPU compositing layer per card */}
            <div className="w-10 h-10 rounded-xl bg-app-main/20 flex items-center justify-center text-app-main border border-app-main/20 group-hover:bg-app-main group-hover:text-white transition-[background-color,color] duration-300">
              {project.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-app-main/80 mb-0.5">
                {project.subtitle}
              </span>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">
                {project.title}
              </h3>
            </div>
          </div>

          <p className="text-xs text-white/50 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 font-light italic">
            &ldquo;{project.body}&rdquo;
          </p>
        </div>
      </div>

      {project.inProgress && (
        <div className="absolute top-8 left-8 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          In Progress
        </div>
      )}

      {/* Decorative arrow — removed backdrop-blur-sm */}
      <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:text-app-main group-hover:border-app-main/40 transition-[color,border-color,transform] duration-300 rotate-12 group-hover:rotate-0 bg-white/5">
        <ExternalLink size={20} />
      </div>
    </div>
  )
}
