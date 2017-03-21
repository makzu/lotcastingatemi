import React from 'react'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'

import { updateWeapon } from '../../../actions'
import * as calc from '../../../utils/calculated'

function WeightSelect(props) {
  return(
    <SelectField name="weight" value={ props.weapon.weight }
      floatingLabelText="Weight:"
      onChange={ props.onChange }>
      <MenuItem value="light" primaryText="Light" />
      <MenuItem value="medium" primaryText="Medium" />
      <MenuItem value="heavy" primaryText="Heavy" />
    </SelectField>
  )
}

function AbilitySelect(props) {
  const options = calc.attackAbilities(props.character).map((abil) =>
    <MenuItem key={ abil.abil } value={abil.abil} primaryText={ abil.abil + "(" + abil.rating + ")" } />
  )
  return(
    <SelectField name="ability" value={ props.weapon.ability }
      floatingLabelText="Ability:"
      onChange={ props.onChange }>
      {options}
    </SelectField>
  )
}

class WeaponFieldset extends React.Component {
  constructor(props) {
    super(props)

    this.updateWeap = this.updateWeap.bind(this)
    this.pushUpdate = this.pushUpdate.bind(this)

    this.handleWeightChange = this.handleWeightChange.bind(this)
    this.handleAbilityChange = this.handleAbilityChange.bind(this)

    this.state = { weapon: this.props.weapon }
  }

  updateWeap(e) {
    e.preventDefault()
    let val = null
    if (e.target.type == "number")
      val = parseInt(e.target.value)
    else if (e.target.type == "checkbox") {
      val = ! this.state.weapon[e.target.name]
      this.props.onUpdate(this.state.weapon.id, this.state.weapon.character_id, e.target.name, val)
    } else if (e.target.name == "tags")
      val = e.target.value.split(",")
    else
      val = e.target.value

    this.setState({weapon: {...this.state.weapon, [e.target.name]: val}})
  }

  handleWeightChange(e, key, value) {
    this.setState({ weapon: { ...this.state.weapon, weight: value } })

    this.props.onUpdate(this.state.weapon.id, this.props.character.id, "weight", value)
  }

  handleAbilityChange(e, key, value) {
    this.setState({ weapon: { ...this.state.weapon, ability: value } })

    this.props.onUpdate(this.state.weapon.id, this.props.character.id, "ability", value)
  }

  pushUpdate(e) {
    const trait = e.target.name

    if (this.state.weapon[trait] != this.props.weapon[trait])
      this.props.onUpdate(this.state.weapon.id,
        this.state.weapon.character_id,
        trait, this.state.weapon[trait])
  }

  render() {
    const weapon = this.state.weapon
    const { pushUpdate, updateWeap, handleWeightChange, handleAbilityChange } = this
    const tags = weapon.tags.length > 0 ? weapon.tags : ""

    return(<div>
      <TextField name="name" value={ weapon.name }
        floatingLabelText="Name:"
        onBlur={ pushUpdate } onChange={ updateWeap } />

      <WeightSelect weapon={ weapon }
        onChange={ handleWeightChange } />

      <Checkbox label="Artifact?" name="is_artifact" checked={ weapon.is_artifact }
        onCheck={ updateWeap } style={{ display: 'inline-block', width: '7em' }} />

      <TextField name="tags" value={ tags } data-array
        floatingLabelText="Tags:"
        onChange={ updateWeap } onBlur={ pushUpdate } />
      <AbilitySelect character={ this.props.character } weapon={ weapon }
        onChange={ handleAbilityChange } />

    </div>)
  }
}

class _AllWeaponsPopup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.onUpdateWeapon = this.onUpdateWeapon.bind(this)
  }

  handleOpen() {
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false })
  }

  onUpdateWeapon(id, charId, trait, value) {
    this.props._onUpdateWeapon(id, charId, trait, value)
  }

  render() {
    const character = this.props.character
    const { handleOpen, handleClose, handleChange, handleBlur } = this

    const weaps = this.props.weapons.map((weap) =>
      <WeaponFieldset key={ weap.id } weapon={ weap } character={ this.props.character } onUpdate={ this.onUpdateWeapon } />
    )

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
        title="Editing Weapons"
        actions={ actions }
        open={ this.state.open }
        autoScrollBodyContent={ true }
        onRequestClose={ handleClose }
      >
        <div className="editor-popup editor-popup-specialties">
          { weaps }
        </div>
      </Dialog>
    </div>)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    _onUpdateWeapon: (id, charId, trait, value) => {
      dispatch(updateWeapon(id, charId, trait, value))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(_AllWeaponsPopup)

