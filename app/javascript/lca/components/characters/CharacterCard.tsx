import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { SortableHandle } from 'react-sortable-hoc'
import { compose } from 'redux'

import withStyles from '@mui/styles/withStyles'
import Typography from '@mui/material/Typography'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Whatshot from '@mui/icons-material/Whatshot'

import NotesPopup from './NotesPopup.jsx'
import PlayerNameSubtitle from '../generic/PlayerNameSubtitle.jsx'
import PoolDisplay from '../generic/PoolDisplay.jsx'
import CharacterMenu from '../generic/CharacterMenu'
import SpendableBlock from '../generic/SpendableBlock.jsx'
import CardBase from 'components/shared/CardBase'
import {
  canIDeleteCharacter,
  getPenalties,
  getPoolsAndRatings,
} from 'selectors'
import * as calc from 'utils/calculated'
import type { Character, Enhancer } from 'utils/flow-types'
const Handle = SortableHandle(() => (
  <DragHandleIcon onClick={(e) => e.preventDefault()} />
))

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
  icon: {
    verticalAlign: 'bottom',
    marginLeft: theme.spacing(),
  },
  moteWrap: {
    marginRight: theme.spacing(),
  },
  animaLabel: {
    ...theme.typography.body1,
    fontSize: '0.75rem',
    fontWeight: 500,
    opacity: 0.7,
  },
  penaltyLabel: { ...theme.typography.caption },
  animaCurrent: {
    ...theme.typography.h4,
    display: 'inline-block',
    verticalAlign: 'top',
  },
  animaValue: {
    ...theme.typography.body1,
    display: 'inline-block',
    verticalAlign: 'top',
    marginTop: '0.25em',
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

interface ExposedProps {
  character: Character
  chronicle?: boolean
  st?: boolean
}
type Props = ExposedProps & {
  canDelete: boolean
  pools: Record<string, $TSFixMe>
  penalties: Record<string, $TSFixMe>
  classes: Record<string, $TSFixMe>
}
export function CharacterCard({
  character,
  canDelete,
  chronicle,
  st,
  penalties,
  pools,
  classes,
}: Props) {
  return (
    <CardBase>
      {((chronicle && st) || (!chronicle && canDelete)) && (
        <Typography
          component="div"
          style={{
            position: 'absolute',
            bottom: '0.5em',
            right: '0.75em',
          }}
        >
          <Handle />
        </Typography>
      )}

      <Typography component="div" className={classes.nameRow}>
        <div className={classes.nameWrap}>
          <Typography
            variant="h6"
            className={classes.characterName}
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
          {chronicle && <PlayerNameSubtitle playerId={character.player_id} />}

          <Typography paragraph>
            Essence {character.essence} {calc.prettyFullExaltType(character)}
          </Typography>
        </div>

        <NotesPopup character={character} />

        <CharacterMenu
          characterType="character"
          id={character.id}
          chronicle={chronicle}
        />
      </Typography>

      <SpendableBlock character={character} />

      <div className={classes.rowContainer}>
        <PoolDisplay
          staticRating
          pool={pools.evasion}
          label="Evasion"
          classes={{
            root: classes.poolBlock,
          }}
        />
        <PoolDisplay
          staticRating
          pool={pools.bestParry}
          label="Best Parry"
          classes={{
            root: classes.poolBlock,
          }}
        />
        <PoolDisplay
          staticRating
          pool={pools.soak}
          label="Soak"
          classes={{
            root: classes.poolBlock,
          }}
        />
        {(pools.hardness.total > 0 || pools.hardness.bonus.length > 0) && (
          <PoolDisplay
            staticRating
            pool={pools.hardness}
            label="Hardness"
            classes={{
              root: classes.poolBlock,
            }}
          />
        )}
      </div>

      <div className={classes.rowContainer}>
        <PoolDisplay
          staticRating
          pool={pools.resolve}
          label="Resolve"
          classes={{
            root: classes.poolBlock,
          }}
        />
        <PoolDisplay
          staticRating
          pool={pools.guile}
          label="Guile"
          classes={{
            root: classes.poolBlock,
          }}
        />
        <PoolDisplay
          staticRating
          pool={pools.appearance}
          label="Appearance"
          classes={{
            root: classes.poolBlock,
          }}
        />
      </div>

      {(penalties.mobility !== 0 ||
        penalties.onslaught !== 0 ||
        penalties.wound !== 0) && (
        <Typography
          paragraph
          style={{
            marginTop: '0.5em',
          }}
        >
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
    </CardBase>
  )
}

const mapStateToProps = (state, props: ExposedProps) => ({
  canDelete: canIDeleteCharacter(state, props.character.id),
  penalties: getPenalties(state, props.character.id),
  pools: getPoolsAndRatings(state, props.character.id),
})

const enhance: Enhancer<Props, ExposedProps> = compose(
  connect(mapStateToProps),
  withStyles(styles),
)
export default enhance(CharacterCard)
