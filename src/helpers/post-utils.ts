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

/**
 * Makes blog post date more human-friendly string based on users locale
 * @param inputDate The input date/time, either as timestamp of ISO format
 * @returns The date string
 */
export const formatDate = (inputDate: string): string => {
  // const localFormat = navigator ? navigator.language : 'en-GB';
  const localFormat = 'en-GB';
  const dateFormat: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  return new Date(inputDate).toLocaleDateString(localFormat, dateFormat);
};
