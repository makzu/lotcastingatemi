import { halfRoundDown, halfRoundUp, nuClamp } from './math'

describe('nuClamp', () => {
  it('should clamp a number between a minimum and maximum value', () => {
    expect(nuClamp(5, 0, 10)).toBe(5)
    expect(nuClamp(15, 0, 10)).toBe(10)
    expect(nuClamp(-5, 0, 10)).toBe(0)
  })

  it('should throw an error if min is greater than max', () => {
    expect(() => nuClamp(5, 10, 0)).toThrowError(
      'min must be less than or equal to max',
    )
  })
})

describe('halfRoundUp', () => {
  it('should round a number up', () => {
    expect(halfRoundUp(5)).toBe(3)
    expect(halfRoundUp(4)).toBe(2)
  })
})

describe('halfRoundDown', () => {
  it('should round a number down', () => {
    expect(halfRoundDown(5)).toBe(2)
    expect(halfRoundDown(4)).toBe(2)
  })
})
