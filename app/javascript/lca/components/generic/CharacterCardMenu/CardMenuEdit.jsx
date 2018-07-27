// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import Edit from '@material-ui/icons/Edit'

import { canIEdit } from 'selectors'

type Props = { id: number, characterType: string, canIEdit: boolean }
function CardMenuHide({ id, characterType, canIEdit }: Props) {
  if (!canIEdit) return <div />

  return (
    <MenuItem button component={Link} to={`/${characterType}s/${id}/edit`}>
      <ListItemIcon>
        <Edit />
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
