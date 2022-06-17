import { FullRecipe, Scraper } from './scrapers/_base'
import { bonAppetitScraper } from './scrapers/bon-appetit'

const scrapers: { [key: string]: Scraper } = {
  'www.bonappetit.com': bonAppetitScraper,
}

const getScraper = (url: string): Scraper | undefined => {
  const { hostname } = new URL(url)

  return scrapers[hostname]
}

export const getRecipe = async (url: string): Promise<FullRecipe | null> => {
  const scraper = getScraper(url)

  if (!scraper) {
    console.warn('Scraper not found for: ', url)
    return Promise.resolve(null)
  }

  return await scraper(url)
}
