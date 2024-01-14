import { Component } from 'react'
import FlipMove from 'react-flip-move'
import { connect } from 'react-redux'
import { compose } from 'redux'

import CharacterCard from './CharacterCombatCard'
import QcCard from './QcCombatCard'
import BattlegroupCard from './BattlegroupCombatCard'
import OutOfCombatCard from './OutOfCombatCard'
import BlockPaper from '@/components/shared/BlockPaper'

import ProtectedComponent from '@/containers/ProtectedComponent'
import withRouter from '@/containers/withRouter'
import { nextRound, endCombat } from '@/ducks/events'
import {
  getSpecificChronicle,
  getPlayersForChronicle,
  getCharactersForChronicle,
  getQcsForChronicle,
  getBattlegroupsForChronicle,
  getStorytellerForChronicle,
  amIStOfChronicle,
} from '@/selectors'
import type {
  Player,
  Character,
  fullQc,
  Battlegroup,
  Chronicle,
} from '@/utils/flow-types'

import { Button, Grid, Hidden, Typography } from '@mui/material'

function initiativeSort(a, b) {
  if (a.initiative > b.initiative) {
    return -1
  } else if (a.initiative < b.initiative) {
    return 1
  } else {
    return 0
  }
}

interface Props {
  id: number
  st: Player
  is_st: boolean
  players: Player[]
  characters: Character[]
  qcs: fullQc[]
  battlegroups: Battlegroup[]
  chronicle: Chronicle
  nextRound: $TSFixMeFunction
  endCombat: $TSFixMeFunction
}

class CombatDashboard extends Component<Props> {
  onClickNextTurn = () => {
    this.props.nextRound(this.props.id)
  }
  onClickEndCombat = () => {
    this.props.endCombat(this.props.id)
  }

  render() {
    /* Escape hatch */
    if (this.props.chronicle?.name == null)
      return (
        <BlockPaper>
          <Typography paragraph>This Chronicle has not yet loaded.</Typography>
        </BlockPaper>
      )
    const { characters, qcs, battlegroups } = this.props
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
        {c.type.includes('Character') && <CharacterCard character={c} />}

        {c.type === 'qc' && <QcCard qc={c} />}

        {c.type === 'battlegroup' && <BattlegroupCard battlegroup={c} />}
      </Grid>
    ))

    const nextCharacter = inCombatEntities.filter((c) => !c.has_acted)[0]

    return (
      <Grid
        container
        spacing={3}
        style={{
          position: 'relative',
        }}
      >
        <Hidden smUp>
          <Grid item xs={12}>
            <div
              style={{
                height: '1em',
              }}
            >
              &nbsp;
            </div>
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
              &nbsp; Next up:{' '}
              {nextCharacter ? nextCharacter.name : 'Round over!'}
              &nbsp;
              {this.props.is_st && (
                <>
                  <Button onClick={this.onClickNextTurn}>Next Turn</Button>
                  &nbsp;
                  <Button onClick={this.onClickEndCombat}>End Combat</Button>
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
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.params.id

  return {
    id: id,
    chronicle: getSpecificChronicle(state, id),
    st: getStorytellerForChronicle(state, id),
    is_st: amIStOfChronicle(state, id),
    players: getPlayersForChronicle(state, id),
    characters: getCharactersForChronicle(state, id),
    qcs: getQcsForChronicle(state, id),
    battlegroups: getBattlegroupsForChronicle(state, id),
  }
}

export default compose(
  ProtectedComponent,
  withRouter,
  connect(mapStateToProps, { nextRound, endCombat }),
)(CombatDashboard)
