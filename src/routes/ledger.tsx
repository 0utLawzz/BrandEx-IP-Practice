import { createFileRoute } from '@tanstack/react-router'
import { Ledger } from '../features/ledger/components/Ledger'

export const Route = createFileRoute('/ledger')({
  component: Ledger,
})
