// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { ListItemIcon, ListItemText } from 'material-ui/List'
import { MenuItem } from 'material-ui/Menu'
import ModeEdit from '@material-ui/icons/ModeEdit'

import { canIEdit } from 'selectors'

type Props = { id: number, characterType: string, canIEdit: boolean }
function CardMenuHide({ id, characterType, canIEdit }: Props) {
  if (!canIEdit) return <div />

  return (
    <MenuItem button component={Link} to={`/${characterType}s/${id}/edit`}>
      <ListItemIcon>
        <ModeEdit />
      </ListItemIcon>
      <ListItemText inset primary="Edit" />
    </MenuItem>
  )
}
function mapStateToProps(state, ownProps) {
  return {
    canIEdit: canIEdit(state, ownProps.id, ownProps.characterType),
  }
}
export default connect(mapStateToProps)(CardMenuHide)
