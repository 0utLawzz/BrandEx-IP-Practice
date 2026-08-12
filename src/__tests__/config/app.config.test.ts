import { describe, it, expect, beforeEach, vi } from 'vitest'
import { appConfig } from '../../config/app.config'

describe('App Configuration', () => {
  beforeEach(() => {
    // Reset environment before each test
    vi.resetModules()
  })

  it('has correct app name', () => {
    expect(appConfig.name).toBe('BrandEx IP Practice')
  })

  it('has description', () => {
    expect(appConfig.description).toBe('IP Law Practice Management System')
  })

  it('has version', () => {
    expect(appConfig.version).toBe('0.1.0')
  })

  it('has environment set', () => {
    expect(appConfig.environment).toBeDefined()
    expect(['development', 'production', 'test']).toContain(appConfig.environment)
  })

  it('has API configuration', () => {
    expect(appConfig.api).toBeDefined()
    expect(typeof appConfig.api.baseUrl).toBe('string')
    expect(typeof appConfig.api.timeout).toBe('number')
  })

  it('has multi-tenant feature enabled', () => {
    expect(appConfig.features.multiTenant).toBe(true)
  })

  it('API configuration has reasonable defaults', () => {
    expect(appConfig.api.timeout).toBeGreaterThan(0)
  })
})
