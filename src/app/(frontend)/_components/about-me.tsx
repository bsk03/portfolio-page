import React from 'react'

type Props = {}

export default function AboutMe({}: Props) {
  return (
    <section id="about" className="page w-full flex flex-col gap-6 lg:gap-16  py-4 lg:py-16 pt-0 ">
      <p className="text-5xl ">Turning ideas into interfaces</p>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <div className="flex flex-col gap-4 lg:col-span-3 lg:max-w-[500px]">
          <p>
            I’m <span className="font-bold">Błażej Kowalczyk</span> - a Full Stack Developer focused
            on building clean, performant and user-friendly{' '}
            <span className="underline italic">web & mobile applications</span>.
          </p>
          <p>
            I enjoy working across the stack, creating modern interfaces and reliable backend
            solutions with attention to performance, scalability and maintainability. I value clean
            code, good UX and thoughtful architecture that stands the test of time.
          </p>

          <p>
            Outside of work, I stay active through regular gym training and playing football. Both
            help me stay disciplined, focused and consistent - qualities I also bring into my work
            as a developer.
          </p>
        </div>
        <div className="lg:col-span-2 lg:items-end items-center justify-center flex flex-col gap-4">
          <div className=" w-[260px] lg:w-1/2 h-[300px] bg-gray-200" />
          <div className="flex flex-col items-end gap-2 w-1/2">
            <p>Frontend / Fullstack</p>
            <p>Based in Poland 🇵🇱</p>
          </div>
        </div>
      </div>
    </section>
  )
}
