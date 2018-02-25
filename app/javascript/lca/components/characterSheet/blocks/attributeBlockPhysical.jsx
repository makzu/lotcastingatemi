import React from 'react'
import PropTypes from 'prop-types'

import AttributeLine from './attributeLine.jsx'

function AttributeBlockPhysical(props) {
  const { character } = props
  return <div>
    <AttributeLine attribute="Strength"  rating={ character.attr_strength }  />
    <AttributeLine attribute="Dexterity" rating={ character.attr_dexterity } />
    <AttributeLine attribute="Stamina"   rating={ character.attr_stamina }   />
  </div>
}

AttributeBlockPhysical.propTypes = {
  character: PropTypes.object,
}

export default AttributeBlockPhysical
