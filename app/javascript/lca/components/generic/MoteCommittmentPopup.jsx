// @flow
import { Component } from 'react'
import { connect } from 'react-redux'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'

import MoteCommittmentEditor from 'components/characterEditor/editors/moteCommittmentEditor.jsx'
import { updateCharacter, updateQc } from 'ducks/actions'
import type { withMotePool, Enhancer } from 'utils/flow-types'

type ExposedProps = {
  character: withMotePool & { id: number },
  qc?: boolean,
}
type Props = ExposedProps & {
  update: Function,
}
type State = {
  open: boolean,
}

class MoteCommittmentPopup extends Component<Props, State> {
  state = { open: false }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.props.update(this.props.character.id, { [name]: value })
  }

  render() {
    const { handleOpen, handleClose, handleChange } = this
    const { character } = this.props
    const { open } = this.state

    return (
      <>
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
      </>
    )
  }
}

const mapDispatchToProps = (dispatch: Function, props: ExposedProps) => ({
  update: (id: number, trait: string, value: any): Function =>
    dispatch(
      props.qc ? updateQc(id, trait, value) : updateCharacter(id, trait, value),
    ),
})

const enhance: Enhancer<Props, ExposedProps> = connect(null, mapDispatchToProps)

export default enhance(MoteCommittmentPopup)
