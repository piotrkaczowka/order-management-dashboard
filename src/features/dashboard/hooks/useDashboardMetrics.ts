import { formatCurrency } from '../../../lib/utils/formatCurrency'
import { useAppSelector } from '../../../store'
import {
  selectTotalOrders,
  selectTotalPrice,
  selectUniqueCountries,
} from '../../orders/store/ordersSlice'

export const useDashboardMetrics = () => {
  const totalOrders = useAppSelector(selectTotalOrders)
  const totalPrice = useAppSelector(selectTotalPrice)
  const uniqueCountries = useAppSelector(selectUniqueCountries)

  return {
    totalOrders,
    totalPrice: formatCurrency(totalPrice),
    uniqueCountries,
  }
}
