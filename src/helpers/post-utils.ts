/**
 * Generate a URL slug for a post, based on it's title
 * Removes trailing whitespace and duplicate spaces, replaces single spaces with dashes
 * remove all non-alphanumeric characters and make lower-case
 * @param postTitle - The title to generate slug from
 * @returns The posts slug
 */
export const slugify = (postTitle: string): string => {
  return postTitle
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replaceAll(' ', '-')
    .replace(/[^a-zA-Z0-9_-]/g, '');
};
