import FlipMove from 'react-flip-move'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'

import ProtectedComponent from '@lca/containers/ProtectedComponent.tsx'
import { endCombat, nextRound } from '@lca/ducks/events/index.ts'
import useAppDispatch from '@lca/hooks/UseAppDispatch.ts'
import useAppSelector from '@lca/hooks/UseAppSelector.ts'
import useIdFromParams from '@lca/hooks/UseIdFromParams.ts'
import {
  amIStOfChronicle,
  getBattlegroupsForChronicle,
  getCharactersForChronicle,
  getQcsForChronicle,
  getSpecificChronicle,
} from '@lca/selectors/index.ts'
import type { Battlegroup, Character, QC } from '@lca/types/index.ts'
import type { WithCombatStats } from '@lca/types/shared.ts'
import BlockPaper from '../generic/BlockPaper.tsx'
import BattlegroupCard from './BattlegroupCombatCard.tsx'
import CharacterCard from './CharacterCombatCard.tsx'
import OutOfCombatCard from './OutOfCombatCard.tsx'
import QcCard from './QcCombatCard.tsx'

function initiativeSort(a: WithCombatStats, b: WithCombatStats) {
  if (a.initiative > b.initiative) {
    return -1
  } else if (a.initiative < b.initiative) {
    return 1
  } else {
    return 0
  }
}

const CombatCard = ({ c }: { c: Character | QC | Battlegroup }) => {
  switch (c.type) {
    case 'qc':
      return <QcCard qc={c} />
    case 'battlegroup':
      return <BattlegroupCard battlegroup={c} />
    default:
      return <CharacterCard character={c} />
  }
}

const CombatDashboard = () => {
  const dispatch = useAppDispatch()
  const id = useIdFromParams()
  const chronicle = useAppSelector((state) => getSpecificChronicle(state, id))
  const is_st = useAppSelector((state) => amIStOfChronicle(state, id))
  const characters = useAppSelector((state) =>
    getCharactersForChronicle(state, id),
  )
  const qcs = useAppSelector((state) => getQcsForChronicle(state, id))
  const battlegroups = useAppSelector((state) =>
    getBattlegroupsForChronicle(state, id),
  )

  /* Escape hatch */
  if (chronicle === undefined)
    return (
      <BlockPaper>
        <Typography paragraph>This Chronicle has not yet loaded.</Typography>
      </BlockPaper>
    )

  const entities = [...characters, ...qcs, ...battlegroups]

  const outOfCombatList = entities
    .filter((c) => !c.in_combat)
    .map((c) => (
      <Grid item xs={6} lg={4} xl={3} key={c.type + c.id}>
        <OutOfCombatCard character={c} />
      </Grid>
    ))

  const inCombatEntities = entities
    .filter((c) => c.in_combat)
    .sort(initiativeSort)

  const combatCards = inCombatEntities.map((c) => (
    <Grid item xs={12} md={6} xl={4} key={c.id + c.name}>
      <CombatCard c={c} />
    </Grid>
  ))

  const nextCharacter = inCombatEntities.filter((c) => !c.has_acted)[0]

  return (
    <Grid container spacing={3} style={{ position: 'relative' }}>
      <Hidden smUp>
        <Grid item xs={12}>
          <div style={{ height: '1em' }}>&nbsp;</div>
        </Grid>
      </Hidden>

      <Grid item xs={12}>
        {inCombatEntities.length === 0 && (
          <Typography variant="subtitle1">
            No characters are in combat
          </Typography>
        )}
        {inCombatEntities.length > 0 && (
          <Typography variant="subtitle1">
            Current Initiative: {nextCharacter ? nextCharacter.initiative : 0}
            &nbsp; Next up: {nextCharacter ? nextCharacter.name : 'Round over!'}
            &nbsp;
            {is_st && (
              <>
                <Button onClick={() => dispatch(nextRound(id))}>
                  Next Turn
                </Button>
                &nbsp;
                <Button onClick={() => dispatch(endCombat(id))}>
                  End Combat
                </Button>
              </>
            )}
          </Typography>
        )}
      </Grid>

      <FlipMove typeName={null}>{combatCards}</FlipMove>

      <Grid item xs={12}>
        <Typography variant="h5">Out of Combat</Typography>
      </Grid>

      {outOfCombatList}
    </Grid>
  )
}

export default ProtectedComponent(CombatDashboard)
