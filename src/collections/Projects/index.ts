import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { slugField } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'tagline', 'order', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'tagline',
      type: 'text',
      required: true,
      admin: {
        description: 'Short one-liner shown on project cards',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Main hero image',
      },
    },
    {
      name: 'screenshots',
      type: 'array',
      label: 'Gallery',
      admin: {
        description: 'Shown full width, one under another. Drag to reorder.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          admin: {
            description: 'Optional line under the image.',
          },
        },
      ],
    },
    {
      name: 'demoVideo',
      type: 'upload',
      relationTo: 'media',
      label: 'Demo video',
      admin: {
        description:
          'Optional MP4 or WebM. Rendered as a player above the gallery, using the main image as its poster.',
      },
    },
    {
      name: 'technologies',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'demo',
      type: 'text',
      admin: {
        description: 'Live demo URL',
      },
    },
    {
      name: 'source',
      type: 'text',
      admin: {
        description: 'Source code URL',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'live',
      required: true,
      options: [
        { label: 'Live', value: 'live' },
        { label: 'In progress', value: 'in-progress' },
        { label: 'Archived', value: 'archived' },
        { label: 'Concept', value: 'concept' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Badge on the project card. "Live" means deployed and reachable.',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Lower number = shown first',
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  timestamps: true,
}
