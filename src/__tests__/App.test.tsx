import { describe, it, expect } from 'vitest'
import App from '../App'

describe('App', () => {
  it('can be imported without errors', () => {
    expect(App).toBeDefined()
  })

  it('exports a component', () => {
    expect(typeof App).toBe('function')
  })
})
