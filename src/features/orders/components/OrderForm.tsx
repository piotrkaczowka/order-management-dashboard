import { Controller, useForm } from 'react-hook-form'

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material'

import { zodResolver } from '@hookform/resolvers/zod'

import { CreateOrderSchema } from '../../../lib/types/order'
import type { CreateOrderInput } from '../../../lib/types/order'
import { useAppSelector } from '../../../store'
import { selectCountries } from '../store/countriesSlice'

export type OrderFormValues = CreateOrderInput

interface Props {
  defaultValues?: Partial<OrderFormValues>
  onSubmit: (data: OrderFormValues) => void
  onCancel: () => void
  isLoading?: boolean
}

const today = new Date().toISOString().split('T')[0]

const OrderForm = ({ defaultValues, onSubmit, onCancel, isLoading }: Props) => {
  const countries = useAppSelector(selectCountries)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(CreateOrderSchema),
    defaultValues: {
      country: defaultValues?.country ?? ('' as OrderFormValues['country']),
      shippingDate: defaultValues?.shippingDate ?? '',
      price: defaultValues?.price ?? ('' as unknown as number),
      description: defaultValues?.description ?? '',
    },
  })

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={3}>
        <FormControl fullWidth error={!!errors.country}>
          <InputLabel>Destination Country</InputLabel>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Destination Country" value={field.value ?? ''}>
                {countries.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.country && <FormHelperText>{errors.country.message}</FormHelperText>}
        </FormControl>

        <TextField
          label="Shipping Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: today }}
          {...register('shippingDate')}
          error={!!errors.shippingDate}
          helperText={errors.shippingDate?.message}
        />

        <TextField
          label="Price"
          type="number"
          fullWidth
          {...register('price', { valueAsNumber: true })}
          error={!!errors.price}
          helperText={errors.price?.message}
        />

        <TextField
          label="Description (optional)"
          fullWidth
          multiline
          rows={3}
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message ?? '0 / 300 chars max'}
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Order'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

export default OrderForm
