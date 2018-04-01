import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { ListItemText } from 'material-ui/List'
import { MenuItem } from 'material-ui/Menu'

function CardMenuLinks(props) {

  return <Fragment>
    <MenuItem button component={ Link } to={ '/'+props.characterType+'s/'+props.id }>
      <ListItemText primary="Full Sheet" />
    </MenuItem>
  </Fragment>
}
CardMenuLinks.propTypes = {
  id: PropTypes.number.isRequired,
  characterType: PropTypes.string.isRequired,
}

export default CardMenuLinks
