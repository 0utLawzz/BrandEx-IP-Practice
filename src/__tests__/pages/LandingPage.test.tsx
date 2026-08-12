import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LandingPage } from '../../pages/LandingPage'

// Mock TanStack Router Link component
vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to, ...props }: any) => <a href={to} {...props}>{children}</a>,
}))

describe('LandingPage', () => {
  it('renders the main heading', () => {
    render(<LandingPage />)
    expect(screen.getByText('BrandEx IP Practice')).toBeInTheDocument()
  })

  it('renders the description text', () => {
    render(<LandingPage />)
    expect(screen.getByText('IP Law Practice Management System for trademark/IP consultants and law firms')).toBeInTheDocument()
  })

  it('renders the Get Started button', () => {
    render(<LandingPage />)
    expect(screen.getByText('Get Started')).toBeInTheDocument()
  })

  it('renders the Learn More button', () => {
    render(<LandingPage />)
    expect(screen.getByText('Learn More')).toBeInTheDocument()
  })

  it('has correct structure and styling classes', () => {
    const { container } = render(<LandingPage />)
    const mainDiv = container.firstChild as HTMLElement
    expect(mainDiv).toHaveClass('min-h-screen', 'flex', 'flex-col', 'items-center', 'justify-center')
  })
})
