import React from 'react'

type TitleCardProps = {
  title: string
  subTitle: string
}

export const TitleCard: React.FC<TitleCardProps> = ({ title, subTitle }) => {
  return (
    <div className="relative group overflow-hidden border border-app-main/10 bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
      <div className="flex flex-col gap-1 relative z-10">
        <span className="text-4xl font-black text-app-main tracking-tighter uppercase">
          {title}
        </span>
        <div className="h-1 w-12 bg-app-main rounded-full" />
        <p className="text-app-main/40 font-mono text-xs uppercase tracking-[0.2em] mt-2">
          {subTitle}
        </p>
      </div>
      {/* Decorative background element */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-app-main/[0.02] rounded-full blur-2xl group-hover:bg-app-main/[0.05] transition-colors" />
    </div>
  )
}
