import React from 'react'
import { connect } from 'react-redux'
import { fetchCharacter, toggleEditor, updateCharacter } from '../actions'

import computedValues from '../selectors'
import CharacterSheetDisplay from './characterSheet/characterSheetDisplay.jsx'
import CharacterEditor from './characterEditor.jsx'

class CharacterSheet extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.onComponentMounted(this.props.id)
  }


  render() {
    const character = this.props.character || null
    const computed = this.props.computed

    if (character == null)
      return(<h1>Lot-Casting Atemi</h1>)

    if (this.props.isEditing)
      return(<CharacterEditor character={character}
      toggleClick={this.props.onEditorToggleClick} onUpdate={this.props.onUpdate} />)

    return (<CharacterSheetDisplay character={character} computed={computed}
      toggleClick={this.props.onEditorToggleClick}/>);
  }
}

function mapStateToProps(state) {
  const character = state.character
  const { isFetching, isError, isEditing } = state.app
  const computed = computedValues(state.character)
  return {
    character,
    computed,
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
    onUpdate: (id, trait, value) => {
      dispatch(updateCharacter(id, trait, value))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterSheet)

