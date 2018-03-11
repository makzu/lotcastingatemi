import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import ContentAddCircle from 'material-ui-icons/AddCircle'
import Delete from 'material-ui-icons/Delete'

import AbilitySelect from '../generic/abilitySelect.jsx'
import AttributeSelect from '../generic/attributeSelect.jsx'
import BlockPaper from '../generic/blockPaper.jsx'
import RatingField from '../generic/ratingField.jsx'
import SpellEditorBlock from './editors/spellEditorBlock.jsx'
import {
  updateCharm, createCharm, destroyCharm,
  updateSpell, createSpell, destroySpell,
} from '../../ducks/actions.js'
import { isAbilityCharm, isAttributeCharm, abilitiesWithRatings } from '../../utils/calculated'
import { ABILITY_MAX, ATTRIBUTE_MAX, ESSENCE_MIN, ESSENCE_MAX } from '../../utils/constants.js'

class SingleCharmEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { charm: this.props.charm }

    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleRatingChange = this.handleRatingChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentWillReceiveProps(newProps) {
    this.setState({ charm: newProps.charm })
  }

  handleChange(e) {
    let { name, value } = e.target
    if (name == 'keywords')
      value = value.split(',')

    this.setState({ charm: { ...this.state.charm, [name]: value }})
  }

  handleBlur(e) {
    const { name } = e.target
    const { charm } = this.state

    if (charm[name] != this.props.charm[name]) {
      this.props.onUpdate(charm.id, charm.character_id, name, charm[name])
    }
  }

  handleRatingChange(e) {
    let { name, value } = e.target
    const { charm } = this.state

    this.setState({ charm: { ...charm, [name]: value }})
    this.props.onUpdate(charm.id, charm.character_id, name, value)
  }

  handleRemove() {
    this.props.onRemove(this.state.charm.id)
  }

  render() {
    const { character } = this.props
    const { charm } = this.state
    const { handleChange, handleBlur, handleRatingChange, handleRemove } = this

    const showAbility = isAbilityCharm(charm)
    const showMinAbility = showAbility || charm.type == 'MartialArtsCharm'
    const showAttribute = isAttributeCharm(charm)

    return <BlockPaper>
      <Button onClick={ handleRemove } style={{ float: 'right' }}>
        Delete&nbsp;
        <Delete />
      </Button>

      <TextField name="name" value={ charm.name }
        onChange={ handleChange } onBlur={ handleBlur }
        label="Name" margin="dense"
      />&nbsp;&nbsp;
      { charm.type == 'Evocation' &&
        <TextField name="artifact_name" value={ charm.artifact_name }
          onChange={ handleChange } onBlur={ handleBlur }
          label="Artifact Name" margin="dense"
        />
      }
      { charm.type == 'MartialArtsCharm' &&
        <TextField name="style" value={ charm.style }
          onChange={ handleChange } onBlur={ handleBlur }
          label="Style" margin="dense"
        />
      }
      <br />

      <TextField name="cost" value={ charm.cost }
        onChange={ handleChange } onBlur={ handleBlur }
        label="Cost" margin="dense"
      />&nbsp;&nbsp;

      { showAbility &&
        <AbilitySelect name="ability" label="Ability" margin="dense"
          abilities={ abilitiesWithRatings(character) }
          value={ charm.ability }
          onChange={ handleRatingChange }
          multiple={ false }
        />
      }
      { showMinAbility &&
        <RatingField trait="min_ability" value={ charm.min_ability }
          min={ 1 } max={ ABILITY_MAX }
          onChange={ handleRatingChange }
          label="Ability" margin="dense"
        />
      }

      { showAttribute && <Fragment>
        <AttributeSelect name="ability" label="Attribute" margin="dense"
          value={ charm.ability }
          onChange={ handleRatingChange }
          multiple={ false }
        />
        <RatingField trait="min_ability" value={ charm.min_ability }
          min={ 1 } max={ ATTRIBUTE_MAX }
          onChange={ handleRatingChange }
          label="Attribute" margin="dense"
        />
      </Fragment> }

      <RatingField trait="min_essence" value={ charm.min_essence }
        min={ ESSENCE_MIN } max={ ESSENCE_MAX }
        onChange={ handleRatingChange }
        label="Essence" margin="dense"
      />
      <br />

      <TextField select name="timing"
        label="Type" margin="dense"
        value={ charm.timing }
        onChange={ handleRatingChange }
      >
        <MenuItem value="reflexive">Reflexive</MenuItem>
        <MenuItem value="supplemental">Supplemental</MenuItem>
        <MenuItem value="simple">Simple</MenuItem>
        <MenuItem value="permanent">Permanent</MenuItem>
      </TextField>&nbsp;&nbsp;

      <TextField name="duration" value={ charm.duration }
        onChange={ handleChange } onBlur={ handleBlur }
        label="Duration" margin="dense"
      />
      <br />

      <TextField name="keywords" value={ charm.keywords }
        onChange={ handleChange } onBlur={ handleBlur }
        fullWidth={ true }
        label="Keywords (comma separated)" margin="dense"
      />
      <br />

      <TextField name="prereqs" value={ charm.prereqs }
        onChange={ handleChange } onBlur={ handleBlur }
        fullWidth={ true }
        label="Prerequisite Charms" margin="dense"
      />
      <br />

      <TextField name="body" value={ charm.body }
        onChange={ handleChange } onBlur={ handleBlur }
        className="editor-description-field" multiline fullWidth
        label="Effect" margin="dense" rows={ 3 }
      />
      <br />

      <TextField name="ref" value={ charm.ref }
        onChange={ handleChange } onBlur={ handleBlur }
        fullWidth={ true }
        label="Ref" margin="dense"
      />
    </BlockPaper>
  }
}
SingleCharmEditor.propTypes = {
  charm: PropTypes.object.isRequired,
  character: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

class CharmEditor extends React.Component {
  constructor(props) {
    super(props)

    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleAddNative = this.handleAddNative.bind(this)
    this.handleAddMA = this.handleAddMA.bind(this)
    this.handleAddEvocation = this.handleAddEvocation.bind(this)
    this.handleAddSpirit = this.handleAddSpirit.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleUpdateSpell = this.handleUpdateSpell.bind(this)
    this.handleAddSpell = this.handleAddSpell.bind(this)
    this.handleRemoveSpell = this.handleRemoveSpell.bind(this)
  }

  handleUpdate(id, charId, trait, value) {
    this.props._handleUpdate(id, charId, trait, value)
  }

  handleUpdateSpell(id, charId, trait, value) {
    this.props._handleUpdateSpell(id, charId, trait, value)
  }

  handleAddNative() {
    let type
    switch(this.props.character.type) {
    case 'SolarCharacter':
      type = 'SolarCharm'
      break
    case 'CustomAbilityCharacter':
      type = 'CustomAbilityCharm'
      break
    case 'CustomAttributeCharacter':
      type = 'CustomAttributeCharm'
      break
    case 'CustomEssenceCharacter':
      type = 'CustomEssenceCharm'
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

  handleAddSpirit() {
    this.props._handleCreate(this.props.character.id, 'SpiritCharm')
  }

  handleAddSpell() {
    this.props._handleCreateSpell(this.props.character.id)
  }

  handleRemove(id) {
    this.props._handleDestroy(id, this.props.character.id)
  }

  handleRemoveSpell(id){
    this.props._handleDestroySpell(id, this.props.character.id)
  }

  render() {
    /* Escape hatch */
    if (this.props.character == undefined)
      return <div>
        <Typography paragraph>This Character has not yet loaded.</Typography>
      </div>

    const { character, nativeCharms, martialArtsCharms, evocations, spiritCharms, spells } = this.props
    const {
      handleUpdate, handleRemove, handleUpdateSpell, handleRemoveSpell,
      handleAddNative, handleAddMA, handleAddEvocation, handleAddSpell, handleAddSpirit
    } = this

    let natives = []
    let maCharms = []
    let evo = []
    let spirit = []
    let spl = []
    natives = nativeCharms.map((c) =>
      <Grid item xs={ 12 } md={ 6 } key={ c.id }>
        <SingleCharmEditor charm={ c } character={ character }
          onUpdate={ handleUpdate } onRemove={ handleRemove }
        />
      </Grid>
    )
    maCharms = martialArtsCharms.map((c) =>
      <Grid item xs={ 12 } md={ 6 } key={ c.id }>
        <SingleCharmEditor charm={ c } character={ character }
          onUpdate={ handleUpdate } onRemove={ handleRemove }
        />
      </Grid>
    )
    evo = evocations.map((c) =>
      <Grid item xs={ 12 } md={ 6 } key={ c.id }>
        <SingleCharmEditor charm={ c } character={ character }
          onUpdate={ handleUpdate } onRemove={ handleRemove }
        />
      </Grid>
    )
    spirit = spiritCharms.map((c) =>
      <Grid item xs={ 12 } md={ 6 } key={ c.id }>
        <SingleCharmEditor charm={ c } character={ character }
          onUpdate={ handleUpdate } onRemove={ handleRemove }
        />
      </Grid>
    )
    spl = spells.map((c) =>
      <Grid item xs={ 12 } md={ 6 } key={ c.id }>
        <SpellEditorBlock spell={ c } character={ character }
          onUpdate={ handleUpdateSpell } onRemove={ handleRemoveSpell }
        />
      </Grid>
    )

    return <div>
      <Grid container spacing={ 24 }>
        <Grid item xs={ 12 }>
          <Typography variant="headline">
            Charms
            &nbsp;&nbsp;

            <Button onClick={ handleAddNative }>
              Add Charm&nbsp;
              <ContentAddCircle />
            </Button>
          </Typography>
        </Grid>
        { natives }

        <Grid item xs={ 12 }>
          <Typography variant="headline">
            Martial Arts
            &nbsp;&nbsp;

            <Button onClick={ handleAddMA }>
              Add MA Charm&nbsp;
              <ContentAddCircle />
            </Button>
          </Typography>
        </Grid>
        { maCharms }

        <Grid item xs={ 12 }>
          <Typography variant="headline">
            Evocations
            &nbsp;&nbsp;

            <Button onClick={ handleAddEvocation }>
              Add Evocation&nbsp;
              <ContentAddCircle />
            </Button>
          </Typography>
        </Grid>
        { evo }

        <Grid item xs={ 12 }>
          <Typography variant="headline">
            Spirit Charms
            &nbsp;&nbsp;

            <Button onClick={ handleAddSpirit }>
              Add Spirit Charm&nbsp;
              <ContentAddCircle />
            </Button>
          </Typography>
        </Grid>
        { spirit }

        <Grid item xs={ 12 }>
          <Typography variant="headline">
            Spells
            &nbsp;&nbsp;

            <Button onClick={ handleAddSpell }>
              Add Spell&nbsp;
              <ContentAddCircle />
            </Button>
          </Typography>
        </Grid>
        { spl }

      </Grid>
    </div>
  }
}
CharmEditor.propTypes = {
  character: PropTypes.object,
  nativeCharms: PropTypes.arrayOf(PropTypes.object),
  martialArtsCharms: PropTypes.arrayOf(PropTypes.object),
  evocations: PropTypes.arrayOf(PropTypes.object),
  spells: PropTypes.arrayOf(PropTypes.object),
  spiritCharms: PropTypes.arrayOf(PropTypes.object),
  _handleCreate: PropTypes.func,
  _handleUpdate: PropTypes.func,
  _handleDestroy: PropTypes.func,
  _handleCreateSpell: PropTypes.func,
  _handleUpdateSpell: PropTypes.func,
  _handleDestroySpell: PropTypes.func,
}

function mapStateToProps(state, ownProps) {
  const character = state.entities.characters[ownProps.match.params.characterId] || {}

  let nativeCharms = []
  let martialArtsCharms = []
  let evocations = []
  let artifacts = []
  let spells = []
  let spiritCharms = []

  if (character.charms != undefined) {
    nativeCharms = character.charms.map((id) => state.entities.charms[id])
  }

  if (character.evocations != undefined) {
    evocations = character.evocations.map((id) => state.entities.charms[id])
  }
  if (character.martial_arts_charms != undefined) {
    martialArtsCharms = character.martial_arts_charms.map((id) => state.entities.charms[id])
  }
  if (character.weapons != undefined) {
    artifacts = character.merits.map((id) => state.entities.merits[id]).filter((m) => m.merit_name == 'artifact' )
  }
  if (character.spells != undefined) {
    spells = character.spells.map((id) => state.entities.spells[id])
  }
  if (character.spirit_charms != undefined) {
    spiritCharms = character.spirit_charms.map((id) => state.entities.charms[id])
  }

  return {
    character,
    nativeCharms,
    martialArtsCharms,
    evocations,
    artifacts,
    spells,
    spiritCharms,
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
    },
    _handleUpdateSpell: (id, charId, trait, value) => {
      dispatch(updateSpell(id, charId, trait, value))
    },
    _handleDestroySpell: (id, charId) => {
      dispatch(destroySpell(id, charId))
    },
    _handleCreateSpell: (charId) => {
      dispatch(createSpell(charId))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharmEditor)
