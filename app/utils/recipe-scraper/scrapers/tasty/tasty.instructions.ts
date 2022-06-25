import { CheerioAPI } from 'cheerio'
import { cleanText } from '~/utils/clean-text'

export const tastyInstructions = (selector: string, $: CheerioAPI): string[] => {
  return $(selector)
    .map((_, element) => cleanText($(element).text()))
    .toArray()
}
