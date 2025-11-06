import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'userProfile',
  title: 'User Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Frase curta que aparece como destaque no topo do perfil',
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Imagem de capa para o topo (hero) do perfil',
    }),
    defineField({
      name: 'customization',
      title: 'Customization',
      type: 'object',
      fields: [
        defineField({
          name: 'theme',
          title: 'Theme',
          type: 'object',
          fields: [
            { name: 'primaryColor', title: 'Primary Color', type: 'string' },
            { name: 'backgroundColor', title: 'Background Color', type: 'string' },
            { name: 'textColor', title: 'Text Color', type: 'string' },
            { name: 'accentColor', title: 'Accent Color', type: 'string' },
          ],
        }),
        defineField({
          name: 'layout',
          title: 'Layout',
          type: 'string',
          options: {
            list: [
              { title: 'Classic', value: 'classic' },
              { title: 'Modern', value: 'modern' },
              { title: 'Grid', value: 'grid' },
            ],
          },
        }),
        defineField({
          name: 'sections',
          title: 'Sections',
          type: 'object',
          fields: [
            { name: 'showAbout', title: 'Show About', type: 'boolean' },
            { name: 'showSkills', title: 'Show Skills', type: 'boolean' },
            { name: 'showProjects', title: 'Show Projects', type: 'boolean' },
            { name: 'showExperience', title: 'Show Experience', type: 'boolean' },
            { name: 'showTestimonials', title: 'Show Testimonials', type: 'boolean' },
            { name: 'showContact', title: 'Show Contact', type: 'boolean' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'experience',
      title: 'Experience',
      type: 'array',
      of: [
        {
          name: 'experienceItem',
          type: 'object',
          fields: [
            { name: 'role', title: 'Role', type: 'string' },
            { name: 'company', title: 'Company', type: 'string' },
            { name: 'startDate', title: 'Start Date', type: 'date' },
            { name: 'endDate', title: 'End Date', type: 'date' },
            { name: 'description', title: 'Description', type: 'text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          name: 'testimonial',
          type: 'object',
          fields: [
            { name: 'author', title: 'Author', type: 'string' },
            { name: 'quote', title: 'Quote', type: 'text' },
            { name: 'avatar', title: 'Avatar', type: 'image', options: { hotspot: true } },
          ],
        },
      ],
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          name: 'link',
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
            { name: 'type', title: 'Type', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
