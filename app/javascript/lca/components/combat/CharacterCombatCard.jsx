// @flow
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'

import withStyles from '@mui/styles/withStyles'
import Typography from '@mui/material/Typography'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Whatshot from '@mui/icons-material/Whatshot'

import PlayerNameSubtitle from '../generic/PlayerNameSubtitle.jsx'
import PoolDisplay from '../generic/PoolDisplay.jsx'
import SpendableBlock from '../generic/SpendableBlock.jsx'
import CombatControls from './CombatControls.jsx'
import RemoveFromCombatButton from './RemoveFromCombatButton.jsx'
import NotesPopup from 'components/characters/NotesPopup.jsx'
import CardBase from 'components/shared/CardBase'
import { canIEditCharacter, getPenalties, getPoolsAndRatings } from 'selectors'
import type { Character, Enhancer } from 'utils/flow-types'

const styles = (theme) => ({
  nameRow: {
    display: 'flex',
  },
  nameWrap: {
    flex: 1,
    '& a': {
      color: 'unset',
    },
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
  hasActed: {
    textDecoration: 'none',
    opacity: 0.5,
  },
  icon: {
    verticalAlign: 'bottom',
    marginLeft: theme.spacing(),
  },
  rowContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  poolBlock: {
    marginRight: theme.spacing(),
    marginTop: theme.spacing(),
    width: '5.5rem',
    maxHeight: '5.5rem',
    overflow: 'hidden',
  },
})

type ExposedProps = {
  character: Character,
}
type Props = ExposedProps & {
  canEdit: boolean,
  pools: Object,
  penalties: Object,
  classes: Object,
}

export function CharacterCard({
  character,
  // eslint-disable-next-line no-unused-vars
  canEdit,
  penalties,
  pools,
  classes,
}: Props) {
  return (
    <CardBase>
      <div className={classes.nameRow}>
        <div className={classes.nameWrap}>
          <Typography
            variant="h6"
            className={
              character.has_acted ? classes.hasActed : classes.characterName
            }
            component={Link}
            to={`/characters/${character.id}`}
          >
            {character.name}
            {character.anima_level === 3 && (
              <Whatshot className={classes.icon} />
            )}

            {character.hidden && (
              <div className={classes.hiddenLabel}>
                <VisibilityOff className={classes.icon} />
                &nbsp; Hidden
              </div>
            )}
          </Typography>
          <PlayerNameSubtitle playerId={character.player_id} />
        </div>

        <NotesPopup character={character} />
      </div>

      <CombatControls character={character} characterType="character" />

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
          <strong>Penalties:</strong>
          &nbsp;
          {penalties.mobility > 0 && (
            <span>Mobility -{penalties.mobility} </span>
          )}
          {penalties.onslaught > 0 && (
            <span>Onslaught -{character.onslaught} </span>
          )}
          {penalties.wound > 0 && <span>Wound -{penalties.wound}</span>}
        </Typography>
      )}

      <RemoveFromCombatButton character={character} characterType="character" />
    </CardBase>
  )
}
const mapStateToProps = (state, props: ExposedProps) => ({
  canEdit: canIEditCharacter(state, props.character.id),
  penalties: getPenalties(state, props.character.id),
  pools: getPoolsAndRatings(state, props.character.id),
})

const enhance: Enhancer<Props, ExposedProps> = compose(
  connect(mapStateToProps),
  withStyles(styles),
)

export default enhance(CharacterCard)
