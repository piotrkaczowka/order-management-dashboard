import { Route, Routes } from 'react-router-dom'

import DashboardPage from '../pages/DashboardPage'
import OrdersPage from '../pages/OrdersPage'

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<DashboardPage />} />
    <Route path="/orders" element={<OrdersPage />} />
  </Routes>
)

export default AppRouter
