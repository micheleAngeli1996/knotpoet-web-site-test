export type News = {
  id?: string,
  date: string,
} & {
  [lang: string]: {
    title: string,
    shortContent: string,
    longContent: string,
    image?: string
  }
}
