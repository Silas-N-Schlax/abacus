import { render, screen } from '@testing-library/react'
import { App } from '../../src/components/app.jsx'

describe('App', () => {
  it('mounts and shows the app name', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Abacus' })).toBeInTheDocument()
  })
})
