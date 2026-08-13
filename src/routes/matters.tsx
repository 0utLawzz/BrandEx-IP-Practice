import { createFileRoute } from '@tanstack/react-router'
import { MatterList } from '../features/matters/components/MatterList'

export const Route = createFileRoute('/matters')({
  component: MatterList,
})
