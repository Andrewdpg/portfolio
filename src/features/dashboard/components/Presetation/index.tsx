import React from 'react'
import Heading from '../../../../components/Heading'
import Body from '../../../../components/Body'
import me from '../../../../assets/img/me.jpeg'
import { TitleCard } from './Components/TitleCard'
import { Download } from 'lucide-react'
import Partner from '../../../../components/Partner'

export const Presentation = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between p-6 md:p-16 gap-8 md:gap-12 min-h-screen relative overflow-y-auto no-scrollbar">
      <div className="w-full md:w-[45%] flex justify-center max-w-[320px] md:max-w-[500px] order-1 md:order-2 shrink-0">
        <div className="relative w-full aspect-square overflow-hidden bg-app-main/10 rounded-[32px] md:rounded-[48px] shadow-2xl group border-[8px] md:border-[12px] border-white ring-1 ring-black/5">
          <img
            src={me}
            alt="Andrew Parra"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-app-main/20 to-transparent pointer-events-none" />
        </div>
      </div>

      <div className="flex flex-col flex-1 gap-6 md:gap-8 justify-center items-center text-center md:items-start md:text-start order-2 md:order-1 max-w-2xl">
        <div className="flex flex-col gap-2 scale-90 md:scale-100">
          <TitleCard title="Andrés" subTitle="Software Developer" />
        </div>

        <Heading className="text-app-secondary !text-4xl sm:!text-5xl md:!text-7xl">
          Andrés Parra
        </Heading>

        <Body className="text-app-secondary/60 max-w-xl text-base md:text-lg px-4 md:px-0">
          Systems Engineering student at ICESI University with experience in
          software development applied to academic and professional projects.
          Focused on building high-performance fintech solutions and intelligent
          systems with real-world impact.
        </Body>

        <div className="flex flex-wrap gap-3 md:gap-4 justify-center md:justify-start scale-90 md:scale-100">
          <button
            onClick={() => {
              window.open('https://github.com/Andrewdpg/portfolio', '_blank')
            }}
            className="px-6 md:px-8 py-3 md:py-4 bg-app-main text-white rounded-full font-bold hover:bg-app-main/80 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-app-main/20"
          >
            Source Code
          </button>
          <a
            href="/files/cv.pdf"
            download="Andres_Parra-CV.pdf"
            className="flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 border-2 border-app-main text-app-main rounded-full font-bold hover:bg-app-main hover:text-white transition-all hover:scale-105 active:scale-95"
          >
            <Download size={20} />
            Resume
          </a>
        </div>

        <div className="pt-4 border-t border-app-main/5 w-full hidden md:block">
          <Partner />
        </div>
      </div>

      {/* Mobile Partner (different positioning if needed, or just smaller) */}
      <div className="md:hidden pt-2 pb-6 order-3">
        <Partner />
      </div>
    </div>
  )
}
