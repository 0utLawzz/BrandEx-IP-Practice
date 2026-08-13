import { createFileRoute } from '@tanstack/react-router'
import { ClientDetail } from '../features/clients/components/ClientDetail'

export const Route = createFileRoute('/clients/$clientId')({
  component: ClientDetail,
})
