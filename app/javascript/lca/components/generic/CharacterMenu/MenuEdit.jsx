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
const CardMenuHide = ({ id, characterType, canIEdit }: Props) =>
  canIEdit ? (
    <MenuItem button component={Link} to={`/${characterType}s/${id}/edit`}>
      <ListItemIcon>
        <Edit />
      </ListItemIcon>
      <ListItemText inset primary="Edit" />
    </MenuItem>
  ) : null

const mapStateToProps = (state, props) => ({
  canIEdit: canIEdit(state, props.id, props.characterType),
})

export default connect(mapStateToProps)(CardMenuHide)
