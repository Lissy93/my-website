
export const formatTitle = (title: string): string => {
  return title.replaceAll('-', ' ').replaceAll('_', ' ');
}

/* Make large numbers easier to read, with commas */
export const putCommasInBigNum = (bigNum: number): string => {
  return bigNum.toLocaleString();
};

/* Get date in month YYYY format*/
export const getMonthYear = (inputDate: string): string => {
  const date = new Date(inputDate);
  return `${date.toLocaleString('default', {
    month: 'short',
  })}, ${date.getFullYear()}`;
};

/* Get amount of time ago (e.g. 5 days, 1 year) */
export const calculateTimeAgo = (inputDate: string) => {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(inputDate).getTime()) / 1000
  );
  const intervals = [31536000, 2592000, 86400, 3600, 60];
  const intervalNames = ['year', 'month', 'day', 'hour', 'minute'];

  for (let i = 0; i < intervals.length; i++) {
    const interval = Math.floor(seconds / intervals[i]);
    if (interval >= 1) {
      return `${interval} ${intervalNames[i]}${interval > 1 ? 's' : ''} ago`;
    }
  }
  return `${Math.floor(seconds)} seconds ago`;
};
