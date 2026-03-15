import { useEffect } from 'react'

import { Box } from '@mui/material'

import { loadCountries } from './features/orders/store/countriesSlice'
import { fetchOrders } from './features/orders/store/ordersSlice'
import AppRouter from './router/AppRouter'
import ErrorBoundary from './shared/components/ErrorBoundary'
import Header from './shared/components/Header'
import { useAppDispatch } from './store'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchOrders())
    dispatch(loadCountries())
  }, [dispatch])

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Header />
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </Box>
  )
}

export default App
