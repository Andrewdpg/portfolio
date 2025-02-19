import React from 'react'
import { TitleCard } from './Components/TitleCard'
import standing from '../../../../assets/svg/standing.svg'
import flipped from '../../../../assets/img/me.jpg'
import Heading from '../../../../components/Heading'
import Body from '../../../../components/Body'
import FlipCard from '../../../../components/Flipcard'
import { Button } from '../../../../components/Button'

export const Presentation = () => {
  return (
    <div className="flex flex-wrap items-start justify-around gap-x-12 gap-y-8 transition-all duration-300 ease-in-out px-4">
      <div className="w-full flex justify-center max-w-[400px]">
        <FlipCard
          className="w-full aspect-square"
          front={
            <>
              <div className="z-[-1] absolute bg-app-main/30 rounded-full blur-xl w-full h-full" />
              <img src={standing} alt="Andrew" className="w-full h-full" />
            </>
          }
          back={
            <>
              <div className="z-[-1] absolute bg-blue-800/30 rounded-full blur-xl w-full h-full" />
              <img
                src={flipped}
                alt="Andrew Flipped"
                className="w-full h-full rounded-full"
              />
            </>
          }
        />
      </div>
      <div className="flex flex-col flex-1 gap-4 justify-start items-center text-center sm:items-start sm:text-start">
        <TitleCard title="Jr" subTitle="Software Developer" />
        <Heading>Andrés Parra</Heading>
        <Body>
          Software engineering student with a strong focus on software
          architecture, full-stack development and agile methodologies.
          Interested in AI development, problem-solving and creating scalable
          intelligent solutions.
        </Body>
        <Button variant="secondary"> Source code </Button>
      </div>
    </div>
  )
}
