// @flow
declare var gen: Object
declare var check: Function

require('jasmine-check').install()

import React from 'react'
import renderer from 'react-test-renderer'

import PoolDisplay from '../../../components/generic/PoolDisplay.jsx'
import { SEED, genSolar } from '../../_mocks'
import { mockGetPoolsAndRatings } from '../../_mocks/selectors.js'

describe('PoolDisplay', () => {
  check.it(
    'renders all pools correctly for Solars',
    { times: 5, seed: SEED },
    gen.object(genSolar),
    mockCharacter => {
      const pools = mockGetPoolsAndRatings(mockCharacter)
      const component = renderer.create(
        <div>
          {Object.keys(pools).map((p, i) => (
            // $FlowFixMe
            <PoolDisplay label="test" pool={p} key={i} />
          ))}
        </div>
      )
      let tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    }
  )
})
