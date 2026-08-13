import { createFileRoute } from '@tanstack/react-router'
import { MatterDetail } from '../features/matters/components/MatterDetail'

export const Route = createFileRoute('/matters/$matterId')({
  component: MatterDetail,
})
