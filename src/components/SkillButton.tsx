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
      color={skill.color}
    >
      {skill.icon}
    </Tooltip>
  )
}
