import { DietDay } from './diet-day'
import { DietSource } from './diet-source'
import { getParser } from './parsers/get-parser'

export const parseSource = (
  rawData: string,
  source: DietSource
): DietDay[] | undefined => {
  const parse = getParser(source)
  return parse(rawData)
}
