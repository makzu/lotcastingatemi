import { render, screen } from '@testing-library/react'
import ResourceDisplay from './ResourceDisplay'

describe('ResourceDisplay', () => {
  it('renders the label', () => {
    const label = 'Test Label'
    render(<ResourceDisplay label={label} current={0} />)
    const labelElement = screen.getByText(label)
    expect(labelElement).toBeInTheDocument()
  })

  it('renders the current value', () => {
    const current = 10
    render(<ResourceDisplay label="" current={current} />)
    const currentElement = screen.getByText(current.toString())
    expect(currentElement).toBeInTheDocument()
  })

  it('renders the total value if provided', () => {
    const total = 100
    render(<ResourceDisplay label="" current={0} total={total} />)
    const totalElement = screen.getByText(`/${total}`)
    expect(totalElement).toBeInTheDocument()
  })

  it('renders the committed value if greater than 0', () => {
    const committed = 5
    render(<ResourceDisplay label="" current={0} committed={committed} />)
    const committedElement = screen.getByText(`${committed}c`)
    expect(committedElement).toBeInTheDocument()
  })

  it('does not render the committed value if 0', () => {
    render(<ResourceDisplay label="" current={0} committed={0} />)
    const committedElement = screen.queryByText(/c$/)
    expect(committedElement).toBeNull()
  })
})
