import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'

import * as api from '../../../lib/api/orders'
import type { CreateOrderInput, Order } from '../../../lib/types/order'
import type { RootState } from '../../../store'

interface OrdersState {
  items: Order[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: OrdersState = {
  items: [],
  status: 'idle',
  error: null,
}

export const fetchOrders = createAsyncThunk('orders/fetchAll', () => api.fetchOrders())

export const createOrder = createAsyncThunk('orders/create', (input: CreateOrderInput) =>
  api.createOrder(input)
)

export const updateOrder = createAsyncThunk(
  'orders/update',
  ({ id, input }: { id: string; input: CreateOrderInput }) => api.updateOrder(id, input)
)

export const deleteOrder = createAsyncThunk('orders/delete', (id: string) => api.deleteOrder(id))

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to fetch orders'
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.items.findIndex((o) => o.id === action.payload.id)
        if (index !== -1) state.items[index] = action.payload
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.items = state.items.filter((o) => o.id !== action.payload)
      })
  },
})

export default ordersSlice.reducer

const selectOrdersState = (state: RootState) => state.orders

export const selectAllOrders = createSelector(selectOrdersState, (s) => s.items)
export const selectOrdersStatus = createSelector(selectOrdersState, (s) => s.status)

export const selectTotalOrders = createSelector(selectAllOrders, (items) => items.length)

export const selectTotalPrice = createSelector(selectAllOrders, (items) =>
  items.reduce((sum: number, o: Order) => sum + o.price, 0)
)

export const selectUniqueCountries = createSelector(
  selectAllOrders,
  (items) => new Set(items.map((o: Order) => o.country)).size
)
