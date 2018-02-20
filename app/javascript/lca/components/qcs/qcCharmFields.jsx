import React from 'react'
import PropTypes from 'prop-types'

import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import { MenuItem } from 'material-ui/Menu'

import ContentRemoveCircle from 'material-ui-icons/RemoveCircle'

import RatingField from '../generic/ratingField.jsx'
import { qcCharm } from '../../utils/propTypes'


export default class QcCharmFields extends React.Component {
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
      charm: this.props.charm
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ charm: newProps.charm })
  }

  handleChange(e) {
    e.preventDefault()
    let val = e.target.value
    if (e.target.name == 'tags') {
      val = val.split(',')
    }

    this.setState({ charm: { ...this.state.charm, [e.target.name]: val }})
  }

  handleRangeChange(e) {
    const value = e.target.value

    this.setState({ charm: { ...this.state.charm, range: value }})
    this.props.onCharmChange(this.state.charm.id, 'range', value)
  }

  handleCheck(e) {
    const trait = e.target.value
    let value = !this.state.charm[trait]
    this.setState({ charm: { ...this.state.charm, [trait]: value }})
    this.props.onCharmChange(this.state.charm.id, [trait], value)
  }

  handleRatingChange(e) {
    e.preventDefault()
    const trait = e.target.name
    const value = e.target.value
    this.setState({ charm: { ...this.state.charm, [trait]: value }})
    this.props.onCharmChange(this.state.charm.id, trait, value)
  }

  handleBlur(e) {
    e.preventDefault()
    const trait = e.target.name
    let value = e.target.value
    if (trait == 'tags') {
      value = value.split(',')
    }

    if (this.state.charm[trait] != this.props.charm[trait])
      this.props.onCharmChange(this.state.charm.id, trait, value)
  }

  handleRemove(e) {
    e.preventDefault()
    this.props.onRemoveClick(this.state.charm.id)
  }

  render() {
    const { charm } = this.state

    return <div style={{ marginBottom: '0.5em' }}>
      <TextField name="name" value={ charm.name }
        label="Name:"
        onChange={ this.handleChange } onBlur={ this.handleBlur }
      />
      <RatingField trait="min_essence" value={ charm.min_essence }
        label="Essence:"
        onChange={ this.handleRatingChange }
      />
      <TextField name="cost" value={ charm.cost }
        label="Cost:"
        onChange={ this.handleChange } onBlur={ this.handleBlur }
      />
      <IconButton onClick={ this.handleRemove } style={{ minWidth: '2em' }}>
        <ContentRemoveCircle />
      </IconButton>
      <br />

      <TextField select name="timing" value={ charm.timing }
        label="Type:"
        onChange={ this.handleChange } onBlur={ this.handleBlur }
      >
        <MenuItem key="simple" value="simple">Simple</MenuItem>
        <MenuItem key="supplemental" value="supplemental">Supplemental</MenuItem>
        <MenuItem key="reflexive" value="reflexive">Reflexive</MenuItem>
        <MenuItem key="permanant" value="permanant">Permanant</MenuItem>
      </TextField>
      <TextField name="keywords" value={ charm.keywords }
        label="Keywords:"
        onChange={ this.handleChange } onBlur={ this.handleBlur }
      />
      <br />

      <TextField name="body" value={ charm.body }
        label="Text:"
        onChange={ this.handleChange } onBlur={ this.handleBlur }
        fullWidth={ true } multiline
      />
      <br />
      <TextField name="ref" value={ charm.ref }
        label="Reference:"
        onChange={ this.handleChange } onBlur={ this.handleBlur }
      />
    </div>
  }
}
QcCharmFields.propTypes = {
  charm: PropTypes.shape(qcCharm).isRequired,
  onCharmChange: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired
}
