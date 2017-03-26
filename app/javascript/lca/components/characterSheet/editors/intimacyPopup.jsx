import React from 'react'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import { INTIMACY_RATING_MAX } from '../../../utils/constants.js'
import { updateCharacter } from '../../../actions'

import ExpandableListEditor from '../../generic/expandableListEditor.jsx'

class _IntimacyPopup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      character: this.props.character
    }

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)

    this.onListChange = this.onListChange.bind(this)
    this.onListBlur = this.onListBlur.bind(this)
  }

  handleOpen() {
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false })
  }

  onListChange(trait, value) {
    this.setState({ character: { ...this.state.character, [trait]: value}})
    this.props.updateChar(this.state.character.id, trait, value)
  }

  onListBlur(trait, value) {
    this.setState({ character: { ...this.state.character, [trait]: value}})
    this.props.updateChar(this.state.character.id, trait, value)
  }

  render() {
    const character = this.state.character
    const { handleOpen, handleClose, onListChange, onListBlur } = this

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
        title="Editing Intimacies"
        actions={ actions }
        open={ this.state.open }
        autoScrollBodyContent={ true }
        onRequestClose={ handleClose }
      >
        <div className="editor-popup editor-popup-specialties">
          <h4>Ties</h4>
          <ExpandableListEditor character={ character } trait="ties"
            onUpdate={ onListChange } onBlur={ onListBlur } numberMax={ INTIMACY_RATING_MAX }
          />
          <h4>Principles</h4>
          <ExpandableListEditor character={ character } trait="principles"
            onUpdate={ onListChange } onBlur={ onListBlur } numberMax={ INTIMACY_RATING_MAX }
          />
        </div>
      </Dialog>
    </div>)
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
  null,
  mapDispatchToProps
)(_IntimacyPopup)
