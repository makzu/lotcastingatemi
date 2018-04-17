// @flow
import React from 'react'
import PrivacyPage from '../../../components/pages/PrivacyPage.jsx'
import renderer from 'react-test-renderer'

test('PrivacyPage renders at all', () => {
  const component = renderer.create(<PrivacyPage />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
