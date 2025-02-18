import React from 'react'
import { Button } from '../../../components/Button'
import { GitHub, Instagram, LinkedIn, X } from '@mui/icons-material'

const Footer = () => {
  return (
    <footer className="p-4 w-full fixed text-app-white z-20 bottom-0 items-center justify-center flex">
      <div className="absolute bg-app-main/10 rounded-full blur-xl w-full h-[90vw] top-0" />
      <div className="flex flew-wrap gap-4">
        <Button
          variant="icon"
          className="hover:bg-purple-400"
          onClick={() => window.open('https://github.com/Andrewdpg')}
        >
          <GitHub />
        </Button>
        <Button
          variant="icon"
          className="hover:bg-blue-300"
          onClick={() => window.open('https://www.linkedin.com/in/andrewdpg/')}
        >
          <LinkedIn />
        </Button>
        <Button
          variant="icon"
          className="hover:bg-gray-400"
          onClick={() => window.open('https://x.com/Andrewpg29')}
        >
          <X />
        </Button>
        <Button
          variant="icon"
          className="hover:bg-pink-300"
          onClick={() =>
            window.open('https://www.instagram.com/andresparra1002')
          }
        >
          <Instagram />
        </Button>
      </div>
    </footer>
  )
}

export default Footer
