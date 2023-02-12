export type Locale = 'en';

export type Translations = {
  [key in Locale]: {
    [key: string]: string;
  };
};