import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'

import AbilityEditor from './editors/abilityEditor.jsx'
import AttributeEditor from './editors/attributeEditor.jsx'
import BasicsEditor from './editors/basicsEditor.jsx'
import SpecialtyEditor from './editors/specialtyEditor.jsx'
import BlockPaper from '../generic/blockPaper.jsx'
import IntimacyEditor from '../generic/intimacyEditor.jsx'
import RatingField from '../generic/ratingField.jsx'

import { updateCharacter } from '../../ducks/actions.js'
import { ABILITY_MAX, ABILITY_MIN } from '../../utils/constants.js'
import { fullChar } from '../../utils/propTypes'

class CharacterEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      character: this.props.character,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleRatingChange = this.handleRatingChange.bind(this)
  }

  componentWillReceiveProps(newProps) {
    this.setState({ character: newProps.character })
  }

  handleChange(e) {
    const { name, value } = e.target

    this.setState({ character: { ...this.state.character, [name]: value }})
  }

  handleBlur(e) {
    const { name } = e.target
    const { character } = this.state

    if (character[name] == this.props.character[name])
      return

    this.props.updateChar(character.id, name, character[name])
  }

  handleRatingChange(e) {
    let { name, value } = e.target
    const { character } = this.state

    this.setState({ character: { ...character, [name]: value }})
    this.props.updateChar(character.id, name, value)
  }

  render() {
    /* Escape hatch */
    if (this.props.character == undefined)
      return <div>
        <Typography paragraph>This Character has not yet loaded.</Typography>
      </div>

    const { character } = this.state
    const { handleChange, handleBlur, handleRatingChange } = this

    return <div>
      <Grid container spacing={ 24 }>
        <Grid item xs={ 12 }>
          <BasicsEditor character={ character }
            onChange={ handleChange } onBlur={ handleBlur }
            onRatingChange={ handleRatingChange }
          />
        </Grid>

        <Grid item xs={ 12 } md={ 3 }>
          <AttributeEditor character={ character }
            onRatingChange={ handleRatingChange }
          />
        </Grid>

        <Grid item xs={ 12 } md={ 4 }>
          <AbilityEditor character={ character }
            onRatingChange={ handleRatingChange }
          />
        </Grid>
        <Grid item xs={ 12 } md={ 5 }>
          <SpecialtyEditor character={ character }
            onRatingChange={ handleRatingChange }
          />
        </Grid>
      </Grid>
    </div>
  }
}
CharacterEditor.propTypes = {
  character: PropTypes.shape(fullChar),
  updateChar: PropTypes.func,
}

function mapStateToProps(state, ownProps) {
  const character = state.entities.characters[ownProps.match.params.characterId]
  let weapons = []
  let merits = []

  if (character != undefined) {
    if (character.weapons != undefined) {
      weapons = character.weapons.map((id) => state.entities.weapons[id])
    }
    if (character.weapons != undefined) {
      merits = character.merits.map((id) => state.entities.merits[id])
    }
  }


  return {
    character,
    weapons,
    merits,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateChar: (id, trait, value) => {
      dispatch(updateCharacter(id, trait, value))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterEditor)
