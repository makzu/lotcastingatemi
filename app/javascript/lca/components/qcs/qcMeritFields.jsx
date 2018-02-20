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
    this.handleRangeChange = this.handleRangeChange.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.handleRatingChange = this.handleRatingChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
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
    e.preventDefault()
    let val = e.target.value
    if (e.target.name == 'tags') {
      val = val.split(',')
    }

    this.setState({ merit: { ...this.state.merit, [e.target.name]: val }})
  }

  handleRangeChange(e) {
    const value = e.target.value

    this.setState({ merit: { ...this.state.merit, range: value }})
    this.props.onMeritChange(this.state.merit.id, 'range', value)
  }

  handleCheck(e) {
    const trait = e.target.value
    let value = !this.state.merit[trait]
    this.setState({ merit: { ...this.state.merit, [trait]: value }})
    this.props.onMeritChange(this.state.merit.id, [trait], value)
  }

  handleRatingChange(e) {
    e.preventDefault()
    const trait = e.target.name
    const value = e.target.value
    this.setState({ merit: { ...this.state.merit, [trait]: value }})
    this.props.onMeritChange(this.state.merit.id, trait, value)
  }

  handleBlur(e) {
    e.preventDefault()
    const trait = e.target.name
    let value = e.target.value
    if (trait == 'tags') {
      value = value.split(',')
    }

    if (this.state.merit[trait] != this.props.merit[trait])
      this.props.onMeritChange(this.state.merit.id, trait, value)
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
          <Checkbox
            checked={ merit.latent }
            onChange={ this.handleCheck }
            value="latent"
          />
        }
      />
      <FormControlLabel
        label="Magical"
        control={
          <Checkbox
            checked={ merit.magical }
            onChange={ this.handleCheck }
            value="magical"
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
