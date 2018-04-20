// @flow
import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { ListItemIcon, ListItemText } from 'material-ui/List'
import { MenuItem } from 'material-ui/Menu'
import RemoveCircle from '@material-ui/icons/RemoveCircle'

import { removeThingFromChronicle as removeThing } from 'ducks/actions.js'
import { canIEdit } from 'selectors'

type Props = {
  chronId: number,
  id: number,
  characterType: string,
  canIEdit: boolean,
  removeThing: Function,
}
function CardMenuHide({
  id,
  chronId,
  characterType,
  canIEdit,
  removeThing,
}: Props) {
  if (!canIEdit || chronId == undefined) return <div />

  return (
    <Fragment>
      <MenuItem button onClick={() => removeThing(chronId, id, characterType)}>
        <ListItemIcon>
          <RemoveCircle />
        </ListItemIcon>
        <ListItemText inset primary="Remove from Chronicle" />
      </MenuItem>
    </Fragment>
  )
}
const mapStateToProps = (state, props) => ({
  canIEdit: canIEdit(state, props.id, props.characterType),
  chronId:
    state.entities.current[props.characterType + 's'][props.id].chronicle_id,
})
export default connect(mapStateToProps, { removeThing })(CardMenuHide)
