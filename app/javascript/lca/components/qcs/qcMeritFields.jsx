import React from 'react'
import PropTypes from 'prop-types'

import Checkbox from 'material-ui/Checkbox'
import { FormControlLabel } from 'material-ui/Form'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'

import ContentRemoveCircle from 'material-ui-icons/RemoveCircle'

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
    if (name == 'tags')
      value = value.split(',')

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

  handleRemove(e) {
    e.preventDefault()
    this.props.onRemoveClick(this.state.merit.id)
  }

  render() {
    const { merit } = this.state

    return <div style={{ marginBottom: '0.5em' }}>
      <TextField name="name" value={ merit.name }
        label="Name:"
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

      <IconButton onClick={ this.handleRemove } style={{ minWidth: '2em' }}>
        <ContentRemoveCircle />
      </IconButton>
      <br />

      <TextField name="body" value={ merit.body }
        label="Text:"
        onChange={ this.handleChange } onBlur={ this.handleBlur }
        fullWidth={ true } multiline
      />
      <br />

      <TextField name="ref" value={ merit.ref }
        label="Reference:"
        onChange={ this.handleChange } onBlur={ this.handleBlur }
      />
    </div>
  }
}
QcMeritFields.propTypes = {
  merit: PropTypes.shape(qcMerit).isRequired,
  onMeritChange: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired
}
