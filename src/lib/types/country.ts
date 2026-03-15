export const AVAILABLE_COUNTRIES = ['Poland', 'Netherlands', 'Germany', 'France'] as const

export type Country = (typeof AVAILABLE_COUNTRIES)[number]
