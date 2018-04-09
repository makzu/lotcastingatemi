// @flow
declare var gen: Object
declare var check: Function

require('jasmine-check').install()

import React from 'react'
import renderer from 'react-test-renderer'

import HealthLevelBoxes from '../../../components/generic/HealthLevelBoxes.jsx'
import { SEED, genHealthLevels } from '../../_mocks'

describe('HealthLevelBoxes', () => {
  check.it('renders correctly', { times: 5, seed: SEED },
    gen.object(genHealthLevels), (mockCharacter) => {
      const component = renderer.create(
        <HealthLevelBoxes character={ mockCharacter } />
      )
      let tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
})
