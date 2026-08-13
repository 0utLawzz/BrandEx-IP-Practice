import { createFileRoute } from '@tanstack/react-router'
import { Documents } from '../features/documents/components/Documents'

export const Route = createFileRoute('/documents')({
  component: Documents,
})
