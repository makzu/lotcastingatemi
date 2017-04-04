import React from 'react'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/FlatButton'
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle'
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle'

import * as calc from '../../utils/calculated'
import { ATTRIBUTES, ABILITIES, ABILITIES_ALL } from '../../utils/constants'

function CraftFields(props) {
  const { trait, index, onChange, onBlur } = props
  const craft  = trait.craft
  const rating = trait.rating

  return(<span>
    <TextField name="craft" data-index={ index } value={ craft }
      floatingLabelText="Craft:" onChange={ onChange } onBlur={ onBlur }
    />
    <TextField name="rating" data-index={ index } value={ rating }
      floatingLabelText="rating"
      className="editor-rating-field"
      type="number" min={ 0 } max={ 5 }
      onChange={ onChange } onBlur={ onBlur }
    />
  </span>)
}

function QcActionFields(props) {
  const { trait, index, onChange, onBlur } = props
  const action  = trait.action
  const pool = trait.pool

  return(<span>
    <TextField name="action" data-index={ index } value={ action }
      floatingLabelText="Action:" onChange={ onChange } onBlur={ onBlur }
    />
    <TextField name="pool" data-index={ index } value={ pool }
      floatingLabelText="pool"
      className="editor-rating-field"
      type="number" min={ 0 } max={ 5 }
      onChange={ onChange } onBlur={ onBlur }
    />
  </span>)
}

function MartialArtFields(props) {
  const { trait, index, onChange, onBlur } = props
  const style  = trait.style
  const rating = trait.rating

  return(<span>
    <TextField name="style" data-index={ index } value={ style }
      floatingLabelText="Style:" onChange={ onChange } onBlur={ onBlur }
    />
    <TextField name="rating" data-index={ index } value={ rating }
      floatingLabelText="rating"
      className="editor-rating-field"
      type="number" min={ 0 } max={ 5 }
      onChange={ onChange } onBlur={ onBlur }
    />
  </span>)
}

function SpecialtyFields(props) {
  const { character, trait, index, onChange, onSpecialtyAbilityChange, onBlur } = props
  const ability = trait.ability
  const context = trait.context

  const abilOptions = calc.abilitiesWithRatings(character).map((a) =>
    <MenuItem key={ a.abil } value={ a.pretty.toLowerCase() } primaryText={ a.pretty } />
  )

  const onAbilityChange = (e, key, payload) => {
    return onSpecialtyAbilityChange(e, index, payload)
  }

  return(<span>
    <SelectField value={ ability } data-index={ index } floatingLabelText="Ability:"
      name="ability"
      className="abilityField specialtyAbilityField"
      onChange={ onAbilityChange }
    >
      { abilOptions }
    </SelectField>
    <TextField name="context" data-index={ index } value={ context }
      floatingLabelText="Context:"
      className="specialtyContextField"
      onChange={ onChange } onBlur={ onBlur }
    />
  </span>)
}

function IntimacyFields(props) {
  const { trait, index, onChange, onBlur } = props
  const subject = trait.subject
  const rating = trait.rating

  return (<span>
    <TextField name="subject" data-index={ index } value={ subject }
      floatingLabelText="Subject:"
      onChange={ onChange } onBlur={ onBlur }
    />
    <TextField name="rating" data-index={ index } value={ rating }
      floatingLabelText="Rating:"
      className="editor-rating-field"
      type="number" min={ 1 } max={ 3 }
      onChange={ onChange } onBlur={ onBlur }
    />
  </span>)
}

function TraitFields(props) {
  const { character, index, traitName, onRemove } = props

  let fields

  switch(traitName) {
  case 'abil_craft':
    fields = <CraftFields {...props} />
    break
  case 'abil_martial_arts':
    fields = <MartialArtFields {...props} />
    break
  case 'specialties':
    fields = <SpecialtyFields {...props} />
    break
  case 'ties':
  case 'principles':
    fields = <IntimacyFields {...props} />
    break
  case 'actions':
    fields = <QcActionFields {...props} />
    break
  }

  const click = (e) => {
    return onRemove(e, index)
  }

  return(<div>
    { fields }
    <IconButton onClick={ click } style={{ minWidth: '2em' }}><ContentRemoveCircle /></IconButton>
  </div>)
}

export default class ExpandableListEditor extends React.Component {
  constructor(props) {
    super(props)

    this.state = { trait: [ ...this.props.character[this.props.trait] ] }

    this.onChange = this.onChange.bind(this)
    this.onSpecialtyAbilityChange = this.onSpecialtyAbilityChange.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onAdd = this.onAdd.bind(this)
    this.onRemove = this.onRemove.bind(this)
  }

  onChange(e) {
    e.preventDefault()
    const index = e.target.dataset.index
    const theTrait = this.state.trait.slice()

    const Max = this.props.numberMax

    let val
    if (e.target.type == 'number') {
      val = parseInt(e.target.value)
      if (Max && val > Max)
        val = Max
      if (val < 0)
        val = 0
    } else
      val = e.target.value

    theTrait[index] = { ...theTrait[index], [e.target.name]: val }

    this.setState({ trait: theTrait })
  }

  onSpecialtyAbilityChange(e, index, payload) {
    const theTrait = this.state.trait.slice()
    theTrait[index] = { ...theTrait[index], ability: payload }

    this.setState({ trait: theTrait })

    this.props.onUpdate(this.props.trait, theTrait)
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
    case 'abil_craft':
      newTrait = { craft: '', rating: 0 }
      break
    case 'abil_martial_arts':
      newTrait = { style: '', rating: 0 }
      break
    case 'specialties':
      newTrait = { ability: '', context: '' }
      break
    case 'ties':
    case 'principles':
      newTrait = { subject: '', rating: 0 }
      break
    case 'actions':
      newTrait = { action: '', pool: 0 }
    }

    this.setState({ trait: [ ...this.state.trait, newTrait ] })
  }

  onRemove(e, index) {
    let newTrait = this.state.trait.slice()
    newTrait.splice(index, 1)

    this.setState({ trait: newTrait })
    this.props.onUpdate(this.props.trait, newTrait)
  }

  render() {
    const { character, trait } = this.props
    const { onChange, onSpecialtyAbilityChange, onBlur, onAdd, onRemove } = this
    let traitName
    switch(trait){
    case 'abil_craft':
      traitName = 'Craft'
      break
    case 'abil_martial_arts':
      traitName = 'Martial Art'
      break
    case 'specialties':
      traitName = 'Specialty'
      break
    case 'principles':
      traitName = 'Principle'
      break
    case 'ties':
      traitName = 'Tie'
      break
    case 'actions':
      traitName = 'Action'
      break
    }


    const traits = this.state.trait.map((e, index) =>
      <TraitFields key={ index } index={ index } character={ character }
        traitName={ trait } trait={ e }
        onChange={ onChange } onBlur={ onBlur } onRemove={ onRemove }
        onSpecialtyAbilityChange={ onSpecialtyAbilityChange }
      />
    )

    return (
      <div>
        { traits }
        <RaisedButton label={ 'Add ' + traitName } icon={ <ContentAddCircle /> } onClick={ onAdd } data-trait={ trait } />
      </div>
    )
  }
}
