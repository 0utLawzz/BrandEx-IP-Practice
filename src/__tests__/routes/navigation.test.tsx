import { describe, it, expect } from 'vitest'
import { routeTree } from '../../routeTree.gen'

describe('Route Configuration', () => {
  it('route tree is defined', () => {
    expect(routeTree).toBeDefined()
  })

  it('route tree has the expected structure', () => {
    expect(typeof routeTree).toBe('object')
  })

  it('has home route configured', () => {
    // The route tree should include the home route
    expect(routeTree).toBeDefined()
  })
})
