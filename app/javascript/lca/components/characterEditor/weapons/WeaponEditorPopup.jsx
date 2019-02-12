// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { compose } from 'recompose'

import { withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Checkbox from '@material-ui/core/Checkbox'
import Collapse from '@material-ui/core/Collapse'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'
import Edit from '@material-ui/icons/Edit'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import HelpIcon from '@material-ui/icons/Help'

import WeaponAbilitySelect from './WeaponAbilitySelect.jsx'
import WeaponAttributeSelect from './WeaponAttributeSelect.jsx'
import WeaponPoolDisplay from 'components/characters/weapons/WeaponPoolDisplay.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import TagsField from 'components/generic/TagsField.jsx'
import TextField from 'components/generic/TextField.jsx'
import WeightSelect from 'components/generic/weightSelect.jsx'
import CommonStyles from 'styles'

import type { Character, fullWeapon } from 'utils/flow-types'

const styles = theme => ({
  ...CommonStyles(theme),
  nameField: {
    marginRight: 0,
  },
  subheading: {
    marginTop: theme.spacing.unit,
  },
})

type Props = {
  weapon: fullWeapon,
  character: Character,
  handleChange: Function,
  handleCheck: Function,
  classes: Object,
}
type State = { open: boolean, advancedOpen: boolean }
class WeaponEditorPopup extends Component<Props, State> {
  state = { open: false, advancedOpen: false }

  handleOpen = () => {
    this.setState({ open: true })
  }
  handleClose = () => {
    this.setState({ open: false, advancedOpen: false })
  }
  handleExpander = () => {
    this.setState({ advancedOpen: !this.state.advancedOpen })
  }

  render() {
    const { handleOpen, handleClose, handleExpander } = this
    const { weapon, character, handleChange, handleCheck, classes } = this.props

    return (
      <>
        <IconButton onClick={handleOpen}>
          <Edit />
        </IconButton>

        <Dialog open={this.state.open} onClose={handleClose} fullWidth>
          <DialogTitle>Edit {weapon.name}</DialogTitle>
          <DialogContent>
            <div className={classes.flexContainerSpread}>
              <WeaponPoolDisplay weapon={weapon} />
            </div>

            <TextField
              label="Name"
              name="name"
              value={weapon.name}
              fullWidth
              className={classes.nameField}
              margin="dense"
              onChange={handleChange}
            />

            <div className={classes.flexContainerSpread}>
              <WeaponAbilitySelect
                character={character}
                weapon={weapon}
                onChange={handleChange}
                style={{ flex: 2 }}
              />

              <WeightSelect
                name="weight"
                value={weapon.weight}
                onChange={handleChange}
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
            </div>

            <TagsField
              label="Tags (comma separated)"
              trait="tags"
              value={weapon.tags}
              className={classes.tagsField}
              margin="dense"
              onBlur={handleChange}
              onChange={handleChange}
              fullWidth
            />

            <Typography variant="subtitle1" className={classes.subheading}>
              <IconButton onClick={handleExpander}>
                {this.state.advancedOpen ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
              Advanced
            </Typography>
            <Collapse in={this.state.advancedOpen}>
              <div className={classes.flexContainerSpread}>
                <WeaponAttributeSelect
                  character={character}
                  weapon={weapon}
                  onChange={handleChange}
                  style={{ flex: 1 }}
                  margin="dense"
                />

                <WeaponAttributeSelect
                  character={character}
                  weapon={weapon}
                  damage
                  onChange={handleChange}
                  style={{ flex: 1 }}
                  margin="dense"
                />
              </div>

              <Typography variant="subtitle1" className={classes.subheading}>
                Other Bonuses
              </Typography>
              <div className={classes.flexContainer}>
                <RatingField
                  trait="bonus_accuracy"
                  label="Accuracy"
                  min={-Infinity}
                  value={weapon.bonus_accuracy}
                  onChange={handleChange}
                  margin="dense"
                />
                <RatingField
                  trait="bonus_damage"
                  label="Damage"
                  min={-Infinity}
                  value={weapon.bonus_damage}
                  onChange={handleChange}
                  margin="dense"
                />
                <RatingField
                  trait="bonus_defense"
                  label="Parry"
                  min={-Infinity}
                  value={weapon.bonus_defense}
                  onChange={handleChange}
                  margin="dense"
                />
                <RatingField
                  trait="bonus_overwhelming"
                  label="Overwhelming"
                  min={-Infinity}
                  value={weapon.bonus_overwhelming}
                  onChange={handleChange}
                  margin="dense"
                />
              </div>
              <TextField
                name="notes"
                label="Notes"
                value={weapon.notes}
                onChange={handleChange}
                fullWidth
                margin="dense"
              />
            </Collapse>
          </DialogContent>

          <DialogActions>
            <div style={{ flex: 1 }}>
              <IconButton component={Link} to={'/help/weapons'} size="small">
                <HelpIcon />
              </IconButton>
            </div>
            <Button onClick={handleClose}>Done</Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

export default compose(withStyles(styles))(WeaponEditorPopup)
