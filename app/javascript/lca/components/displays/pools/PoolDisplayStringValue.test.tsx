import { render, screen } from '@/testUtils'
import PoolDisplayStringValue from './PoolDisplayStringValue'

describe('PoolDisplayStringValue', () => {
  it('renders the children', () => {
    const text = 'Test String'
    render(<PoolDisplayStringValue>{text}</PoolDisplayStringValue>)
    const textElement = screen.getByText(text)
    expect(textElement).toBeInTheDocument()
  })
})
