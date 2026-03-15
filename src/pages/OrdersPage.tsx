import { useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import { Alert, Box, Button, Container, Typography } from '@mui/material'

import type { OrderFormValues } from '../features/orders/components/OrderForm'
import OrderModal from '../features/orders/components/OrderModal'
import OrderTable from '../features/orders/components/OrderTable'
import { useOrders } from '../features/orders/hooks/useOrders'
import type { Order } from '../lib/types/order'
import ErrorBoundary from '../shared/components/ErrorBoundary'

const OrdersPage = () => {
  const { orders, isLoading, create, update, remove } = useOrders()
  const [modalOpen, setModalOpen] = useState(false)
  const [editOrder, setEditOrder] = useState<Order | null>(null)

  const handleCreate = () => {
    setEditOrder(null)
    setModalOpen(true)
  }

  const handleEdit = (id: string) => {
    const order = orders.find((o) => o.id === id) ?? null
    setEditOrder(order)
    setModalOpen(true)
  }

  const handleDelete = (id: string) => {
    remove(id)
  }

  const handleSubmit = (data: OrderFormValues) => {
    if (editOrder) {
      update(editOrder.id, data)
    } else {
      create(data)
    }
    setModalOpen(false)
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5" fontWeight={700}>
            Orders
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>
            New Order
          </Button>
        </Box>

        {!isLoading && orders.length === 0 && (
          <Alert severity="info" sx={{ mb: 2 }}>
            No orders found. Start by creating your first order.
          </Alert>
        )}
        <ErrorBoundary>
          <OrderTable
            orders={orders}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </ErrorBoundary>

        <OrderModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          mode={editOrder ? 'edit' : 'create'}
          defaultValues={
            editOrder
              ? {
                  country: editOrder.country,
                  shippingDate: editOrder.shippingDate,
                  price: editOrder.price,
                  description: editOrder.description,
                }
              : undefined
          }
        />
      </Box>
    </Container>
  )
}

export default OrdersPage
