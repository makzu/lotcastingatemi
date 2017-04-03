import React from 'react'
import RatingDots from '../utils/ratingDots.jsx'
import renderer from 'react-test-renderer'

test('RatingDots renders at all', () => {
  const component = renderer.create(
    <RatingDots rating={3} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
