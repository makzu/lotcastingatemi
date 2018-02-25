import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import ContentRemoveCircle from 'material-ui-icons/RemoveCircle'
import ContentAddCircle from 'material-ui-icons/AddCircle'
import TextField from 'material-ui/TextField'
import Select from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'
import Checkbox from 'material-ui/Checkbox'

import { updateWeapon, createWeapon, destroyWeapon } from '../../ducks/actions.js'
import * as calc from '../../utils/calculated'
import { withAttributes, withAbilities, fullWeapon } from '../../utils/propTypes'

function WeaponHeader() {
  return <TableRow>
    <TableCell>Weapon Name</TableCell>
    <TableCell numeric>Attack Pool</TableCell>
    <TableCell numeric>Damage</TableCell>
    <TableCell numeric>Parry</TableCell>
    <TableCell numeric><abbr title="Overwhelming">Ovw</abbr></TableCell>
    <TableCell>Tags</TableCell>
    <TableCell>Ability</TableCell>
  </TableRow>
}

function WeaponData(props) {
  const { weapon, character } = props

  return <TableRow>
    <TableCell>{ weapon.name }</TableCell>
    <TableCell numeric>
      { calc.witheringAttackPool(character, weapon) }{' '}
      ({ calc.decisiveAttackPool(character, weapon) } D)
    </TableCell>
    <TableCell numeric>
      { calc.weaponDamage(character, weapon) }
      { calc.weaponDamageType(weapon) }
    </TableCell>
    <TableCell numeric>
      { calc.weaponParry(character, weapon) }
    </TableCell>
    <TableCell numeric>
      { calc.weaponOverwhelming(weapon) }
    </TableCell>
    <TableCell>
      { weapon.tags.join(', ') }
    </TableCell>
    <TableCell>
      { weapon.ability }
    </TableCell>
  </TableRow>
}
WeaponData.propTypes = {
  weapon: PropTypes.shape(fullWeapon),
  character: PropTypes.shape({ ...withAttributes, ...withAbilities })
}

function WeaponEditHeader() {
  return <TableRow>
    <TableCell>Weapon Name</TableCell>
    <TableCell style={{ width: '5em' }}>Weight</TableCell>
    <TableCell style={{ width: '2em' }}>Artifact?</TableCell>
    <TableCell>Tags</TableCell>
    <TableCell>Ability</TableCell>
    <TableCell style={{ width: '2em' }}>Pool</TableCell>
    <TableCell style={{ width: '2em' }}>Dmg</TableCell>
    <TableCell style={{ width: '2em' }}>-</TableCell>
  </TableRow>
}

function WeightSelect(props) {
  return(
    <Select name="weight" value={ props.weapon.weight }
      onChange={ props.onChange } style={{ width: '4em' }}>
      <MenuItem value="light" label="L" primarytext="Light" />
      <MenuItem value="medium" label="M" primarytext="Medium" />
      <MenuItem value="heavy" label="H" primarytext="Heavy" />
    </Select>
  )
}
WeightSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  weapon: PropTypes.shape({ weight: PropTypes.string.isRequired })
}

function AbilitySelect(props) {
  const options = calc.attackAbilities(props.character).map((abil) =>
    <MenuItem key={ abil.abil } value={abil.abil} primarytext={ abil.abil + '(' + abil.rating + ')' } />
  )
  return(
    <Select name="ability" value={ props.weapon.ability }
      onChange={ props.onChange }>
      {options}
    </Select>
  )
}
AbilitySelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  character: PropTypes.shape(withAbilities).isRequired,
  weapon: PropTypes.shape({ ability: PropTypes.string.isRequired }).isRequired
}

