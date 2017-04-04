import React from 'react'
import HealthLevelBoxes from '../components/generic/HealthLevelBoxes.jsx'
import renderer from 'react-test-renderer'

const mockChar = {
  health_level_0s: 1, health_level_1s: 2, health_level_2s: 2, health_level_4s: 1, health_level_incap: 1,
  damage_bashing: 1, damage_lethal: 1, damage_aggravated: 1
}

describe('HealthLevelBoxes', () => {
  it('renders at all', () => {
    const component = renderer.create(
      <HealthLevelBoxes character={ mockChar } />
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
