import React from 'react'
import PropTypes from 'prop-types'

import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'
import Delete from 'material-ui-icons/Delete'

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

  handleRemove() {
    this.props.onRemoveClick(this.state.charm.id)
  }

  render() {
    const { charm } = this.state
    const { handleChange, handleBlur, handleRatingChange, handleRemove } = this

    return <div style={{ marginBottom: '0.75em' }}>
      <TextField name="name" value={ charm.name }
        label="Name" margin="dense"
        onChange={ handleChange } onBlur={ handleBlur }
      />&nbsp;&nbsp;
      <RatingField trait="min_essence" value={ charm.min_essence }
        label="Essence" margin="dense"
        onChange={ handleRatingChange }
      />
      <TextField name="cost" value={ charm.cost }
        label="Cost" margin="dense"
        onChange={ handleChange } onBlur={ handleBlur }
      />
      <Button onClick={ handleRemove } style={{ float: 'right' }}>
        Delete&nbsp;
        <Delete />
      </Button>
      <br />

      <TextField select name="timing" value={ charm.timing }
        label="Type" margin="dense"
        onChange={ handleRatingChange }
      >
        <MenuItem key="simple" value="simple">Simple</MenuItem>
        <MenuItem key="supplemental" value="supplemental">Supplemental</MenuItem>
        <MenuItem key="reflexive" value="reflexive">Reflexive</MenuItem>
        <MenuItem key="permanant" value="permanant">Permanant</MenuItem>
      </TextField>&nbsp;&nbsp;

      <TextField name="duration" value={ charm.duration }
        label="Duration" margin="dense"
        onChange={ handleChange } onBlur={ handleBlur }
      />

      <TextField name="keywords" value={ charm.keywords }
        label="Keywords (comma separated)" margin="dense"
        onChange={ handleChange } onBlur={ handleBlur }
        fullWidth
      />
      <br />

      <TextField name="body" value={ charm.body }
        label="Text" margin="dense"
        onChange={ handleChange } onBlur={ handleBlur }
        fullWidth={ true } multiline rowsMax={ 5 }
      />
      <br />
      <TextField name="ref" value={ charm.ref }
        label="Reference" margin="dense"
        onChange={ handleChange } onBlur={ handleBlur }
      />

      <Divider style={{ marginTop: '0.5em' }} />
    </div>
  }
}
QcCharmFields.propTypes = {
  charm: PropTypes.shape(qcCharm).isRequired,
  onCharmChange: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired
}
