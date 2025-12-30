import React, { ReactNode } from 'react';
import './HeroScroll.css';

type HeroScrollProps = {
  children: ReactNode;
};

export const HeroScroll: React.FC<HeroScrollProps> = ({ children }) => {
  return (
    <div className="hero-scroll-container">
      {children}
    </div>
  );
};
