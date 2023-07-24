import { isDefined } from '../../utils'
import { DietDay } from '../diet-day'
import { parse } from 'csv-parse/sync'
import { mergeDays } from './merge-days'

type FitatuRow = [
  rawDate: string,
  meal: string,
  name: string,
  usefulUnit: string,
  weightInGrams: string,
  kcal: string,
  proteinsInGrams: string,
  animalProteinsInGrams: string,
  plantProteinsInGrams: string,
  fatsInGrams: string,
  saturedFatsInGrams: string,
  singleSaturedFatsInGrams: string,
  multiSaturedFatsInGrams: string,
  omega3InMg: string,
  omega6InMg: string,
  carbsInGrams: string
]

const parseFitatuRow = (row: FitatuRow): DietDay => {
  return {
    date: new Date(row[0]),
    kcal: Number(row[5]),
    macro: {
      fatsInGrams: Number(row[9]),
      carbsInGrams: Number(row[15]),
      proteinsInGrams: Number(row[6])
    }
  }
}

export const parseFitatu = (rawSource: string): DietDay[] => {
  const delimiter = ','
  const rows = parse(rawSource, {
    delimiter
  }) as [string[], ...FitatuRow[]]
  const [, ...dataRows] = rows
  const days = dataRows.map((specifiedRow) => parseFitatuRow(specifiedRow))
  const summarizedDays: Record<string, DietDay> = days.reduce(
    (accSummarizedDays, specifiedDay) => {
      const key = specifiedDay.date.toISOString()
      const existingDay = accSummarizedDays[key]
      if (!isDefined(existingDay)) {
        return {
          ...accSummarizedDays,
          [key]: specifiedDay
        }
      }
      const newDay = mergeDays(existingDay, specifiedDay)
      return {
        ...accSummarizedDays,
        [key]: newDay
      }
    },
    {} as Record<string, DietDay>
  )

  return Object.values(summarizedDays)
}
