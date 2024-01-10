import React from 'react'
import renderer from 'react-test-renderer'
import RatingDots from '../../../components/generic/ratingDots'
test('RatingDots renders at all', () => {
  const component = renderer.create(<RatingDots rating={3} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
