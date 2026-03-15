import { v4 as uuidv4 } from 'uuid'

import { OrderSchema } from '../types/order'
import type { CreateOrderInput, Order } from '../types/order'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const daysFromNow = (days: number): string => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString().split('T')[0]
}

const SIMULATED_DELAY_MS = 300

const SEED_ORDERS: Order[] = [
  {
    id: uuidv4(),
    country: 'Germany',
    shippingDate: daysFromNow(5),
    price: 1200,
    description: 'Express delivery',
  },
  {
    id: uuidv4(),
    country: 'France',
    shippingDate: daysFromNow(10),
    price: 850,
    description: 'Fragile equipment',
  },
  {
    id: uuidv4(),
    country: 'Poland',
    shippingDate: daysFromNow(15),
    price: 2100,
    description: undefined,
  },
]

let inMemoryOrders: Order[] = [...SEED_ORDERS]

export const fetchOrders = async (): Promise<Order[]> => {
  await delay(SIMULATED_DELAY_MS)
  return inMemoryOrders.map((o) => OrderSchema.parse(o))
}

export const createOrder = async (input: CreateOrderInput): Promise<Order> => {
  await delay(SIMULATED_DELAY_MS)
  const newOrder: Order = { id: uuidv4(), ...input }
  OrderSchema.parse(newOrder)
  inMemoryOrders = [...inMemoryOrders, newOrder]
  return newOrder
}

export const updateOrder = async (id: string, input: CreateOrderInput): Promise<Order> => {
  await delay(SIMULATED_DELAY_MS)
  const exists = inMemoryOrders.some((o) => o.id === id)
  if (!exists) throw new Error(`Order with id "${id}" not found`)
  const updated: Order = { id, ...input }
  OrderSchema.parse(updated)
  inMemoryOrders = inMemoryOrders.map((o) => (o.id === id ? updated : o))
  return updated
}

export const deleteOrder = async (id: string): Promise<string> => {
  await delay(SIMULATED_DELAY_MS)
  const exists = inMemoryOrders.some((o) => o.id === id)
  if (!exists) throw new Error(`Order with id "${id}" not found`)
  inMemoryOrders = inMemoryOrders.filter((o) => o.id !== id)
  return id
}
