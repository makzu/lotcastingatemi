// @flow
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import { GenericHeader } from './header.jsx'
import LcaDrawerButton from './lcaDrawerButton.jsx'
import CharacterMenu from 'components/generic/CharacterMenu'
import { getSpecificCharacter, canIEditCharacter } from 'selectors'
import type { Character } from 'utils/flow-types'

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
  tabs: {
    flex: 1,
  },
  title: {},
})

function CharmTab({
  character,
  isEditing,
}: {
  character: Character,
  isEditing: boolean,
}) {
  let tabLabel = 'Charms'
  let disabled = false

  const tabPath = isEditing
    ? `/characters/${character.id}/edit/charms`
    : `/characters/${character.id}/charms`

  if (character.type == 'Character' && character.is_sorcerer) {
    tabLabel = 'Spells'
  } else if (character.type == 'Character') {
    disabled = true
  } else if (character.is_sorcerer) {
    tabLabel = 'Charms/Spells'
  }

  return (
    <Tab label={tabLabel} disabled={disabled} component={Link} to={tabPath} />
  )
}

type Props = {
  id: number,
  character: Character,
  path: string,
  canIEdit: boolean,
  classes: Object,
}
function CharacterHeader(props: Props) {
  if (props.character == null) return <GenericHeader />

  const { id, character, path, canIEdit, classes } = props
  const editing = path.includes('/edit')

  let tabValue = 0

  let editButtonPath = `/characters/${id}`
  let tabBasePath = `/characters/${id}`

  if (editing) {
    tabBasePath += '/edit'
  } else {
    editButtonPath += '/edit'
  }

  if (path.endsWith('merits') || path.endsWith('merits/')) {
    tabValue = 1
    editButtonPath += '/merits'
  } else if (path.endsWith('charms') || path.endsWith('charms/')) {
    tabValue = 2
    editButtonPath += '/charms'
  } else if (path.endsWith('bio') || path.endsWith('bio/')) {
    tabValue = 3
    editButtonPath += '/bio'
  }
  const tabs = (
    <Tabs className={classes.tabs} value={tabValue} centered>
      <Tab label="Basics" component={Link} to={tabBasePath} />
      <Tab label="Merits" component={Link} to={tabBasePath + '/merits'} />
      <CharmTab character={character} isEditing={editing} />
      <Tab label="Bio" component={Link} to={tabBasePath + '/bio'} />
    </Tabs>
  )

  return (
    <Fragment>
      <Toolbar>
        <LcaDrawerButton />

        <Typography variant="h6" color="inherit" className={classes.title}>
          {editing && 'Editing '}
          {character.name}
        </Typography>

        {canIEdit && (
          <Button
            component={Link}
            to={editButtonPath}
            color="inherit"
            id="edit-character-button"
          >
            {editing ? 'Done' : 'Edit'}
          </Button>
        )}
        <Hidden xsDown>{tabs}</Hidden>
        <Hidden smUp>
          <div className={classes.tabs} />
        </Hidden>
        <CharacterMenu id={character.id} characterType="character" header />
      </Toolbar>

      <Hidden smUp>{tabs}</Hidden>
    </Fragment>
  )
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.characterId

  return {
    id,
    character: getSpecificCharacter(state, id),
    path: ownProps.location.pathname,
    canIEdit: canIEditCharacter(state, id),
  }
}

export default withStyles(styles)(connect(mapStateToProps)(CharacterHeader))
