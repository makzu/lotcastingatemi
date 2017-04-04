import React from 'react'
import WelcomePage from '../components/welcomePage/index.jsx'
import renderer from 'react-test-renderer'

test('WelcomePage renders at all', () => {
  const component = renderer.create(
    <WelcomePage />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
