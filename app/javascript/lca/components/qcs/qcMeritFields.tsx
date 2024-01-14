import { deepEqual } from 'fast-equals'
import { Component, type SyntheticInputEvent } from 'react'
import { SortableHandle } from 'react-sortable-hoc'

import Delete from '@mui/icons-material/Delete'
import DragHandleIcon from '@mui/icons-material/DragHandle'

import BlockPaper from '@/components/shared/BlockPaper'
import Checkbox from '@/components/shared/inputs/Checkbox'
import TextField from '@/components/generic/TextField'
import type { QcMerit } from '@/utils/flow-types'

import { Button, Typography } from '@mui/material'

const Handle = SortableHandle(() => (
  <DragHandleIcon onClick={(e) => e.preventDefault()} />
))
interface Props {
  merit: QcMerit
  onMeritChange: $TSFixMeFunction
  onRemoveClick: $TSFixMeFunction
}
export default class QcMeritFields extends Component<Props> {
  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const { merit } = this.props
    if (deepEqual(merit[name], value)) return
    this.props.onMeritChange(merit.id, {
      [name]: value,
    })
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
          inputProps={{
            autocomplete: 'off',
            'data-1p-ignore': 'true',
            'data-lp-ignore': 'true',
          }}
        />

        <TextField
          name="body"
          value={merit.body}
          label="Text"
          margin="dense"
          onChange={handleChange}
          fullWidth
          multiline
          maxRows={5}
        />
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <TextField
            name="ref"
            value={merit.ref}
            label="Reference"
            margin="dense"
            onChange={handleChange}
            style={{
              flex: 1,
              minWidth: '50%',
            }}
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

          <div
            style={{
              flex: 1,
              textAlign: 'right',
            }}
          >
            <Button
              onClick={this.handleRemove}
              style={{
                margin: '1.5em -0.75em -1em 3em',
              }}
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
