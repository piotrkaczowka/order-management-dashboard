import { configureStore } from '@reduxjs/toolkit'

import type { Order } from '../../../../lib/types/order'
import countriesReducer from '../countriesSlice'
import ordersReducer, {
  createOrder,
  deleteOrder,
  selectAllOrders,
  selectTotalOrders,
  selectTotalPrice,
  selectUniqueCountries,
  updateOrder,
} from '../ordersSlice'

vi.mock('../../../../lib/api/orders', () => ({
  fetchOrders: vi.fn().mockResolvedValue([]),
  createOrder: vi.fn().mockImplementation((input) => Promise.resolve({ id: 'new-id', ...input })),
  updateOrder: vi.fn().mockImplementation((id, input) => Promise.resolve({ id, ...input })),
  deleteOrder: vi.fn().mockImplementation((id) => Promise.resolve(id)),
}))

const makeStore = (initialOrders: Order[] = []) =>
  configureStore({
    reducer: {
      orders: ordersReducer,
      countries: countriesReducer,
    },
    preloadedState: {
      orders: {
        items: initialOrders,
        status: 'succeeded' as const,
        error: null,
      },
    },
  })

const mockOrder: Order = {
  id: 'order-1',
  country: 'Germany',
  shippingDate: '2026-05-15',
  price: 1200,
  description: 'Test order',
}

const mockOrder2: Order = {
  id: 'order-2',
  country: 'France',
  shippingDate: '2026-05-20',
  price: 800,
  description: undefined,
}

describe('ordersSlice', () => {
  it('adds new order to store after create', async () => {
    const store = makeStore([])
    await store.dispatch(
      createOrder({
        country: 'Poland',
        shippingDate: '2026-05-01',
        price: 500,
        description: 'New order',
      })
    )
    const orders = selectAllOrders(store.getState())
    expect(orders).toHaveLength(1)
    expect(orders[0]).toMatchObject({ country: 'Poland', price: 500 })
    expect(orders[0].id).toBeDefined()
  })

  it('updates existing order in store', async () => {
    const store = makeStore([mockOrder])
    await store.dispatch(
      updateOrder({
        id: mockOrder.id,
        input: { country: 'Netherlands', shippingDate: '2026-04-01', price: 2000 },
      })
    )
    const orders = selectAllOrders(store.getState())
    expect(orders).toHaveLength(1)
    expect(orders[0].country).toBe('Netherlands')
    expect(orders[0].price).toBe(2000)
  })

  it('removes order from store after delete', async () => {
    const store = makeStore([mockOrder, mockOrder2])
    await store.dispatch(deleteOrder(mockOrder.id))
    const orders = selectAllOrders(store.getState())
    expect(orders).toHaveLength(1)
    expect(orders[0].id).toBe('order-2')
  })
})

describe('dashboard selectors — data integrity', () => {
  it('recalculates metrics after create', async () => {
    const store = makeStore([mockOrder])
    await store.dispatch(createOrder({ country: 'France', shippingDate: '2026-07-01', price: 800 }))
    expect(selectTotalOrders(store.getState())).toBe(2)
    expect(selectTotalPrice(store.getState())).toBe(2000)
    expect(selectUniqueCountries(store.getState())).toBe(2)
  })

  it('recalculates metrics after delete', async () => {
    const store = makeStore([mockOrder, mockOrder2])
    await store.dispatch(deleteOrder(mockOrder.id))
    expect(selectTotalOrders(store.getState())).toBe(1)
    expect(selectTotalPrice(store.getState())).toBe(800)
    expect(selectUniqueCountries(store.getState())).toBe(1)
  })

  it('counts unique countries correctly when multiple orders from same country', async () => {
    const store = makeStore([mockOrder])
    await store.dispatch(
      createOrder({ country: 'Germany', shippingDate: '2026-04-01', price: 300 })
    )
    expect(selectTotalOrders(store.getState())).toBe(2)
    expect(selectTotalPrice(store.getState())).toBe(1500)
    expect(selectUniqueCountries(store.getState())).toBe(1)
  })
})
