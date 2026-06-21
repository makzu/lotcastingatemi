import { Component } from 'react'
import { type ConnectedProps, connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'

import MoteCommittmentEditor from '@lca/components/characterEditor/editors/MoteCommitmentEditor.tsx'
import { updateCharacter, updateQc } from '@lca/ducks/actions/index.ts'
import type { WithSharedStats } from '@lca/types/shared.ts'

interface ExposedProps {
  character: WithSharedStats
  qc?: boolean
}
interface Props extends ExposedProps, PropsFromRedux {}
type State = {
  open: boolean
}

class MoteCommitmentPopup extends Component<Props, State> {
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
  update: (id, trait) =>
    dispatch(props.qc ? updateQc(id, trait) : updateCharacter(id, trait)),
})

const connector = connect(null, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(MoteCommitmentPopup)
