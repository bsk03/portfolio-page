'use client'

import 'devicon/devicon.min.css'
import { Reveal, StaggerContainer, StaggerItem } from '@/components/motion/reveal'

const icons = [
  'devicon-react-original',
  'devicon-nextjs-original-wordmark',
  'devicon-reactnative-original-wordmark',
  'devicon-expo-original-wordmark',
  'devicon-tailwindcss-original',
  'devicon-nodejs-plain-wordmark',
  'devicon-express-original',
  'devicon-postgresql-plain',
  'devicon-mongodb-plain',
  'devicon-docker-plain',
]

export default function Skills() {
  return (
    <section id="skills" className="page w-full flex flex-col gap-6 lg:gap-16 py-4 lg:py-16 pt-0">
      <Reveal>
        <p className="text-5xl">Tools and technologies I work with on a daily basis.</p>
      </Reveal>
      <StaggerContainer
        className="flex flex-wrap lg:justify-start justify-center gap-6"
        stagger={0.06}
      >
        {icons.map((icon) => (
          <StaggerItem key={icon} direction="up">
            <i className={`${icon} text-7xl`} />
          </StaggerItem>
        ))}
      </StaggerContainer>
      <Reveal delay={0.2}>
        <p className="text-sm">
          These are the technologies I work with on a daily basis. I use them to build modern,
          responsive web and mobile applications, create reliable backends, and deploy scalable
          solutions.
        </p>
      </Reveal>
    </section>
  )
}
