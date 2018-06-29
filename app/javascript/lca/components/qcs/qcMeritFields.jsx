// @flow
import { isEqual } from 'lodash'
import React, { Component } from 'react'

import Checkbox from '@material-ui/core/Checkbox'
import Divider from '@material-ui/core/Divider'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import Delete from '@material-ui/icons/Delete'

import TextField from 'components/generic/TextField.jsx'
import type { QcMerit } from 'utils/flow-types'

type Props = {
  merit: QcMerit,
  onMeritChange: Function,
  onRemoveClick: Function,
}
export default class QcMeritFields extends Component<Props> {
  handleChange = (e: SyntheticInputEvent<>) => {
    const { name, value } = e.target
    const { merit } = this.props

    if (isEqual(merit[name], value)) return

    this.props.onMeritChange(merit.id, name, value)
  }

  handleCheck = (e: SyntheticInputEvent<>) => {
    const { name } = e.target
    const { merit } = this.props
    const value = !merit[name]

    this.props.onMeritChange(merit.id, name, value)
  }

  handleRemove = () => {
    this.props.onRemoveClick(this.props.merit.id)
  }

  render() {
    const { merit } = this.props
    const { handleChange, handleCheck } = this

    return (
      <div style={{ marginBottom: '0.75em' }}>
        <TextField
          name="name"
          value={merit.name}
          label="Name"
          margin="dense"
          onChange={handleChange}
        />

        <FormControlLabel
          label="Latent"
          control={
            <Checkbox
              name="latent"
              checked={merit.latent}
              onChange={handleCheck}
            />
          }
        />

        <FormControlLabel
          label="Magical"
          control={
            <Checkbox
              name="magical"
              checked={merit.magical}
              onChange={handleCheck}
            />
          }
        />

        <Button onClick={this.handleRemove} style={{ float: 'right' }}>
          Delete&nbsp;
          <Delete />
        </Button>
        <br />

        <TextField
          name="body"
          value={merit.body}
          label="Text"
          margin="dense"
          onChange={handleChange}
          fullWidth={true}
          multiline
          rowsMax={5}
        />
        <br />

        <TextField
          name="ref"
          value={merit.ref}
          label="Reference"
          margin="dense"
          onChange={handleChange}
        />

        <Divider style={{ marginTop: '0.5em' }} />
      </div>
    )
  }
}
