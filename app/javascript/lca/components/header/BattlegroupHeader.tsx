import { Link, useLocation } from 'react-router-dom'

import { Button, Toolbar, Typography } from '@mui/material'

import CharacterMenu from 'components/generic/CharacterMenu'
import {
  canIEditBattlegroup,
  getSpecificBattlegroup,
} from '@/ducks/entities/battlegroup'
import LcaDrawerButton from './DrawerButton'
import { GenericHeader } from './Header'
import { useAppSelector, useDocumentTitle, useIdFromParams } from 'hooks'

function BattlegroupHeader() {
  const id = useIdFromParams()
  const battlegroup = useAppSelector((state) =>
    getSpecificBattlegroup(state, id),
  )
  const canIEdit = useAppSelector((state) => canIEditBattlegroup(state, id))
  const path = useLocation().pathname
  useDocumentTitle(`${battlegroup?.name} | Lot-Casting Atemi`)

  if (battlegroup == null) {
    return <GenericHeader />
  }

  const editing = path.includes('/edit')

  let editButtonPath = `/battlegroups/${id}`

  if (!editing) {
    editButtonPath += '/edit'
  }

  return (
    <>
      <Toolbar>
        <LcaDrawerButton />

        <Typography variant="h6" color="inherit">
          {editing && 'Editing '}
          {battlegroup.name}
        </Typography>

        {canIEdit && (
          <Button component={Link} to={editButtonPath} color="inherit">
            {editing ? 'Done' : 'Edit'}
          </Button>
        )}

        <div style={{ flex: 1 }} />

        <CharacterMenu id={battlegroup.id} characterType="battlegroup" header />
      </Toolbar>
    </>
  )
}

export default BattlegroupHeader
