// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'recompose'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Launch from '@material-ui/icons/Launch'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Whatshot from '@material-ui/icons/Whatshot'

import PlayerNameSubtitle from '../generic/PlayerNameSubtitle.jsx'
import PoolDisplay from '../generic/PoolDisplay.jsx'
import SpendableBlock from '../generic/SpendableBlock.jsx'
import CombatControls from './CombatControls.jsx'
import { canIEditCharacter, getPenalties, getPoolsAndRatings } from 'selectors'
import type { Character } from 'utils/flow-types'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters({
      paddingTop: 16,
      paddingBottom: 16,
    }),
    height: '100%',
    position: 'relative',
  },
  nameRow: {
    display: 'flex',
  },
  nameWrap: {
    flex: 1,
  },
  hiddenLabel: {
    ...theme.typography.caption,
    display: 'inline-block',
    verticalAlign: 'middle',
    lineHeight: 'inherit',
  },
  characterName: {
    textDecoration: 'none',
  },
  icon: {
    verticalAlign: 'bottom',
    marginLeft: theme.spacing.unit,
  },
  rowContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  poolBlock: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    width: '5.5rem',
    maxHeight: '5.5rem',
    overflow: 'hidden',
  },
})

type Props = {
  character: Character,
  canEdit: boolean,
  pools: Object,
  penalties: Object,
  classes: Object,
}

export function CharacterCard({
  character,
  canEdit,
  penalties,
  pools,
  classes,
}: Props) {
  return (
    <Paper className={classes.root}>
      <div className={classes.nameRow}>
        <div className={classes.nameWrap}>
          <Typography
            variant="title"
            className={classes.characterName}
            component={Link}
            to={`/characters/${character.id}`}
          >
            {character.name}
            {character.anima_level === 3 && (
              <Whatshot className={classes.icon} />
            )}
            <Launch className={classes.icon} />

            {character.hidden && (
              <div className={classes.hiddenLabel}>
                <VisibilityOff className={classes.icon} />&nbsp; Hidden
              </div>
            )}
          </Typography>
          <PlayerNameSubtitle playerId={character.player_id} />
        </div>
      </div>

      <SpendableBlock character={character} />

      <div className={classes.rowContainer}>
        <PoolDisplay
          staticRating
          pool={pools.evasion}
          label="Evasion"
          classes={{ root: classes.poolBlock }}
        />
        <PoolDisplay
          staticRating
          pool={pools.bestParry}
          label="Best Parry"
          classes={{ root: classes.poolBlock }}
        />
        <PoolDisplay
          staticRating
          pool={pools.soak}
          label="Soak"
          classes={{ root: classes.poolBlock }}
        />
        {(pools.hardness.total > 0 || pools.hardness.bonus.length > 0) && (
          <PoolDisplay
            staticRating
            pool={pools.hardness}
            label="Hardness"
            classes={{ root: classes.poolBlock }}
          />
        )}
      </div>

      {(penalties.mobility !== 0 ||
        penalties.onslaught !== 0 ||
        penalties.wound !== 0) && (
        <Typography paragraph style={{ marginTop: '0.5em' }}>
          <strong>Penalties:</strong>&nbsp;
          {penalties.mobility > 0 && (
            <span>Mobility -{penalties.mobility} </span>
          )}
          {penalties.onslaught > 0 && (
            <span>Onslaught -{character.onslaught} </span>
          )}
          {penalties.wound > 0 && <span>Wound -{penalties.wound}</span>}
        </Typography>
      )}
      <CombatControls character={character} characterType="character" />
    </Paper>
  )
}
const mapStateToProps = (state, props) => ({
  canEdit: canIEditCharacter(state, props.character.id),
  penalties: getPenalties(state, props.character.id),
  pools: getPoolsAndRatings(state, props.character.id),
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(CharacterCard)
