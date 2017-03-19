import React from 'react'
import { connect } from 'react-redux'
import { updateMerit } from '../../actions'
import * as calc from '../../utils/calculated'


class MeritFieldset extends React.Component {
  constructor(props) {
    super(props)

    this.updateMerit = this.updateMerit.bind(this)
    this.pushUpdate = this.pushUpdate.bind(this)

    this.state = { merit: this.props.merit }
  }

  updateMerit(e) {
    e.preventDefault()
    let val = null
    if (e.target.type == "number")
      val = parseInt(e.target.value)
    else if (e.target.type == "checkbox") {
      val = ! this.state.merit[e.target.name]
      this.props.onUpdate(this.state.merit.id, this.state.merit.character_id, e.target.name, val)
    } else if (e.target.dataset.array)
      val = e.target.value.split(",")
    else
      val = e.target.value

    this.setState({merit: {...this.state.merit, [e.target.name]: val}})
  }

  pushUpdate(e) {
    const trait = e.target.name

    if (this.state.merit[trait] != this.props.merit[trait])
      this.props.onUpdate(this.state.merit.id,
        this.state.merit.character_id,
        trait, this.state.merit[trait])
  }

  render() {
    const merit = this.state.merit
    const { pushUpdate, updateMerit } = this

    return(<div>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" value={ merit.name }
        onBlur={ pushUpdate } onChange={ updateMerit } />
      <label htmlFor="merit_name">Merit:</label>
      <input type="text" name="merit_name" value={ merit.merit_name }
        onBlur={ pushUpdate } onChange={ updateMerit } />
      <label htmlFor="rating">Rating:</label>
      <input type="number" name="rating" value={ merit.rating }
        onBlur={ pushUpdate } onChange={ updateMerit } />

      <br />

      <label htmlFor="merit_cat">Merit Type:</label>
      <input type="text" name="merit_cat" value={ merit.merit_cat }
        onBlur={ pushUpdate } onChange={ updateMerit } />
      <label htmlFor="supernatural">Supernatural?</label>
      <input type="checkbox" name="supernatural" checked={ merit.supernatural }
        onBlur={ pushUpdate } onChange={ updateMerit } />
      <label htmlFor="ref">Ref:</label>
      <input type="text" name="ref" value={ merit.ref }
        onBlur={ pushUpdate } onChange={ updateMerit } />
      <label htmlFor="prereqs">Prereqs:</label>
      <input type="text" name="prereqs" value={ merit.prereqs }
        onBlur={ pushUpdate } onChange={ updateMerit } />

      <p>
        <label htmlFor="description">Notes:</label><br />
        <textarea name="description" value={ merit.description || "" }
          onBlur={ pushUpdate } onChange={ updateMerit } />
      </p>
    </div>)
  }
}

class _MeritEditor extends React.Component {
  constructor(props) {
    super(props)

    this.onUpdateMerit = this.onUpdateMerit.bind(this)
  }

  onUpdateMerit(id, charId, trait, value) {
    this.props._onUpdateMerit(id, charId, trait, value)
  }

  render() {
    const merits = this.props.merits.map((merit) =>
      <MeritFieldset key={ merit.id } merit={ merit } character={ this.props.character } onUpdate={ this.onUpdateMerit } />
    )
    return(<fieldset>
      <legend>Merit Editor</legend>
      {merits}
    </fieldset>)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    _onUpdateMerit: (id, charId, trait, value) => {
      dispatch(updateMerit(id, charId, trait, value));
    }
  }
}


const MeritEditor = connect(null, mapDispatchToProps)(_MeritEditor)

export default MeritEditor
