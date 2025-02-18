import React from 'react'

export type TimelineItem = {
  title: string
  subtitle: string
  body: string
  align: 'left' | 'right'
}

type TimelineProps = {
  items: TimelineItem[]
}

const TimelineCard: React.FC<{ item: TimelineItem }> = ({ item }) => {
  return (
    <div className="shadow-lg sm:w-3/4 md:w-2/3 lg:w-1/2 appear">
      <div className="bg-app-contrast w-full p-4 rounded-2xl">
        <h3 className="text-white text-xl font-bold">{item.title}</h3>
        <p className="text-gray-100 text-sm">{item.subtitle}</p>
        <hr className="my-2 border-app-main" />
        <p className="text-gray-300 text-sm">{item.body}</p>
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
