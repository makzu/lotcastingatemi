import React from 'react'
import PropTypes from 'prop-types'

import AttributeLine from './attributeLine.jsx'

function AttributeBlockSocial(props) {
  const { character } = props
  return <div>
    <AttributeLine attribute="charisma"     rating={ character.attr_charisma }     character={ character } />
    <AttributeLine attribute="manipulation" rating={ character.attr_manipulation } character={ character } />
    <AttributeLine attribute="appearance"   rating={ character.attr_appearance }   character={ character } />
  </div>
}

AttributeBlockSocial.propTypes = {
  character: PropTypes.object,
}

export default AttributeBlockSocial
