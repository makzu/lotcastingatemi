// @flow
import React from 'react'
import renderer from 'react-test-renderer'

import RatingField from '../../../components/generic/RatingField.jsx'

test('RatingField renders at all', () => {
  const component = renderer.create(
    <RatingField trait="asdf" label="asdf" value={5} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
