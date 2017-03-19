import React from 'react'
import * as calc from '../../utils/calculated'
import { ATTRIBUTES, ABILITIES, ABILITIES_ALL } from '../../utils/constants'

function NumericField(props) {
  const { name, value, index, onChange, onBlur } = props
  const max = props.max || 5
  return(
    <input type="number" name={ name } value={ value || '0' } min={ 0 } max={ max }
      data-index={ index }
      onChange={ onChange } onBlur={ onBlur }
    />
  )
}

function PlainTextField(props) {
  const { name, value, index, trait, onChange, onBlur } = props
  return(
    <input type="text" name={ name } value={ value }
      data-index={ index }
      onChange={ onChange } onBlur={ onBlur }
    />
  )
}

function SpecialtyAbilityField(props) {
  const { character, value, index, onChange, onBlur } = props

  const options = calc.abilitiesWithRatings(character).map((a) =>
    <option key={ a.abil } value={ a.pretty.toLowerCase() }>{ a.pretty }</option>
  )

  return (
    <select value={ value } data-index={ index } onChange={ onChange } onBlur={ onBlur }>
      { options }
    </select>
  )
}

function CraftFields(props) {
  const { trait, index, onChange, onBlur } = props
  const craft  = trait.craft
  const rating = trait.rating

  return(<span>
    Craft (
    <PlainTextField name="craft" index={ index } value={ craft }
      onChange={ onChange } onBlur={ onBlur }
    />
    ) :
    <NumericField name="rating" index={ index } value={ rating }
      onChange={ onChange } onBlur={ onBlur }
    />
  </span>)
}

function MartialArtFields(props) {
  const { trait, index, onChange, onBlur } = props
  const style  = trait.style
  const rating = trait.rating

  return(<span>
    Martial Arts (
    <PlainTextField name="style" index={ index } value={ style }
      onChange={ onChange } onBlur={ onBlur }
    />
    ) :
    <NumericField name="rating" index={ index } value={ rating }
      onChange={ onChange } onBlur={ onBlur }
    />
  </span>)
}

function SpecialtyFields(props) {
  const { character, trait, index, onChange, onBlur } = props
  const ability = trait.ability
  const context = trait.context
  return(<span>
    <SpecialtyAbilityField index={ index } value={ ability } character={ character }
      onChange={ onChange } onBlur={ onBlur }
    />
    <PlainTextField name="context" index={ index } value={ context }
      onChange={ onChange } onBlur={ onBlur }
    />
  </span>)
}

function IntimacyFields(props) {
  const { trait, index, onChange, onBlur } = props
  const subject = trait.subject
  const rating = trait.rating

  return (<span>
    <PlainTextField name="subject" index={ index } value={ subject }
      onChange={ onChange } onBlur={ onBlur }
    />
    <NumericField name="rating" index={ index } value={ rating }
      onChange={ onChange } onBlur={ onBlur }
    />
  </span>)
}

function TraitFields(props) {
  const { character, index, traitName, onRemove } = props

  let fields

  switch(traitName) {
  case "abil_craft":
    fields = <CraftFields {...props} />
    break
  case "abil_martial_arts":
    fields = <MartialArtFields {...props} />
    break
  case "specialties":
    fields = <SpecialtyFields {...props} />
    break
  case "ties":
  case "principles":
    fields = <IntimacyFields {...props} />
  }

  return(<div>
    { fields }
    <input type="button" value="-" onClick={ onRemove }
      data-trait={ traitName } data-index={ index }
    />
  </div>)
}

export default class ExpandableListEditor extends React.Component {
  constructor(props) {
    super(props)

    this.state = { trait: [ ...this.props.character[this.props.trait] ] }

    this.onChange = this.onChange.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onAdd = this.onAdd.bind(this)
    this.onRemove = this.onRemove.bind(this)
  }

  onChange(e) {
    e.preventDefault()
    const index = e.target.dataset.index
    const theTrait = this.state.trait.slice()

    let val
    if (e.target.type == "number")
      val = parseInt(e.target.value)
    else
      val = e.target.value

    theTrait[index] = { ...theTrait[index], [e.target.name]: val }

    this.setState({ trait: theTrait })

    //this.props.onUpdate(this.props.trait, theTrait)
  }

  onBlur(e) {
    e.preventDefault()
    const index = e.target.dataset.index
    const trait = e.target.name

    const oldTrait = this.props.character[this.props.trait]
    const newTrait = this.state.trait

    if(oldTrait[index] != undefined && oldTrait[index][trait] == newTrait[index][trait])
      return

    this.props.onBlur(this.props.trait, this.state.trait)
  }

  onAdd(e) {
    e.preventDefault()
    let newTrait

    switch(this.props.trait) {
    case "abil_craft":
      newTrait = { craft: "", rating: 0 }
      break
    case "abil_martial_arts":
      newTrait = {style: "", rating: 0}
      break
    case "specialties":
      newTrait = {ability: "", context: ""}
      break
    case "ties":
    case "principles":
      newTrait = {subject: "", rating: 0}
      break
    }

    this.setState({ trait: [ ...this.state.trait, newTrait ] })
  }

  onRemove(e) {
    e.preventDefault()
    const index = e.target.dataset.index

    let newTrait = this.state.trait.slice()
    newTrait.splice(index, 1)

    this.setState({ trait: newTrait })
    this.props.onUpdate(this.props.trait, newTrait)
  }

  render() {
    const { character, trait } = this.props
    const { onChange, onBlur, onAdd, onRemove } = this

    const traits = this.state.trait.map((e, index) =>
      <TraitFields key={ index } index={ index } character={ character }
        traitName={ trait } trait={ e }
        onChange={ onChange } onBlur={ onBlur } onRemove={ onRemove }
      />
    )

    return (
      <div>
        { traits }
        <input type="button" value="+" onClick={ onAdd } data-trait={ trait } />
      </div>
    )
  }
}
