import { Fragment } from 'react'

import WeaponLine from '../weapons/WeaponLine'

import type { Character, fullWeapon } from '@/utils/flow-types'
import { Divider } from '@mui/material'
interface Props {
  character: Character
  weapons: fullWeapon[]
}

function WeaponSummaryBlock({ weapons }: Props) {
  const weas = weapons.map((weapon) => (
    <Fragment key={weapon.id}>
      <WeaponLine weapon={weapon} />
      <Divider />
    </Fragment>
  ))
  return <div>{weas}</div>
}

export default WeaponSummaryBlock
