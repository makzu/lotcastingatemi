import React from 'react'
import { LcaHeader } from '../components/header.jsx'
import { shallow } from 'enzyme'

describe('<LcaHeader />', () => {
  it('renders', () => {
    // TODO: Replace this with a real redux solution
    const props = {
      authenticated: false
    }

    const component = shallow(
      <LcaHeader navDrawerOpen={true} {...props} />
    )
    expect(component.length).toEqual(1)
  })

})
