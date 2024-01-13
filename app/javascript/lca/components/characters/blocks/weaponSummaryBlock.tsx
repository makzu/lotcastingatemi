import { Fragment } from 'react'

import Divider from '@mui/material/Divider'

import WeaponLine from '../weapons/WeaponLine'
import type { Character, fullWeapon } from 'utils/flow-types'
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
