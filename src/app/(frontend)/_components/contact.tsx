import Link from 'next/link'
import React from 'react'

type Props = {}

export default function Contact({}: Props) {
  return (
    <section id="contact" className="page w-full flex flex-col gap-6 lg:gap-16 py-4 lg:py-16 pt-0">
      <p className="text-5xl">Reach Out</p>
      <div className="font-bold flex flex-col gap-2 text-4xl">
        <p>github</p>
        <Link href="https://github.com/bsk03" target="_blank" rel="noopener noreferrer">
          <p className="text-gray-500">github.com/bsk03</p>
        </Link>
      </div>
      <div className="font-bold flex flex-col gap-2 text-4xl">
        <p>LinkedIn</p>
        <Link
          href="https://linkedin.com/in/blazejkowalczyk"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="text-gray-500">linkedin.com/in/blazejkowalczyk</p>
        </Link>
      </div>
      <div className="font-bold flex flex-col gap-2 text-4xl">
        <p>email</p>
        <Link href="mailto:blazej.kowalczyk@example.com" target="_blank" rel="noopener noreferrer">
          <p className="text-gray-500">blazej2k3@gmail.com</p>
        </Link>
      </div>
    </section>
  )
}
