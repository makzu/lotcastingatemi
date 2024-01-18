import { Component } from 'react'
import { connect } from 'react-redux'

import MoteCommittmentEditor from '@/components/characterEditor/editors/moteCommittmentEditor'
import { updateCharacter, updateQc } from '@/ducks/actions'
import type { withMotePool, Enhancer } from '@/utils/flow-types'
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material'
interface ExposedProps {
  character: withMotePool & {
    id: number
  }
  qc?: boolean
}
type Props = ExposedProps & {
  update: $TSFixMeFunction
}
interface State {
  open: boolean
}

class MoteCommittmentPopup extends Component<Props, State> {
  state = { open: false }

  handleOpen = () => {
    this.setState({
      open: true,
    })
  }
  handleClose = () => {
    this.setState({
      open: false,
    })
  }
  handleChange = (e) => {
    const { name, value } = e.target
    this.props.update(this.props.character.id, {
      [name]: value,
    })
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

const mapDispatchToProps = (
  dispatch: $TSFixMeFunction,
  props: ExposedProps,
) => ({
  update: (id: number, trait: string, value: $TSFixMe): $TSFixMeFunction =>
    dispatch(
      props.qc ? updateQc(id, trait, value) : updateCharacter(id, trait, value),
    ),
})

const enhance: Enhancer<Props, ExposedProps> = connect(null, mapDispatchToProps)
export default enhance(MoteCommittmentPopup)
