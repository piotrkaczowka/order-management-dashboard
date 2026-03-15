import type { CreateOrderInput } from '../../../lib/types/order'
import { useAppDispatch, useAppSelector } from '../../../store'
import {
  createOrder,
  deleteOrder,
  selectAllOrders,
  selectOrdersStatus,
  updateOrder,
} from '../store/ordersSlice'

export const useOrders = () => {
  const dispatch = useAppDispatch()
  const orders = useAppSelector(selectAllOrders)
  const status = useAppSelector(selectOrdersStatus)

  return {
    orders,
    status,
    isLoading: status === 'loading',
    create: (input: CreateOrderInput) => dispatch(createOrder(input)),
    update: (id: string, input: CreateOrderInput) => dispatch(updateOrder({ id, input })),
    remove: (id: string) => dispatch(deleteOrder(id)),
  }
}
