import { Skill } from './skill'

export type Project = {
  title: string
  subtitle: string
  body: string
  icon: React.ReactNode
  skills: Skill[]
  images: string[]
  codeLink?: string
  siteLink?: string
}
