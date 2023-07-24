import { DietSource } from '../diet-source'
import { DietParser } from './diet-parser'
import { parseFitatu } from './parse-fitatu'

export const getParser = (source: DietSource) => {
  const parsers: Record<DietSource, DietParser> = {
    [DietSource.Fitatu]: parseFitatu
  }

  return parsers[source]
}
