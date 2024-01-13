import { Box } from '@mui/material'

import { WithSharedStats } from 'types/shared'
import * as calc from 'utils/calculated'

import AggravatedIcon from '@/icons/health-level-agg.svg?react'
import BashingIcon from '@/icons/health-level-bashing.svg?react'
import EmptyIcon from '@/icons/health-level-empty.svg?react'
import LethalIcon from '@/icons/health-level-lethal.svg?react'
import { damageType } from '@/types'
import { ReactNode } from 'react'

const HLBox = ({
  type,
  level,
}: {
  type: damageType | 'empty'
  level: '0' | '-1' | '-2' | '-4' | 'in' | 'X'
}) => (
  <>
    <Box sx={{ width: '1.25em', height: '1.25em', typography: 'body' }}>
      {
        {
          bashing: <BashingIcon />,
          lethal: <LethalIcon />,
          aggravated: <AggravatedIcon />,
          empty: <EmptyIcon />,
        }[type]
      }
      <Box sx={{ textAlign: 'center', typography: 'caption' }}>{level}</Box>
    </Box>
  </>
)

interface Props {
  character: WithSharedStats
}

function HealthLevelBoxes({ character }: Props) {
  const totalHealthLevels = calc.totalHealthLevels(character)
  const hlBoxes = []
  let box: ReactNode
  let level: '0' | '-1' | '-2' | '-4' | 'in' | 'X'
  let aggDamage = character.damage_aggravated
  let lthDamage = character.damage_lethal
  let bshDamage = character.damage_bashing
  let lv0s = character.health_level_0s
  let lv1s = character.health_level_1s
  let lv2s = character.health_level_2s
  let lv4s = character.health_level_4s
  let lvis = character.health_level_incap

  for (let i = 0; i < totalHealthLevels; i++) {
    if (lv0s > 0) {
      level = '0'
      lv0s--
    } else if (lv1s > 0) {
      level = '-1'
      lv1s--
    } else if (lv2s > 0) {
      level = '-2'
      lv2s--
    } else if (lv4s > 0) {
      level = '-4'
      lv4s--
    } else if (lvis > 0) {
      level = 'in'
      lvis--
    } else {
      level = 'X'
    }

    if (aggDamage > 0) {
      box = HLBox({ type: 'aggravated', level })
      aggDamage--
    } else if (lthDamage > 0) {
      box = HLBox({ type: 'lethal', level })
      lthDamage--
    } else if (bshDamage > 0) {
      box = HLBox({ type: 'bashing', level })
      bshDamage--
    } else {
      box = HLBox({ type: 'empty', level })
    }

    hlBoxes.push(
      <Box
        sx={{
          display: 'inline-block',
          textAlign: 'center',
          marginRight: '0.25em',
        }}
        key={i}
      >
        {box}
      </Box>,
    )
  }

  return <div>{hlBoxes}</div>
}

export default HealthLevelBoxes
