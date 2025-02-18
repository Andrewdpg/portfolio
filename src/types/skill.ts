import { Technology } from './technology'

export enum Experience {
  Basic = 'Begginner',
  Intermediate = 'Intermediate',
  Advanced = 'Fluent',
  Expert = 'Expert',
}

export type SkillCategory =
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'DevOps'
  | 'Methodologies'
  | 'Testing'
  | 'Mobile'
  | 'Other'
  | 'Languages'

export type Skill = {
  id: string
  title: string
  experience: Experience
  technology: Technology
  category: SkillCategory
  color: string
  icon: React.ReactNode
}
