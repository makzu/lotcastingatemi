import React from 'react'
import PropTypes from 'prop-types'

import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import ContentRemoveCircle from 'material-ui-icons/RemoveCircle'
import ContentAddCircle from 'material-ui-icons/AddCircle'

import RatingField from '../generic/ratingField.jsx'
import { fullQc } from '../../utils/propTypes'

function ActionFields(props) {
  const { onActionChange, onActionBlur, onRatingChange, onRemove } = props
  const { action, pool } = props.action

  return <div>
    <TextField name="action" value={ action }
      label="Action" margin="dense"
      onChange={ onActionChange } onBlur={ onActionBlur }
    />&nbsp; &nbsp;
    <RatingField trait="pool" value={ pool }
      label="Pool" min={ 1 } margin="dense"
      onChange={ onRatingChange }
    />
    <IconButton onClick={ onRemove }><ContentRemoveCircle /></IconButton>
  </div>
}
ActionFields.propTypes = {
  action: PropTypes.object,
  onActionChange: PropTypes.func,
  onActionBlur: PropTypes.func,
  onRatingChange: PropTypes.func,
  onRemove: PropTypes.func,
}

class QcActionEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      actions: this.props.qc.actions
    }

    this.onAdd = this.onAdd.bind(this)
  }

  componentWillReceiveProps(newProps) {
    this.setState({ actions: newProps.qc.actions })
  }

  onActionChange(index, e) {
    var newActions = [...this.state.actions]
    newActions[index].action = e.target.value
    this.setState({ actions: newActions })
  }

  onActionBlur(index) {
    if (this.state.actions[index].action == this.props.qc.actions[index].action)
      return

    this.props.onChange('actions', this.state.actions)
  }

  onRatingChange(index, e) {
    var newActions = [...this.state.actions]
    newActions[index].pool = parseInt(e.target.value)

    this.props.onChange('actions', newActions)
  }

  onAdd() {
    var newActions = [...this.state.actions, { action: 'New Action', pool: 1 }]
    this.props.onChange('actions', newActions)
  }

  onRemove(index) {
    var newActions = [...this.state.actions]
    newActions.splice(index, 1)

    this.props.onChange('actions', newActions)
  }

  render() {
    const { onActionChange, onActionBlur, onRatingChange, onAdd, onRemove } = this

    const actions = this.state.actions.map((action, index) =>
      <ActionFields action={ action } key={ index }
        onActionChange={ onActionChange.bind(this, index) }
        onActionBlur={ onActionBlur.bind(this, index) }
        onRatingChange={ onRatingChange.bind(this, index) }
        onRemove={ onRemove.bind(this, index) }
      />
    )

    return <div>
      <Typography variant="subheading">
        Actions

        <Button onClick={ onAdd }>
          Add Action &nbsp;
          <ContentAddCircle />
        </Button>
      </Typography>

      { actions }
    </div>
  }
}
QcActionEditor.propTypes = {
  qc: PropTypes.shape(fullQc),
  onChange: PropTypes.func
}

export default QcActionEditor
