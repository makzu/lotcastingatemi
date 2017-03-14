import React from 'react'
import { connect } from 'react-redux'
import { ATTRIBUTES, ABILITIES } from '../utils/constants'

function EditorBlock(props) {
  const type = props.type || "text"

  let extraProps = {}

  if (type == "number") {
    extraProps.min = props.min || 0
  }
  if (type == "number" && ! props.noMax ) {
    extraProps.max = props.max || 5
  }

  return(<div>
    <label htmlFor={ props.trait }>{ props.prettyName }:</label>
    <input type={ type } name={ props.trait } value={ props.value }
      onChange={ props.onChange } onBlur={ props.onBlur } {...extraProps} />
  </div>)
}

function AttributeFieldset(props) {
  const { character, handleChange, handleBlur } = props

  const blox = ATTRIBUTES.map((attr) =>
    <EditorBlock key={ attr.attr } value={ character[attr.attr] }
      trait={ attr.attr } prettyName={ attr.pretty } min={ 1 }
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

function CraftFieldset(props) {
  const { character, handleChange, handleBlur, addCraft, removeCraft } = props

  const crafts = character.abil_craft.map((craft, index) =>
    <p key={index}>
      Craft 
      <input type="text" value={ craft.craft } name={ index }
        onChange={ handleChange } onBlur={ handleBlur } />
      <input type="number" value={ craft.rating } name={ index }
        onChange={ handleChange } onBlur={ handleBlur } min={ 0 } max={ 5 } />
      <input type="button" value="-" name={ index } onClick={ removeCraft } />
    </p>
  )
  return(<div>
    <h4>Crafts:</h4>
    {crafts}
    <input type="button" value="+" onClick={ addCraft } />
  </div>)
}

function MartialArtsFieldset(props) {
  const { character, handleChange, handleBlur, addMa, removeMa } = props

  const mas = character.abil_martial_arts.map((ma, index) =>
    <p key={index}>
      Martial Arts 
      <input type="text" value={ ma.style } name={ index }
        onChange={ handleChange } onBlur={ handleBlur } />
      <input type="number" value={ ma.rating } name={ index }
        onChange={ handleChange } onBlur={ handleBlur } min={ 0 } max={ 5 } />
      <input type="button" value="-" name={ index } onClick={ removeMa } />
    </p>
  )
  return(<div>
    <h4>Martial Arts:</h4>
    {mas}
    <input type="button" value="+" onClick={ addMa } />
  </div>)
}

class _CharacterEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { character: this.props.character }

    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleCraftBlur = this.handleCraftBlur.bind(this)
    this.handleCraftChange = this.handleCraftChange.bind(this)
    this.handleMaBlur = this.handleMaBlur.bind(this)
    this.handleMaChange = this.handleMaChange.bind(this)

    this.addCraft = this.addCraft.bind(this)
    this.removeCraft = this.removeCraft.bind(this)
    this.addMa = this.addMa.bind(this)
    this.removeMa = this.removeMa.bind(this)
  }

  handleChange(e) {
    e.preventDefault()
    let val = null
    if (e.target.type == "number")
      val = parseInt(e.target.value)
    else
      val = e.target.value

    this.setState({character: {... this.state.character, [e.target.name]: val}})
  }

  handleBlur(e) {
    e.preventDefault()
    this.props.onUpdate(this.state.character.id, e.target.name, this.state.character[e.target.name])
  }

  handleCraftChange(e) {
    e.preventDefault()
    const index = e.target.name
    let craft = this.state.character.abil_craft.slice()

    if (e.target.type == "number") {
      craft[index].rating = parseInt(e.target.value)
    } else {
      craft[index].craft = e.target.value
    }

    this.setState({character: {... this.state.character, abil_craft: craft}})
  }

  addCraft(e) {
    e.preventDefault()
    let craft = this.state.character.abil_craft.slice()
    craft.push({ craft: "", rating: 0 })

    this.setState({character: {... this.state.character, abil_craft: craft}})
  }
  removeCraft(e) {
    e.preventDefault()
    const index = parseInt(e.target.name)

    let craft = this.state.character.abil_craft.slice()
    craft.splice(index, 1)

    this.setState({character: {... this.state.character, abil_craft: craft}})
    this.props.onUpdate(this.state.character.id, "abil_craft", craft)
  }

  handleCraftBlur(e) {
    this.props.onUpdate(this.state.character.id, "abil_craft", this.state.character.abil_craft)
  }

  handleMaChange(e) {
    e.preventDefault()
    let ma = this.state.character.abil_martial_arts.slice()

    if (e.target.type == "number") {
      ma[e.target.name].rating = parseInt(e.target.value)
    } else {
      ma[e.target.name].style = e.target.value
    }

    this.setState({character: {... this.state.character, abil_martial_arts: ma}})
  }
  addMa(e) {
    e.preventDefault()
    let ma = this.state.character.abil_martial_arts.slice()
    ma.push({ craft: "", rating: 0 })

    this.setState({character: {... this.state.character, abil_martial_arts: ma}})
  }
  removeMa(e) {
    e.preventDefault()
    const index = parseInt(e.target.name)

    let ma = this.state.character.abil_martial_arts.slice()
    ma.splice(index, 1)

    this.setState({character: {... this.state.character, abil_martial_arts: ma}})
    this.props.onUpdate(this.state.character.id, "abil_martial_arts", ma)
  }

  handleMaBlur(e) {
    this.props.onUpdate(this.state.character.id, "abil_martial_arts", this.state.character.abil_martial_arts)
  }


  handleSubmit(e) {
    e.preventDefault()
  }


  render() {
    const ch = this.state.character
    const attributes = [
      "attr_strength", "attr_dexterity", "attr_stamina",
      "attr_charisma", "attr_manipulation", "attr_appearance",
      "attr_perception", "attr_intelligence", "attr_wits"
    ]

    const { handleSubmit, handleChange, handleBlur, handleCraftChange, handleCraftBlur, handleMaChange, handleMaBlur } = this

    return(<form action="" onSubmit={ handleSubmit }>
      <button onClick={this.props.toggleClick}>end editing</button>
      <h1>Editing { ch.name }</h1>

      <fieldset>
        <legend>Basics</legend>
        <EditorBlock trait="name" value={ ch.name } prettyName="Name"
          onChange={ handleChange } onBlur={ handleBlur } />

        <label htmlFor="description">Description:</label>
        <textarea name="description" value={ ch.description } onChange={handleChange} onBlur={handleBlur} />

        <EditorBlock trait="essence" value={ ch.essence } prettyName="Essence"
          type="number" min={1} onChange={ handleChange } onBlur={ handleBlur } />
      </fieldset>

      <fieldset>
        <legend>Craft and Martial Arts</legend>
        <CraftFieldset character={ ch }
          handleChange={ handleCraftChange } handleBlur={ handleCraftBlur }
          addCraft={this.addCraft} removeCraft={ this.removeCraft } />
        <MartialArtsFieldset character={ ch }
          handleChange={ handleMaChange } handleBlur={ handleMaBlur }
          addMa={this.addMa} removeMa={this.removeMa} />
      </fieldset>

      <AttributeFieldset character={ ch }
        handleChange={ handleChange } handleBlur={ handleBlur } />

      <AbilityFieldset character={ ch }
        handleChange={ handleChange } handleBlur={ handleBlur } />

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
          type="number"
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
  return {character: state.character}
}

const CharacterEditor = connect(mapStateToProps)(_CharacterEditor)

export default CharacterEditor
