import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'owner',
      title: 'Owner',
      type: 'reference',
      to: [{ type: 'userProfile' }],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Imagem de capa/perfil do projeto exibida nas listagens',
    }),
    defineField({
      name: 'media',
      title: 'Media (Sanity Assets)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }, { type: 'file' }],
      description: 'Imagens e arquivos leves diretamente no Sanity',
    }),
    defineField({
      name: 'supabaseAssets',
      title: 'Supabase Assets (Large Files)',
      type: 'array',
      of: [
        {
          name: 'supabaseAsset',
          type: 'object',
          fields: [
            { name: 'bucket', title: 'Bucket', type: 'string' },
            { name: 'key', title: 'Key', type: 'string' },
            { name: 'mime', title: 'MIME Type', type: 'string' },
            { name: 'size', title: 'Size (bytes)', type: 'number' },
          ],
        },
      ],
      description: 'Referências a arquivos grandes armazenados no Supabase',
    }),
    defineField({
      name: 'techTags',
      title: 'Tech Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'isPublic',
      title: 'Public?',
      type: 'boolean',
      initialValue: false,
      description: 'Controle de visibilidade pública. Moderado via Studio.',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Approved', value: 'approved' },
          { title: 'Rejected', value: 'rejected' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
      description: 'Fluxo de moderação: pending → approved/rejected.',
    }),
    defineField({
      name: 'moderationNotes',
      title: 'Moderation Notes',
      type: 'text',
      description: 'Notas internas da moderação para justificar aprovações/recusas.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
    },
  },
});
