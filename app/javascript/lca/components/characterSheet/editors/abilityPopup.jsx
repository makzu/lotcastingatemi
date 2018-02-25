import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'
import Typography from 'material-ui/Typography'

import RatingField from '../../generic/ratingField.jsx'

import { updateCharacter } from '../../../ducks/actions.js'
import { ABILITY_MAX, ABILITY_MIN } from '../../../utils/constants.js'
import { withAbilities } from '../../../utils/propTypes'

import ExpandableListEditor from '../../generic/expandableListEditor.jsx'

function AbilityBlock(props) {
  const { label, abil, value, onChange } = props

  return <RatingField trait={ abil }  value={ value }
    label={ label } min={ ABILITY_MIN } max={ ABILITY_MAX } margin="dense"
    onChange={ onChange }
  />
}
AbilityBlock.propTypes = {
  label: PropTypes.string.isRequired,
  abil: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

// TODO include sample pools on side of popup
class AbilityPopup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      character: this.props.character
    }

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onListChange = this.onListChange.bind(this)
    this.onListBlur = this.onListBlur.bind(this)
  }

  handleOpen() {
    this.setState({ open: true, character: this.props.character })
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleChange(e) {
    const trait = e.target.name
    const value = e.target.value
    this.setState({ character: { ...this.state.character, [trait]: value }})
    this.props.updateChar(this.state.character.id, trait, value)
  }

  onListChange(trait, value) {
    this.setState({ character: { ...this.state.character, [trait]: value }})
    this.props.updateChar(this.state.character.id, trait, value)
  }

  onListBlur(trait, value) {
    this.setState({ character: { ...this.state.character, [trait]: value }})
    this.props.updateChar(this.state.character.id, trait, value)
  }

  render() {
    const character = this.state.character
    const { handleOpen, handleClose, handleChange, onListChange, onListBlur } = this

    return <span>
      <Button onClick={ handleOpen }>Edit</Button>
      <Dialog
        open={ this.state.open }
        autoScrollBodyContent={ true }
        onClose={ handleClose }
      >
        <DialogTitle>Editing Abilities</DialogTitle>
        <DialogContent>
          <div className="ability-set">
            <AbilityBlock
              label="Archery" abil="abil_archery" value={ character.abil_archery }
              onChange={ handleChange }
            />
            <AbilityBlock
              label="Athletics" abil="abil_athletics" value={ character.abil_athletics }
              onChange={ handleChange }
            />
            <AbilityBlock
              label="Awareness" abil="abil_awareness" value={ character.abil_awareness }
              onChange={ handleChange }
            />
            <AbilityBlock
              label="Brawl" abil="abil_brawl" value={ character.abil_brawl }
              onChange={ handleChange }
            />
            <AbilityBlock
              label="Bureaucracy" abil="abil_bureaucracy" value={ character.abil_bureaucracy }
              onChange={ handleChange }
            />
          </div>
          <div className="ability-set">
            <AbilityBlock
              label="Dodge" abil="abil_dodge" value={ character.abil_dodge }
              onChange={ handleChange }
            />
            <AbilityBlock
              label="Integrity" abil="abil_integrity" value={ character.abil_integrity }
              onChange={ handleChange }
            />
            <AbilityBlock
              label="Investigation" abil="abil_investigation" value={ character.abil_investigation }
              onChange={ handleChange }
            />
            <AbilityBlock
              label="Larceny" abil="abil_larceny" value={ character.abil_larceny }
              onChange={ handleChange }
            />
            <AbilityBlock
              label="Linguistics" abil="abil_linguistics" value={ character.abil_linguistics }
              onChange={ handleChange }
            />
          </div>
          <div className="ability-set">
            <AbilityBlock
              label="Lore" abil="abil_lore" value={ character.abil_lore }
              onChange={ handleChange }
            />
            <AbilityBlock
              label="Medicine" abil="abil_medicine" value={ character.abil_medicine }
              onChange={ handleChange }
            />
            <AbilityBlock
              label="Melee" abil="abil_melee" value={ character.abil_melee }
              onChange={ handleChange }
            />
            <AbilityBlock
              label="Occult" abil="abil_occult" value={ character.abil_occult }
              onChange={ handleChange }
            />
            <AbilityBlock
              label="Performance" abil="abil_performance" value={ character.abil_performance }
              onChange={ handleChange }
            />
          </div>
          <div className="ability-set">
            <AbilityBlock
              label="Presence" abil="abil_presence" value={ character.abil_presence }
              onChange={ handleChange }
            />
            <AbilityBlock
              label="Resistance" abil="abil_resistance" value={ character.abil_resistance }
              onChange={ handleChange }
            />
            <AbilityBlock
              label="Ride" abil="abil_ride" value={ character.abil_ride }
              onChange={ handleChange }
            />
            <AbilityBlock
              label="Sail" abil="abil_sail" value={ character.abil_sail }
              onChange={ handleChange }
            />
            <AbilityBlock
              label="Socialize" abil="abil_socialize" value={ character.abil_socialize }
              onChange={ handleChange }
            />
          </div>
          <div className="ability-set">
            <AbilityBlock
              label="Stealth" abil="abil_stealth" value={ character.abil_stealth }
              onChange={ handleChange }
            />
            <AbilityBlock
              label="Survival" abil="abil_survival" value={ character.abil_survival }
              onChange={ handleChange }
            />
            <AbilityBlock
              label="Thrown" abil="abil_thrown" value={ character.abil_thrown }
              onChange={ handleChange }
            />
            <AbilityBlock
              label="War" abil="abil_war" value={ character.abil_war }
              onChange={ handleChange }
            />
          </div>

          <Typography variant="subheading">Crafts:</Typography>
          <ExpandableListEditor character={ character } trait="abil_craft"
            onUpdate={ onListChange } onBlur={ onListBlur } numberMax={ ABILITY_MAX }
          />
          <Typography variant="subheading">Martial Arts:</Typography>
          <ExpandableListEditor character={ character } trait="abil_martial_arts"
            onUpdate={ onListChange } onBlur={ onListBlur } numberMax={ ABILITY_MAX }
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={ handleClose }>Close</Button>
        </DialogActions>
      </Dialog>
    </span>
  }
}
AbilityPopup.propTypes = {
  character: PropTypes.shape(withAbilities).isRequired,
  updateChar: PropTypes.func
}

function mapDispatchToProps(dispatch) {
  return {
    updateChar: (id, trait, value) => {
      dispatch(updateCharacter(id, trait, value))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AbilityPopup)
