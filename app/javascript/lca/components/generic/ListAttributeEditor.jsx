import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { cloneDeep } from 'lodash'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import ContentRemoveCircle from 'material-ui-icons/RemoveCircle'
import ContentAddCircle from 'material-ui-icons/AddCircle'

const styles = theme => ({
  fieldContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  nameField: {
    flex: 1,
    marginRight: theme.spacing.unit,
  },
})

class ListAttributeEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trait: cloneDeep(this.props.character[this.props.trait]),
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ trait: cloneDeep(newProps.character[this.props.trait]) })
  }

  onChange(index, e) {
    var newTrait = [ ...this.state.trait ]
    newTrait[index][e.target.name] = e.target.value
    this.setState({ trait: newTrait })
  }

  onBlur(index) {
    if (this.state.trait[index].craft == this.props.character[this.props.trait][index].craft)
      return

    this.handleChange(this.state.trait)
  }

  onRatingChange(index, e) {
    var newTrait = [...this.state.trait]
    newTrait[index][e.target.name] = e.target.value

    this.handleChange(newTrait)
  }

  onAdd() {
    var newTrait = [ ...this.state.trait, this.props.newObject]
    this.handleChange(newTrait)
  }

  onRemove(index) {
    var newTrait = [...this.state.trait]
    newTrait.splice(index, 1)

    this.handleChange(newTrait)
  }

  handleChange(newTrait) {
    this.props.onChange({ target: { name: this.props.trait, value: newTrait }})
  }

  render() {
    const { Fields, classes } = this.props
    const { onChange, onBlur, onRatingChange, onAdd, onRemove } = this

    const rows = this.state.trait.map((t, index) => <div key={ index } className={ classes.fieldContainer }>
      <Fields trait={ t }
        onChange={ onChange.bind(this, index) }
        onBlur={ onBlur.bind(this, index) }
        onRatingChange={ onRatingChange.bind(this, index) }
        classes={ classes }
      />
      <IconButton onClick={ onRemove.bind(this, index) }><ContentRemoveCircle /></IconButton>
    </div>
    )
    return <div>
      <Typography variant="subheading">
        { this.props.label }
        <Button onClick={ onAdd.bind(this) }>
          Add &nbsp;
          <ContentAddCircle />
        </Button>
      </Typography>
      { rows.length == 0 &&
        <Typography paragraph>None</Typography>
      }
      { rows }
    </div>
  }
}
ListAttributeEditor.propTypes = {
  character: PropTypes.object.isRequired,
  trait: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  newObject: PropTypes.object.isRequired,
  Fields: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object,
}

export default withStyles(styles)(ListAttributeEditor)
