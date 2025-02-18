import React from 'react'

type TitleCardProps = {
  title: string
  subTitle: string
}

export const TitleCard: React.FC<TitleCardProps> = ({ title, subTitle }) => {
  return (
    <div className="group duration-500 hover:-skew-x-0 skew-x-6 hover:translate-x-2 max-w-full">
      <div className="group-hover:duration-400 relative rounded-2xl w-60 h-36 bg-app-contrast text-app-white flex flex-col justify-center items-center gap-1 before:-skew-x-12  before:rounded-2xl  before:absolute before:content['']  before:bg-app-contrast/60 before:right-3 before:top-0 before:w-60 before:h-32 before:-z-10">
        <span className="text-5xl font-bold">{title}</span>
        <p className="text-app-main font-thin">- {subTitle} -</p>
      </div>
    </div>
  )
}
