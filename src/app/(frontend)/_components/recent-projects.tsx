import React from 'react'
import ProjectCard from './project-card'

type Props = {}

const projects = [
  {
    title: 'Live Feedback Wall',
    description: `Live Feedback Wall is a real-time web application built with Next.js and Socket.IO that
        enhances audience engagement during conferences. Attendees join QR-based rooms to ask
        anonymous questions and share feedback instantly, enabling smooth, interactive communication
        between speakers and participants.`,
    image: '/images/projects/live-feedback-wall.png',
    demo: 'https://live-feedback-wall.vercel.app',
    source: 'https://github.com/your-username/live-feedback-wall',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'tRPC', 'Socket.io', 'PostgreSQL', 'Docker'],
  },
  {
    title: 'Pack-Mate',
    description: `Pack Mate is a mobile application built with Expo (React Native) and a custom Express.js backend, designed to simplify travel packing. Users can plan packing lists, track items while packing, and re-check belongings before returning home, helping ensure nothing is forgotten during trips.`,
    image: '/images/projects/live-feedback-wall.png',
    demo: 'https://live-feedback-wall.vercel.app',
    source: 'https://github.com/your-username/live-feedback-wall',
    technologies: [
      'React-Native',
      'Expo',
      'Nativewind CSS',
      'React-Query',
      'Node.js',
      'Express',
      'Better-Auth',
      'PostgreSQL',
    ],
  },
  {
    title: 'Grzybomoc',
    description: `Grzybomoc is a modern landing page built with Next.js and Tailwind CSS, created as a brand showcase for functional mushrooms. The project is designed with scalability in mind and will evolve into a full e-commerce platform, offering a clean, responsive UI and a strong foundation for future online sales.`,
    image: '/images/projects/live-feedback-wall.png',
    demo: 'https://grzybomoc.pl/',
    source: 'https://github.com/your-username/live-feedback-wall',
    technologies: ['React', 'Next.js', 'Tailwind CSS'],
  },
]

export type TProject = (typeof projects)[0]

export default function RecentProjects({}: Props) {
  return (
    <section id="projects" className="page w-full flex flex-col gap-6 lg:gap-16 py-4 lg:py-16 pt-0">
      <div className="bg-opposite-theme rounded-3xl p-6 lg:p-8">
        <p className="text-5xl mb-6 lg:mb-12">Recent Projects</p>
        <div className="   flex flex-col gap-12">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}
