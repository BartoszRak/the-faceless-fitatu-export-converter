import { DietDay } from '../diet-day'

export type DietParser = (rawData: string) => DietDay[]
