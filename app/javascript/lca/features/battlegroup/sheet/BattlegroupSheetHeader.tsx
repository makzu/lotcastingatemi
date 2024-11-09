import { Toolbar, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'

import CharacterMenu from '@/components/generic/CharacterMenu'
import LcaDrawerButton from '@/components/header/DrawerButton'
import { GenericHeader } from '@/components/header/Header'
import { LinkButton } from '@/components/shared/wrappers'
import { useIdFromParams } from '@/hooks'
import { useGetBattlegroupQuery } from '../store'

function BattlegroupSheetHeader() {
  const id = useIdFromParams()
  const { data: battlegroup } = useGetBattlegroupQuery(id)

  const editing = useLocation().pathname.includes('/edit')
  let editButtonPath = `/battlegroups/${id}`

  if (!editing) {
    editButtonPath += '/edit'
  }

  if (battlegroup === undefined) {
    return <GenericHeader />
  }

  return (
    <Toolbar>
      <LcaDrawerButton />

      <Typography variant="h6" sx={{ color: 'inherit' }}>
        {editing && 'Editing '}
        {battlegroup.name}
      </Typography>

      {battlegroup.editable && (
        <LinkButton to={editButtonPath}>{editing ? 'Done' : 'Edit'}</LinkButton>
      )}

      <div className="flex" />

      <CharacterMenu header id={id} characterType="battlegroup" />
    </Toolbar>
  )
}

export default BattlegroupSheetHeader
