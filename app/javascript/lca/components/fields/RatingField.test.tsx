import { render, fireEvent } from '@/testUtils'
import userEvent from '@testing-library/user-event'

import { noop } from '@/utils'
import RatingField from './RatingField'

describe('RatingField', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('should render with the correct initial value', () => {
    const { getByRole } = render(
      <RatingField value={3} id="ratingfield" onChange={noop} />,
    )
    const inputElement = getByRole('textbox') as HTMLInputElement
    expect(inputElement.value).toBe('3')
  })

  it('should call the onChange callback when the value changes', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    const { getByRole } = render(
      <RatingField value={3} id="ratingfield" onChange={handleChange} />,
    )
    const inputElement = getByRole('textbox') as HTMLInputElement

    await user.type(inputElement, '5')
    vi.advanceTimersToNextTimer()

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('should clamp the value within the specified min and max range', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    const { getByRole } = render(
      <RatingField
        id="ratingfield"
        value={3}
        min={1}
        max={5}
        onChange={handleChange}
      />,
    )
    const inputElement = getByRole('textbox') as HTMLInputElement

    await user.type(inputElement, '10')
    vi.advanceTimersToNextTimer()

    expect(inputElement.value).toBe('5')
    vi.advanceTimersToNextTimer()
    expect(handleChange).toHaveBeenCalledTimes(1)

    fireEvent.change(inputElement, { target: { value: '-2' } })
    vi.advanceTimersToNextTimer()

    expect(inputElement.value).toBe('1')
    expect(handleChange).toHaveBeenCalledTimes(2)
  })

  it('should allow the value to be set to "-" when min < 0', () => {
    const handleChange = vi.fn()
    const { getByRole } = render(
      <RatingField
        id="ratingfield"
        value={3}
        min={-5}
        onChange={handleChange}
      />,
    )
    const inputElement = getByRole('textbox') as HTMLInputElement

    fireEvent.change(inputElement, { target: { value: '-' } })
    vi.advanceTimersToNextTimer()

    expect(inputElement.value).toBe('-')
    expect(handleChange).toHaveBeenCalledTimes(0)
  })
})
