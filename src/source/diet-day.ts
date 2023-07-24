export interface Macro {
  proteinsInGrams: number
  fatsInGrams: number
  carbsInGrams: number
}

export interface DietDay {
  date: Date
  kcal: number
  macro: Macro
}
