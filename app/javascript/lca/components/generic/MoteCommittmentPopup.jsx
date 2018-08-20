// @flow
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'

import MoteCommittmentEditor from 'components/characterEditor/editors/moteCommittmentEditor.jsx'
import { updateCharacter, updateQc } from 'ducks/actions.js'
import type { withMotePool } from 'utils/flow-types'

type Props = {
  character: withMotePool & { id: number },
  qc?: boolean,
  update: Function,
}
type State = { open: boolean }
class MoteCommittmentPopup extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChange = e => {
    const { name, value } = e.target
    this.props.update(this.props.character.id, name, value)
  }

  render() {
    const { handleOpen, handleClose, handleChange } = this
    const { character } = this.props
    const { open } = this.state

    return (
      <Fragment>
        <Button onClick={handleOpen}>Committments...</Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <MoteCommittmentEditor
              character={character}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}
const mapDispatchToProps = (dispatch: Function, props: Object) => ({
  update: (id, trait, value) =>
    dispatch(
      props.qc ? updateQc(id, trait, value) : updateCharacter(id, trait, value)
    ),
})

export default connect(
  null,
  mapDispatchToProps
)(MoteCommittmentPopup)
