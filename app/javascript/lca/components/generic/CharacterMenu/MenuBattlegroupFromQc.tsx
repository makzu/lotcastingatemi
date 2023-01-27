import { connect } from 'react-redux'

import { GroupAdd } from '@mui/icons-material'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material/'

import { State } from 'ducks'
import { createBattlegroupFromQc } from 'ducks/actions.js'
import { MenuItemProps as Props } from './CharacterMenuItem'

interface StateProps {
  canCreate: boolean
}

interface DispatchProps {
  action: typeof createBattlegroupFromQc
}

interface InnerProps extends StateProps, DispatchProps, Props {}

const BattlegroupFromQc = ({ canCreate, action, id }: InnerProps) =>
  canCreate ? (
    <MenuItem onClick={() => action(id)}>
      <ListItemIcon>
        <GroupAdd />
      </ListItemIcon>
      <ListItemText primary="Create Battlegroup of QC" />
    </MenuItem>
  ) : null

const mapStateToProps = (state: State, props: Props): StateProps => ({
  canCreate: state.session.authenticated && props.characterType === 'qc',
})

export default connect<StateProps, DispatchProps, Props>(mapStateToProps, {
  action: createBattlegroupFromQc,
})(BattlegroupFromQc)
