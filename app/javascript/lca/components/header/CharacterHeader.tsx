import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { compose } from 'recompose'

import { Toolbar, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import CharacterMenu from 'components/generic/CharacterMenu'
import { canIEditCharacter, getSpecificCharacter } from 'selectors'
import { ICharacter } from 'types'
import LcaDrawerButton from './DrawerButton'
import { GenericHeader } from './Header'
import { styles } from './HeaderStyles'
import LinkButton from './LinkButton'

interface Props {
  id: number
  character: ICharacter
  path: string
  canIEdit: boolean
  classes: any
}
function CharacterHeader(props: Props) {
  if (props.character == null) {
    return <GenericHeader />
  }

  const { id, character, path, canIEdit, classes } = props
  const editing = path.includes('/edit')

  let editButtonPath = `/characters/${id}`

  if (!editing) {
    editButtonPath += '/edit'
  }

  if (path.endsWith('merits') || path.endsWith('merits/')) {
    editButtonPath += '/merits'
  } else if (path.endsWith('charms') || path.endsWith('charms/')) {
    editButtonPath += '/charms'
  } else if (path.endsWith('bio') || path.endsWith('bio/')) {
    editButtonPath += '/bio'
  }

  return (
    <Toolbar>
      <LcaDrawerButton />

      <Typography variant="h6" color="inherit" className={classes.title}>
        {editing && 'Editing '}
        {character.name}
      </Typography>

      {canIEdit && (
        <LinkButton
          color="inherit"
          id="edit-character-button"
          to={editButtonPath}
        >
          {editing ? 'Done' : 'Edit'}
        </LinkButton>
      )}

      <div className={classes.tabs} />

      <CharacterMenu id={character.id} characterType="character" header />
    </Toolbar>
  )
}

function mapStateToProps(state, ownProps: RouteComponentProps<any>) {
  const id = ownProps.match.params.characterId

  return {
    canIEdit: canIEditCharacter(state, id),
    character: getSpecificCharacter(state, id),
    id,
    path: ownProps.location.pathname,
  }
}

export default compose<Props, RouteComponentProps<any>>(
  withStyles(styles),
  connect(mapStateToProps)
)(CharacterHeader)
