'use client'

import React from 'react'
import { motion } from 'motion/react'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="page w-full">
        <div className="text-center lg:text-left">
          <motion.p
            className="text-lg md:text-4xl mb-2 lg:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Hi, I&apos;m
          </motion.p>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 lg:mb-4"
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Błażej Kowalczyk
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Full-Stack Developer
          </motion.p>
        </div>
      </div>
    </section>
  )
}
