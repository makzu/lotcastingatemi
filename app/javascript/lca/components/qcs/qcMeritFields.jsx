// @flow
import React, { Component } from 'react'

import Checkbox from 'material-ui/Checkbox'
import Divider from 'material-ui/Divider'
import { FormControlLabel } from 'material-ui/Form'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

import Delete from '@material-ui/icons/Delete'

import type { QcMerit } from 'utils/flow-types'

type Props = {
  merit: QcMerit,
  onMeritChange: Function,
  onRemoveClick: Function,
}
type State = { merit: QcMerit }
export default class QcMeritFields extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      merit: this.props.merit,
    }
  }

  static getDerivedStateFromProps(props: Props) {
    return { merit: props.merit }
  }

  handleChange = (e: SyntheticInputEvent<>) => {
    let { name, value } = e.target

    this.setState({ merit: { ...this.state.merit, [name]: value } })
  }

  handleBlur = (e: SyntheticInputEvent<>) => {
    const { name } = e.target
    const { merit } = this.state
    if (merit[name] == this.props.merit[name]) return

    this.props.onMeritChange(merit.id, name, merit[name])
  }

  handleCheck = (e: SyntheticInputEvent<>) => {
    const { name } = e.target
    const { merit } = this.state
    const value = !merit[name]

    this.setState({ merit: { ...merit, [name]: value } })
    this.props.onMeritChange(merit.id, name, value)
  }

  handleRemove = () => {
    this.props.onRemoveClick(this.state.merit.id)
  }

  render() {
    const { merit } = this.state

    return (
      <div style={{ marginBottom: '0.75em' }}>
        <TextField
          name="name"
          value={merit.name}
          label="Name"
          margin="dense"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />

        <FormControlLabel
          label="Latent"
          control={
            <Checkbox
              name="latent"
              checked={merit.latent}
              onChange={this.handleCheck}
            />
          }
        />

        <FormControlLabel
          label="Magical"
          control={
            <Checkbox
              name="magical"
              checked={merit.magical}
              onChange={this.handleCheck}
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
          onChange={this.handleChange}
          onBlur={this.handleBlur}
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
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />

        <Divider style={{ marginTop: '0.5em' }} />
      </div>
    )
  }
}
