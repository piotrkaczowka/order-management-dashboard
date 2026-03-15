import type { ReactNode } from 'react'
import { Provider } from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'

import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'

import countriesReducer from '../features/orders/store/countriesSlice'
import ordersReducer from '../features/orders/store/ordersSlice'
import type { RootState } from '../store'

interface Options extends RenderOptions {
  preloadedState?: Partial<RootState>
}

export const renderWithProviders = (ui: ReactNode, options: Options = {}) => {
  const { preloadedState, ...renderOptions } = options

  const store = configureStore({
    reducer: {
      orders: ordersReducer,
      countries: countriesReducer,
    },
    preloadedState: preloadedState as RootState,
  })

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  )

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  }
}
