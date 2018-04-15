import React from 'react'
import PropTypes from 'prop-types'

import AttributeLine from './attributeLine.jsx'

function AttributeBlockPhysical({ character, pools }) {
  return <div>
    <AttributeLine attribute="strength"  rating={ character.attr_strength }  character={ character } pools={ pools } />
    <AttributeLine attribute="dexterity" rating={ character.attr_dexterity } character={ character } pools={ pools } />
    <AttributeLine attribute="stamina"   rating={ character.attr_stamina }   character={ character } pools={ pools } />
  </div>
}

AttributeBlockPhysical.propTypes = {
  character: PropTypes.object.isRequired,
  pools: PropTypes.object.isRequired
}

export default AttributeBlockPhysical
