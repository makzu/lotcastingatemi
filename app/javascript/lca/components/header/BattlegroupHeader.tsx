import * as React from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { compose } from 'recompose'

import { Toolbar, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import CharacterMenu from 'components/generic/CharacterMenu'
import { canIEditBattlegroup, getSpecificBattlegroup } from 'selectors'
import { IBattlegroup } from 'types'
import LcaDrawerButton from './DrawerButton'
import { GenericHeader } from './Header'
import { styles } from './HeaderStyles'
import LinkButton from './LinkButton'

interface Props {
  id: number
  battlegroup: IBattlegroup
  path: string
  canIEdit: boolean
  classes: any
}
function BattlegroupHeader(props: Props) {
  if (props.battlegroup == null) {
    return <GenericHeader />
  }

  const { id, battlegroup, path, canIEdit, classes } = props
  const editing = path.includes('/edit')

  let editButtonPath = `/battlegroups/${id}`

  if (!editing) {
    editButtonPath += '/edit'
  }

  return (
    <>
      <DocumentTitle title={`${battlegroup.name} | Lot-Casting Atemi`} />

      <Toolbar>
        <LcaDrawerButton />

        <Typography variant="h6" color="inherit" className={classes.title}>
          {editing && 'Editing '}
          {battlegroup.name}
        </Typography>

        {canIEdit && (
          <LinkButton to={editButtonPath} color="inherit">
            {editing ? 'Done' : 'Edit'}
          </LinkButton>
        )}
        <div className={classes.tabs} />
        <CharacterMenu id={battlegroup.id} characterType="battlegroup" header />
      </Toolbar>
    </>
  )
}

function mapStateToProps(state, ownProps: RouteComponentProps<any>) {
  const id = ownProps.match.params.battlegroupId
  const battlegroup = getSpecificBattlegroup(state, id)
  const path = ownProps.location.pathname

  const canIEdit = canIEditBattlegroup(state, id)

  return {
    battlegroup,
    canIEdit,
    id,
    path,
  }
}

export default compose<Props, RouteComponentProps<any>>(
  withStyles(styles),
  connect(mapStateToProps)
)(BattlegroupHeader)
