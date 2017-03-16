import React from 'react'
import { connect } from 'react-redux'
import { updateWeapon } from '../../actions'

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
  const options = props.computed.attackAbils.map((abil) =>
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

    return(<div>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" value={ weapon.name }
        onBlur={ pushUpdate } onChange={ updateWeap } />
      <label htmlFor="weight">Weight</label>
      <WeightSelect weapon={ weapon }
        onBlur={ pushUpdate } onChange={ updateWeap } />



    </div>)
  }
}

class _WeaponEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { character: this.props.character }

    this.onUpdateWeapon = this.onUpdateWeapon.bind(this)

  }

  onUpdateWeapon(id, charId, trait, value) {
    this.props._onUpdateWeapon(id, charId, trait, value)
  }

  render() {
    const weaps = this.props.weapons.map((weap) =>
      <WeaponFieldset key={ weap.id } weapon={ weap } onUpdate={ this.onUpdateWeapon } />
    )
    return(<fieldset>
      <legend>Weapon Editor</legend>
      {weaps}
    </fieldset>)
  }
}
  /*
  const ch = props.character
  const { computed, onChange } = props

  const weap = ch.weapons.map((weap) =>
    <p key={weap.id}>
      <input type="text" value={ weap.name } onChange={ onChange(weap.id) } />
      <WeightSelect weapon={ weap } onChange={ onChange }/>
      <input type="checkbox" checked={ weap.is_artifact } onChange={ onChange }/>
      {weap.tags}
      <AbilitySelect character={ ch } weapon={ weap } computed={computed} onChange={ onChange }/>
    </p>
  )
  return(<fieldset>
    <legend>Weapons</legend>
    {weap}
  </fieldset>
  ) // */


function mapStateToProps(state, ownProps) {
  const weaps = ownProps.character.weapons.map((id) =>
    state.character.weapons[id]
  )

  return { weapons: weaps }
}
function mapDispatchToProps(dispatch) {
  return {
    _onUpdateWeapon: (id, charId, trait, value) => {
      dispatch(updateWeapon(id, charId, trait, value));
    }
  }
}

const WeaponEditor = connect(mapStateToProps, mapDispatchToProps)(_WeaponEditor)

export default WeaponEditor
