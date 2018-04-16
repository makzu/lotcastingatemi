// @flow
import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { ListItemIcon, ListItemText } from 'material-ui/List'
import { MenuItem } from 'material-ui/Menu'
import RemoveCircle from '@material-ui/icons/RemoveCircle'

import { removeThingFromChronicle } from '../../../ducks/actions.js'
import { canIEdit } from '../../../selectors/'

export type Props = {
  chronId: number,
  id: number,
  characterType: string,
  canIEdit: boolean,
  removeThing: Function,
}

function CardMenuHide({ id, chronId, characterType, canIEdit, removeThing }: Props) {
  if (!canIEdit || chronId == undefined)
    return <div />

  return <Fragment>
    <MenuItem button onClick={ () => removeThing(chronId, id, characterType)}>
      <ListItemIcon><RemoveCircle /></ListItemIcon>
      <ListItemText inset primary="Remove from Chronicle" />
    </MenuItem>
  </Fragment>
}
const  mapStateToProps = (state, ownProps) => ({
  canIEdit: canIEdit(state, ownProps.id, ownProps.characterType),
  chronId: state.entities.current[ownProps.characterType + 's'][ownProps.id].chronicle_id
})
const mapDispatchToProps = (dispatch) => ({
  removeThing: (chronId, id, type) => dispatch(removeThingFromChronicle(chronId, id, type)),
})
export default connect(mapStateToProps, mapDispatchToProps)(CardMenuHide)
