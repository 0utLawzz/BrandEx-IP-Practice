import { createFileRoute } from '@tanstack/react-router'
import { ClientList } from '../features/clients/components/ClientList'

export const Route = createFileRoute('/clients')({
  component: ClientList,
})
