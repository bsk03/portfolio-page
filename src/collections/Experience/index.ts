import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Experience: CollectionConfig = {
  slug: 'experience',
  labels: {
    singular: 'Experience entry',
    plural: 'Experience',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['role', 'company', 'startDate', 'order'],
    useAsTitle: 'role',
  },
  fields: [
    {
      name: 'role',
      type: 'text',
      required: true,
      admin: {
        description: 'Job title, e.g. "Full-Stack Developer"',
      },
    },
    {
      name: 'company',
      type: 'text',
      required: true,
      admin: {
        description: 'Company or organisation name, shown as @company',
      },
    },
    {
      name: 'companyUrl',
      type: 'text',
      admin: {
        description: 'Optional link. Adds a chevron to the row.',
      },
    },
    {
      name: 'icon',
      type: 'select',
      defaultValue: 'code',
      options: [
        { label: 'Code', value: 'code' },
        { label: 'Briefcase', value: 'briefcase' },
        { label: 'Rocket', value: 'rocket' },
        { label: 'Trophy', value: 'trophy' },
        { label: 'Graduation cap', value: 'graduation' },
        { label: 'Terminal', value: 'terminal' },
      ],
      admin: {
        description: 'Glyph shown in the tile on the left.',
      },
    },
    {
      name: 'workplace',
      type: 'select',
      defaultValue: 'remote',
      options: [
        { label: 'Remote', value: 'remote' },
        { label: 'Hybrid', value: 'hybrid' },
        { label: 'On-site', value: 'onsite' },
      ],
    },
    {
      name: 'location',
      type: 'text',
      admin: {
        description: 'Optional city / country shown next to the workplace type.',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        date: { pickerAppearance: 'monthOnly', displayFormat: 'MMM yyyy' },
      },
    },
    {
      name: 'current',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Still working here — renders "Present" instead of an end date.',
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'monthOnly', displayFormat: 'MMM yyyy' },
        condition: (_, siblingData) => !siblingData?.current,
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'technologies',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
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
  ],
  timestamps: true,
}
