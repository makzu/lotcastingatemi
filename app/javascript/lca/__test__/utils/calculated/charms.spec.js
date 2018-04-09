import * as calc from '../../../utils/calculated/_charms.js'

describe('isAbilityCharm', () => {
  it('should return true for a Solar Charm', () => {
    expect(calc.isAbilityCharm({ type: 'SolarCharm' })).toEqual(true)
  })
})
