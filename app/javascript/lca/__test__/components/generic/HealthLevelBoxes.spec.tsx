declare let gen: Record<string, $TSFixMe>
declare let check: $TSFixMeFunction

require('jasmine-check').install()

import renderer from 'react-test-renderer'
import HealthLevelBoxes from '../../../components/generic/HealthLevelBoxes'
import { SEED, genHealthLevels } from '../../_mocks'
describe('HealthLevelBoxes', () => {
  check.it(
    'renders correctly',
    {
      times: 5,
      seed: SEED,
    },
    gen.object(genHealthLevels),
    (mockCharacter) => {
      const component = renderer.create(
        <HealthLevelBoxes character={mockCharacter} />,
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    },
  )
})
