import { Link, useLocation, type LinkProps } from 'react-router-dom'

import { Button, Toolbar, Typography, type ButtonProps } from '@mui/material'

import CharacterMenu from '@/components/generic/CharacterMenu'
import LcaDrawerButton from '@/components/header/DrawerButton'
import { GenericHeader } from '@/components/header/Header'
import { canIEditBattlegroup } from '@/ducks/entities'
import { useAppSelector, useIdFromParams } from '@/hooks'
import { useGetBattlegroupQuery } from '../store'

const LinkButton = (props: ButtonProps & LinkProps) => (
  <Button component={Link} color="inherit" {...props} sx={{ ml: 1 }} />
)

function BattlegroupSheetHeader() {
  const id = useIdFromParams()
  const { data: battlegroup } = useGetBattlegroupQuery(id)
  const canIEdit = useAppSelector((state) => canIEditBattlegroup(state, id))
  const nonEditPath = `/new-battlegroups/${id}`
  const editPath = `/new-battlegroups/${id}/edit`
  const isEditing = useLocation().pathname.includes('/edit')

  if (battlegroup == undefined) {
    return <GenericHeader />
  }

  return (
    <Toolbar>
      <LcaDrawerButton />

      <Typography variant="h6" color="inherit">
        {battlegroup?.name}
      </Typography>

      {canIEdit &&
        (isEditing ? (
          <LinkButton to={nonEditPath}>Done</LinkButton>
        ) : (
          <LinkButton to={editPath}>Edit</LinkButton>
        ))}

      <div className="flex" />

      <CharacterMenu id={id} characterType="battlegroup" header />
    </Toolbar>
  )
}

export default BattlegroupSheetHeader
