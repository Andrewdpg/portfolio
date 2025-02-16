import React from 'react'
import { Project } from '../types/project'
import { usePopup } from '../context/PopupContext'
import { ImageGallery } from './ImageGallery'

type ProjectCardProps = {
  project: Project
}

const ProjectDetail: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div>
      <ImageGallery images={project.images} />
      <p className="mt-4">{project.body}</p>
    </div>
  )
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { openPopup } = usePopup()

  const handleImageClick = () => {
    openPopup({
      title: project.title,
      body: <ProjectDetail project={project} />,
    })
  }

  return (
    <div
      className="flex flex-col items-center group pt-10 pb-4 hover:cursor-pointer"
      onClick={handleImageClick}
    >
      <div className="h-fit w-60 bg-app-contrast/0 opacity-50 rounded-xl z-0 transition-all duration-300 group-hover:scale-y-110 group-hover:bg-app-contrast group-hover:mt-[-1rem]">
        {/* Data Section */}
        <ImageGallery
          className="relative w-60 h-40 group-hover:scale-y-95 group-hover:-translate-x-3 group-hover:-translate-y-2 group-hover:shadow-xl z-10 mb-3 group-hover:-mb-2"
          images={project.images}
        />
        <div className="flex opacity-100 group-hover:opacity-0 mx-4 space-x-3 transition-all duration-300 group-hover:hidden group-hover:scale-y-90">
          {/* Icon */}
          <div className="w-10 h-10 bg-app-main rounded-md flex items-center justify-center text-app-white">
            {project.icon}
          </div>

          {/* Text */}
          <div className="text-app-white">
            <p className="font-bold text-lg">{project.title}</p>
            <p className="text-gray-400 text-sm">{project.subtitle}</p>
          </div>
        </div>
        <p className="hidden px-4 pb-4 text-white text-sm max-w-[15rem] group-hover:scale-y-90 group-hover:opacity-100 group-hover:block opacity-0 transition-all duration-300">
          {project.body}
        </p>
      </div>
    </div>
  )
}
