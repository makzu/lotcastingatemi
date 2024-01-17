import { Toolbar, Typography } from '@mui/material'

import CharacterMenu from '@/components/generic/CharacterMenu'
import LcaDrawerButton from '@/components/header/DrawerButton'
import { useIdFromParams } from '@/hooks'
import { useBattlegroupTrait } from '../hooks'

function BattlegroupSheetHeader() {
  const id = useIdFromParams()
  const bgName = useBattlegroupTrait(id, 'name')

  return (
    <>
      <Toolbar>
        <LcaDrawerButton />

        <Typography variant="h6" color="inherit">
          {bgName}
        </Typography>

        <div className="flex" />

        <CharacterMenu id={id} characterType="battlegroup" header />
      </Toolbar>
    </>
  )
}

export default BattlegroupSheetHeader
