export const userProfileBySlugQuery = `
  *[_type == "userProfile" && slug.current == $slug][0]{
    _id,
    name,
    bio,
    "avatarUrl": avatar.asset->url,
    skills,
    links,
    "slug": slug.current,
    "projects": *[_type == "project" && isPublic == true && owner._ref == ^._id] | order(_updatedAt desc){
      _id,
      title,
      description,
      "slug": slug.current,
      techTags,
      "owner": owner->{ _id, name, "slug": slug.current, "avatarUrl": avatar.asset->url },
      "coverUrl": coalesce(coverImage.asset->url, media[_type == "image"][0].asset->url),
      "mediaImages": media[_type == "image"].asset->url,
      "mediaFiles": media[_type == "file"]{ "url": asset->url, "filename": asset->originalFilename }
    }
  }
`;

export const publicProjectsQuery = `
  *[_type == "project" && isPublic == true] | order(_updatedAt desc){
    _id,
    title,
    description,
    "slug": slug.current,
    techTags,
    "owner": owner->{ _id, name, "slug": slug.current, "avatarUrl": avatar.asset->url },
    "coverUrl": coalesce(coverImage.asset->url, media[_type == "image"][0].asset->url),
    "mediaImages": media[_type == "image"].asset->url,
    "mediaFiles": media[_type == "file"]{ "url": asset->url, "filename": asset->originalFilename }
  }
`;
