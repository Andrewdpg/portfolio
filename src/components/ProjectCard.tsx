import React from 'react'
import { Project } from '../types/project'
import { usePopup } from '../context/PopupContext'
import { ImageGallery } from './ImageGallery'
import { SkillButton } from './SkillButton'
import { Info, ExternalLink, Github, Users, User } from 'lucide-react'

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
            <Github size={20} /> Repository
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
  const { openPopup } = usePopup()

  return (
    <div
      className="group relative h-[380px] w-full overflow-hidden rounded-[32px] bg-app-secondary border border-white/10 hover:border-app-main/40 transition-all duration-700 cursor-pointer shadow-2xl"
      onClick={() =>
        openPopup({
          title: project.title,
          body: <ProjectDetail project={project} />,
        })
      }
    >
      {/* Background Image with Blur/Zoom on hover */}
      <div className="absolute inset-0 z-0 transition-all duration-700 group-hover:scale-105">
        <img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-700 opacity-50 group-hover:opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-app-secondary via-app-secondary/40 to-transparent" />
      </div>

      <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
        <div className="flex flex-col gap-3 transform translate-y-6 group-hover:translate-y-0 transition-all duration-500 ease-out">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-app-main/20 backdrop-blur-xl flex items-center justify-center text-app-main border border-app-main/20 group-hover:bg-app-main group-hover:text-white transition-all duration-500">
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

          <p className="text-xs text-white/50 line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 font-light italic">
            &ldquo;{project.body}&rdquo;
          </p>
        </div>
      </div>

      {/* Decorative arrow or icon */}
      <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:text-app-main group-hover:border-app-main/40 transition-all duration-500 transform group-hover:rotate-0 rotate-12 bg-white/5 backdrop-blur-sm">
        <ExternalLink size={20} />
      </div>
    </div>
  )
}
