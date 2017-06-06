import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import { updateCharacter } from '../../../ducks/actions.js'
import * as c from '../../../utils/constants.js'
import { withHealthLevels } from '../../../utils/propTypes'

import HealthLevelBoxes from '../../generic/HealthLevelBoxes.jsx'

class HealthLevelPopup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      character: this.props.character
    }

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleOpen() {
    this.setState({ open: true, character: this.props.character })
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleChange(e) {
    e.preventDefault()

    let val = parseInt(e.target.value)

    if (e.target.name.startsWith('health')) {
      if (val < 0)
        val = 0
      if (val > c.HEALTH_LEVEL_MAX)
        val = c.HEALTH_LEVEL_MAX
    }

    this.setState({ character: { ... this.state.character, [e.target.name]: val }})
  }

  handleBlur(e) {
    e.preventDefault()
    const trait = e.target.name
    if (this.state.character[trait] == this.props.character[trait])
      return

    this.props.updateChar(this.state.character.id, trait, this.state.character[trait])
  }

  render() {
    const character = this.state.character
    const { handleOpen, handleClose, handleChange, handleBlur } = this

    const actions = [
      <FlatButton
        label="Close"
        primary={ true }
        onTouchTap={ handleClose }
      />
    ]

    return(<div className="editor-wrap ability-editor-wrap">
      <FlatButton label="Edit" onClick={ handleOpen } />
      <Dialog
        title="Editing Health / Damage"
        actions={ actions }
        open={ this.state.open }
        autoScrollBodyContent={ true }
        onRequestClose={ handleClose }
      >
        <div className="editor-popup editor-popup-specialties">
          <HealthLevelBoxes character={ character } />
          <div>
            Health:
            <TextField name="health_level_0s" value={ character.health_level_0s }
              floatingLabelText="0"
              type="number" min={ 0 }
              className="editor-rating-field"
              onChange={ handleChange } onBlur={ handleBlur } />
            <TextField name="health_level_1s" value={ character.health_level_1s }
              floatingLabelText="-1"
              type="number" min={ 0 }
              className="editor-rating-field"
              onChange={ handleChange } onBlur={ handleBlur } />
            <TextField name="health_level_2s" value={ character.health_level_2s }
              floatingLabelText="-2"
              type="number" min={ 0 }
              className="editor-rating-field"
              onChange={ handleChange } onBlur={ handleBlur } />
            <TextField name="health_level_4s" value={ character.health_level_4s }
              floatingLabelText="-4"
              type="number" min={ 0 }
              className="editor-rating-field"
              onChange={ handleChange } onBlur={ handleBlur } />
            <TextField name="health_level_incap" value={ character.health_level_incap }
              floatingLabelText="incap"
              type="number" min={ 0 }
              className="editor-rating-field"
              onChange={ handleChange } onBlur={ handleBlur } />
          </div>
          <div>
            Damage:
            <TextField name="damage_bashing" value={ character.damage_bashing }
              floatingLabelText="Bashing"
              type="number" min={ 0 }
              className="editor-rating-field"
              onChange={ handleChange } onBlur={ handleBlur } />
            <TextField name="damage_lethal" value={ character.damage_lethal }
              floatingLabelText="Lethal"
              type="number" min={ 0 }
              className="editor-rating-field"
              onChange={ handleChange } onBlur={ handleBlur } />
            <TextField name="damage_aggravated" value={ character.damage_aggravated }
              floatingLabelText="Aggravated"
              type="number" min={ 0 }
              className="editor-rating-field"
              onChange={ handleChange } onBlur={ handleBlur } />
          </div>
        </div>
      </Dialog>
    </div>)
  }
}
HealthLevelPopup.propTypes = {
  character: PropTypes.shape(withHealthLevels).isRequired,
  updateChar: PropTypes.func
}

function mapDispatchToProps(dispatch) {
  return {
    updateChar: (id, trait, value) => {
      dispatch(updateCharacter(id, trait, value))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(HealthLevelPopup)
