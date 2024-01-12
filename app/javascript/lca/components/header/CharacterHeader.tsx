import { Link, useLocation } from 'react-router-dom'

import { Button, Toolbar, Typography } from '@mui/material'

import CharacterMenu from 'components/generic/CharacterMenu'
import LcaDrawerButton from './DrawerButton'
import { GenericHeader } from './Header'
import { canIEditCharacter, getSpecificCharacter } from 'ducks/selectors'
import { useAppSelector, useIdFromParams } from 'hooks'

function CharacterHeader() {
  const id = useIdFromParams()
  const { pathname } = useLocation()
  const character = useAppSelector((state) => getSpecificCharacter(state, id))
  const canIEdit = useAppSelector((state) => canIEditCharacter(state, id))

  if (character == null) {
    return <GenericHeader />
  }

  const editing = pathname.includes('/edit')

  let editButtonPath = `/characters/${id}`

  if (!editing) {
    editButtonPath += '/edit'
  }

  if (pathname.endsWith('merits') || pathname.endsWith('merits/')) {
    editButtonPath += '/merits'
  } else if (pathname.endsWith('charms') || pathname.endsWith('charms/')) {
    editButtonPath += '/charms'
  } else if (pathname.endsWith('bio') || pathname.endsWith('bio/')) {
    editButtonPath += '/bio'
  }

  return (
    <Toolbar>
      <LcaDrawerButton />

      <Typography variant="h6" color="inherit">
        {editing && 'Editing '}
        {character.name}
      </Typography>

      {canIEdit && (
        <Button
          component={Link}
          color="inherit"
          id="edit-character-button"
          to={editButtonPath}
        >
          {editing ? 'Done' : 'Edit'}
        </Button>
      )}

      <div style={{ flex: 1 }} />

      <CharacterMenu id={character.id} characterType="character" header />
    </Toolbar>
  )
}

export default CharacterHeader
