import { createFileRoute } from '@tanstack/react-router'
import { TrademarkList } from '../features/trademarks/components/TrademarkList'

export const Route = createFileRoute('/trademarks')({
  component: TrademarkList,
})
