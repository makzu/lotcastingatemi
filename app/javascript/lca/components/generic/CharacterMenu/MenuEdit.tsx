import { connect } from 'react-redux'

import { ListItemIcon, ListItemText } from '@mui/material'
import Edit from '@mui/icons-material/Edit'

import { State } from 'ducks'
import { canIEdit } from 'selectors'
import { MenuItemProps as Props } from './CharacterMenuItem'
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

const mapState = (state: State, { id, characterType }: Props): StateProps => ({
  canEdit: canIEdit(state, id, characterType),
})

export default connect<StateProps, null, Props>(mapState)(CardMenuEdit)
