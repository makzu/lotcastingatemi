import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { ListItemText } from 'material-ui/List'
import { MenuItem } from 'material-ui/Menu'

function CardMenuLinks(props) {

  return <React.Fragment>
    <MenuItem button component={ Link } to={ '/'+props.characterType+'/'+props.id }>
      <ListItemText primary="Full Sheet" />
    </MenuItem>
  </React.Fragment>
}
CardMenuLinks.propTypes = {
  id: PropTypes.number.isRequired,
  characterType: PropTypes.string.isRequired,
}

export default CardMenuLinks
