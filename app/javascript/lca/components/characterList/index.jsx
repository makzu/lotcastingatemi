import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import { createCharacter, createQc } from '../../ducks/actions.js'
import { fullChar, fullQc } from '../../utils/propTypes'

function NewQcForm(props) {
  return <div style={{ display: 'inline-block', fontWeight: 'normal', fontSize: 'normal' }} className="newQcForm">
    <FlatButton label="create" onClick={ props.onCreateClick } />
    <TextField name="name" value={ props.name }
      floatingLabelText="Name:"
      className="editor-name-field"
      onChange={ props.onChange }
    />
  </div>
}
NewQcForm.propTypes = {
  name: PropTypes.string,
  onCreateClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

class CharacterList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newCharacter: false,
      newCharacterName: '',
      newQc: false,
      newQcName: ''
    }

    this.addCharacterClick = this.addCharacterClick.bind(this)
    this.handleCharacterChange = this.handleCharacterChange.bind(this)
    this.handleCharacterCreate = this.handleCharacterCreate.bind(this)
    this.addQcClick = this.addQcClick.bind(this)
    this.handleQcChange = this.handleQcChange.bind(this)
    this.handleQcCreate = this.handleQcCreate.bind(this)
  }

  addCharacterClick(e) {
    e.preventDefault()
    this.setState({ newCharacter: !this.state.newCharacter })
  }

  handleCharacterChange(e) {
    e.preventDefault()
    const val = e.target.value
    this.setState({ newCharacterName: val })
  }

  handleCharacterCreate(e) {
    e.preventDefault()
    this.setState({ newCharacter: false })
    // TODO make chronicle ID optional
    this.props.createCharacter(this.props.player.id, 1, this.state.newCharacterName)
  }

  addQcClick(e) {
    e.preventDefault()
    this.setState({ newQc: !this.state.newQc })
  }

  handleQcChange(e) {
    e.preventDefault()
    const val = e.target.value
    this.setState({ newQcName: val })
  }

  handleQcCreate(e) {
    e.preventDefault()
    this.setState({ newQc: false })
    // TODO make chronicle ID optional
    this.props.createQc(this.props.player.id, 1, this.state.newQcName)
  }

  render() {
    const {
      addCharacterClick, handleCharacterChange, handleCharacterCreate,
      addQcClick, handleQcChange, handleQcCreate
     } = this
    const { newCharacter, newCharacterName, newQc, newQcName } = this.state

    const chars = this.props.characters.map((chara) =>
      <li key={ chara.id }>
        <Link to={ '/characters/' + chara.id }>{ chara.name }</Link>
      </li>
    )

    const qcs = this.props.qcs.map((qc) =>
      <li key={ qc.id }>
        <Link to={ '/qcs/' + qc.id}>{ qc.name }</Link>
      </li>
    )

    return <div className="characterList">
      <h2>
        My Characters
        <FlatButton label={ newCharacter ? 'cancel' : 'Add' } onClick={ addCharacterClick } />
        { this.state.newCharacter &&
          <NewQcForm name={ newCharacterName } onChange={ handleCharacterChange } onCreateClick={ handleCharacterCreate } />
        }
      </h2>
      <ul>{ chars }</ul>

      <h2>
        My QCs
        <FlatButton label={ newQc ? 'cancel' : 'Add' } onClick={ addQcClick } />
        { this.state.newQc &&
          <NewQcForm name={ newQcName } onChange={ handleQcChange } onCreateClick={ handleQcCreate } />
        }
      </h2>
      <ul>{ qcs }</ul>

      <h2>My Battlegroups</h2>
      <p>(TODO)</p>
    </div>
  }
}
CharacterList.propTypes = {
  player: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
  characters: PropTypes.arrayOf(PropTypes.shape(fullChar)),
  qcs: PropTypes.arrayOf(PropTypes.shape(fullQc)),
  createCharacter: PropTypes.func,
  createQc: PropTypes.func
}

function mapStateToProps(state) {
  const player_id = 1 // TODO replace with 'current_player' or something
  const player = state.entities.players[player_id]

  let characters = []
  let qcs = []
  if (player != undefined) {
    characters = player.characters.map((id) => state.entities.characters[id])
    qcs = player.qcs.map((id) => state.entities.qcs[id])
  }

  return {
    player,
    characters,
    qcs
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createCharacter: (playerId, chronicleId, name) => {
      dispatch(createCharacter(playerId, chronicleId, name))
    },
    createQc: (playerId, chronicleId, name) => {
      dispatch(createQc(playerId, chronicleId, name))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterList)
