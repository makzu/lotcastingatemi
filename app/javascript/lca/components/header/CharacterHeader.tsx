import { connect } from 'react-redux'
import { Toolbar, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'recompose'

import CharacterMenu from '@lca/components/generic/CharacterMenu/index.ts'
import type { State } from '@lca/ducks/index.ts'
import {
  canIEditCharacter,
  getSpecificCharacter,
} from '@lca/ducks/selectors/index.ts'
import type { Character } from '@lca/types/index.ts'
import type { RouteWithIdProps as RouteProps } from '@lca/types/util.ts'
import LcaDrawerButton from './DrawerButton.tsx'
import { GenericHeader } from './Header.tsx'
import { styles } from './HeaderStyles.ts'
import LinkButton from './LinkButton.tsx'

interface Props {
  id: number
  character: Character
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

function mapStateToProps(state: State, { location, match }: RouteProps) {
  const id = parseInt(match.params.id, 10)

  return {
    canIEdit: canIEditCharacter(state, id),
    character: getSpecificCharacter(state, id),
    id,
    path: location.pathname,
  }
}

export default compose<Props, RouteProps>(
  withStyles(styles),
  connect(mapStateToProps),
)(CharacterHeader)
