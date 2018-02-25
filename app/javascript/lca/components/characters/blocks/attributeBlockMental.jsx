import React from 'react'
import PropTypes from 'prop-types'

import AttributeLine from './attributeLine.jsx'

function AttributeBlockMental(props) {
  const { character } = props
  return <div>
    <AttributeLine attribute="Perception"   rating={ character.attr_perception }   />
    <AttributeLine attribute="Intelligence" rating={ character.attr_intelligence } />
    <AttributeLine attribute="Wits"         rating={ character.attr_wits }         />
  </div>
}

AttributeBlockMental.propTypes = {
  character: PropTypes.object,
}

export default AttributeBlockMental
