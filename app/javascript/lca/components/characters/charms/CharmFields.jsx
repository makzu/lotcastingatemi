import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Button from 'material-ui/Button'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'
import Delete from 'material-ui-icons/Delete'

import AbilitySelect from '../../generic/abilitySelect.jsx'
import BlockPaper from '../../generic/blockPaper.jsx'
import RatingField from '../../generic/ratingField.jsx'
import { isAbilityCharm, isAttributeCharm, abilitiesWithRatings } from '../../../utils/calculated'
import { ABILITY_MAX, ATTRIBUTE_MAX, ESSENCE_MIN, ESSENCE_MAX } from '../../../utils/constants.js'

class CharmFields extends React.Component {
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
        style={{ width: '15em' }}
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
        <AbilitySelect attributesOnly name="ability" label="Attribute" margin="dense"
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
        label="Effect" margin="dense" rows={ 2 } rowsMax={ 15 }
      />
      <br />

      <TextField name="ref" value={ charm.ref }
        onChange={ handleChange } onBlur={ handleBlur }
        fullWidth={ true }
        label="Reference" margin="dense"
      />
    </BlockPaper>
  }
}
CharmFields.propTypes = {
  charm: PropTypes.object.isRequired,
  character: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default CharmFields
