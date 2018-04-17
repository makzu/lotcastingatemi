// @flow
import React from 'react'
import renderer from 'react-test-renderer'

import RatingDots from '../../../components/generic/ratingDots.jsx'

test('RatingDots renders at all', () => {
  const component = renderer.create(<RatingDots rating={3} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
