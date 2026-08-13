import { createFileRoute } from '@tanstack/react-router'
import { Payments } from '../features/payments/components/Payments'

export const Route = createFileRoute('/payments')({
  component: Payments,
})
