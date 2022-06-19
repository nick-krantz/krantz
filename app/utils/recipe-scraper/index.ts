import { FullRecipe, Scraper } from './scrapers/_base'
import { bonAppetitScraper } from './scrapers/bon-appetit'
import { cookieAndKateScraper } from './scrapers/cookie-and-kate'
import { cookiesAndCupsScraper } from './scrapers/cookies-and-cups'
import { cupcakesAndKaleChipsScraper } from './scrapers/cupcakes-and-kale-chips'
import { halfBakedHarvestScraper } from './scrapers/half-baked-harvest'
import { newYorkTimesScraper } from './scrapers/new-york-times'
import { thatSkinnyChickCanBakeScraper } from './scrapers/that-skinny-chick-can-bake'
import { twoPeasAndTheirPodScraper } from './scrapers/two-peas-and-their-pod'

const scrapers: { [key: string]: Scraper } = {
  'bonappetit.com': bonAppetitScraper,
  'cookieandkate.com': cookieAndKateScraper,
  'cookiesandcups.com': cookiesAndCupsScraper,
  'cupcakesandkalechips.com': cupcakesAndKaleChipsScraper,
  'halfbakedharvest.com': halfBakedHarvestScraper,
  'cooking.nytimes.com': newYorkTimesScraper,
  'thatskinnychickcanbake.com': thatSkinnyChickCanBakeScraper,
  'twopeasandtheirpod.com': twoPeasAndTheirPodScraper,
}

const getScraper = (url: string): Scraper | undefined => {
  const { hostname } = new URL(url)

  return scrapers[hostname]
}

export const getRecipe = async (url: string): Promise<FullRecipe | null> => {
  const scraper = getScraper(url.replace('www.', ''))

  if (!scraper) {
    console.warn('Scraper not found for: ', url)
    return Promise.resolve(null)
  }

  return await scraper(url)
}
