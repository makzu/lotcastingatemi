import React from 'react'
import CharacterSheet from '../components/characterSheet.jsx'



class RootContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() { return (
    <CharacterSheet id={1} />
  )}
}

export default RootContainer
