import React from 'react'
import { LcaHeader } from '../components/header.jsx'
import { shallow } from 'enzyme'

describe('<LcaHeader />', () => {
  it('renders', () => {
    const component = shallow(
      <LcaHeader navDrawerOpen={true} />
    )
    expect(component.length).toEqual(1)
  })

})
