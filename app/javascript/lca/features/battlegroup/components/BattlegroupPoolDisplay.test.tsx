import { render, screen } from '@testing-library/react'

import BattlegroupPoolDisplay from './BattlegroupPoolDisplay'

describe('BattlegroupPoolDisplay', () => {
  it('renders the label and value correctly', () => {
    const label = 'Pool Label'
    const value = 10

    render(<BattlegroupPoolDisplay label={label} value={value} />)

    const labelElement = screen.getByText(label)
    const valueElement = screen.getByText(value.toString())

    expect(labelElement).toBeInTheDocument()
    expect(valueElement).toBeInTheDocument()
  })

  it('renders the value with correct font size when value is a string', () => {
    const label = 'Pool Label'
    const value = 'String Value'

    render(<BattlegroupPoolDisplay label={label} value={value} />)

    const valueElement = screen.getByText(value)

    expect(valueElement).toHaveStyle({ fontSize: '1rem' })
  })

  it('renders the value with correct font size when value is a number', () => {
    const label = 'Pool Label'
    const value = 10

    render(<BattlegroupPoolDisplay label={label} value={value} />)

    const valueElement = screen.getByText(value.toString())

    expect(valueElement).toHaveStyle({ fontSize: '1.25rem' })
  })
})
