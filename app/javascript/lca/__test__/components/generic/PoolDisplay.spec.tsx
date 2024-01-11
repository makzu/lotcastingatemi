declare let gen: Record<string, $TSFixMe>
declare let check: $TSFixMeFunction

require('jasmine-check').install()

import React from 'react'
import renderer from 'react-test-renderer'
import PoolDisplay from '../../../components/generic/PoolDisplay'
import { SEED, genSolar } from '../../_mocks'
import { mockGetPoolsAndRatings } from '../../_mocks/selectors'
describe('PoolDisplay', () => {
  check.it(
    'renders all pools correctly for Solars',
    {
      times: 5,
      seed: SEED,
    },
    gen.object(genSolar),
    (mockCharacter) => {
      const pools = mockGetPoolsAndRatings(mockCharacter)
      const component = renderer.create(
        <div>
          {Object.keys(pools).map((p, i) => (
            <PoolDisplay label="test" pool={p} key={i} />
          ))}
        </div>,
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    },
  )
})
