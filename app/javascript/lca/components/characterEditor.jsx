import React from 'react'
import { connect } from 'react-redux'
import { ATTRIBUTES, ABILITIES } from '../utils/constants'

function EditorBlock(props) {
  const type = props.type || "text"

  return(<div>
    <label htmlFor={ props.trait }>{ props.prettyName }:</label>
    <input type={ type } name={ props.trait } value={ props.value }
      onChange={ props.onChange } onBlur={ props.onBlur } />
  </div>)
}

function AttributeFieldset(props) {
  const { character, handleChange, handleBlur } = props

  const blox = ATTRIBUTES.map((attr) =>
    <EditorBlock key={ attr.attr } value={ character[attr.attr] }
      trait={ attr.attr } prettyName={ attr.pretty }
      type="number" onChange={ handleChange } onBlur={ handleBlur } />
  )

  return(
    <fieldset>
      <legend>Attributes</legend>
      { blox }
    </fieldset>
  )
}

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
    </fieldset>
  )
}

class _CharacterEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { character: this.props.character }

    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleChange(e) {
    this.setState({character: {... this.state.character, [e.target.name]: e.target.value}})
  }

  handleBlur(e) {
    this.props.onUpdate(this.state.character.id, e.target.name, e.target.value)
  }


  render() {
    const ch = this.state.character
    const attributes = [
      "attr_strength", "attr_dexterity", "attr_stamina",
      "attr_charisma", "attr_manipulation", "attr_appearance",
      "attr_perception", "attr_intelligence", "attr_wits"
    ]

    const { handleChange, handleBlur } = this

    return(<form>
      <button onClick={this.props.toggleClick}>end editing</button>
      <h1>Editing { ch.name }</h1>

      <fieldset>
        <legend>Basics</legend>
        <EditorBlock trait="name" value={ ch.name } prettyName="Name"
          onChange={ handleChange } onBlur={ handleBlur } />

        <label htmlFor="description">Description:</label>
        <textarea name="description" value={ ch.description } onChange={this.handleChange} />

        <EditorBlock trait="essence" value={ ch.essence } prettyName="Essence"
          type="number" onChange={ handleChange } onBlur={ handleBlur } />
      </fieldset>

      <AttributeFieldset character={ ch }
        handleChange={ handleChange } handleBlur={ handleBlur } />
      <AbilityFieldset character={ ch }
        handleChange={ handleChange } handleBlur={ handleBlur } />

      <fieldset>
        <legend>Willpower and Health Levels</legend>
        <EditorBlock prettyName="Temporary (current) Willpower"
          type="number"
          trait="willpower_temporary" value={ ch.willpower_temporary }
          onChange={ handleChange } onBlur={ handleBlur } />
        <EditorBlock prettyName="Permanant Willpower"
          type="number"
          trait="willpower_permanent" value={ ch.willpower_permanent }
          onChange={ handleChange } onBlur={ handleBlur } />

        <EditorBlock prettyName="-0 Health Levels"
          type="number"
          trait="health_level_0s" value={ ch.health_level_0s }
          onChange={ handleChange } onBlur={ handleBlur } />
        <EditorBlock prettyName="-1 Health Levels"
          type="number"
          trait="health_level_1s" value={ ch.health_level_1s }
          onChange={ handleChange } onBlur={ handleBlur } />
        <EditorBlock prettyName="-2 Health Levels"
          type="number"
          trait="health_level_2s" value={ ch.health_level_2s }
          onChange={ handleChange } onBlur={ handleBlur } />
        <EditorBlock prettyName="-4 Health Levels"
          type="number"
          trait="health_level_4s" value={ ch.health_level_4s }
          onChange={ handleChange } onBlur={ handleBlur } />
        <EditorBlock prettyName="Incap Health Levels"
          type="number"
          trait="health_level_incap" value={ ch.health_level_incap }
          onChange={ handleChange } onBlur={ handleBlur } />
        <EditorBlock prettyName="Bashing Damage"
          type="number"
          trait="damage_bashing" value={ ch.damage_bashing }
          onChange={ handleChange } onBlur={ handleBlur } />
        <EditorBlock prettyName="Lethal Damage"
          type="number"
          trait="damage_lethal" value={ ch.damage_lethal }
          onChange={ handleChange } onBlur={ handleBlur } />
        <EditorBlock prettyName="Aggravated Damage"
          type="number"
          trait="damage_aggravated" value={ ch.damage_aggravated }
          onChange={ handleChange } onBlur={ handleBlur } />
      </fieldset>



    </form>)
  }
}
function mapStateToProps(state) {
  return {character: state.character}
}

const CharacterEditor = connect(mapStateToProps)(_CharacterEditor)

export default CharacterEditor
