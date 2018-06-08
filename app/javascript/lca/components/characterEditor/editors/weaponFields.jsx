// @flow
import { isEqual } from 'lodash'
import * as React from 'react'
const { Component, Fragment } = React
import { SortableHandle } from 'react-sortable-hoc'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Divider from '@material-ui/core/Divider'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Collapse from '@material-ui/core/Collapse'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import RemoveCircle from '@material-ui/icons/RemoveCircle'

import WeaponAbilitySelect from './weaponAbilitySelect.jsx'
import WeaponAttributeSelect from './weaponAttributeSelect.jsx'
import TagsField from 'components/generic/TagsField.jsx'
import WeightSelect from 'components/generic/weightSelect.jsx'
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
})

type Props = {
  weapon: fullWeapon,
  character: Character,
  classes: Object,
  onChange: Function,
  onRemoveClick: Function,
}
type State = { weapon: Object, expandoOpen: boolean }
class WeaponFields extends Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      weapon: this.props.weapon,
      expandoOpen: false,
    }
  }

  componentWillReceiveProps = newProps => {
    this.setState({ weapon: newProps.weapon })
  }

  handleChange = e => {
    let { name, value } = e.target

    this.setState({ weapon: { ...this.state.weapon, [name]: value } })
  }

  handleBlur = e => {
    let { name, value } = e.target
    const { weapon } = this.props
    if (isEqual(weapon[name], value)) return

    this.props.onChange(weapon.id, name, value)
  }

  handleRatingChange = e => {
    let { name, value } = e.target
    const { weapon } = this.state
    if (value == 'header') return

    this.setState({ weapon: { ...weapon, [name]: value } })
    this.props.onChange(weapon.id, name, value)
  }

  handleCheck = e => {
    const { name } = e.target
    const { weapon } = this.state
    const value = !weapon[name]

    this.props.onChange(weapon.id, name, value)
  }

  handleRemove = () => {
    this.props.onRemoveClick(this.state.weapon.id)
  }

  toggleExpando = () => {
    this.setState({ expandoOpen: !this.state.expandoOpen })
  }

  render() {
    const { weapon } = this.state
    const { character, classes } = this.props
    const {
      handleChange,
      handleBlur,
      handleRatingChange,
      handleCheck,
      handleRemove,
    } = this

    const secondLine = (
      <Fragment>
        <WeaponAbilitySelect
          character={character}
          weapon={weapon}
          onChange={handleRatingChange}
        />

        <TagsField
          label="Tags (comma separated)"
          trait="tags"
          value={weapon.tags}
          className={classes.tagsField}
          margin="dense"
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </Fragment>
    )

    return (
      <Fragment>
        <div className={classes.fieldContainer}>
          <Typography component="div" className={classes.grabHandle}>
            <Handle />
          </Typography>

          <Hidden mdDown>
            <Button size="small" onClick={this.toggleExpando}>
              {this.state.expandoOpen ? <ExpandLess /> : <ExpandMore />}
            </Button>
          </Hidden>

          <TextField
            name="name"
            value={weapon.name}
            label="Name"
            className={classes.nameField}
            onBlur={handleBlur}
            onChange={handleChange}
            margin="dense"
          />

          <WeightSelect
            name="weight"
            value={weapon.weight}
            onChange={handleRatingChange}
            margin="dense"
          />

          <FormControlLabel
            label="Artifact"
            control={
              <Checkbox
                name="is_artifact"
                checked={weapon.is_artifact}
                onChange={handleCheck}
              />
            }
          />

          <Hidden mdDown>{secondLine}</Hidden>

          <IconButton onClick={handleRemove} style={{ minWidth: '2em' }}>
            <RemoveCircle />
          </IconButton>
        </div>

        <Hidden lgUp>
          <div className={classes.fieldContainer}>
            <Button size="small" onClick={this.toggleExpando}>
              {this.state.expandoOpen ? <ExpandLess /> : <ExpandMore />}
            </Button>
            {secondLine}
          </div>
        </Hidden>

        <Collapse in={this.state.expandoOpen}>
          <div className={classes.fieldContainer}>
            <WeaponAttributeSelect
              character={character}
              weapon={weapon}
              onChange={handleRatingChange}
            />

            <WeaponAbilitySelect
              character={character}
              weapon={weapon}
              extended
              onChange={handleRatingChange}
            />

            <WeaponAttributeSelect
              character={character}
              weapon={weapon}
              damage
              onChange={handleRatingChange}
            />
          </div>
        </Collapse>

        <Divider style={{ margin: '1em' }} />
      </Fragment>
    )
  }
}

export default withStyles(styles)(WeaponFields)
