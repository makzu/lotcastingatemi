import { VisibilityOff } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import BattlegroupPoolDisplay from '@/components/displays/pools/BattlegroupPoolDisplay'
import CharacterMenu from '@/components/generic/CharacterMenu'
import CardBase from '@/components/shared/CardBase'
import PoolStack from '@/components/shared/PoolStack'
import { bgSoak, prettyDrillRating } from '../lib'
import { useGetBattlegroupQuery } from '../store'
import type { Battlegroup } from '../types'
import BattlegroupHealthDisplay from './BattlegroupHealthDisplay'

const BattlegroupCard = ({ id }: { id: Battlegroup['id'] }) => {
  const { data: battlegroup, error, isLoading } = useGetBattlegroupQuery(id)
  const chronicle = false

  if (error) return <div>An error has occurred: {JSON.stringify(error)}</div>
  if (!battlegroup || isLoading) return <div>Loading...</div>

  return (
    <CardBase>
      <Typography component="div" className="flexContainer">
        <Typography
          variant="h6"
          component={Link}
          to={`/battlegroups/${battlegroup.id}`}
          sx={{ textDecoration: 'none', color: 'inherit' }}
          className="flex"
        >
          {battlegroup.name}
          {battlegroup.hidden && (
            <div>
              <VisibilityOff />
              Hidden
            </div>
          )}
        </Typography>

        <CharacterMenu
          characterType="battlegroup"
          id={battlegroup.id}
          chronicle={chronicle}
        />
      </Typography>

      <PoolStack>
        <BattlegroupHealthDisplay battlegroup={battlegroup} />

        <BattlegroupPoolDisplay
          value={prettyDrillRating(battlegroup)}
          label="Drill"
        />

        {battlegroup.might > 0 && (
          <BattlegroupPoolDisplay value={battlegroup.might} label="Might" />
        )}

        {battlegroup.perfect_morale && (
          <BattlegroupPoolDisplay value="Perfect" label="Morale" />
        )}
      </PoolStack>

      <PoolStack>
        <BattlegroupPoolDisplay
          value={battlegroup.join_battle}
          label="Join Battle"
        />

        <BattlegroupPoolDisplay label="Movement" value={battlegroup.movement} />

        <BattlegroupPoolDisplay label="Evasion" value={battlegroup.evasion} />

        <BattlegroupPoolDisplay label="Parry" value={battlegroup.parry} />

        <BattlegroupPoolDisplay label="Soak" value={bgSoak(battlegroup)} />

        {battlegroup.hardness > 0 && (
          <BattlegroupPoolDisplay
            label="Hardness"
            value={battlegroup.hardness}
          />
        )}
      </PoolStack>

      <PoolStack>
        <BattlegroupPoolDisplay label="Senses" value={battlegroup.senses} />

        <BattlegroupPoolDisplay label="Resolve" value={battlegroup.resolve} />

        <BattlegroupPoolDisplay label="Guile" value={battlegroup.guile} />

        <BattlegroupPoolDisplay
          label="Appearance"
          value={battlegroup.appearance}
        />
      </PoolStack>

      {battlegroup.onslaught > 0 && (
        <Typography sx={{ mt: '0.5em' }}>
          <strong>Penalties:</strong>
          &nbsp;Onslaught -{battlegroup.onslaught}
        </Typography>
      )}
    </CardBase>
  )
}

export default BattlegroupCard
