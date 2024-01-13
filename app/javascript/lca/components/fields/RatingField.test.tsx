import { render, fireEvent } from '@testing-library/react'

import RatingField from './RatingField'

const noop = () => null

describe('RatingField', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render with the correct initial value', () => {
    const { getByRole } = render(<RatingField onChange={noop} value={3} />)
    const inputElement = getByRole('textbox') as HTMLInputElement
    expect(inputElement.value).toBe('3')
  })

  it('should call the onChange callback when the value changes', () => {
    const handleChange = vi.fn()
    const { getByRole } = render(
      <RatingField value={3} onChange={handleChange} />,
    )
    const inputElement = getByRole('textbox') as HTMLInputElement

    fireEvent.change(inputElement, { target: { value: '5' } })
    vi.advanceTimersToNextTimer()

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object))
  })

  it('should clamp the value within the specified min and max range', () => {
    const handleChange = vi.fn()
    const { getByRole } = render(
      <RatingField value={3} min={1} max={5} onChange={handleChange} />,
    )
    const inputElement = getByRole('textbox') as HTMLInputElement

    fireEvent.change(inputElement, { target: { value: '10' } })
    vi.advanceTimersToNextTimer()

    expect(inputElement.value).toBe('5')
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object))

    fireEvent.change(inputElement, { target: { value: '-2' } })
    vi.advanceTimersToNextTimer()

    expect(inputElement.value).toBe('1')
    expect(handleChange).toHaveBeenCalledTimes(2)
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object))
  })

  it('should allow the value to be set to "-" when min < 0', () => {
    const handleChange = vi.fn()
    const { getByRole } = render(
      <RatingField value={3} min={-5} onChange={handleChange} />,
    )
    const inputElement = getByRole('textbox') as HTMLInputElement

    fireEvent.change(inputElement, { target: { value: '-' } })
    vi.advanceTimersToNextTimer()

    expect(inputElement.value).toBe('-')
    expect(handleChange).toHaveBeenCalledTimes(0)
  })
})
