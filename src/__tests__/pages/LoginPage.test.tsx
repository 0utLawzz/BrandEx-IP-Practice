import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoginPage } from '../../pages/LoginPage'

describe('LoginPage', () => {
  it('renders the welcome heading', () => {
    render(<LoginPage />)
    expect(screen.getByText('Welcome Back')).toBeInTheDocument()
  })

  it('renders the description text', () => {
    render(<LoginPage />)
    expect(screen.getByText('Sign in to your BrandEx IP Practice account')).toBeInTheDocument()
  })

  it('renders email input field', () => {
    render(<LoginPage />)
    const emailInput = screen.getByLabelText('Email')
    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toHaveAttribute('type', 'email')
  })

  it('renders password input field', () => {
    render(<LoginPage />)
    const passwordInput = screen.getByLabelText('Password')
    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('renders Sign In button', () => {
    render(<LoginPage />)
    expect(screen.getByText('Sign In')).toBeInTheDocument()
  })

  it('renders sign up link', () => {
    render(<LoginPage />)
    expect(screen.getByText('Sign up')).toBeInTheDocument()
  })

  it('has correct form structure', () => {
    const { container } = render(<LoginPage />)
    const form = container.querySelector('form')
    expect(form).toBeInTheDocument()
  })
})
