import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { AVAILABLE_COUNTRIES } from '../../../../lib/types/order'
import { renderWithProviders } from '../../../../test/renderWithProviders'
import OrderForm from '../OrderForm'

const renderForm = (onSubmit = vi.fn(), onCancel = vi.fn()) => {
  return renderWithProviders(<OrderForm onSubmit={onSubmit} onCancel={onCancel} />, {
    preloadedState: {
      countries: {
        items: [...AVAILABLE_COUNTRIES],
        status: 'succeeded',
      },
    },
  })
}

const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
const tomorrowStr = tomorrow.toISOString().split('T')[0]

describe('OrderForm', () => {
  it('shows validation errors when submitting empty form', async () => {
    const user = userEvent.setup()
    renderForm()

    await user.click(screen.getByRole('button', { name: /save order/i }))

    await waitFor(() => {
      expect(screen.getByText('Please select a country')).toBeInTheDocument()
      expect(screen.getByText('Shipping date is required')).toBeInTheDocument()
      expect(screen.getByText('Price must be a number')).toBeInTheDocument()
    })
  })

  it('shows error when shipping date is in the past', async () => {
    const user = userEvent.setup()
    renderForm()

    const dateInput = screen.getByLabelText(/shipping date/i)
    await user.type(dateInput, '2020-01-01')
    await user.click(screen.getByRole('button', { name: /save order/i }))

    await waitFor(() => {
      expect(screen.getByText('Shipping date cannot be in the past')).toBeInTheDocument()
    })
  })

  it('calls onSubmit with correct data when form is valid', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    renderForm(onSubmit)

    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', { name: 'Germany' }))

    const dateInput = screen.getByLabelText(/shipping date/i)
    await user.type(dateInput, tomorrowStr)

    await user.type(screen.getByLabelText(/price/i), '1500')

    await user.click(screen.getByRole('button', { name: /save order/i }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledOnce()
      const [firstCallArgs] = onSubmit.mock.calls
      expect(firstCallArgs[0]).toEqual(
        expect.objectContaining({
          country: 'Germany',
          shippingDate: tomorrowStr,
          price: 1500,
        })
      )
    })
  })

  it('calls onCancel when Cancel button is clicked', async () => {
    const user = userEvent.setup()
    const onCancel = vi.fn()
    renderForm(vi.fn(), onCancel)

    await user.click(screen.getByRole('button', { name: /cancel/i }))

    expect(onCancel).toHaveBeenCalledOnce()
  })
})
