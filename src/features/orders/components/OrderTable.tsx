import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'

import type { Order } from '../../../lib/types/order'
import { formatCurrency } from '../../../lib/utils/formatCurrency'

interface Props {
  orders: Order[]
  isLoading: boolean
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

const OrderTable = ({ orders, isLoading, onEdit, onDelete }: Props) => {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (orders.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          No orders yet
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Create your first order.
        </Typography>
      </Box>
    )
  }

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'primary.main' }}>
            <TableCell sx={{ color: 'white', fontWeight: 700 }}>ID</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 700 }}>Country</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 700 }}>Shipping Date</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 700 }}>Price</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 700 }} align="right">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} hover sx={{ '&:last-child td': { border: 0 } }}>
              <TableCell>#{order.id.slice(0, 8)}</TableCell>
              <TableCell>{order.country}</TableCell>
              <TableCell>{order.shippingDate}</TableCell>
              <TableCell>
                <Typography fontWeight={600}>{formatCurrency(order.price)}</Typography>
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Edit order">
                  <IconButton size="small" color="primary" onClick={() => onEdit(order.id)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete order">
                  <IconButton size="small" color="error" onClick={() => onDelete(order.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OrderTable
