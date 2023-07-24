import { sortBy } from 'lodash'
import { DietDay } from './source/diet-day'
import dayjs from 'dayjs'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { EOL } from 'os'

const createDayDescription = (data: DietDay, week: number, day: number) => {
  const {
    date,
    kcal,
    macro: { fatsInGrams, proteinsInGrams, carbsInGrams }
  } = data
  const formattedDay = dayjs(date).format('DD.MM.YYYY')
  return `${formattedDay} - ${week} tydzień/${day} dzień/WAGA kg/BRZUCH cm/BICEPS cm/KLATKA cm/KROKI kroków/${kcal} kcal/B:${proteinsInGrams} T:${fatsInGrams} W:${carbsInGrams}`
}

export const save = async (days: DietDay[], week: number) => {
  const sortedDays = sortBy(days, 'date')
  const descriptions = sortedDays.map((specifiedDay, index) => {
    const computedDay = (index % 7) + 1
    const weeksPassed = Math.floor(index / 7)
    const realWeek = week + weeksPassed
    return createDayDescription(specifiedDay, realWeek, computedDay)
  })
  const joinedDescriptions = descriptions.join(EOL)
  const dataToSave = Buffer.from(joinedDescriptions)
  const savePath = join(process.cwd(), `converted-${Date.now()}.txt`)
  //   const path =
  await writeFile(savePath, dataToSave)
}
