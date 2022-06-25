import { Scraper, ScraperRecipe } from './scrapers/_base'
import { bonAppetitScraper } from './scrapers/bon-appetit'
import { cookieAndKateScraper } from './scrapers/cookie-and-kate'
import { cookiesAndCupsScraper } from './scrapers/cookies-and-cups'
import { delishScraper } from './scrapers/delish'
import { foodNetworkScraper } from './scrapers/food-network'
import { halfBakedHarvestScraper } from './scrapers/half-baked-harvest'
import { newYorkTimesScraper } from './scrapers/new-york-times'
import { proHomeCooksScraper } from './scrapers/pro-home-cooks'
import { seriousEatsScraper } from './scrapers/serious-eats'
import { thatSkinnyChickCanBakeScraper } from './scrapers/that-skinny-chick-can-bake'
import { theModernProperScraper } from './scrapers/the-modern-proper'
import { wordPressDefaultScraper } from './scrapers/wordpress/wordpress.scraper'

const scrapers: { [key: string]: Scraper } = {
  'bonappetit.com': bonAppetitScraper,
  'chelseasmessyapron.com': wordPressDefaultScraper,
  'cookieandkate.com': cookieAndKateScraper,
  'cookiesandcups.com': cookiesAndCupsScraper,
  'cooking.nytimes.com': newYorkTimesScraper,
  'cupcakesandkalechips.com': wordPressDefaultScraper,
  'delish.com': delishScraper,
  'foodnetwork.com': foodNetworkScraper,
  'halfbakedharvest.com': halfBakedHarvestScraper,
  'prohomecooks.com': proHomeCooksScraper,
  'realsimplegood.com': wordPressDefaultScraper,
  'seriouseats.com': seriousEatsScraper,
  'thatskinnychickcanbake.com': thatSkinnyChickCanBakeScraper,
  'themodernproper.com': theModernProperScraper,
  'twopeasandtheirpod.com': wordPressDefaultScraper,
}

const getScraper = (url: string): Scraper | undefined => {
  const { hostname } = new URL(url)

  return scrapers[hostname]
}

export const getRecipe = async (url: string): Promise<ScraperRecipe | null> => {
  const scraper = getScraper(url.replace('www.', ''))

  if (!scraper) {
    console.warn('Scraper not found for: ', url)
    return Promise.resolve(null)
  }

  return await scraper(url)
}
