import React from 'react'
import { connect } from 'react-redux'

class _CharacterEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { character: this.props.character }

    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleChange(e) {
    this.setState({character: {... this.state.character, [e.target.name]: e.target.value}})
  }

  handleBlur(e) {
    this.props.onUpdate(this.state.character.id, e.target.name, e.target.value)
  }


  render() {
    const ch = this.state.character

    return(<div>
      <button onClick={this.props.toggleClick}>end editing</button>
      <h1>Editing { ch.name }</h1>

      <form><fieldset>
        <legend>Basics</legend>
        <label htmlFor="name">name:</label>
        <input name="name" type="text" value={ ch.name } onChange={this.handleChange} onBlur={this.handleBlur} />
        <br />

        <label htmlFor="description">Description:</label>
        <textarea name="description" value={ ch.description } onChange={this.handleChange} />
        <br />

        <label htmlFor="essence">Essence:</label>
        <input name="essence" type="number" value={ ch.essence } onChange={this.handleChange} onBlur={this.handleBlur} />
        <br />

      </fieldset></form>
    </div>)
  }
}
function mapStateToProps(state) {
  return {character: state.character}
}

const CharacterEditor = connect(mapStateToProps)(_CharacterEditor)

export default CharacterEditor
