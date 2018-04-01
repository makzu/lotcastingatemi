import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { cloneDeep } from 'lodash'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import ContentRemoveCircle from 'material-ui-icons/RemoveCircle'
import ContentAddCircle from 'material-ui-icons/AddCircle'

import RatingField from '../../generic/RatingField.jsx'
import { fullChar } from '../../../utils/propTypes'

const styles = theme => ({
  fieldContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  labelField: {
    flex: 1,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
})

function _CommitFields(props) {
  const { onCommittmentChange, onCommittmentBlur, onRatingChange, onRemove, classes } = props
  const { pool, label, motes } = props.committment

  return <div className={ classes.fieldContainer }>
    <TextField select name="pool" value={ pool }
      label="Pool" margin="dense"
      onChange={ onRatingChange }
    >
      <MenuItem value="personal">Pers</MenuItem>
      <MenuItem value="peripheral">Peri</MenuItem>
    </TextField>

    <TextField name="label" value={ label } className={ classes.labelField }
      label="For" margin="dense"
      onChange={ onCommittmentChange } onBlur={ onCommittmentBlur }
    />

    <RatingField trait="motes" value={ motes }
      label="Motes" min={ 0 } margin="dense" narrow
      onChange={ onRatingChange }
    />
    <IconButton onClick={ onRemove }><ContentRemoveCircle /></IconButton>
  </div>
}
_CommitFields.propTypes = {
  committment: PropTypes.object,
  onCommittmentChange: PropTypes.func,
  onCommittmentBlur: PropTypes.func,
  onRatingChange: PropTypes.func,
  onRemove: PropTypes.func,
  classes: PropTypes.object,
}
const CommitFields = withStyles(styles)(_CommitFields)

class MoteCommittmentEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      motes_committed: cloneDeep(this.props.character.motes_committed),
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ motes_committed: cloneDeep(newProps.character.motes_committed) })
  }

  onCommittmentChange(index, e) {
    var newCommittments = [ ...this.state.motes_committed ]
    newCommittments[index].label = e.target.value
    this.setState({ motes_committed: newCommittments })
  }

  onCommittmentBlur(index) {
    if (this.state.motes_committed[index].label == this.props.character.motes_committed[index].label)
      return

    this.onChange(this.state.motes_committed)
  }

  onRatingChange(index, e) {
    var newCommittments = [...this.state.motes_committed]
    newCommittments[index][e.target.name] = e.target.value

    this.onChange(newCommittments)
  }

  onAdd() {
    var newCommittments = [ ...this.state.motes_committed, {
      pool: 'peripheral', label: '', motes: 0
    }]
    this.onChange(newCommittments)
  }

  onRemove(index) {
    var newCommittments = [...this.state.motes_committed]
    newCommittments.splice(index, 1)

    this.onChange(newCommittments)
  }

  onChange(newCommittments) {
    this.props.onChange({ target: { name: 'motes_committed', value: newCommittments }})
  }

  render() {
    const { onCommittmentChange, onCommittmentBlur, onRatingChange, onAdd, onRemove } = this

    const committments = this.state.motes_committed.map((committment, index) =>
      <CommitFields committment={ committment } key={ index }
        onCommittmentChange={ onCommittmentChange.bind(this, index) }
        onCommittmentBlur={ onCommittmentBlur.bind(this, index) }
        onRatingChange={ onRatingChange.bind(this, index) }
        onRemove={ onRemove.bind(this, index) }
      />
    )

    return <div>
      <Typography variant="subheading">
        Committments:
        <Button onClick={ onAdd.bind(this) }>
          Add &nbsp;
          <ContentAddCircle />
        </Button>
      </Typography>
      { committments.length == 0 &&
        <Typography paragraph>None</Typography>
      }
      { committments }
    </div>
  }
}
MoteCommittmentEditor.propTypes = {
  character: PropTypes.shape(fullChar),
  onChange: PropTypes.func
}

export default MoteCommittmentEditor
