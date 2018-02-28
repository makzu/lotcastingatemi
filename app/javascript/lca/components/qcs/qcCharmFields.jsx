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
    let { name, value } = e.target
    if (name == 'tags')
      value = value.split(',')

    this.setState({ charm: { ...this.state.charm, [name]: value }})
  }

  handleBlur(e) {
    const { name, value } = e.target
    const { charm } = this.state
    if (charm[name] == this.props.charm[name])
      return

    this.props.onCharmChange(charm.id, name, value)
  }

  handleRatingChange(e) {
    let { name, value } = e.target
    const { charm } = this.state

    this.setState({ charm: { ...charm, [name]: value }})
    this.props.onCharmChange(charm.id, name, value)
  }

  handleRemove(e) {
    this.props.onRemoveClick(this.state.charm.id)
  }

  render() {
    const { charm } = this.state
    const { handleChange, handleBlur, handleRatingChange, handleRemove } = this

    return <div style={{ marginBottom: '0.5em' }}>
      <TextField name="name" value={ charm.name }
        label="Name"
        onChange={ handleChange } onBlur={ handleBlur }
      />
      <RatingField trait="min_essence" value={ charm.min_essence }
        label="Essence"
        onChange={ handleRatingChange }
      />
      <TextField name="cost" value={ charm.cost }
        label="Cost"
        onChange={ handleChange } onBlur={ handleBlur }
      />
      <IconButton onClick={ handleRemove } style={{ minWidth: '2em' }}>
        <ContentRemoveCircle />
      </IconButton>
      <br />

      <TextField select name="timing" value={ charm.timing }
        label="Type"
        onChange={ handleRatingChange }
      >
        <MenuItem key="simple" value="simple">Simple</MenuItem>
        <MenuItem key="supplemental" value="supplemental">Supplemental</MenuItem>
        <MenuItem key="reflexive" value="reflexive">Reflexive</MenuItem>
        <MenuItem key="permanant" value="permanant">Permanant</MenuItem>
      </TextField>
      <TextField name="keywords" value={ charm.keywords }
        label="Keywords"
        onChange={ handleChange } onBlur={ handleBlur }
      />
      <br />

      <TextField name="body" value={ charm.body }
        label="Text"
        onChange={ handleChange } onBlur={ handleBlur }
        fullWidth={ true } multiline
      />
      <br />
      <TextField name="ref" value={ charm.ref }
        label="Reference"
        onChange={ handleChange } onBlur={ handleBlur }
      />
    </div>
  }
}
QcCharmFields.propTypes = {
  charm: PropTypes.shape(qcCharm).isRequired,
  onCharmChange: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired
}
