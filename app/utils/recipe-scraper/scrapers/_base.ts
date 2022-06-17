import { CheerioAPI, load } from 'cheerio'

export type FullRecipe = {
  title: string
  url: string
  image: string | null
  instructions: string[]
  ingredients: string[]
}

type BaseScraper = {
  baseRecipe: Omit<FullRecipe, 'instructions' | 'ingredients'>
  $: CheerioAPI
}

export type ScraperCreator = (url: string) => Promise<BaseScraper>
export type Scraper = (url: string) => Promise<FullRecipe>

const getTitle = ($: CheerioAPI): string => {
  return $('head title').text().trim() || $('head meta[property="og:title"]').text().trim()
}

const getImage = ($: CheerioAPI): string | undefined => {
  return $('head meta[property="og:image"]').attr('content') || $("meta[name='og:image']").attr('content')
}

export const createScraper: ScraperCreator = async (url) => {
  const html = await (await fetch(url)).text()
  const $ = load(html)

  return {
    $,
    baseRecipe: {
      title: getTitle($),
      image: getImage($) ?? null,
      url,
    },
  }
}
