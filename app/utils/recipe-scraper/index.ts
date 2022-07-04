import { Scraper, ScraperRecipe } from './scrapers/_base'
import { allRecipesScraper } from './scrapers/all-recipes'
import { bonAppetitScraper } from './scrapers/bon-appetit'
import { budgetByteScraper } from './scrapers/budget-bytes'
import { delishScraper } from './scrapers/delish'
import { foodNetworkScraper } from './scrapers/food-network'
import { halfBakedHarvestScraper } from './scrapers/half-baked-harvest'
import { newYorkTimesScraper } from './scrapers/new-york-times'
import { proHomeCooksScraper } from './scrapers/pro-home-cooks'
import { seriousEatsScraper } from './scrapers/serious-eats'
import { simplyRecipesScraper } from './scrapers/simply-recipes'
import { tastyDefaultScraper } from './scrapers/tasty/tasty.scraper'
import { wordPressDefaultScraper } from './scrapers/wordpress/wordpress.scraper'

const scrapers: { [key: string]: Scraper } = {
  'allrecipes.com': allRecipesScraper,
  'bonappetit.com': bonAppetitScraper,
  'budgetbytes.com': budgetByteScraper,
  'chelseasmessyapron.com': wordPressDefaultScraper,
  'cookieandkate.com': tastyDefaultScraper,
  'cookiesandcups.com': tastyDefaultScraper,
  'cooking.nytimes.com': newYorkTimesScraper,
  'cupcakesandkalechips.com': wordPressDefaultScraper,
  'delish.com': delishScraper,
  'foodnetwork.com': foodNetworkScraper,
  'halfbakedharvest.com': halfBakedHarvestScraper,
  'prohomecooks.com': proHomeCooksScraper,
  'realsimplegood.com': wordPressDefaultScraper,
  'seriouseats.com': seriousEatsScraper,
  'simplyrecipes.com': simplyRecipesScraper,
  'skinnytaste.com': wordPressDefaultScraper,
  'thatskinnychickcanbake.com': tastyDefaultScraper,
  'themodernproper.com': tastyDefaultScraper,
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
    console.log('Attempting wordpress scraper...')

    const wordpressRecipe = await wordPressDefaultScraper(url)

    if (wordpressRecipe.ingredients.length > 0 || wordpressRecipe.instructions.length > 0) {
      return Promise.resolve(wordpressRecipe)
    }

    console.warn('Wordpress recipe not found for: ', url)
    console.log('Attempting tasty scraper...')

    const tastyRecipe = await tastyDefaultScraper(url)

    if (tastyRecipe.ingredients.length > 0 || tastyRecipe.instructions.length > 0) {
      return Promise.resolve(tastyRecipe)
    }

    console.warn('Tasty recipe not found for: ', url)

    return Promise.resolve(null)
  }

  return await scraper(url)
}
