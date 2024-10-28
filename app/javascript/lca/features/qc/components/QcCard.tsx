import { VisibilityOff } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import CharacterMenu from '@/components/generic/CharacterMenu'
import HealthLevelBoxes from '@/components/generic/HealthLevelBoxes'
import PlayerNameSubtitle from '@/components/generic/PlayerNameSubtitle'
import CardBase from '@/components/shared/CardBase'
import PoolStack from '@/components/shared/PoolStack'
import { BattlegroupPoolDisplay } from '@/features/battlegroup/components'
import { useGetQcQuery } from '../store/qc'
import { type QC } from '../types'
import { qcHasPainTolerance, qcWoundPenalty } from '../utils'
import QcPoolDisplay from './QcPoolDisplay'
import QcSpendableBlock from './QcSpendableBlock'

function QcCard({ id }: { id: QC['id'] }) {
  const { data: qc, error, isLoading } = useGetQcQuery(id)
  const chronicle = false

  if (error) return <div>An error has occurred: {JSON.stringify(error)}</div>
  if (!qc || isLoading) return <div>Loading...</div>

  const woundPenalty = qcWoundPenalty(qc)

  return (
    <CardBase>
      <Typography component="div" className="flexContainer">
        <Typography
          variant="h6"
          component={Link}
          to={`/qcs/${qc.id}`}
          className="flex"
          sx={{ textDecoration: 'none', color: 'inherit' }}
        >
          {qc.name}
          {qc.hidden && (
            <div>
              <VisibilityOff />
              Hidden
            </div>
          )}
        </Typography>

        {chronicle && <PlayerNameSubtitle playerId={qc.player_id} />}

        <CharacterMenu characterType="qc" id={qc.id} chronicle={chronicle} />
      </Typography>

      {qc.description && (
        <Typography paragraph variant="caption" component="div">
          {qc.description.substring(0, 160)}
        </Typography>
      )}

      <QcSpendableBlock qc={qc} />

      <HealthLevelBoxes character={qc} painTolerance={qcHasPainTolerance(qc)} />

      <PoolStack>
        <QcPoolDisplay qc={qc} value={qc.join_battle} label="Join Battle" />
        <QcPoolDisplay defense qc={qc} value={qc.evasion} label="Evasion" />
        <QcPoolDisplay defense qc={qc} value={qc.parry} label="Parry" />
        <BattlegroupPoolDisplay value={qc.soak} label="Soak" />
        {qc.hardness > 0 && (
          <BattlegroupPoolDisplay value={qc.hardness} label="Hardness" />
        )}
      </PoolStack>

      <PoolStack>
        <QcPoolDisplay qc={qc} value={qc.senses} label="Senses" />
        <QcPoolDisplay qc={qc} value={qc.resolve} label="Resolve" />
        <QcPoolDisplay qc={qc} value={qc.guile} label="Guile" />
        <BattlegroupPoolDisplay value={qc.appearance} label="Appearance" />
      </PoolStack>

      {(qc.onslaught > 0 || woundPenalty > 0) && (
        <Typography sx={{ mt: 1 }}>
          <strong>Penalties: </strong>

          {qc.onslaught > 0 && <span>Onslaught -{qc.onslaught} </span>}
          {woundPenalty > 0 && <span>Wound -{woundPenalty}</span>}
        </Typography>
      )}
    </CardBase>
  )
}

export default QcCard
