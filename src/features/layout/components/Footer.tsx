import React from 'react'
import { Github, Instagram, Linkedin, Send } from 'lucide-react'

const Footer = () => {
  const socialLinks = [
    {
      icon: <Github size={20} />,
      url: 'https://github.com/Andrewdpg',
      color: 'hover:text-black',
    },
    {
      icon: <Linkedin size={20} />,
      url: 'https://www.linkedin.com/in/andrewdpg/',
      color: 'hover:text-[#0077B5]',
    },
    {
      icon: <Instagram size={20} />,
      url: 'https://www.instagram.com/andresparra1002',
      color: 'hover:text-[#E4405F]',
    },
    {
      icon: <Send size={20} />,
      url: 'https://t.me/Andrewpg',
      color: 'hover:text-[#26A5E4]',
    }, // Replaced X with Telegram or similar Lucide icon
  ]

  return (
    <footer className="fixed bottom-6 left-8 z-[150] hidden md:block">
      <div className="flex flex-col gap-6 items-center p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-xl group">
        {socialLinks.map((social, index) => (
          <button
            key={index}
            onClick={() => window.open(social.url, '_blank')}
            className={`text-app-secondary/40 transition-all duration-300 hover:scale-125 ${social.color} hover:drop-shadow-[0_0_8px_rgba(155,118,211,0.3)]`}
          >
            {social.icon}
          </button>
        ))}
      </div>
    </footer>
  )
}

export default Footer
