// @flow
import React from 'react'
import { connect } from 'react-redux'

import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import RemoveCircle from '@material-ui/icons/RemoveCircle'

import { removeThingFromChronicle as removeThing } from 'ducks/actions.js'
import { canIEdit } from 'selectors'
import type { CharacterType } from './index.jsx'
import type { Enhancer } from 'utils/flow-types'

type ExposedProps = {
  id: number,
  characterType: CharacterType,
}
type Props = ExposedProps & {
  chronId: number,
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
  if (!canIEdit || chronId == undefined) return null

  return (
    <>
      <MenuItem button onClick={() => removeThing(chronId, id, characterType)}>
        <ListItemIcon>
          <RemoveCircle />
        </ListItemIcon>
        <ListItemText inset primary="Remove from Chronicle" />
      </MenuItem>
    </>
  )
}

const mapStateToProps = (state, props: ExposedProps) => ({
  canIEdit: canIEdit(state, props.id, props.characterType),
  chronId:
    state.entities.current[props.characterType + 's'][props.id].chronicle_id,
})

const enhance: Enhancer<Props, ExposedProps> = connect(
  mapStateToProps,
  { removeThing }
)

export default enhance(CardMenuHide)
