import React from 'react'
import { connect } from 'react-redux'
import { ATTRIBUTES, ABILITIES, ABILITIES_ALL } from '../utils/constants' 
import { EditorBlock } from './editor/editorBlock.jsx'
import ExpandableListEditor from './editor/expandableListEditor.jsx'
import CombatBlock from './characterSheet/combatBlock.jsx'
import { AttributeFieldset } from './editor/attributeFieldset.jsx'
import WeaponEditor from './editor/weaponEditor.jsx'

function AbilityFieldset(props) {
  const { character, handleChange, handleBlur } = props

  const blox = ABILITIES.map((abil) =>
    <EditorBlock key={ abil.abil } value={ character[abil.abil] }
      trait={ abil.abil } prettyName={ abil.pretty }
      type="number" onChange={ handleChange } onBlur={ handleBlur } />
  )

  return(
    <fieldset>
      <legend>Abilities</legend>
      { blox }
      { props.children }
    </fieldset>
  )
}

class _CharacterEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { character: this.props.character }

    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)

    this.onListChange = this.onListChange.bind(this)
    this.onListBlur = this.onListBlur.bind(this)
  }

  handleChange(e) {
    e.preventDefault()
    let val = null

    if (e.target.type == "number")
      val = parseInt(e.target.value)

    else if (e.target.type == "checkbox") {
      val = ! this.state.character[e.target.name]
      this.props.onUpdate(this.state.character.id, e.target.name, val)

    } else if (e.target.dataset.array) {
      val = e.target.value.split(",")

    } else
      val = e.target.value

    this.setState({character: {... this.state.character, [e.target.name]: val}})
  }

  handleBlur(e) {
    e.preventDefault()
    const trait = e.target.name
    if (this.state.character[trait] == this.props.character[trait])
      return

    this.props.onUpdate(this.state.character.id, trait, this.state.character[trait])
  }

  onListChange(trait, value) {
    //this.setState({ character: { ...this.state.character, [trait]: value}})
  }

  onListBlur(trait, value) {
    this.setState({ character: { ...this.state.character, [trait]: value}})
    this.props.onUpdate(this.state.character.id, trait, value)
  }

  handleSubmit(e) {
    e.preventDefault()
  }

  render() {
    const ch = this.state.character
    const {
      handleSubmit, handleChange, handleBlur,
      onListChange, onListBlur,
      handleWeaponChange
    } = this
    const { weapons, merits } = this.props

    return(<form action="" onSubmit={ handleSubmit }>
      <button onClick={this.props.toggleClick}>end editing</button>
      <h1>Editing { ch.name }</h1>


      <CombatBlock character={ ch } weapons={ weapons } merits={ merits } />

      <fieldset>
        <legend>Basics</legend>
        <EditorBlock trait="name" value={ ch.name } prettyName="Name"
          onChange={ handleChange } onBlur={ handleBlur } />

        <label htmlFor="description">Description:</label>
        <textarea name="description" value={ ch.description } onChange={handleChange} onBlur={handleBlur} />

        <EditorBlock trait="essence" value={ ch.essence } prettyName="Essence"
          type="number" min={ 1 } onChange={ handleChange } onBlur={ handleBlur } />

        <h4>Ties</h4>
        <ExpandableListEditor character={ ch } trait="ties"
          onUpdate={ onListChange } onBlur={ onListBlur }
        />
        <h4>Principles</h4>
        <ExpandableListEditor character={ ch } trait="principles"
          onUpdate={ onListChange } onBlur={ onListBlur }
        />
      </fieldset>

      <AttributeFieldset character={ ch }
        handleChange={ handleChange } handleBlur={ handleBlur } />

      <AbilityFieldset character={ ch }
        handleChange={ handleChange } handleBlur={ handleBlur }>
        <h4>Crafts:</h4>
        <ExpandableListEditor character={ ch } trait="abil_craft"
          onUpdate={ onListChange } onBlur={ onListBlur }
        />
        <h4>Martial Arts:</h4>
        <ExpandableListEditor character={ ch } trait="abil_martial_arts"
          onUpdate={ onListChange } onBlur={ onListBlur }
        />
        <h4>Specialties:</h4>
        <ExpandableListEditor character={ ch } trait="specialties"
          onUpdate={ onListChange } onBlur={ onListBlur }
        />
      </AbilityFieldset>

      <WeaponEditor character={ ch } weapons={ weapons } />

      <fieldset>
        <legend>Armor</legend>
        <EditorBlock prettyName="Armor Name"
          type="text"
          trait="armor_name" value={ ch.armor_name }
          onChange={ handleChange } onBlur={ handleBlur } />
        <label htmlFor="armor_weight">Weight:</label>
        <select name="armor_weight" value={ ch.armor_weight } onChange={ handleChange } onBlur={ handleBlur }>
          <option value="unarmored">Unarmored</option>
          <option value="light">Light</option>
          <option value="medium">Medium</option>
          <option value="heavy">Heavy</option>
        </select>

        <label htmlFor="armor_is_artifact">Artifact ?</label>
        <input type="checkbox" name="armor_is_artifact" checked={ ch.armor_is_artifact } onChange={ handleChange } />

        <label htmlFor="armor_tags">Tags:</label>
        <input type="text" name="armor_tags" value={ ch.armor_tags } onChange={handleChange} onBlur={ handleBlur } data-array={ true } />
      </fieldset>

      <fieldset>
        <legend>Willpower and Health Levels</legend>
        <EditorBlock prettyName="Temporary (current) Willpower"
          type="number" max={ 10 }
          trait="willpower_temporary" value={ ch.willpower_temporary }
          onChange={ handleChange } onBlur={ handleBlur } />
        <EditorBlock prettyName="Permanant Willpower"
          type="number" max={ 10 }
          trait="willpower_permanent" value={ ch.willpower_permanent }
          onChange={ handleChange } onBlur={ handleBlur } />

        <EditorBlock prettyName="-0 Health Levels"
          type="number" noMax
          trait="health_level_0s" value={ ch.health_level_0s }
          onChange={ handleChange } onBlur={ handleBlur } />
        <EditorBlock prettyName="-1 Health Levels"
          type="number" noMax
          trait="health_level_1s" value={ ch.health_level_1s }
          onChange={ handleChange } onBlur={ handleBlur } />
        <EditorBlock prettyName="-2 Health Levels"
          type="number" noMax
          trait="health_level_2s" value={ ch.health_level_2s }
          onChange={ handleChange } onBlur={ handleBlur } />
        <EditorBlock prettyName="-4 Health Levels"
          type="number" noMax
          trait="health_level_4s" value={ ch.health_level_4s }
          onChange={ handleChange } onBlur={ handleBlur } />
        <EditorBlock prettyName="Incap Health Levels"
          type="number" noMax
          trait="health_level_incap" value={ ch.health_level_incap }
          onChange={ handleChange } onBlur={ handleBlur } />
        <EditorBlock prettyName="Bashing Damage"
          type="number" noMax
          trait="damage_bashing" value={ ch.damage_bashing }
          onChange={ handleChange } onBlur={ handleBlur } />
        <EditorBlock prettyName="Lethal Damage"
          type="number" noMax
          trait="damage_lethal" value={ ch.damage_lethal }
          onChange={ handleChange } onBlur={ handleBlur } />
        <EditorBlock prettyName="Aggravated Damage"
          type="number" noMax
          trait="damage_aggravated" value={ ch.damage_aggravated }
          onChange={ handleChange } onBlur={ handleBlur } />
      </fieldset>



    </form>)
  }
}
function mapStateToProps(state) {
  return {}
}

const CharacterEditor = connect(mapStateToProps)(_CharacterEditor)

export default CharacterEditor
