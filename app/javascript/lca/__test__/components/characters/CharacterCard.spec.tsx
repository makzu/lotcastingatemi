declare let gen: Record<string, $TSFixMe>
declare let check: $TSFixMeFunction

require('jasmine-check').install()

import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
const renderer = new ShallowRenderer()
import { CharacterCard } from 'components/characters/CharacterCard.jsx'
import { SEED, genMortal, genSolar } from '../../_mocks'
import {
  mockGetPoolsAndRatings,
  mockGetPenalties,
} from '../../_mocks/selectors'
describe('CharacterCard', () => {
  check.it(
    'works for mortals',
    {
      times: 5,
      seed: SEED,
    },
    gen.object(genMortal),
    (mockCharacter) => {
      const component = renderer.render(
        <CharacterCard
          character={mockCharacter}
          pools={mockGetPoolsAndRatings(mockCharacter)}
          penalties={mockGetPenalties(mockCharacter)}
          classes={{}}
          canDelete
        />,
      )
      expect(component).toMatchSnapshot()
    },
  )
  check.it(
    'works for Solars',
    {
      times: 5,
      seed: SEED,
    },
    gen.object(genSolar),
    (mockCharacter) => {
      const component = renderer.render(
        <CharacterCard
          character={mockCharacter}
          pools={mockGetPoolsAndRatings(mockCharacter)}
          penalties={mockGetPenalties(mockCharacter)}
          classes={{}}
          canDelete
        />,
      )
      expect(component).toMatchSnapshot()
    },
  )
})
