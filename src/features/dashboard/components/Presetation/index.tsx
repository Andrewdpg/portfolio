import React from 'react'
import { TitleCard } from './Components/TitleCard'
import standing from '../../../../assets/svg/standing.svg'
import flipped from '../../../../assets/img/me.jpg'
import Heading from '../../../../components/Heading'
import Body from '../../../../components/Body'
import FlipCard from '../../../../components/Flipcard'
import { Button } from '../../../../components/Button'
import { Download } from 'lucide-react'
import Partner from '../../../../components/Partner'

export const Presentation = () => {
  return (
    <div className="flex flex-wrap items-center justify-around gap-x-12 gap-y-8 transition-all duration-300 ease-in-out px-4 min-h-screen pt-6 pb-8">
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
      <div className="flex flex-col flex-1 gap-4 justify-start items-center text-center md:items-start md:text-start">
        <TitleCard title="Jr" subTitle="Software Developer" />
        <Heading>Andrés Parra</Heading>
        <Body>
          Software engineering student with a strong focus on software
          architecture, full-stack development and agile methodologies.
          Interested in AI development, problem-solving and creating scalable
          intelligent solutions.
        </Body>
        <div className="flex flex-wrap gap-x-2 gap-y-4 justify-center md:justify-start">
          <Button
            variant="secondary"
            onClick={() => {
              window.open('https://github.com/Andrewdpg/portfolio', '_blank')
            }}
          >
            {' '}
            Portfolio source code{' '}
          </Button>
          <a
            href="/files/cv.pdf"
            download="Andres_Parra-CV.pdf"
            className="flex items-center gap-2 text-sm bg-app-main hover:bg-app-secondary text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Download size={18} />
            Download CV
          </a>
          <Partner />
        </div>
      </div>
    </div>
  )
}
