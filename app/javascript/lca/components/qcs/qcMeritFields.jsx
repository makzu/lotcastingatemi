// @flow
import { deepEqual } from 'fast-equals'
import { Component, SyntheticInputEvent } from 'react'
import { SortableHandle } from 'react-sortable-hoc'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Delete from '@mui/icons-material/Delete'
import DragHandleIcon from '@mui/icons-material/DragHandle'

import BlockPaper from 'components/shared/BlockPaper'
import Checkbox from 'components/shared/inputs/Checkbox'
import TextField from 'components/generic/TextField.jsx'
import type { QcMerit } from 'utils/flow-types'

const Handle = SortableHandle(() => (
  <DragHandleIcon onClick={(e) => e.preventDefault()} />
))

type Props = {
  merit: QcMerit,
  onMeritChange: Function,
  onRemoveClick: Function,
}
export default class QcMeritFields extends Component<Props> {
  handleChange = (e: SyntheticInputEvent<>) => {
    const { name, value } = e.target
    const { merit } = this.props

    if (deepEqual(merit[name], value)) return

    this.props.onMeritChange(merit.id, { [name]: value })
  }

  handleRemove = () => {
    this.props.onRemoveClick(this.props.merit.id)
  }

  render() {
    const { merit } = this.props
    const { handleChange } = this

    return (
      <BlockPaper>
        <Typography
          component="div"
          style={{
            position: 'absolute',
            top: '0.5em',
            right: '0.5em',
            marginRight: '1em',
          }}
        >
          <Handle />
        </Typography>

        <TextField
          name="name"
          value={merit.name}
          label="Name"
          margin="dense"
          onChange={handleChange}
          fullWidth
        />

        <TextField
          name="body"
          value={merit.body}
          label="Text"
          margin="dense"
          onChange={handleChange}
          fullWidth
          multiline
          rowsMax={5}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <TextField
            name="ref"
            value={merit.ref}
            label="Reference"
            margin="dense"
            onChange={handleChange}
            style={{ flex: 1, minWidth: '50%' }}
          />

          <div style={{}}>
            <Checkbox
              name="latent"
              label="Latent"
              value={merit.latent}
              onChange={handleChange}
            />

            <Checkbox
              name="magical"
              label="Magical"
              value={merit.magical}
              onChange={handleChange}
            />
          </div>

          <div style={{ flex: 1, textAlign: 'right' }}>
            <Button
              onClick={this.handleRemove}
              style={{ margin: '1.5em -0.75em -1em 3em' }}
            >
              Delete&nbsp;
              <Delete />
            </Button>
          </div>
        </div>
      </BlockPaper>
    )
  }
}
