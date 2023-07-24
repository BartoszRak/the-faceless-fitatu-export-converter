export const isDefined = <T>(value: T | undefined | null): value is T =>
  !([null, undefined] as (T | undefined | null)[]).includes(value)