class WeaponFieldset extends React.Component {
  constructor(props) {
    super(props)
    this.state = { weapon: this.props.weapon }

    this.handleWeightChange = this.handleWeightChange.bind(this)
    this.handleAbilityChange = this.handleAbilityChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleChange(e) {
    e.preventDefault()
    let val = null

    if (e.target.type == 'checkbox') {
      val = ! this.state.weapon[e.target.name]
      this.props.onUpdate(this.state.weapon.id, this.state.weapon.character_id, e.target.name, val)
    } else if (e.target.name == 'tags')
      val = e.target.value.split(',')
    else
      val = e.target.value

    this.setState({ weapon: { ...this.state.weapon, [e.target.name]: val }})
  }

  handleBlur(e) {
    const trait = e.target.name

    if (this.state.weapon[trait] != this.props.weapon[trait])
      this.props.onUpdate(this.state.weapon.id,
        this.state.weapon.character_id,
        trait, this.state.weapon[trait])
  }

  handleWeightChange(e, key, value) {
    this.setState({ weapon: { ...this.state.weapon, weight: value }})

    this.props.onUpdate(this.state.weapon.id, this.props.character.id, 'weight', value)
  }

  handleAbilityChange(e, key, value) {
    this.setState({ weapon: { ...this.state.weapon, ability: value }})

    this.props.onUpdate(this.state.weapon.id, this.props.character.id, 'ability', value)
  }

  handleRemove() {
    this.props.onRemove(this.state.weapon.id)
  }

  render() {
    const { character } = this.props
    const { handleChange, handleBlur, handleWeightChange, handleAbilityChange } = this
    const weapon = this.state.weapon

    return <TableRow>
      <TableCell style={{ verticalAlign: 'bottom' }}>
        <TextField name="name" value={ weapon.name }
          onBlur={ handleBlur } onChange={ handleChange } />
      </TableCell>
      <TableCell style={{ width: '5em', verticalAlign: 'baseline' }}>
        <WeightSelect weapon={ weapon } onChange={ handleWeightChange }/>
      </TableCell>
      <TableCell style={{ width: '2em' }}>
        <Checkbox name="is_artifact" checked={ weapon.is_artifact }
          onCheck={ handleChange }
        />
      </TableCell>
      <TableCell style={{ verticalAlign: 'bottom' }}>
        <TextField name="tags" value={ weapon.tags }
          onBlur={ handleBlur } onChange={ handleChange } />
      </TableCell>
      <TableCell style={{ verticalAlign: 'bottom' }}>
        <AbilitySelect character={ character } weapon={ weapon }
          onChange={ handleAbilityChange }
        />
      </TableCell>
      <TableCell style={{ width: '2em' }}>
        { calc.witheringAttackPool(character, weapon) }
      </TableCell>
      <TableCell style={{ width: '2em' }}>
        { calc.weaponDamage(character, weapon) }
      </TableCell>
      <TableCell style={{ width: '2em' }}>
        <IconButton onClick={ this.handleRemove } style={{ minWidth: '2em' }}>
          <ContentRemoveCircle />
        </IconButton>
      </TableCell>
    </TableRow>
  }
}
WeaponFieldset.propTypes = {
  weapon: PropTypes.shape(fullWeapon),
  character: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
}

class WeaponSummary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
    }

    this.toggleEditor = this.toggleEditor.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  toggleEditor() {
    this.setState({ isEditing: !this.state.isEditing })
  }

  handleUpdate(id, charId, trait, value) {
    this.props._handleUpdate(id, charId, trait, value)
  }

  handleAdd() {
    this.props._handleCreate(this.props.character.id)
  }

  handleRemove(id) {
    this.props._handleDestroy(id, this.props.character.id)
  }

  render() {
    const { character, weapons } = this.props

    const weaps = weapons.map((weapon) =>
      <WeaponData key={ weapon.id } character={ character } weapon={ weapon } />
    )
    const weapEdits = weapons.map((weapon) =>
      <WeaponFieldset key={weapon.id} character={character} weapon={weapon}
        onUpdate={ this.handleUpdate } onRemove={ this.handleRemove }
      />
    )

    return <div>
      <Table>
        <TableHead>
          <WeaponHeader />
        </TableHead>
        <TableBody>
          { this.state.isEditing ? weapEdits : weaps }
        </TableBody>
      </Table>
    </div> // */
  }
}
WeaponSummary.propTypes = {
  weapons: PropTypes.arrayOf(PropTypes.shape(fullWeapon)),
  character: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
  _handleUpdate: PropTypes.func,
  _handleDestroy: PropTypes.func,
  _handleCreate: PropTypes.func,
}

function mapDispatchToProps(dispatch) {
  return {
    _handleUpdate: (id, charId, trait, value) => {
      dispatch(updateWeapon(id, charId, trait, value))
    },
    _handleDestroy: (id, charId) => {
      dispatch(destroyWeapon(id, charId))
    },
    _handleCreate: (charId) => {
      dispatch(createWeapon(charId))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(WeaponSummary)
