import React from 'react'
import PrivacyPage from '../../../components/pages/PrivacyPage'
import renderer from 'react-test-renderer'
test('PrivacyPage renders at all', () => {
  const component = renderer.create(<PrivacyPage />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
