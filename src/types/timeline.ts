export type TimelineItem = {
  title: string
  subtitle: string
  body: string
  align?: 'left' | 'right'
  image?: string
  link?: string
  skills?: string[]
  // New visual properties for Hero/Experience sections
  backgroundColor?: string
  textColor?: string
  heroImage?: string
}

export type ExperienceGroup = {
  place: string
  description?: string
  heroImage?: string
  backgroundColor?: string
  textColor?: string
  align: 'left' | 'right'
  variant?: 'immersive' | 'split' | 'minimal'
  items: TimelineItem[]
}
