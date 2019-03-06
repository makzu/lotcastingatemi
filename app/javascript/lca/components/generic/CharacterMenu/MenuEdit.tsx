import * as React from 'react'
import { connect } from 'react-redux'

import { ListItemIcon, ListItemText } from '@material-ui/core'
import Edit from '@material-ui/icons/Edit'

import { State } from 'ducks'
import { canIEdit } from 'selectors'
import { MenuItemProps as Props } from './CharacterMenu'
import LinkMenuItem from './LinkMenuItem'

interface StateProps {
  canEdit: boolean
}
interface InnerProps extends StateProps, Props {}
const CardMenuEdit = ({ id, characterType, canEdit }: InnerProps) =>
  canEdit ? (
    <LinkMenuItem to={`/${characterType}s/${id}/edit`}>
      <ListItemIcon>
        <Edit />
      </ListItemIcon>
      <ListItemText inset primary="Edit" />
    </LinkMenuItem>
  ) : null

const mapStateToProps = (state: State, props: Props): StateProps => ({
  canEdit: canIEdit(state, props.id, props.characterType),
})

export default connect<StateProps, null, Props>(mapStateToProps)(CardMenuEdit)
