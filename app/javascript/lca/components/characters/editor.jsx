import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

import Typography from 'material-ui/Typography'

import RatingField from '../generic/ratingField.jsx'
import IntimacyEditor from '../generic/intimacyEditor.jsx'
import { updateCharacter } from '../../ducks/actions.js'
import { ABILITY_MAX, ABILITY_MIN } from '../../utils/constants.js'
import { fullChar } from '../../utils/propTypes'

class CharacterEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      character: this.props.character,
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ character: newProps.character })
  }

  render() {
    /* Escape hatch */
    if (this.props.character == undefined)
      return <div>
        <Typography paragraph>This Character has not yet loaded.</Typography>
      </div>

    const { character } = this.state
    return <div>
      <Typography variant="headline">
        The edit { character.name } page works!
      </Typography>
    </div>
  }
}
CharacterEditor.propTypes = {
  character: PropTypes.shape(fullChar),
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


export default connect(mapStateToProps)(CharacterEditor)
