import Card from '../../../components/Card'
import React from 'react'
import me from '../../../assets/img/me.jpg'
import { Button } from '../../../components/Button'
import { GitHub, LinkedIn } from '@mui/icons-material'

export const AboutMe = () => {
  return (
    <Card className="justify-around shadow-lg p-4 sm:w-5/12 flex flex-wrap gap-4 transition-all duration-300 ease-in-out">
      <img src={me} className="rounded-lg h-64 w-64" />
      <div className="flex flex-col gap-2 text-white">
        <h1 className="text-2xl font-bold">Andrewpg</h1>
        <div className="flex flex-col text-sm">
          <p>Fullstack Developer</p>
          <p>React, Node, Express, MongoDB</p>
          <p>TypeScript, JavaScript, Python</p>
          <p>These are just for show, jeje</p>
        </div>
        <h1 className="text-2xl font-bold mt-8">Find me at:</h1>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="icon"
            className="w-fit"
            onClick={() => window.open('https://github.com/Andrewdpg')}
          >
            <GitHub />
          </Button>
          <Button
            variant="icon"
            className="w-fit"
            onClick={() =>
              window.open('https://www.linkedin.com/in/andrewdpg/')
            }
          >
            <LinkedIn />
          </Button>
        </div>
      </div>
    </Card>
  )
}
