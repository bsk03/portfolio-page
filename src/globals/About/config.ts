import type { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Profile photo. Leave empty to use text-only layout.',
      },
    },
    {
      name: 'cv',
      type: 'upload',
      label: 'CV',
      relationTo: 'media',
      admin: {
        description:
          'CV as a PDF. When set, a "Download CV" button appears in the hero. Leave empty to hide it.',
      },
    },
  ],
}
