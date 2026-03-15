import CloseIcon from '@mui/icons-material/Close'
import { Box, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'

import OrderForm from './OrderForm'
import type { OrderFormValues } from './OrderForm'

interface Props {
  open: boolean
  onClose: () => void
  onSubmit: (data: OrderFormValues) => void
  defaultValues?: Partial<OrderFormValues>
  mode: 'create' | 'edit'
}

const OrderModal = ({ open, onClose, onSubmit, defaultValues, mode }: Props) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth disableRestoreFocus>
    <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {mode === 'create' ? 'Create New Order' : 'Edit Order'}
      <IconButton onClick={onClose} size="small">
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent>
      <Box sx={{ pt: 1 }}>
        <OrderForm defaultValues={defaultValues} onSubmit={onSubmit} onCancel={onClose} />
      </Box>
    </DialogContent>
  </Dialog>
)

export default OrderModal
