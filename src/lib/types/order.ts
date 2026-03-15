import { z } from 'zod'

export const AVAILABLE_COUNTRIES = ['Poland', 'Netherlands', 'Germany', 'France'] as const

export type Country = (typeof AVAILABLE_COUNTRIES)[number]

export const OrderSchema = z.object({
  id: z.string(),
  country: z.enum(AVAILABLE_COUNTRIES, { error: 'Please select a country' }),
  shippingDate: z.string().min(1, 'Shipping date is required'),
  price: z
    .number({ error: 'Price must be a number' })
    .positive('Price must be greater than 0')
    .max(1_000_000, 'Price seems too high'),
  description: z.string().max(300, 'Description too long').optional(),
})

export const CreateOrderSchema = OrderSchema.omit({ id: true }).extend({
  shippingDate: z
    .string()
    .min(1, 'Shipping date is required')
    .refine((date) => {
      return new Date(date) >= new Date(new Date().toDateString())
    }, 'Shipping date cannot be in the past'),
})

export type Order = z.infer<typeof OrderSchema>
export type CreateOrderInput = z.infer<typeof CreateOrderSchema>
