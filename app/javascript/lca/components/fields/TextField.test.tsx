import { fireEvent, render } from '@testing-library/react'

import LcaTextField from './TextField'

describe('LcaTextField', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders without errors', () => {
    render(<LcaTextField value="test" onChange={() => null} />)
    // Add assertions here to verify that the component renders correctly
  })

  it('calls onChange handler when input value changes', () => {
    const handleChange = vi.fn()
    const { getByRole } = render(
      <LcaTextField value="asdf" name="name" onChange={handleChange} />,
    )
    const input = getByRole('textbox')

    fireEvent.change(input, { target: { value: 'Test' } })
    vi.advanceTimersToNextTimer()

    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
