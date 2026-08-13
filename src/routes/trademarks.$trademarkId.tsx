import { createFileRoute } from '@tanstack/react-router'
import { TrademarkDetail } from '../features/trademarks/components/TrademarkDetail'

export const Route = createFileRoute('/trademarks/$trademarkId')({
  component: TrademarkDetail,
})
