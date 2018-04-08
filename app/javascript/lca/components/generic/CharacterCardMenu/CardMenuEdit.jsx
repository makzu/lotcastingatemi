import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { ListItemIcon, ListItemText } from 'material-ui/List'
import { MenuItem } from 'material-ui/Menu'
import ModeEdit from '@material-ui/icons/ModeEdit'

import { canIEdit } from '../../../selectors'

function CardMenuHide({ id, characterType, canIEdit }) {
  if (!canIEdit)
    return <div />

  return <MenuItem button
    component={ Link } to={ `/${characterType}s/${id}/edit` }
  >
    <ListItemIcon><ModeEdit /></ListItemIcon>
    <ListItemText inset primary="Edit" />
  </MenuItem>
}
CardMenuHide.propTypes = {
  id: PropTypes.number.isRequired,
  characterType: PropTypes.string.isRequired,
  canIEdit: PropTypes.bool,
}
function mapStateToProps(state, ownProps) {
  return {
    canIEdit: canIEdit(state, ownProps.id, ownProps.characterType),
  }
}
export default connect(mapStateToProps)(CardMenuHide)
