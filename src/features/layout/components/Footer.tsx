import React from 'react'
import { Github, Instagram, Linkedin, Send, Mail } from 'lucide-react'
import { SiSpotify } from 'react-icons/si'
import { useContactModal } from '../../../context/ContactModalContext'

const Footer = () => {
  const { openContactModal } = useContactModal()

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
    {
      icon: <SiSpotify size={18} />,
      url: 'https://open.spotify.com/user/31w5iqswuv7kfmzrkeqeeba4gvea?si=28CQagsfQ5WQg8G1NZHCbw',
      label: 'Spotify',
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
        <button
          aria-label="Contact me"
          onClick={openContactModal}
          className="text-black/30 dark:text-white/30 transition-all duration-300 hover:scale-125 hover:text-app-main dark:hover:text-app-main"
        >
          <Mail size={20} />
        </button>
      </div>
    </footer>
  )
}

export default Footer
