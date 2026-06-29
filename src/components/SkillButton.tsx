import React from 'react'
import { Skill } from '../types/skill'
import Tooltip from './Tooltip'

type SkillButtonProps = {
  skill: Skill
}

export const SkillButton: React.FC<SkillButtonProps> = ({ skill }) => {
  return (
    <Tooltip
      onClick={() => {}}
      title={skill.title}
      tooltip={`My level is '${skill.experience}' on this one`}
    >
      <div className="w-6 h-6 rounded-md bg-white/60 dark:bg-white/15 flex items-center justify-center">
        {skill.icon}
      </div>
    </Tooltip>
  )
}
