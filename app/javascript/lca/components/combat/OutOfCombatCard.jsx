// @flow
import { connect } from 'react-redux'
import { compose } from 'recompose'

import withStyles from '@mui/styles/withStyles'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import JoinBattlePopup from './JoinBattlePopup.jsx'
import PlayerNameSubtitle from '../generic/PlayerNameSubtitle.jsx'
import PoolDisplay from '../generic/PoolDisplay.jsx'
import sharedStyles from 'styles/'
import { updateCharacter, updateQc, updateBattlegroup } from 'ducks/actions.js'
import { getPoolsAndRatingsGeneric, canIEdit } from 'selectors'
import type { Character, fullQc, Battlegroup, Enhancer } from 'utils/flow-types'

const styles = (theme) => ({
  ...sharedStyles(theme),
  root: {
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    height: '100%',
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
    marginLeft: theme.spacing(),
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
  character: Character | fullQc | Battlegroup,
}
type Props = ExposedProps & {
  canEdit: boolean,
  pools: Object,
  update: Function,
  classes: Object,
}

function OutOfCombatCard({
  character,
  canEdit,
  //eslint-disable-next-line no-unused-vars
  update,
  pools,
  classes,
}: Props) {
  return (
    <Paper className={classes.root}>
      <div className={classes.flexContainer}>
        <div className={classes.nameWrap}>
          <Typography variant="h6" className={classes.characterName}>
            {character.name}

            {character.hidden && (
              <div className={classes.hiddenLabel}>
                <VisibilityOff className={classes.icon} />
                &nbsp; Hidden
              </div>
            )}
          </Typography>
          <PlayerNameSubtitle playerId={character.player_id} />
        </div>
      </div>

      <div className={classes.flexContainer}>
        <PoolDisplay
          qc={character.type === 'qc' || character.type === 'battlegroup'}
          pool={pools.joinBattle}
          label="Join Battle"
          classes={{ root: classes.poolBlock }}
        />
        {canEdit && <JoinBattlePopup character={character} />}
      </div>
    </Paper>
  )
}

function mapStateToProps(state, props: ExposedProps) {
  let type
  if (props.character.type === 'qc') type = 'qc'
  else if (props.character.type === 'battlegroup') type = 'battlegroup'
  else type = 'character'

  return {
    canEdit: canIEdit(state, props.character.id, type),
    pools: getPoolsAndRatingsGeneric(state, props.character.id, type),
  }
}

function mapDispatchToProps(dispatch: Function, props: ExposedProps) {
  let action
  switch (props.character.type) {
    case 'qc':
      action = updateQc
      break
    case 'battlegroup':
      action = updateBattlegroup
      break
    case 'character':
    default:
      action = updateCharacter
  }

  return {
    update: (id, trait, value) => dispatch(action(id, { [trait]: value })),
  }
}

const enhance: Enhancer<Props, ExposedProps> = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)

export default enhance(OutOfCombatCard)
