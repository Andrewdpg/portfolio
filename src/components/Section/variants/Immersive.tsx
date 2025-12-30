import React from 'react'
import { motion } from 'framer-motion'
import { SectionProps } from '../types'

export const ImmersiveVariant: React.FC<SectionProps> = ({
  title,
  subtitle,
  className = '',
  children,
  containerStyle,
  heroImage,
  align = 'left',
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isLeft = align === 'left'
  const hasImage = !!heroImage

  // Configuración de visuales
  const GAP = '40px'
  const ROUNDING = '24px'

  // Posición del hueco (Hole) - El resto es contenido
  const HOLE_W = hasImage ? 40 : 0
  const HOLE_H = hasImage ? 60 : 0

  return (
    <div
      ref={containerRef}
      className={`relative min-h-[100dvh] p-4 md:p-8 flex flex-col items-center justify-center overflow-hidden`}
    >
      {/* --- DISEÑO DESKTOP --- */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        {/* Imagen: Independiente en el hueco */}
        {hasImage && (
          <div
            className={`absolute top-8 ${isLeft ? 'right-8' : 'left-8'} overflow-hidden z-20 shadow-2xl`}
            style={{
              width: `calc(${HOLE_W}% - ${GAP} / 2)`,
              height: `calc(${HOLE_H}% - ${GAP} / 2)`,
              borderRadius: ROUNDING,
            }}
          >
            <img
              src={heroImage}
              className="w-full h-full object-cover"
              alt={title}
            />
          </div>
        )}

        {/* Estructura de Fondo */}
        <div className="absolute inset-8 z-10 pointer-events-none">
          {hasImage ? (
            <>
              {/* Barra Vertical */}
              <div
                className={`absolute top-0 bottom-0 ${isLeft ? 'left-0' : 'right-0'}`}
                style={{
                  width: `calc(${100 - HOLE_W}% - ${GAP})`,
                  backgroundColor: containerStyle?.backgroundColor || '#1a1a1a',
                  borderRadius: ROUNDING,
                  transition: 'background-color 0.5s ease',
                }}
              />
              {/* Barra Horizontal */}
              <div
                className="absolute left-0 right-0 bottom-0"
                style={{
                  height: `calc(${100 - HOLE_H}% - ${GAP})`,
                  backgroundColor: containerStyle?.backgroundColor || '#1a1a1a',
                  borderRadius: ROUNDING,
                  transition: 'background-color 0.5s ease',
                }}
              />
              {/* Fillet cóncavo */}
              <div
                className="absolute"
                style={{
                  [isLeft ? 'left' : 'right']:
                    `calc(${100 - HOLE_W}% - ${GAP})`,
                  bottom: `calc(${100 - HOLE_H}% - ${GAP})`,
                  width: ROUNDING,
                  height: ROUNDING,
                  backgroundColor: containerStyle?.backgroundColor || '#1a1a1a',
                  maskImage: `radial-gradient(circle at ${isLeft ? '100% 0%' : '0% 0%'}, transparent ${ROUNDING}, black ${ROUNDING})`,
                  WebkitMaskImage: `radial-gradient(circle at ${isLeft ? '100% 0%' : '0% 0%'}, transparent ${ROUNDING}, black ${ROUNDING})`,
                  transition: 'background-color 0.5s ease',
                }}
              />
            </>
          ) : (
            /* Fondo Completo cuando no hay imagen */
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: containerStyle?.backgroundColor || '#1a1a1a',
                borderRadius: ROUNDING,
                transition: 'background-color 0.5s ease',
              }}
            />
          )}
        </div>
      </div>

      {/* --- CONTENIDO DESKTOP --- */}
      <div
        className={`hidden md:flex relative z-30 h-full p-12 flex-col gap-6 pointer-events-none ${hasImage ? (isLeft ? 'items-start' : 'items-end') : 'items-center'}`}
        style={{
          color: containerStyle?.color,
          width: hasImage ? `calc(${100 - HOLE_W}% - ${GAP})` : '90%',
          alignSelf: hasImage ? (isLeft ? 'flex-start' : 'flex-end') : 'center',
          textAlign: hasImage ? (isLeft ? 'left' : 'right') : 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'circOut' }}
          className="pointer-events-auto"
        >
          <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] mb-4 uppercase">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg lg:text-2xl font-light opacity-60 tracking-widest uppercase">
              {subtitle}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-2 w-32 bg-white/20 rounded-full pointer-events-auto shrink-0"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
          className={`relative flex-1 min-h-0 pointer-events-auto overflow-hidden flex flex-col w-full`}
        >
          <div
            className={`flex-1 overflow-y-auto no-scrollbar bg-white/5 backdrop-blur-sm p-6 lg:p-10 border border-white/10 shadow-2xl w-full ${className}`}
            style={{ borderRadius: ROUNDING }}
          >
            {children}
          </div>
        </motion.div>
      </div>

      {/* --- DISEÑO MOBILE --- */}
      <div
        className="md:hidden w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden z-10 shadow-2xl"
        style={{
          backgroundColor: containerStyle?.backgroundColor || '#1a1a1a',
          borderRadius: ROUNDING,
        }}
      >
        {hasImage && (
          <div className="w-full h-40 sm:h-56 overflow-hidden shrink-0">
            <img
              src={heroImage}
              className="w-full h-full object-cover"
              alt={title}
            />
          </div>
        )}
        <div
          className="p-6 flex flex-col gap-4 flex-1 overflow-hidden"
          style={{ color: containerStyle?.color }}
        >
          <div className={`${hasImage ? '' : 'text-center'}`}>
            <h2 className="text-3xl font-black uppercase tracking-tighter leading-tight">
              {title}
            </h2>
            <p className="text-xs opacity-60 uppercase tracking-widest mt-1">
              {subtitle}
            </p>
          </div>
          <div className="w-full h-px bg-white/10 shrink-0" />
          <div
            className={`flex-1 overflow-y-auto no-scrollbar text-sm font-light leading-relaxed opacity-90 ${hasImage ? '' : 'text-center'}`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
