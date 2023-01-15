// @flow
import WelcomePage from '../../../components/pages/WelcomePage.tsx'
import renderer from 'react-test-renderer'

test('WelcomePage renders at all', () => {
  const component = renderer.create(<WelcomePage />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
