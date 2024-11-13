import { render, screen } from '@/testUtils'
import PoolDisplayNumericValue from './PoolDisplayNumericValue'

describe('PoolDisplayNumericValue', () => {
  it('renders the children', () => {
    const text = 5
    render(<PoolDisplayNumericValue>{text}</PoolDisplayNumericValue>)
    const textElement = screen.getByText(text)
    expect(textElement).toBeInTheDocument()
  })
})
