import { AVAILABLE_COUNTRIES, type Country } from '../types/country'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const fetchCountries = async (): Promise<Country[]> => {
  await delay(100)
  return [...AVAILABLE_COUNTRIES]
}
