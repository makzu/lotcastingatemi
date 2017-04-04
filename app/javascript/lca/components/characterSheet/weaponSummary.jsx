import React from 'react'
import { connect } from 'react-redux'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/FlatButton'
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle'
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'

import { updateWeapon, createWeapon, destroyWeapon } from '../../actions'
import * as calc from '../../utils/calculated'
import { withAttributes, withAbilities, fullWeapon } from '../../utils/propTypes'

function WeaponHeader() {
  return <TableRow>
    <TableHeaderColumn>Weapon Name</TableHeaderColumn>
    <TableHeaderColumn className="attackPoolColumn">Attack Pool</TableHeaderColumn>
    <TableHeaderColumn className="damageColumn">Damage</TableHeaderColumn>
    <TableHeaderColumn className="parryColumn">Parry</TableHeaderColumn>
    <TableHeaderColumn className="overwhelmingColumn"><abbr title="Overwhelming">Ovw</abbr></TableHeaderColumn>
    <TableHeaderColumn>Tags</TableHeaderColumn>
    <TableHeaderColumn>Ability</TableHeaderColumn>
  </TableRow>
}

function WeaponData(props) {
  const { weapon, character } = props

  return(<TableRow>
    <TableRowColumn>{ weapon.name }</TableRowColumn>
    <TableRowColumn className="attackPoolColumn">
      { calc.witheringAttackPool(character, weapon) }{' '}
      ({ calc.decisiveAttackPool(character, weapon) } decisive)
    </TableRowColumn>
    <TableRowColumn className="damageColumn">
      { calc.weaponDamage(character, weapon) }
      { calc.weaponDamageType(weapon) }
    </TableRowColumn>
    <TableRowColumn className="parryColumn">
      { calc.weaponParry(character, weapon) }
    </TableRowColumn>
    <TableRowColumn className="overwhelmingColumn">
      { calc.weaponOverwhelming(weapon) }
    </TableRowColumn>
    <TableRowColumn className="tagsColumn">
      { weapon.tags.join(', ') }
    </TableRowColumn>
    <TableRowColumn className="abilityColumn">
      { weapon.ability }
    </TableRowColumn>
  </TableRow>)
}
WeaponData.propTypes = {
  weapon: React.PropTypes.shape(fullWeapon),
  character: React.PropTypes.shape({ ...withAttributes, ...withAbilities })
}

function WeaponEditHeader() {
  return <TableRow>
    <TableHeaderColumn>Weapon Name</TableHeaderColumn>
    <TableHeaderColumn style={{ width: '5em' }}>Weight</TableHeaderColumn>
    <TableHeaderColumn style={{ width: '2em' }}>Artifact?</TableHeaderColumn>
    <TableHeaderColumn>Tags</TableHeaderColumn>
    <TableHeaderColumn>Ability</TableHeaderColumn>
    <TableHeaderColumn style={{ width: '2em' }}>Pool</TableHeaderColumn>
    <TableHeaderColumn style={{ width: '2em' }}>Dmg</TableHeaderColumn>
    <TableHeaderColumn style={{ width: '2em' }}>-</TableHeaderColumn>
  </TableRow>
}

function WeightSelect(props) {
  return(
    <SelectField name="weight" value={ props.weapon.weight }
      onChange={ props.onChange } style={{ width: '4em' }}>
      <MenuItem value="light" label="L" primaryText="Light" />
      <MenuItem value="medium" label="M" primaryText="Medium" />
      <MenuItem value="heavy" label="H" primaryText="Heavy" />
    </SelectField>
  )
}
WeightSelect.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  weapon: React.PropTypes.shape({ weight: React.PropTypes.string.isRequired })
}

function AbilitySelect(props) {
  const options = calc.attackAbilities(props.character).map((abil) =>
    <MenuItem key={ abil.abil } value={abil.abil} primaryText={ abil.abil + '(' + abil.rating + ')' } />
  )
  return(
    <SelectField name="ability" value={ props.weapon.ability }
      onChange={ props.onChange }>
      {options}
    </SelectField>
  )
}
AbilitySelect.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  character: React.PropTypes.shape(withAbilities).isRequired,
  weapon: React.PropTypes.shape({ ability: React.PropTypes.string.isRequired }).isRequired
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
      <TableRowColumn style={{ verticalAlign: 'bottom' }}>
        <TextField name="name" value={ weapon.name }
          onBlur={ handleBlur } onChange={ handleChange } />
      </TableRowColumn>
      <TableRowColumn style={{ width: '5em', verticalAlign: 'baseline' }}>
        <WeightSelect weapon={ weapon } onChange={ handleWeightChange }/>
      </TableRowColumn>
      <TableRowColumn style={{ width: '2em' }}>
        <Checkbox name="is_artifact" checked={ weapon.is_artifact }
          onCheck={ handleChange }
        />
      </TableRowColumn>
      <TableRowColumn style={{ verticalAlign: 'bottom' }}>
        <TextField name="tags" value={ weapon.tags }
          onBlur={ handleBlur } onChange={ handleChange } />
      </TableRowColumn>
      <TableRowColumn style={{ verticalAlign: 'bottom' }}>
        <AbilitySelect character={ character } weapon={ weapon }
          onChange={ handleAbilityChange }
        />
      </TableRowColumn>
      <TableRowColumn style={{ width: '2em' }}>
        { calc.witheringAttackPool(character, weapon) }
      </TableRowColumn>
      <TableRowColumn style={{ width: '2em' }}>
        { calc.weaponDamage(character, weapon) }
      </TableRowColumn>
      <TableRowColumn style={{ width: '2em' }}>
        <IconButton onClick={ this.handleRemove } style={{ minWidth: '2em' }}>
          <ContentRemoveCircle />
        </IconButton>
      </TableRowColumn>
    </TableRow>
  }
}
WeaponFieldset.propTypes = {
  weapon: React.PropTypes.shape(fullWeapon),
  character: React.PropTypes.shape({ id: React.PropTypes.number.isRequired }).isRequired,
  onUpdate: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired
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
      <WeaponData key={weapon.id} character={character} weapon={weapon} />
    )
    const weapEdits = weapons.map((weapon) =>
      <WeaponFieldset key={weapon.id} character={character} weapon={weapon}
        onUpdate={ this.handleUpdate } onRemove={ this.handleRemove }
      />
    )

    return (<div className="weaponSummaryBlock">
      <h3>Weapons
        <FlatButton label={this.state.isEditing ? 'done' : 'edit' }
          onClick={ this.toggleEditor }
          style={{ float: 'right' }}
        />
        { this.state.isEditing &&
          <IconButton onClick={ this.handleAdd } style={{ float: 'right' }}>
            <ContentAddCircle />
          </IconButton>
        }
      </h3>
      <Table className="weaponTable" selectable={ false }>
        <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
          { this.state.isEditing ? <WeaponEditHeader /> : <WeaponHeader /> }
        </TableHeader>
        <TableBody displayRowCheckboxes={ false }>
          { this.state.isEditing ? weapEdits : weaps }
        </TableBody>
      </Table>
    </div>)
  }
}
WeaponSummary.propTypes = {
  weapons: React.PropTypes.arrayOf(React.PropTypes.shape(fullWeapon)),
  character: React.PropTypes.shape({ id: React.PropTypes.number.isRequired }).isRequired,
  _handleUpdate: React.PropTypes.func,
  _handleDestroy: React.PropTypes.func,
  _handleCreate: React.PropTypes.func,
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
