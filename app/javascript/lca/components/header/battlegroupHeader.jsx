// @flow
import React from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import { GenericHeader } from './header.jsx'
import LcaDrawerButton from './lcaDrawerButton.jsx'
import CharacterMenu from 'components/generic/CharacterMenu'
import { getSpecificBattlegroup, canIEditBattlegroup } from 'selectors'
import type { Battlegroup } from 'utils/flow-types'

//eslint-disable-next-line no-unused-vars
const styles = theme => ({
  tabs: {
    flex: 1,
  },
  title: {},
})

type Props = {
  id: number,
  battlegroup: Battlegroup,
  path: string,
  canIEdit: boolean,
  classes: Object,
}
function BattlegroupHeader(props: Props) {
  if (props.battlegroup == undefined) return <GenericHeader />

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

        <Typography variant="title" color="inherit" className={classes.title}>
          {editing && 'Editing '}
          {battlegroup.name}
        </Typography>

        {canIEdit && (
          <Button component={Link} to={editButtonPath} color="inherit">
            {editing ? 'Done' : 'Edit'}
          </Button>
        )}
        <div className={classes.tabs} />
        <CharacterMenu id={battlegroup.id} characterType="battlegroup" header />
      </Toolbar>
    </>
  )
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.battlegroupId
  const battlegroup = getSpecificBattlegroup(state, id)
  const path = ownProps.location.pathname

  let canIEdit = canIEditBattlegroup(state, id)

  return {
    id,
    battlegroup,
    path,
    canIEdit,
  }
}

export default withStyles(styles)(connect(mapStateToProps)(BattlegroupHeader))
