import { CheerioAPI } from 'cheerio'
import { cleanText } from '~/utils/clean-text'

const wordpressStructuredInstructions = ($: CheerioAPI): string[] => {
  return $('.wprm-recipe-instructions-container .wprm-recipe-instruction .wprm-recipe-instruction-text')
    .map((_, element) => cleanText($(element).text()))
    .toArray()
}

const wordpressFlatInstructions = ($: CheerioAPI): string[] => {
  return $('.wprm-recipe-instructions-container .wprm-recipe-instruction-text span')
    .map((_, element) => cleanText($(element).text().substring(3)))
    .toArray()
}

export const wordpressInstructions = ($: CheerioAPI): string[] => {
  const structured = wordpressStructuredInstructions($)

  return structured.length > 0 ? structured : wordpressFlatInstructions($)
}
