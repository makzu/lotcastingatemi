import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { ListItem } from 'material-ui/List'
import TextField from 'material-ui/TextField'
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add'

import { createQc } from '../../ducks/actions.js'

class NewQcPopup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      qc: { name: '' },
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleOpen() {
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleChange(e, value) {
    this.setState({ qc: { ...this.state.qc, [e.target.name]: value }})
  }

  handleSubmit() {
    this.setState({ open: false })
    this.props.createQc(this.state.qc)
  }

  render() {
    const { handleOpen, handleClose, handleChange, handleSubmit } = this
    const { qc } = this.state

    const actions = [
      <FlatButton
        key="close"
        label="Cancel"
        primary={ true }
        onClick={ handleClose }
      />,
      <FlatButton
        key="save"
        label="Create"
        onClick={ handleSubmit }
      />
    ]
    return <div>
      <ListItem primaryText="New QC"
        rightIcon={ <ActionNoteAdd /> }
        onClick={ handleOpen }
      />
      <Dialog title="Create new QC"
        open={ this.state.open }
        actions={ actions }
        onRequestClose={ handleClose }
      >
        <TextField name="name" value={ qc.name }
          floatingLabelText="Name:"
          className="editor-name-field"
          onChange={ handleChange }
        />
      </Dialog>
    </div>
  }
}
NewQcPopup.propTypes = {
  id: PropTypes.number.isRequired,
  createQc: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const id = state.session.id

  return { id }
}

function mapDispatchToProps(dispatch) {
  return {
    createQc: (char) => {
      dispatch(createQc(char))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQcPopup)
