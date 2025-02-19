import React from 'react'
import { Project } from '../types/project'
import { usePopup } from '../context/PopupContext'
import { ImageGallery } from './ImageGallery'
import Body from './Body'
import { SkillButton } from './SkillButton'
import { Button } from './Button'
import { People, Person } from '@mui/icons-material'

type ProjectCardProps = {
  project: Project
}

const ProjectDetail: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div>
      <div className="flex flex-wrap justify-center">
        <ImageGallery
          images={project.images}
          className="w-full sm:w-1/2 max-w-full"
        />
        <div className="flex flex-col items-start px-4 w-full sm:w-1/2 max-w-full gap-4">
          <Body className="text-nowrap">Involved Skills</Body>
          <div className="flex flex-wrap justify-center gap-4 w-full">
            {project.skills.map((skill, index) => (
              <SkillButton key={index} skill={skill} />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4">{project.body}</p>
      <p className="text-gray-400 text-sm mt-2">{project.subtitle}</p>
      <div className="flex flex-wrap items-center gap-2 mt-4">
        {project.codeLink && (
          <Button
            variant="primary"
            className="flex-1"
            onClick={() => {
              window.open(project.codeLink, '_blank')
            }}
          >
            View code
          </Button>
        )}

        {project.siteLink && (
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => {
              window.open(project.siteLink, '_blank')
            }}
          >
            Visit
          </Button>
        )}
      </div>
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
      <div className="h-fit w-60 bg-app-contrast/0 opacity-90 rounded-xl z-0 transition-all duration-300 group-hover:scale-y-110 group-hover:bg-app-contrast group-hover:mt-[-1rem]">
        {/* Data Section */}
        <ImageGallery
          className="relative w-60 h-40 group-hover:scale-y-95 group-hover:-translate-x-3 group-hover:-translate-y-2 group-hover:shadow-xl z-10 mb-3 group-hover:-mb-2"
          images={project.images}
        />

        <div className="flex opacity-100 group-hover:opacity-0 mx-4 space-x-3 transition-all duration-300 group-hover:hidden group-hover:scale-y-90">
          {/* Icon */}
          <div className="flex flex-col gap-2 ">
            <div className="w-fit h-fit p-2 bg-app-main rounded-md flex items-center justify-center text-app-white">
              {project.icon}
            </div>
            <div className=" flex items-center justify-center">
              {!project.alone ? (
                <People className="w-12 h-12 text-app-white" />
              ) : (
                <Person className="w-12 h-12 text-app-white" />
              )}
            </div>
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
