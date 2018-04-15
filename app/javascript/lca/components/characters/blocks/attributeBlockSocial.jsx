import React from 'react'
import PropTypes from 'prop-types'

import AttributeLine from './attributeLine.jsx'

function AttributeBlockSocial({ character, pools }) {
  return <div>
    <AttributeLine attribute="charisma"     rating={ character.attr_charisma }     character={ character } pools={ pools } />
    <AttributeLine attribute="manipulation" rating={ character.attr_manipulation } character={ character } pools={ pools } />
    <AttributeLine attribute="appearance"   rating={ character.attr_appearance }   character={ character } pools={ pools } />
  </div>
}

AttributeBlockSocial.propTypes = {
  character: PropTypes.object.isRequired,
  pools: PropTypes.object.isRequired
}

export default AttributeBlockSocial
