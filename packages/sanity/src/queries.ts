export const userProfileBySlugQuery = `
  *[_type == "userProfile" && slug.current == $slug][0]{
    _id,
    name,
    bio,
    "avatarUrl": avatar.asset->url,
    skills,
    links,
    "slug": slug.current,
    "projects": *[_type == "project" && isPublic == true && owner._ref == ^._id]{
      _id,
      title,
      "slug": slug.current,
      techTags
    }
  }
`;

export const publicProjectsQuery = `
  *[_type == "project" && isPublic == true] | order(_updatedAt desc){
    _id,
    title,
    "slug": slug.current,
    techTags,
    "owner": owner->{ _id, name, "slug": slug.current },
    "coverUrl": media[0].asset->url
  }
`;
