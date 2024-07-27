import { VisibilityOff } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import CharacterMenu from '@/components/generic/CharacterMenu'
import CardBase from '@/components/shared/CardBase'
import { type Battlegroup } from '@/types'
import { bgSoak, prettyDrillRating } from '../lib'
import { useGetBattlegroupQuery } from '../store'
import BattlegroupHealthDisplay from './BattlegroupHealthDisplay'
import BattlegroupPoolDisplay from './BattlegroupPoolDisplay'
import BgBox from './BgBox'

const BattlegroupCard = ({ id }: { id: Battlegroup['id'] }) => {
  const { data: battlegroup, error, isLoading } = useGetBattlegroupQuery(id)

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
          chronicle={false}
        />
      </Typography>

      <div className="flexContainerWrap">
        <BattlegroupHealthDisplay battlegroup={battlegroup} />

        <BattlegroupPoolDisplay
          value={prettyDrillRating(battlegroup)}
          label="Drill"
        />

        {battlegroup.might > 0 && (
          <BgBox>
            <BattlegroupPoolDisplay value={battlegroup.might} label="Might" />
          </BgBox>
        )}

        {battlegroup.perfect_morale && (
          <BgBox>
            <BattlegroupPoolDisplay value="Perfect" label="Morale" />
          </BgBox>
        )}
      </div>

      <div className="flexContainerWrap">
        <BgBox>
          <BattlegroupPoolDisplay
            value={battlegroup.join_battle}
            label="Join Battle"
          />
        </BgBox>

        <BgBox>
          <BattlegroupPoolDisplay
            label="Movement"
            value={battlegroup.movement}
          />
        </BgBox>

        <BgBox>
          <BattlegroupPoolDisplay label="Evasion" value={battlegroup.evasion} />
        </BgBox>

        <BgBox>
          <BattlegroupPoolDisplay label="Parry" value={battlegroup.parry} />
        </BgBox>

        <BgBox>
          <BattlegroupPoolDisplay label="Soak" value={bgSoak(battlegroup)} />
        </BgBox>

        {battlegroup.hardness > 0 && (
          <BgBox>
            <BattlegroupPoolDisplay
              label="Hardness"
              value={battlegroup.hardness}
            />
          </BgBox>
        )}
      </div>

      <div className="flexContainerWrap">
        <BgBox>
          <BattlegroupPoolDisplay label="Senses" value={battlegroup.senses} />
        </BgBox>

        <BgBox>
          <BattlegroupPoolDisplay label="Resolve" value={battlegroup.resolve} />
        </BgBox>

        <BgBox>
          <BattlegroupPoolDisplay label="Guile" value={battlegroup.guile} />
        </BgBox>

        <BgBox>
          <BattlegroupPoolDisplay
            label="Appearance"
            value={battlegroup.appearance}
          />
        </BgBox>
      </div>

      {battlegroup.onslaught > 0 && (
        <Typography paragraph sx={{ mt: '0.5em' }}>
          <strong>Penalties:</strong>
          &nbsp;Onslaught -{battlegroup.onslaught}
        </Typography>
      )}
    </CardBase>
  )
}

export default BattlegroupCard
