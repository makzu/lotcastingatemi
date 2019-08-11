// @flow
import { deepEqual } from 'fast-equals'
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { SortableHandle } from 'react-sortable-hoc'

import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import DragHandleIcon from '@material-ui/icons/DragHandle'
import ContentRemoveCircle from '@material-ui/icons/RemoveCircle'

import RangeSelect from 'components/generic/RangeSelect.jsx'
import RatingField from '../generic/RatingField.jsx'
import TagsField from 'components/generic/TagsField.jsx'
import TextField from 'components/generic/TextField.jsx'
import { bgAttackPool, bgDamage } from 'utils/calculated'
import { getSpecificBattlegroup } from 'selectors'
import type { QcAttack, Enhancer } from 'utils/flow-types'

const Handle = SortableHandle(() => (
  <DragHandleIcon onClick={e => e.preventDefault()} />
))

const styles = theme => ({
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

type ExposedProps = {
  attack: QcAttack,
  onAttackChange: Function,
  onRemoveClick: Function,
  battlegroup?: boolean,
}
type Props = ExposedProps & {
  fakeBg: Object,
  classes: Object,
}

class QcAttackFields extends React.Component<Props> {
  handleChange = e => {
    let { name, value } = e.target
    const { attack } = this.props

    if (deepEqual(this.props.attack[name], value)) return

    this.props.onAttackChange(attack.id, { [name]: value })
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
    let owner = getSpecificBattlegroup(state, ownProps.attack.qc_attackable_id)
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
  withStyles(styles)
)

export default enhance(QcAttackFields)
