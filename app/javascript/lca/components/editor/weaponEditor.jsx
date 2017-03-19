import React from 'react'
import { connect } from 'react-redux'
import { updateWeapon } from '../../actions'
import * as calc from '../../utils/calculated'

function WeightSelect(props) {
  return(
    <select name="weight" value={props.weapon.weight} onChange={ props.onChange } onBlur={ props.onBlur }>
      <option value="light">Light</option>
      <option value="medium">Medium</option>
      <option value="heavy">Heavy</option>
    </select>
  )
}

function AbilitySelect(props) {
  const options = calc.attackAbilities(props.character).map((abil) =>
    <option key={ abil.abil } value={abil.abil}>{ abil.abil }({ abil.rating })</option>
  )
  return(
    <select name="ability" value={ props.weapon.ability } onChange={ props.onChange } onBlur={ props.onBlur }>
      {options}
    </select>
  )
}

class WeaponFieldset extends React.Component {
  constructor(props) {
    super(props)

    this.updateWeap = this.updateWeap.bind(this)
    this.pushUpdate = this.pushUpdate.bind(this)

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
    } else if (e.target.dataset.array)
      val = e.target.value.split(",")
    else
      val = e.target.value

    this.setState({weapon: {...this.state.weapon, [e.target.name]: val}})
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
    const { pushUpdate, updateWeap } = this
    const tags = weapon.tags.length > 0 ? weapon.tags : ""

    return(<div>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" value={ weapon.name }
        onBlur={ pushUpdate } onChange={ updateWeap } />
      <label htmlFor="weight">Weight</label>
      <WeightSelect weapon={ weapon }
        onBlur={ pushUpdate } onChange={ updateWeap } />
      <label htmlFor="is_artifact">Artifact?</label>
      <input type="checkbox" name="is_artifact" checked={ weapon.is_artifact }
        onChange={ updateWeap } />
      <input type="text" name="tags" value={ tags } data-array
        onChange={ updateWeap } onBlur={ pushUpdate } />
      <AbilitySelect character={ this.props.character } weapon={ weapon } onChange={ updateWeap } onBlur={ pushUpdate }/>

    </div>)
  }
}

class _WeaponEditor extends React.Component {
  constructor(props) {
    super(props)

    this.onUpdateWeapon = this.onUpdateWeapon.bind(this)
  }

  onUpdateWeapon(id, charId, trait, value) {
    this.props._onUpdateWeapon(id, charId, trait, value)
  }

  render() {
    const weaps = this.props.weapons.map((weap) =>
      <WeaponFieldset key={ weap.id } weapon={ weap } character={ this.props.character } onUpdate={ this.onUpdateWeapon } />
    )
    return(<fieldset>
      <legend>Weapon Editor</legend>
      {weaps}
    </fieldset>)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    _onUpdateWeapon: (id, charId, trait, value) => {
      dispatch(updateWeapon(id, charId, trait, value));
    }
  }
}


const WeaponEditor = connect(null, mapDispatchToProps)(_WeaponEditor)

export default WeaponEditor
