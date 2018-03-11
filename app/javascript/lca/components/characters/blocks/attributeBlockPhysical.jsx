import React from 'react'
import PropTypes from 'prop-types'

import AttributeLine from './attributeLine.jsx'

function AttributeBlockPhysical({ character }) {
  return <div>
    <AttributeLine attribute="strength"  rating={ character.attr_strength }  character={ character } />
    <AttributeLine attribute="dexterity" rating={ character.attr_dexterity } character={ character } />
    <AttributeLine attribute="stamina"   rating={ character.attr_stamina }   character={ character } />
  </div>
}

AttributeBlockPhysical.propTypes = {
  character: PropTypes.object,
}

export default AttributeBlockPhysical
