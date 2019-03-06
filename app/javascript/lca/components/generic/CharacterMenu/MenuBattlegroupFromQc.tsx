import * as React from 'react'
import { connect } from 'react-redux'

import { ListItemText, MenuItem } from '@material-ui/core/'

import { State } from 'ducks'
import { createBattlegroupFromQc } from 'ducks/actions.js'
import { MenuItemProps as Props } from './CharacterMenu'

interface StateProps {
  canCreate: boolean
}

interface DispatchProps {
  action(id: number): void
}

interface InnerProps extends StateProps, DispatchProps, Props {}

const BattlegroupFromQc = ({ canCreate, action, id }: InnerProps) =>
  canCreate ? (
    <MenuItem button onClick={() => action(id)}>
      <ListItemText primary="Create Battlegroup of QC" />
    </MenuItem>
  ) : null

const mapStateToProps = (state: State, props: Props): StateProps => ({
  canCreate: state.session.authenticated && props.characterType === 'qc',
})

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  {
    action: createBattlegroupFromQc,
  }
)(BattlegroupFromQc)
