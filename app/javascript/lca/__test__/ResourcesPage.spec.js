import React from 'react'
import ResourcesPage from '../components/pages/resourcesPage.jsx'
import renderer from 'react-test-renderer'

test('ResourcesPage renders at all', () => {
  const component = renderer.create(
    <ResourcesPage />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
