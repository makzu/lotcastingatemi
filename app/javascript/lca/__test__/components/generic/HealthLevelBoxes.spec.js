import React from 'react'
import renderer from 'react-test-renderer'

import HealthLevelBoxes from '../../../components/generic/HealthLevelBoxes.jsx'
import { mockCharacter } from '../../_mocks'

describe('HealthLevelBoxes', () => {
  it('renders at all', () => {
    const component = renderer.create(
      <HealthLevelBoxes character={ mockCharacter } />
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
