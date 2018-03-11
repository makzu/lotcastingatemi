import React from 'react'
import PropTypes from 'prop-types'

import Checkbox from 'material-ui/Checkbox'
import Divider from 'material-ui/Divider'
import { FormControlLabel } from 'material-ui/Form'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

import Delete from 'material-ui-icons/Delete'

import { qcMerit } from '../../utils/propTypes'

export default class QcMeritFields extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)

    this.state = {
      merit: this.props.merit
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ merit: newProps.merit })
  }

  handleChange(e) {
    let { name, value } = e.target

    this.setState({ merit: { ...this.state.merit, [name]: value }})
  }

  handleBlur(e) {
    const { name } = e.target
    const { merit } = this.state
    if (merit[name] == this.props.merit[name])
      return

    this.props.onMeritChange(merit.id, name, merit[name])
  }

  handleCheck(e) {
    const { name } = e.target
    const { merit } = this.state
    const value = !merit[name]

    this.setState({ merit: { ...merit, [name]: value }})
    this.props.onMeritChange(merit.id, name, value)
  }

  handleRemove() {
    this.props.onRemoveClick(this.state.merit.id)
  }

  render() {
    const { merit } = this.state

    return <div style={{ marginBottom: '0.75em' }}>
      <TextField name="name" value={ merit.name }
        label="Name" margin="dense"
        onChange={ this.handleChange } onBlur={ this.handleBlur }
      />

      <FormControlLabel
        label="Latent"
        control={
          <Checkbox name="latent" checked={ merit.latent }
            onChange={ this.handleCheck }
          />
        }
      />

      <FormControlLabel
        label="Magical"
        control={
          <Checkbox name="magical" checked={ merit.magical }
            onChange={ this.handleCheck }
          />
        }
      />

      <Button onClick={ this.handleRemove } style={{ float: 'right' }}>
        Delete&nbsp;
        <Delete />
      </Button>
      <br />

      <TextField name="body" value={ merit.body }
        label="Text" margin="dense"
        onChange={ this.handleChange } onBlur={ this.handleBlur }
        fullWidth={ true } multiline
      />
      <br />

      <TextField name="ref" value={ merit.ref }
        label="Reference" margin="dense"
        onChange={ this.handleChange } onBlur={ this.handleBlur }
      />

      <Divider style={{ marginTop: '0.5em' }} />
    </div>
  }
}
QcMeritFields.propTypes = {
  merit: PropTypes.shape(qcMerit).isRequired,
  onMeritChange: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired
}
