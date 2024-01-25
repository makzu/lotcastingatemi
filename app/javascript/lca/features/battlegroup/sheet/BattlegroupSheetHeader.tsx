import { Link, useLocation } from 'react-router-dom'

import { Button, Toolbar, Typography } from '@mui/material'

import CharacterMenu from '@/components/generic/CharacterMenu'
import LcaDrawerButton from '@/components/header/DrawerButton'
import { useAppSelector, useIdFromParams } from '@/hooks'
import { useGetBattlegroupQuery } from '../store'
import { GenericHeader } from '@/components/header/Header'
import { canIEditBattlegroup } from '@/ducks/entities'

function BattlegroupSheetHeader() {
  const id = useIdFromParams()
  const { data: battlegroup } = useGetBattlegroupQuery(id)
  const canIEdit = useAppSelector((state) => canIEditBattlegroup(state, id))
  const editButtonPath = useLocation().pathname + '/edit'

  if (battlegroup == undefined) {
    return <GenericHeader />
  }

  return (
    <>
      <Toolbar>
        <LcaDrawerButton />

        <Typography variant="h6" color="inherit">
          {battlegroup?.name}
        </Typography>

        {canIEdit && (
          <Button component={Link} to={editButtonPath} color="inherit">
            Edit
          </Button>
        )}

        <div className="flex" />

        <CharacterMenu id={id} characterType="battlegroup" header />
      </Toolbar>
    </>
  )
}

export default BattlegroupSheetHeader
