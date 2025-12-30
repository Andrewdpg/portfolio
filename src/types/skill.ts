export enum Experience {
  Basic = 'Begginner',
  Intermediate = 'Intermediate',
  Advanced = 'Fluent',
  Expert = 'Expert',
}

export type SkillCategory =
  | 'UI/UX'
  | 'Backend'
  | 'Database'
  | 'Tools'
  | 'Methodologies'
  | 'Testing'
  | 'Mobile'
  | 'Languages'
  | 'Algorithms'
  | 'Data Science'
  | 'Hardware'
  | 'DevOps'
  | 'AI/ML'
  | 'Cloud'
  | 'Competencies'
  | 'Other'

export type Skill = {
  id: string
  title: string
  experience: Experience
  category: SkillCategory
  color: string
  icon: React.ReactNode
}
