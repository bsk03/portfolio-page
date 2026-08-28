import { getPayload } from 'payload'
import config from '@payload-config'

const projects = [
  {
    title: 'Live Feedback Wall',
    tagline: 'Real-time feedback collection tool for presentations and events',
    description: `Live Feedback Wall is a real-time web application that enhances audience engagement during conferences, presentations and meetings. Organizers create rooms from an admin panel, each generating a unique 6-digit code. Participants join instantly by entering the code or scanning a QR code — no registration required.

Messages appear in real-time via WebSocket, creating a live feedback stream visible to everyone in the room. The app features infinite scroll message history, a responsive admin panel with collapsible sidebar, soft-delete moderation, and session-based authentication with route protection.

Built with a custom server architecture that integrates Express and Socket.IO with Next.js for seamless real-time communication alongside server-rendered pages.`,
    technologies: [
      'Next.js',
      'TypeScript',
      'Socket.IO',
      'tRPC',
      'Drizzle ORM',
      'PostgreSQL',
      'Better Auth',
      'Tailwind CSS',
      'Zustand',
      'Docker',
    ],
    demo: null,
    source: 'https://github.com/bsk03/live-feedback-wall',
    order: 1,
    slug: 'live-feedback-wall',
  },
  {
    title: 'Grzybomoc',
    tagline: 'Landing page for a Polish functional mushroom farm',
    description: `Grzybomoc is a modern, fully responsive landing page built for a family-owned farm specializing in functional and adaptogenic mushrooms. The site showcases their product range — fresh and dried Lion's Mane, Cordyceps militaris, and Coral Tooth — along with the brand's values: 100% Polish cultivation, lab-tested quality, and a direct producer-to-consumer model.

The single-page design features smooth scroll-triggered animations, a product carousel, expandable FAQ accordion, expert recommendation testimonials, and a contact form. The brand identity is built around a warm orange accent with clean typography and generous whitespace.

Designed and developed as a client project with SEO best practices including structured JSON-LD data, optimized image loading, and integration with analytics tools.`,
    technologies: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
    ],
    demo: 'https://grzybomoc.pl',
    source: null,
    order: 2,
    slug: 'grzybomoc',
  },
]

export async function seedProjects() {
  const payload = await getPayload({ config })

  for (const project of projects) {
    const exists = await payload.find({
      collection: 'projects',
      where: { slug: { equals: project.slug } },
      limit: 1,
    })

    if (exists.docs.length > 0) {
      console.log(`Skipping (already exists): ${project.title}`)
      continue
    }

    await payload.create({
      collection: 'projects',
      data: {
        title: project.title,
        tagline: project.tagline,
        description: project.description,
        technologies: project.technologies.map((name) => ({ name })),
        demo: project.demo ?? undefined,
        source: project.source ?? undefined,
        status: 'live',
        order: project.order,
        slug: project.slug,
      },
    })
    console.log(`Seeded project: ${project.title}`)
  }

  console.log('Done seeding projects.')
}

seedProjects()
