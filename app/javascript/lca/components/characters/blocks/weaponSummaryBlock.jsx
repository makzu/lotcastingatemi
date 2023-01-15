// @flow
import { Fragment } from 'react'

import Divider from '@mui/material/Divider'

import WeaponLine from '../weapons/WeaponLine.jsx'
import type { Character, fullWeapon } from 'utils/flow-types'

type Props = { character: Character, weapons: Array<fullWeapon> }
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
