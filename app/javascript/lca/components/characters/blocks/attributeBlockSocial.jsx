import React from 'react'
import PropTypes from 'prop-types'

import AttributeLine from './attributeLine.jsx'

function AttributeBlockSocial(props) {
  const { character } = props
  return <div>
    <AttributeLine attribute="Charisma"     rating={ character.attr_charisma }     />
    <AttributeLine attribute="Manipulation" rating={ character.attr_manipulation } />
    <AttributeLine attribute="Appearance"   rating={ character.attr_appearance }   />
  </div>
}

AttributeBlockSocial.propTypes = {
  character: PropTypes.object,
}

export default AttributeBlockSocial
