import { render } from '@testing-library/react'
import BgBox from './BgBox'

describe('BgBox', () => {
  it('renders children correctly', () => {
    const { getByText } = render(<BgBox>Test Children</BgBox>)
    expect(getByText('Test Children')).toBeInTheDocument()
  })
})
