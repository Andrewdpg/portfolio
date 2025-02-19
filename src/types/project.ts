import { Skill } from './skill'

export type Project = {
  title: string
  subtitle: string
  body: string
  alone?: boolean
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
}
