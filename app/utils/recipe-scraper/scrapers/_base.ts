import { IngredientSections } from '~/types/recipe-with-id'
import { CheerioAPI, load } from 'cheerio'
import { cleanText } from '~/utils/clean-text'

export type FullRecipe = {
  title: string
  url: string
  image: string | null
  instructions: string[]
  ingredients: IngredientSections[]
}

type BaseScraper = {
  baseRecipe: Omit<FullRecipe, 'instructions' | 'ingredients'>
  $: CheerioAPI
}

export type ScraperCreator = (url: string) => Promise<BaseScraper>
export type Scraper = (url: string) => Promise<FullRecipe>

const getTitle = ($: CheerioAPI): string => {
  const title = $('head title').text() || $('head meta[property="og:title"]').text() || ''

  if (title.includes(' | ')) {
    return cleanText(title.split(' | ')[0])
  }

  if (title.includes(' - ')) {
    return cleanText(title.split(' - ')[0])
  }

  return title
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
