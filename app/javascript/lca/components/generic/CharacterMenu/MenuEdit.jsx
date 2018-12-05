// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import Edit from '@material-ui/icons/Edit'

import { canIEdit } from 'selectors'
import type { CharacterType } from './index.jsx'
import type { Enhancer } from 'utils/flow-types'

type ExposedProps = {
  id: number,
  characterType: CharacterType,
}
type Props = ExposedProps & {
  canIEdit: boolean,
}

const CardMenuHide = ({ id, characterType, canIEdit }: Props) =>
  canIEdit ? (
    <MenuItem button component={Link} to={`/${characterType}s/${id}/edit`}>
      <ListItemIcon>
        <Edit />
      </ListItemIcon>
      <ListItemText inset primary="Edit" />
    </MenuItem>
  ) : null

const mapStateToProps = (state, props: ExposedProps) => ({
  canIEdit: canIEdit(state, props.id, props.characterType),
})

const enhance: Enhancer<Props, ExposedProps> = connect(mapStateToProps)

export default enhance(CardMenuHide)
