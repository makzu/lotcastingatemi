import React from 'react'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import { updateCharacter } from '../../../actions'
import * as c from '../../../utils/constants.js'

import ExpandableListEditor from './expandableListEditor.jsx'

function AbilityBlock(props) {
  const { label, abil, value, onChange, onBlur } = props

  return(
    <TextField name={ abil } floatingLabelText={ label } value={ value }
      className="ability-field"
      type="number" min={ 0 } max={ 5 }
      onChange={ onChange } onBlur={ onBlur }
    />
  )
}

// TODO include sample pools on side of popup
class _AbilityPopup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      character: this.props.character
    }

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)

    this.onListChange = this.onListChange.bind(this)
    this.onListBlur = this.onListBlur.bind(this)
  }

  handleOpen() {
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleChange(e) {
    e.preventDefault()

    let val = parseInt(e.target.value)

    // leash the data into an acceptable range
    if (val > c.ABILITY_MAX)
      val = c.ABILITY_MAX
    else if ( val < c.ABILITY_MIN)
      val = c.ABILITY_MIN

    this.setState({character: {... this.state.character, [e.target.name]: val}})
  }

  handleBlur(e) {
    e.preventDefault()
    const trait = e.target.name
    if (this.state.character[trait] == this.props.character[trait])
      return

    this.props.updateChar(this.state.character.id, trait, this.state.character[trait])
  }

  onListChange(trait, value) {
    //this.setState({ character: { ...this.state.character, [trait]: value}})
  }

  onListBlur(trait, value) {
    this.setState({ character: { ...this.state.character, [trait]: value}})
    this.props.updateChar(this.state.character.id, trait, value)
  }

  render() {
    const character = this.state.character
    const { handleOpen, handleClose, handleChange, handleBlur, onListChange, onListBlur } = this

    const actions = [
      <FlatButton
        label="Close"
        primary={ true }
        onTouchTap={ handleClose }
      />
    ]

    return(<div className="editor-wrap ability-editor-wrap">
      <FlatButton label="Edit" onClick={ handleOpen } />
      <Dialog
        title="Editing Abilities"
        actions={ actions }
        open={ this.state.open }
        autoScrollBodyContent={ true }
        onRequestClose={ handleClose }
      >
        <div className="editor-popup editor-popup-abilities">
          <div className="ability-set">
            <AbilityBlock
              label="Archery" abil="abil_archery" value={ character.abil_archery }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <AbilityBlock
              label="Athletics" abil="abil_athletics" value={ character.abil_athletics }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <AbilityBlock
              label="Awareness" abil="abil_awareness" value={ character.abil_awareness }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <AbilityBlock
              label="Brawl" abil="abil_brawl" value={ character.abil_brawl }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <AbilityBlock
              label="Bureaucracy" abil="abil_bureaucracy" value={ character.abil_bureaucracy }
              onChange={ handleChange } onBlur={ handleBlur }
            />
          </div>
          <div className="ability-set">
            <AbilityBlock
              label="Dodge" abil="abil_dodge" value={ character.abil_dodge }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <AbilityBlock
              label="Integrity" abil="abil_integrity" value={ character.abil_integrity }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <AbilityBlock
              label="Investigation" abil="abil_investigation" value={ character.abil_investigation }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <AbilityBlock
              label="Larceny" abil="abil_larceny" value={ character.abil_larceny }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <AbilityBlock
              label="Linguistics" abil="abil_linguistics" value={ character.abil_linguistics }
              onChange={ handleChange } onBlur={ handleBlur }
            />
          </div>
          <div className="ability-set">
            <AbilityBlock
              label="Lore" abil="abil_lore" value={ character.abil_lore }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <AbilityBlock
              label="Medicine" abil="abil_medicine" value={ character.abil_medicine }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <AbilityBlock
              label="Melee" abil="abil_melee" value={ character.abil_melee }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <AbilityBlock
              label="Occult" abil="abil_occult" value={ character.abil_occult }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <AbilityBlock
              label="Performance" abil="abil_performance" value={ character.abil_performance }
              onChange={ handleChange } onBlur={ handleBlur }
            />
          </div>
          <div className="ability-set">
            <AbilityBlock
              label="Presence" abil="abil_presence" value={ character.abil_presence }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <AbilityBlock
              label="Resistance" abil="abil_resistance" value={ character.abil_resistance }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <AbilityBlock
              label="Ride" abil="abil_ride" value={ character.abil_ride }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <AbilityBlock
              label="Sail" abil="abil_sail" value={ character.abil_sail }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <AbilityBlock
              label="Socialize" abil="abil_socialize" value={ character.abil_socialize }
              onChange={ handleChange } onBlur={ handleBlur }
            />
          </div>
          <div className="ability-set">
            <AbilityBlock
              label="Stealth" abil="abil_stealth" value={ character.abil_stealth }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <AbilityBlock
              label="Survival" abil="abil_survival" value={ character.abil_survival }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <AbilityBlock
              label="Thrown" abil="abil_thrown" value={ character.abil_thrown }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <AbilityBlock
              label="War" abil="abil_war" value={ character.abil_war }
              onChange={ handleChange } onBlur={ handleBlur }
            />
          </div>

          <h4>Crafts:</h4>
          <ExpandableListEditor character={ character } trait="abil_craft"
            onUpdate={ onListChange } onBlur={ onListBlur } numberMax={ c.ABILITY_MAX }
          />
          <h4>Martial Arts:</h4>
          <ExpandableListEditor character={ character } trait="abil_martial_arts"
            onUpdate={ onListChange } onBlur={ onListBlur } numberMax={ c.ABILITY_MAX }
          />
        </div>
      </Dialog>
    </div>)
  }
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
)(_AbilityPopup)

