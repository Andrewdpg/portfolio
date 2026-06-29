import { Skill } from './skill'

export type ProjectInstitution = {
  name: string
  url?: string
  logoUrl?: string
}

export type ProjectGroup = 'Software' | 'Research & ML'

export type Project = {
  title: string
  subtitle: string
  body: string
  alone?: boolean
  inProgress?: boolean
  group: ProjectGroup
  institution?: ProjectInstitution
  category:
    | 'Web'
    | 'Mobile'
    | 'Desktop'
    | 'Multiplatform'
    | 'Data analysis'
    | 'Testing'
    | 'AI'
    | 'Research'
    | 'Other'
  icon: React.ReactNode
  skills: Skill[]
  images: string[]
  codeLink?: string
  siteLink?: string
  warnings?: string[]
}
