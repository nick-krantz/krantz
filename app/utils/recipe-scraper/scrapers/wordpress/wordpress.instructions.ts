import { CheerioAPI } from 'cheerio'
import { cleanText } from '~/utils/clean-text'

export const wordpressStructuredInstructions = ($: CheerioAPI): string[] => {
  return $('.wprm-recipe-instructions-container .wprm-recipe-instruction')
    .map((_, element) => cleanText($(element).text()))
    .toArray()
}

export const wordpressFlatInstructions = ($: CheerioAPI): string[] => {
  return $('.wprm-recipe-instructions-container .wprm-recipe-instruction-text span')
    .map((_, element) => cleanText($(element).text().substring(3)))
    .toArray()
}
