import { Fragment } from 'react'
import Divider from '@material-ui/core/Divider'

import type { Character, Weapon } from '@lca/types/index.ts'
import WeaponLine from '../weapons/WeaponLine.tsx'

type Props = { character: Character; weapons: Weapon[] }
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
