export const perfilBySlugQuery = `
  *[_type == "perfil" && slug.current == $slug][0]{
    _id,
    name,
    bio,
    "avatarUrl": avatar.asset->url,
    slug
  }
`;
