import { useDispatch, useSelector } from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'

import countriesReducer from './features/orders/store/countriesSlice'
import ordersReducer from './features/orders/store/ordersSlice'

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    countries: countriesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = <T>(selector: (state: RootState) => T) => useSelector(selector)
