import React from 'react'
import { connect } from 'react-redux'
import { fetchCharacter, toggleEditor, updateCharacter } from '../actions'

import computedValues from '../selectors'
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
    const character = this.props.character || null
    const computed = this.props.computed

    if (character == null)
      return(<h1>Lot-Casting Atemi</h1>)

    if (this.props.isEditing)
      return(<CharacterEditor character={character}
      toggleClick={this.editorToggle} onUpdate={this.props.onUpdate} />)

    return (<CharacterSheetDisplay character={character} computed={computed}
      toggleClick={this.editorToggle}/>);
  }
}

function mapStateToProps(state) {
  const character = state.character
  const { isFetching, isError, isEditing } = state.app
  const computed = computedValues(character)
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

