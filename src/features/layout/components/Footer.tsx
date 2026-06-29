import React from 'react'
import { Github, Instagram, Linkedin, Send } from 'lucide-react'

const Footer = () => {
  const socialLinks = [
    {
      icon: <Github size={20} />,
      url: 'https://github.com/Andrewdpg',
      label: 'GitHub',
    },
    {
      icon: <Linkedin size={20} />,
      url: 'https://www.linkedin.com/in/andrewdpg/',
      label: 'LinkedIn',
    },
    {
      icon: <Instagram size={20} />,
      url: 'https://www.instagram.com/andresparra1002',
      label: 'Instagram',
    },
    {
      icon: <Send size={20} />,
      url: 'https://t.me/Andrewdpg',
      label: 'Telegram',
    },
  ]

  return (
    <footer className="fixed bottom-6 left-8 z-[150] hidden md:block">
      <div className="flex flex-col gap-6 items-center p-4 rounded-full bg-black/10 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-xl">
        {socialLinks.map((social) => (
          <button
            key={social.label}
            aria-label={social.label}
            onClick={() => window.open(social.url, '_blank')}
            className="text-black/30 dark:text-white/30 transition-all duration-300 hover:scale-125 hover:text-app-main dark:hover:text-app-main"
          >
            {social.icon}
          </button>
        ))}
      </div>
    </footer>
  )
}

export default Footer
