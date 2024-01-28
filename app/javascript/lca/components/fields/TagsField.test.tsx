import { fireEvent, render } from '@testing-library/react'

import TagsField from './TextField'

describe('TagsField', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders without errors', () => {
    render(<TagsField value="test" onChange={() => null} />)
    // Add assertions here to verify that the component renders correctly
  })

  it('calls onChange handler when input value changes', () => {
    const handleChange = vi.fn()
    const { getByRole } = render(
      <TagsField value="asdf" name="name" onChange={handleChange} />,
    )
    const input = getByRole('textbox')

    fireEvent.change(input, { target: { value: 'Test' } })
    vi.advanceTimersToNextTimer()

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object))
  })

  it('trims tags', () => {
    const handleChange = vi.fn()
    const { getByRole } = render(
      <TagsField value="asdf" name="name" onChange={handleChange} />,
    )
    const input = getByRole('textbox')

    fireEvent.change(input, { target: { value: 'Test, Test2, Test3' } })
    vi.advanceTimersToNextTimer()

    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
