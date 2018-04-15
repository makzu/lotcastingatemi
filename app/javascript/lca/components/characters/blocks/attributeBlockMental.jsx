import React from 'react'
import PropTypes from 'prop-types'

import AttributeLine from './attributeLine.jsx'

function AttributeBlockMental({ character, pools }) {
  return <div>
    <AttributeLine attribute="perception"   rating={ character.attr_perception }   character={ character } pools={ pools } />
    <AttributeLine attribute="intelligence" rating={ character.attr_intelligence } character={ character } pools={ pools } />
    <AttributeLine attribute="wits"         rating={ character.attr_wits }         character={ character } pools={ pools } />
  </div>
}

AttributeBlockMental.propTypes = {
  character: PropTypes.object.isRequired,
  pools: PropTypes.object.isRequired
}

export default AttributeBlockMental
