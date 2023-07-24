import { DietDay } from '../diet-day'

export const mergeDays = (prevDay: DietDay, nextDay: DietDay): DietDay => {
  const { macro: prevMacro, date, kcal: prevKcal } = prevDay
  const { macro: nextMacro, kcal: nextKcal } = nextDay
  return {
    date,
    kcal: prevKcal + nextKcal,
    macro: {
      fatsInGrams: prevMacro.fatsInGrams + nextMacro.fatsInGrams,
      carbsInGrams: prevMacro.carbsInGrams + nextMacro.carbsInGrams,
      proteinsInGrams: prevMacro.proteinsInGrams + nextMacro.proteinsInGrams
    }
  }
}
