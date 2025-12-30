import React from 'react'

export type SectionVariant = 'immersive' | 'minimal' | 'split'

export type SectionProps = {
  title: string
  subtitle?: string
  className?: string
  children: React.ReactNode
  containerStyle?: React.CSSProperties
  heroImage?: string
  align?: 'left' | 'right'
  variant?: SectionVariant
}
