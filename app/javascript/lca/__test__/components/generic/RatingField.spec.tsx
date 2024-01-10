import React from 'react'
import renderer from 'react-test-renderer'
import RatingField from '../../../components/generic/RatingField'
test('RatingField renders at all', () => {
  const component = renderer.create(
    <RatingField trait="asdf" label="asdf" value={5} onChange={() => {}} />,
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
