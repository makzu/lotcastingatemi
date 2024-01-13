import { render, screen } from '@testing-library/react'
import DisplayLabel from './DisplayLabel'

describe('DisplayLabel', () => {
  it('renders the label text correctly', () => {
    const labelText = 'Hello, World!'
    render(<DisplayLabel>{labelText}</DisplayLabel>)
    const labelElement = screen.getByText(labelText)
    expect(labelElement).toBeInTheDocument()
  })
})
