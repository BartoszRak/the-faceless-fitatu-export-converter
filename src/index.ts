import { save } from './save'
import { DietSource } from './source/diet-source'
import { parseSource } from './source/parse-source'
import { readSource } from './source/read-source'
import { normalize } from 'path'
;(async () => {
  const path =
    'C:\\Users\\barto\\Downloads\\orca_share_media1690154958894_7089023704709295671.csv'
  const source = DietSource.Fitatu
  const week = 4

  const normalizedPath = normalize(path)
  const rawData = await readSource(normalizedPath)
  if (!rawData) {
    console.error('Missing raw data, exiting...')
    return process.exit(1)
  }
  const data = parseSource(rawData, source)
  if (!data) {
    console.error('Missing data, exiting...')
    return process.exit(1)
  }

  await save(data, week)
})()
