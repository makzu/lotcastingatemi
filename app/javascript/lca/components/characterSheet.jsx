import React from 'react'
import { connect } from 'react-redux'
import { fetchCharacter } from '../actions'
import computedValues from '../selectors'
import CharacterSheetDisplay from './characterSheet/characterSheetDisplay.jsx'

class CharacterSheet extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch, id } = this.props
    dispatch(fetchCharacter(id))
  }


  render() {
    const character = this.props.character || null
    const computed = this.props.computed

    if (character == null)
      return(<h1>Lot-Casting Atemi</h1>)

    return (<CharacterSheetDisplay character={character} computed={computed} />);
  }
}

function mapStateToProps(state) {
  const { character, isFetching, isError } = state.cha
  const computed = computedValues(state)
  return {
    character,
    computed,
    isFetching,
    isError
  }
}

export default connect(
  mapStateToProps//,
  //mapDispatchToProps
)(CharacterSheet)

