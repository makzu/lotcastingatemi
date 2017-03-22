import React from 'react'
import { connect } from 'react-redux'
import { updateCharacter } from '../../actions'

import CharacterSheetDisplay from './characterSheetDisplay.jsx'

class CharacterSheet extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { character, weapons, merits } = this.props

    // Don't render the display without a character
    if (character == undefined)
      return(<h1>Lot-Casting Atemi</h1>)

    return (<CharacterSheetDisplay
      character={ character }
      weapons={ weapons } merits={ merits }
    />);
  }
}

function mapStateToProps(state, ownProps) {
  const character = state.character.characters[ownProps.match.params.characterId]
  let weapons = []
  let merits = []

  if (character != undefined) {
    weapons = character.weapons.map((id) => state.character.weapons[id])
    merits = character.merits.map((id) => state.character.merits[id])
  }

  const { isFetching, isError } = state.app
  return {
    character,
    weapons,
    merits,
    isFetching,
    isError
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateChar: (id, trait, value) => {
      dispatch(updateCharacter(id, trait, value))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterSheet)

