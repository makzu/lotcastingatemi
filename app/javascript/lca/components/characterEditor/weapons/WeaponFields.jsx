// @flow
import { isEqual } from 'lodash'
import * as React from 'react'
const { Component, Fragment } = React
import { SortableHandle } from 'react-sortable-hoc'

import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import RemoveCircle from '@material-ui/icons/RemoveCircle'

import WeaponEditorPopup from '../weapons/WeaponEditorPopup.jsx'
import WeaponLine from 'components/characters/weapons/WeaponLine.jsx'
import type { Character, fullWeapon } from 'utils/flow-types'

const Handle = SortableHandle(() => (
  <DragHandleIcon onClick={e => e.preventDefault()} />
))

const styles = theme => ({
  fieldContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  grabHandle: {
    marginRight: theme.spacing.unit,
  },
  nameField: {
    marginRight: theme.spacing.unit,
    flex: 3,
  },
  tagsField: {
    marginRight: theme.spacing.unit,
    flex: 5,
  },
  abilitySelect: {
    marginRight: theme.spacing.unit,
    width: '8em',
    textTransform: 'capitalize',
  },
  artifactLabel: {
    ...theme.typography.caption,
  },
})

type Props = {
  weapon: fullWeapon,
  character: Character,
  classes: Object,
  onChange: Function,
  onRemoveClick: Function,
}
type State = { expandoOpen: boolean }
class WeaponFields extends Component<Props, State> {
  handleChange = e => {
    const { name, value } = e.target
    const { weapon } = this.props

    if (isEqual(weapon[name], value)) return

    this.props.onChange(weapon.id, name, value)
  }

  handleCheck = e => {
    const { name } = e.target
    const { weapon } = this.props
    const value = !weapon[name]

    this.props.onChange(weapon.id, name, value)
  }

  handleRemove = () => {
    this.props.onRemoveClick(this.props.weapon.id)
  }

  render() {
    const { weapon, character, classes } = this.props
    const { handleChange, handleCheck, handleRemove } = this

    return (
      <Fragment>
        <div className={classes.fieldContainer}>
          <Typography component="div" className={classes.grabHandle}>
            <Handle />
          </Typography>

          <WeaponEditorPopup
            weapon={weapon}
            character={character}
            handleChange={handleChange}
            handleCheck={handleCheck}
          />

          <WeaponLine weapon={weapon} />

          <IconButton onClick={handleRemove} style={{ minWidth: '2em' }}>
            <RemoveCircle />
          </IconButton>
        </div>

        <Divider style={{ margin: '1em' }} />
      </Fragment>
    )
  }
}

export default withStyles(styles)(WeaponFields)
