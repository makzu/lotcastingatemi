import React from 'react'
import { connect } from 'react-redux'
import { fetchCharacter, toggleEditor, updateCharacter } from '../actions'

import CharacterSheetDisplay from './characterSheet/characterSheetDisplay.jsx'
import CharacterEditor from './characterEditor.jsx'

class CharacterSheet extends React.Component {
  constructor(props) {
    super(props)

    this.editorToggle = this.editorToggle.bind(this)
  }

  componentDidMount() {
    this.props.onComponentMounted(this.props.id)
  }

  editorToggle(e) {
    e.preventDefault()
    this.props.onEditorToggleClick()
  }

  render() {
    const { character, weapons, armors, merits } = this.props

    if (character == undefined)
      return(<h1>Lot-Casting Atemi</h1>)

    if (this.props.isEditing)
      return(<CharacterEditor
        character={character}
        weapons={ weapons } armors={ armors } merits={ merits }
        toggleClick={this.editorToggle} onUpdate={this.props.updateChar}
      />)

    return (<CharacterSheetDisplay
      character={ character }
      weapons={ weapons } armors={ armors } merits={ merits }
      toggleClick={this.editorToggle}
    />);
  }
}

function mapStateToProps(state, ownProps) {
  const character = state.character.characters[ownProps.id]
  let weapons = []
  let armors = []
  let merits = []

  if (character != undefined) {
    weapons = character.weapons.map((id) => state.character.weapons[id])
    armors = character.armors.map((id) => state.character.armors[id])
    merits = character.merits.map((id) => state.character.merits[id])
  }

  const { isFetching, isError, isEditing } = state.app
  return {
    character,
    weapons,
    armors,
    merits,
    isEditing,
    isFetching,
    isError
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onEditorToggleClick: () => {
      dispatch(toggleEditor())
    },
    onComponentMounted: (id) => {
      dispatch(fetchCharacter(id))
    },
    updateChar: (id, trait, value) => {
      dispatch(updateCharacter(id, trait, value))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterSheet)

