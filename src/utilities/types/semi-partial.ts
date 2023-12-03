import { Prettify } from './prettify'

export type SemiPartial<
  T extends Record<string, unknown>,
  K extends keyof T,
> = Prettify<Omit<T, K> & Partial<Pick<T, K>>>
