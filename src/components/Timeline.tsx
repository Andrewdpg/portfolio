import React from 'react'

import { TimelineItem } from '../types/timeline'

type TimelineProps = {
  items: TimelineItem[]
}

export const TimelineCard: React.FC<{ item: TimelineItem }> = ({ item }) => {
  return (
    <div className="shadow-lg sm:w-3/4 md:w-2/3 lg:w-1/2 appear transition-all duration-300 hover:scale-[101%]">
      <div className="bg-app-contrast/90 w-full p-4 rounded-2xl overflow-hidden">
        {/* Image Section */}
        {item.image && (
          <div className="mb-3 -mx-4 -mt-4">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover"
            />
          </div>
        )}

        {/* Header Section */}
        <h3 className="text-white text-xl font-bold">{item.title}</h3>
        <p className="text-gray-100 text-sm">{item.subtitle}</p>

        <hr className="my-2 border-app-main rounded-full" />

        {/* Body Section */}
        <p className="text-gray-300 text-sm mb-3">{item.body}</p>

        {/* Skills Section */}
        {item.skills && item.skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {item.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-app-main px-2 py-1 rounded-lg text-xs text-white"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Link Section */}
        {item.link && (
          <div className="mt-3 text-right">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-app-main hover:text-app-secondary text-sm font-medium transition-colors"
            >
              Learn more →
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="relative w-full flex flex-col items-center">
      <ul className="list-none w-full">
        {items.map((item, index) => {
          const isLeft = item.align === 'left'

          return (
            <div className="group" key={index}>
              {/* Línea de tiempo con curva */}
              <div className={`relative top-0 my-4 mx-2`}>
                {index !== 0 && (
                  <>
                    <div
                      className={`absolute border-r-4 border-app-white h-6  bottom-0 ${items[index - 1].align === 'left' ? 'left-0' : 'right-0'} ${items[index - 1].align !== item.align ? 'rounded-full' : ''}`}
                    />
                    {items[index - 1].align !== item.align && (
                      <>
                        <div
                          className={`absolute border-r-4 border-app-white h-6 rounded-full ${isLeft ? 'left-0' : 'right-0'}`}
                        />
                        <div className="border-b-4 border-app-white  rounded-full" />
                      </>
                    )}
                  </>
                )}
              </div>
              <li key={index} className="relative w-full flex items-center">
                <div
                  className={`border-r-4 border-app-white absolute h-full top-0 
                  ${isLeft ? 'left-2' : 'right-2'}
                  `}
                />

                {/* Punto de conexión */}
                <div
                  className={`absolute bg-app-secondary group-hover:bg-app-main border-4 border-black rounded-full h-5 w-5 ${isLeft ? 'left-0' : 'right-0'}`}
                />

                {/* Contenedor del contenido alineado */}
                {isLeft && (
                  <>
                    <div className="w-full flex justify-start text-left ml-8">
                      <TimelineCard item={item} />
                    </div>
                  </>
                )}

                {!isLeft && (
                  <>
                    <div className="w-full flex justify-end text-right mr-8">
                      <TimelineCard item={item} />
                    </div>
                  </>
                )}
              </li>
            </div>
          )
        })}
      </ul>
    </div>
  )
}

export default Timeline
