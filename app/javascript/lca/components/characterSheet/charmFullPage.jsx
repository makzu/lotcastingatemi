import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle'
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import AbilitySelect from '../generic/abilitySelect.jsx'
import { updateCharm, createCharm, destroyCharm } from '../../ducks/actions.js'
import { clamp } from '../../utils'
import { isAbilityCharm, abilitiesWithRatings } from '../../utils/calculated'
import { ABILITY_MIN, ABILITY_MAX, ESSENCE_MIN, ESSENCE_MAX } from '../../utils/constants.js'

function SingleCharm(props) {
  const { charm } = props

  const ability = charm.type == 'MartialArtsCharm' ? 'Martial Arts' : charm.ability
  const styleBlock = charm.type == 'MartialArtsCharm' ? <small>({charm.style} style)<br /></small> : ''
  const artifactBlock = charm.type == 'Evocation' ? <span><strong>Artifact:</strong> {charm.artifact_name}<br/></span> : ''
  const abilitySpan = isAbilityCharm(charm) ? <span>{ ability } { charm.min_ability }, </span> : ''

  return <div className="singleCharm">
    <h3>{ charm.name }</h3>
    <p>
      { styleBlock }
      { artifactBlock }
      <strong>Cost:</strong> { charm.cost }; {' '}
      <strong>Mins:</strong> { abilitySpan } Essence { charm.min_essence }<br />
      <strong>Type:</strong> { charm.timing }<br />
      <strong>Keywords:</strong> { charm.keywords.join(', ') }<br />
      <strong>Duration:</strong> { charm.duration }<br />
      <strong>Prerequisite Charms:</strong> { charm.prereqs }
    </p>
    <p>{ charm.body }</p>
    <Divider />
  </div>
}
SingleCharm.propTypes = {
  charm: PropTypes.object,
}

class SingleCharmEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { charm: this.props.charm }

    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleAbilityChange = this.handleAbilityChange.bind(this)
    this.handleTimingChange = this.handleTimingChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleChange(e) {
    e.preventDefault()
    let val = e.target.value
    if (e.target.name == 'min_ability') {
      val = clamp(parseInt(val), ABILITY_MIN, ABILITY_MAX)
    } else if (e.target.name == 'min_essence') {
      val = clamp(parseInt(val), ESSENCE_MIN, ESSENCE_MAX)
    }

    this.setState({ charm: { ...this.state.charm, [e.target.name]: val }})
  }

  handleBlur(e) {
    const trait = e.target.name
    const { charm } = this.state

    if (charm[trait] != this.props.charm[trait]) {
      this.props.onUpdate(charm.id, charm.character_id, trait, charm[trait])
    }
  }

  handleTimingChange(e, key, value) {
    const { charm } = this.state

    this.setState({ charm: { ...charm, timing: value }})
    this.props.onUpdate(charm.id, charm.character_id, 'timing', value)
  }

  handleAbilityChange(e, key, value) {
    const { charm } = this.state

    this.setState({ charm: { ...charm, ability: value }})
    this.props.onUpdate(charm.id, charm.character_id, 'ability', value)
  }

  handleRemove() {
    this.props.onRemove(this.state.charm.id)
  }

  render() {
    const { character } = this.props
    const { charm } = this.state
    const showAbility = charm.type == 'SolarCharm'
    const showMinAbility = isAbilityCharm(charm)

    return <div className="singleCharm">
      <TextField name="name" value={ charm.name }
        onChange={ this.handleChange } onBlur={ this.handleBlur }
        floatingLabelText="Name:"
      />
      <br />
      { charm.type == 'Evocation' &&
        <TextField name="artifact_name" value={ charm.artifact_name }
          onChange={ this.handleChange } onBlur={ this.handleBlur }
          floatingLabelText="Artifact Name:"
        />
      }
      Mins:
      { showAbility &&
        <AbilitySelect name="ability"
          abilities={ abilitiesWithRatings(character) }
          value={ charm.ability }
          onChange={ this.handleAbilityChange }
          multiple={ false }
        />
      }
      { charm.type == 'MartialArtsCharm' &&
        <TextField name="style" value={ charm.style }
          onChange={ this.handleChange } onBlur={ this.handleBlur }
          floatingLabelText="Style:"
        />
      }
      { showMinAbility &&
        <TextField name="min_ability" value={ charm.min_ability }
          type="number" min={ 1 } max={ 5 }
          onChange={ this.handleChange } onBlur={ this.handleBlur }
          floatingLabelText="Minimum Ability:"
        />
      }
      <TextField name="min_essence" value={ charm.min_essence }
        type="number" min={ 1 } max={ 10 }
        onChange={ this.handleChange } onBlur={ this.handleBlur }
        floatingLabelText="Essence:"
      />
      <br />
      <SelectField
        floatingLabelText="Type:"
        value={ charm.timing }
        onChange={ this.handleTimingChange }
      >
        <MenuItem value="reflexive" primaryText="Reflexive" />
        <MenuItem value="supplemental" primaryText="Supplemental" />
        <MenuItem value="simple" primaryText="Simple" />
        <MenuItem value="permanent" primaryText="Permanent" />
      </SelectField>
      <br />
      <TextField name="keywords" value={ charm.keywords }
        onChange={ this.handleChange } onBlur={ this.handleBlur }
        floatingLabelText="Keywords:"
      />
      <br />
      <TextField name="duration" value={ charm.duration }
        onChange={ this.handleChange } onBlur={ this.handleBlur }
        floatingLabelText="Duration:"
      />
      <br />
      <TextField name="prereqs" value={ charm.prereqs }
        onChange={ this.handleChange } onBlur={ this.handleBlur }
        floatingLabelText="Prerequisite Charms:"
      />
      <br />
      <TextField name="body" value={ charm.body }
        onChange={ this.handleChange } onBlur={ this.handleBlur }
        floatingLabelText="Effect:"
      />
      <br />
      <TextField name="ref" value={ charm.ref }
        onChange={ this.handleChange } onBlur={ this.handleBlur }
        floatingLabelText="Ref:"
      />
      <IconButton onClick={ this.handleRemove } label="Remove"
        style={{ float: 'right' }}
      >
        <ContentRemoveCircle />
      </IconButton>
    </div>
  }
}
SingleCharmEditor.propTypes = {
  charm: PropTypes.object.isRequired,
  character: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

class CharmFullPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isEditing: false }

    this.toggleEditor = this.toggleEditor.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleAddNative = this.handleAddNative.bind(this)
    this.handleAddMA = this.handleAddMA.bind(this)
    this.handleAddEvocation = this.handleAddEvocation.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  toggleEditor() {
    this.setState({ isEditing: !this.state.isEditing })
  }

  handleUpdate(id, charId, trait, value) {
    this.props._handleUpdate(id, charId, trait, value)
  }

  handleAddNative() {
    let type
    switch(this.props.character.type) {
    case 'SolarCharacter':
      type = 'SolarCharm'
      break
    default:
      type = ''
    }
    this.props._handleCreate(this.props.character.id, type)
  }

  handleAddMA() {
    this.props._handleCreate(this.props.character.id, 'MartialArtsCharm')
  }

  handleAddEvocation() {
    this.props._handleCreate(this.props.character.id, 'Evocation')
  }

  handleRemove(id) {
    this.props._handleDestroy(id, this.props.character.id)
  }

  render() {
    const { character, nativeCharms, martialArtsCharms, evocations } = this.props
    if (character == undefined) {
      return null // TODO replace with spinner or something?
    }

    let natives = []
    let maCharms = []
    let evo = []
    if (this.state.isEditing) {
      natives = nativeCharms.map((c) =>
        <SingleCharmEditor key={ c.id } charm={ c } character={ character }
          onUpdate={ this.handleUpdate } onRemove={ this.handleRemove }
        />
      )
      maCharms = martialArtsCharms.map((c) =>
        <SingleCharmEditor key={ c.id } charm={ c } character={ character }
          onUpdate={ this.handleUpdate } onRemove={ this.handleRemove }
        />
      )
      evo = evocations.map((c) =>
        <SingleCharmEditor key={ c.id } charm={ c } character={ character }
          onUpdate={ this.handleUpdate } onRemove={ this.handleRemove }
        />
      )
    } else {
      natives = nativeCharms.map((c) =>
        <SingleCharm key={ c.id } charm={ c } character={ character } />
      )
      maCharms = martialArtsCharms.map((c) =>
        <SingleCharm key={ c.id } charm={ c } character={ character } />
      )
      evo = evocations.map((c) =>
        <SingleCharm key={ c.id } charm={ c } character={ character } />
      )
    }
    return <div className="charmPage page">
      <h1>
        Charms
        <small style={{ fontSize: '60%', marginLeft: '5em' }}>
          <Link style={{ textDecoration: 'none' }} to={`/characters/${character.id}` }>
            Back to full sheet
          </Link>
        </small>
        <FlatButton style={{ float: 'right' }} label={ this.state.isEditing ? 'done' : 'edit' } onClick={ this.toggleEditor } />
        { this.state.isEditing &&
          <FlatButton onClick={ this.handleAddNative } label="Add Native Charm"
            style={{ float: 'right' }}

            icon={<ContentAddCircle />}
          />
        }
      </h1>
      { natives }
      { this.state.isEditing &&
        <FlatButton onClick={ this.handleAddMA } label="Add MA Charm"
          style={{ float: 'right' }}
          icon={<ContentAddCircle />}
        />
      }
      { maCharms }
      <h1>
        Evocations
        { this.state.isEditing &&
          <IconButton onClick={ this.handleAddEvocation } label="Add Evocation"
            style={{ float: 'right' }}
          >
            <ContentAddCircle />
          </IconButton>
        }
      </h1>
      { evo }
    </div>
  }
}
CharmFullPage.propTypes = {
  character: PropTypes.object,
  nativeCharms: PropTypes.arrayOf(PropTypes.object),
  martialArtsCharms: PropTypes.arrayOf(PropTypes.object),
  evocations: PropTypes.arrayOf(PropTypes.object),
  _handleCreate: PropTypes.func,
  _handleUpdate: PropTypes.func,
  _handleDestroy: PropTypes.func,
}

function mapStateToProps(state, ownProps) {
  const character = state.entities.characters[ownProps.match.params.characterId] || {}

  let nativeCharms = []
  let martialArtsCharms = []
  let evocations = []
  let artifacts = []

  switch (character.type) {
  case 'SolarCharacter':
    nativeCharms = character.solar_charms.map((id) => state.entities.charms[id])
  }

  if (character.evocations != undefined) {
    evocations = character.evocations.map((id) => state.entities.charms[id])
  }
  if (character.martial_arts_charms != undefined) {
    martialArtsCharms = character.martial_arts_charms.map((id) => state.entities.charms[id])
  }
  if (character.weapons != undefined) {
    artifacts = character.weapons.map((id) => state.entities.weapons[id]).filter((w) => w.is_artifact )
  }

  return {
    character,
    nativeCharms,
    martialArtsCharms,
    evocations,
    artifacts,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    _handleUpdate: (id, charId, trait, value) => {
      dispatch(updateCharm(id, charId, trait, value))
    },
    _handleDestroy: (id, charId) => {
      dispatch(destroyCharm(id, charId))
    },
    _handleCreate: (charId, type) => {
      dispatch(createCharm(charId, type))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharmFullPage)
