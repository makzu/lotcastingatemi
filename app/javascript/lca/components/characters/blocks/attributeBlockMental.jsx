import React from 'react'
import PropTypes from 'prop-types'

import AttributeLine from './attributeLine.jsx'

function AttributeBlockMental({ character }) {
  return <div>
    <AttributeLine attribute="perception"   rating={ character.attr_perception }   character={ character } />
    <AttributeLine attribute="intelligence" rating={ character.attr_intelligence } character={ character } />
    <AttributeLine attribute="wits"         rating={ character.attr_wits }         character={ character } />
  </div>
}

AttributeBlockMental.propTypes = {
  character: PropTypes.object,
}

export default AttributeBlockMental
