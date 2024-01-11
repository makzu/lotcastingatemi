import { deepEqual } from 'fast-equals'
import React, { ChangeEvent } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { SortableHandle } from 'react-sortable-hoc'
import { Theme, createStyles, withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import ContentRemoveCircle from '@material-ui/icons/RemoveCircle'
import RangeSelect from 'components/generic/RangeSelect'
import RatingField from '../generic/RatingField'
import TagsField from 'components/generic/TagsField'
import TextField from 'components/generic/TextField'
import { bgAttackPool, bgDamage } from 'utils/calculated'
import { getSpecificBattlegroup } from 'selectors'
import type { QcAttack, Enhancer } from 'utils/flow-types'
import { WithStyles } from '@material-ui/styles'
const Handle = SortableHandle(() => (
  <DragHandleIcon onClick={(e) => e.preventDefault()} />
))

const styles = (theme: Theme) =>
  createStyles({
    wrap: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    grabHandle: {
      alignSelf: 'center',
      marginRight: theme.spacing(),
    },
    bgBonus: {
      ...theme.typography.caption,
      marginLeft: -theme.spacing(0.5),
      marginRight: theme.spacing(),
      marginBottom: theme.spacing(),
      alignSelf: 'flex-end',
    },
    nameField: {
      flex: 2,
      minWidth: '30%',
      [theme.breakpoints.down('md')]: {
        minWidth: '50%',
      },
    },
    tagsField: {
      flex: 1,
      marginRight: theme.spacing(),
      minWidth: '30%',
      [theme.breakpoints.down('md')]: {
        minWidth: '50%',
      },
    },
    rangeField: {
      width: '6em',
    },
    divider: {
      minWidth: '100%',
      margin: '0.5em 0 0.5em',
    },
  })

interface ExposedProps {
  attack: QcAttack
  onAttackChange: $TSFixMeFunction
  onRemoveClick: $TSFixMeFunction
  battlegroup?: boolean
}
type Props = ExposedProps &
  WithStyles<typeof styles> & {
    fakeBg: Record<string, $TSFixMe>
  }

class QcAttackFields extends React.Component<Props> {
  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const { attack } = this.props
    if (deepEqual(this.props.attack[name], value)) return
    this.props.onAttackChange(attack.id, {
      [name]: value,
    })
  }
  handleRemove = () => {
    this.props.onRemoveClick(this.props.attack.id)
  }

  render() {
    const { attack } = this.props
    const { battlegroup, fakeBg, classes } = this.props
    const { handleChange, handleRemove } = this
    return (
      <div className={classes.wrap}>
        <Typography component="div" className={classes.grabHandle}>
          <Handle />
        </Typography>

        <TextField
          name="name"
          value={attack.name}
          label="Name"
          className={classes.nameField}
          margin="dense"
          onChange={handleChange}
          // @ts-expect-error TextField doesn't like ignoring lastpass autocomplete
          inputProps={{
            autocomplete: 'off',
            'data-1p-ignore': 'true',
            'data-lp-ignore': 'true',
          }}
        />

        <RatingField
          trait="pool"
          value={attack.pool}
          label="Pool"
          min={1}
          narrow
          margin="dense"
          onChange={handleChange}
        />
        {battlegroup && (
          <div className={classes.bgBonus}>
            ({bgAttackPool(fakeBg, attack)} total)
          </div>
        )}

        <RatingField
          trait="damage"
          value={attack.damage}
          label="Damage"
          min={1}
          narrow
          margin="dense"
          onChange={handleChange}
        />
        {battlegroup && (
          <div className={classes.bgBonus}>
            ({bgDamage(fakeBg, attack)} total)
          </div>
        )}

        <RatingField
          trait="overwhelming"
          value={attack.overwhelming}
          label="Min"
          min={1}
          narrow
          margin="dense"
          onChange={handleChange}
        />

        <TagsField
          trait="tags"
          value={attack.tags}
          label="Tags (comma separated)"
          className={classes.tagsField}
          margin="dense"
          onChange={handleChange}
        />

        <RangeSelect
          name="range"
          value={attack.range}
          onChange={handleChange}
          className={classes.rangeField}
        />

        <IconButton onClick={handleRemove} style={{}}>
          <ContentRemoveCircle />
        </IconButton>

        <Hidden lgUp>
          <Divider className={classes.divider} />
        </Hidden>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps: ExposedProps) {
  let fakeBg

  if (ownProps.battlegroup) {
    const owner = getSpecificBattlegroup(
      state,
      ownProps.attack.qc_attackable_id,
    )
    fakeBg = {
      size: owner.size,
      might: owner.might,
    }
  }

  return {
    fakeBg,
  }
}

const enhance: Enhancer<Props, ExposedProps> = compose(
  connect(mapStateToProps),
  withStyles(styles),
)
export default enhance(QcAttackFields)
