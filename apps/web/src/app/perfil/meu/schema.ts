import { z } from 'zod';

export const linkItemSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  type: z.string().optional(),
});

export const profileSchema = z.object({
  name: z.string().min(2).max(60),
  bio: z.string().max(500).optional().or(z.literal('')),
  skills: z.array(z.string().min(1).max(30)).max(30).optional(),
  links: z.array(linkItemSchema).max(20).optional(),
  tagline: z.string().max(140).optional().or(z.literal('')),
  customization: z
    .object({
      theme: z
        .object({
          primaryColor: z.string().max(20).optional(),
          backgroundColor: z.string().max(20).optional(),
          textColor: z.string().max(20).optional(),
          accentColor: z.string().max(20).optional(),
        })
        .optional(),
      layout: z.enum(['classic', 'modern', 'grid']).optional(),
      sections: z
        .object({
          showAbout: z.boolean().optional(),
          showSkills: z.boolean().optional(),
          showProjects: z.boolean().optional(),
          showExperience: z.boolean().optional(),
          showTestimonials: z.boolean().optional(),
          showContact: z.boolean().optional(),
        })
        .optional(),
    })
    .optional(),
});

export type ProfileInput = z.infer<typeof profileSchema>;

export type ProfileErrors = Partial<{
  name: string;
  bio: string;
  skills: string;
  links: string;
  tagline: string;
  customization: string;
}>;

export function validateProfile(raw: {
  name: string;
  bio: string;
  skills: string; // comma-separated
  links: string; // lines Title|URL|Type
  tagline?: string;
  customization?: any;
}): { value?: ProfileInput; errors?: ProfileErrors } {
  const parsedLinks = raw.links
    .split('\n')
    .map((line) => {
      const [title, url, type] = line.split('|').map((p) => (p || '').trim());
      if (!title && !url) return null; // ignore empty lines
      return { title, url, type: type || undefined };
    })
    .filter(Boolean) as { title: string; url: string; type?: string }[];

  const parsedSkills = raw.skills
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const candidate: ProfileInput = {
    name: raw.name.trim(),
    bio: raw.bio.trim(),
    skills: parsedSkills,
    links: parsedLinks,
    tagline: (raw.tagline || '').trim(),
    customization: raw.customization || undefined,
  };

  const res = profileSchema.safeParse(candidate);
  if (res.success) return { value: res.data };

  const errors: ProfileErrors = {};
  for (const issue of res.error.issues) {
    if (issue.path[0] === 'name') errors.name = 'myProfile.validation.name';
    if (issue.path[0] === 'bio') errors.bio = 'myProfile.validation.bio';
    if (issue.path[0] === 'skills') errors.skills = 'myProfile.validation.skills';
    if (issue.path[0] === 'links') errors.links = 'myProfile.validation.links';
    if (issue.path[0] === 'tagline') errors.tagline = 'myProfile.validation.tagline';
    if (issue.path[0] === 'customization') errors.customization = 'myProfile.validation.customization';
  }
  return { errors };
}