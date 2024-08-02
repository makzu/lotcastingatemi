import { VisibilityOff } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import CharacterMenu from '@/components/generic/CharacterMenu'
import PlayerNameSubtitle from '@/components/generic/PlayerNameSubtitle'
import CardBase from '@/components/shared/CardBase'
import {
  BattlegroupPoolDisplay,
  BgBox,
} from '@/features/battlegroup/components'
import { useGetQcQuery } from '../store/qc'
import { type QC } from '../types'
import QcPoolDisplay from './QcPoolDisplay'
import ResourceDisplay from '@/components/displays/ResourceDisplay'
import HealthLevelBoxes from '@/components/generic/HealthLevelBoxes'
import { qcHasPainTolerance, qcWoundPenalty } from '../utils'

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

      {/* <SpendableBlock qc character={qc} /> */}
      <div className="flexContainerWrap">
        {qc.motes_personal_total > 0 && (
          <BgBox>
            <ResourceDisplay
              label="Personal"
              current={qc.motes_personal_current}
              total={qc.motes_personal_total}
            />
          </BgBox>
        )}
        {qc.motes_peripheral_total > 0 && (
          <BgBox>
            <ResourceDisplay
              label="Peripheral"
              current={qc.motes_peripheral_current}
              total={qc.motes_peripheral_total}
            />
          </BgBox>
        )}
        {qc.is_sorcerer && (
          <BgBox>
            <ResourceDisplay label="Sorcerous" current={qc.sorcerous_motes} />
          </BgBox>
        )}
        {qc.is_necromancer && (
          <BgBox>
            <ResourceDisplay
              label="Necromantic"
              current={qc.necromantic_motes}
            />
          </BgBox>
        )}
        <BgBox>
          <ResourceDisplay
            label="Willpower"
            current={qc.willpower_temporary}
            total={qc.willpower_permanent}
          />
        </BgBox>
      </div>

      <HealthLevelBoxes character={qc} painTolerance={qcHasPainTolerance(qc)} />

      <div className="flexContainerWrap">
        <BgBox>
          <QcPoolDisplay qc={qc} value={qc.join_battle} label="Join Battle" />
        </BgBox>
        <BgBox>
          <QcPoolDisplay defense qc={qc} value={qc.evasion} label="Evasion" />
        </BgBox>
        <BgBox>
          <QcPoolDisplay defense qc={qc} value={qc.parry} label="Parry" />
        </BgBox>
        <BgBox>
          <BattlegroupPoolDisplay value={qc.soak} label="Soak" />
        </BgBox>
        {qc.hardness > 0 && (
          <BgBox>
            <BattlegroupPoolDisplay value={qc.hardness} label="Hardness" />
          </BgBox>
        )}
      </div>

      <div className="flexContainerWrap">
        <BgBox>
          <QcPoolDisplay qc={qc} value={qc.senses} label="Senses" />
        </BgBox>
        <BgBox>
          <QcPoolDisplay qc={qc} value={qc.resolve} label="Resolve" />
        </BgBox>
        <BgBox>
          <QcPoolDisplay qc={qc} value={qc.guile} label="Guile" />
        </BgBox>
        <BgBox>
          <BattlegroupPoolDisplay value={qc.appearance} label="Appearance" />
        </BgBox>
      </div>

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
