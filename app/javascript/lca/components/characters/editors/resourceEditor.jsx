import React from 'react'
import PropTypes from 'prop-types'
import { cloneDeep } from 'lodash'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import ContentRemoveCircle from 'material-ui-icons/RemoveCircle'
import ContentAddCircle from 'material-ui-icons/AddCircle'

import RatingField from '../../generic/ratingField.jsx'
import { ABILITY_MAX as MAX, ABILITY_MIN as MIN } from '../../../utils/constants.js'
import { withIntimacies } from '../../../utils/propTypes'

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

function _ResourceFields(props) {
  const { onResourcesChange, onResourcesBlur, onValueChange, onRemove, classes } = props
  const { resource, value } = props.resource

  return <div className={ classes.fieldContainer }>
    <TextField name="resource" value={ resource } className={ classes.nameField }
      label="Resource" margin="dense"
      onChange={ onResourcesChange } onBlur={ onResourcesBlur }
    />
    <RatingField trait="value" value={ value }
      label="Value" min={ MIN } max={ MAX } margin="dense" narrow
      onChange={ onValueChange }
    />
    <IconButton onClick={ onRemove }><ContentRemoveCircle /></IconButton>
  </div>
}
_ResourceFields.propTypes = {
  resource: PropTypes.object,
  onResourcesChange: PropTypes.func,
  onResourcesBlur: PropTypes.func,
  onValueChange: PropTypes.func,
  onRemove: PropTypes.func,
  classes: PropTypes.object,
}
const ResourceFields = withStyles(styles)(_ResourceFields)

class ResourceEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      resources: cloneDeep(this.props.character.resources),
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ resources: cloneDeep(newProps.character.resources) })
  }

  onResourcesChange(index, e) {
    var newResourcess = [ ...this.state.resources ]
    newResourcess[index].resource = e.target.value
    this.setState({ resources: newResourcess })
  }

  onResourcesBlur(index) {
    if (this.state.resources[index].resource == this.props.character.resources[index].resource)
      return

    this.onChange(this.state.resources)
  }

  onValueChange(index, e) {
    var newResourcess = [...this.state.resources]
    newResourcess[index].value = e.target.value

    this.onChange(newResourcess)
  }

  onAdd() {
    var newResourcess = [ ...this.state.resources, { resource: 'Resource', value: 0 }]
    this.onChange(newResourcess)
  }

  onRemove(index) {
    var newResourcess = [...this.state.resources]
    newResourcess.splice(index, 1)

    this.onChange(newResourcess)
  }

  onChange(newResourcess) {
    this.props.onChange({ target: { name: 'resources', value: newResourcess }})
  }

  render() {
    const { onResourcesChange, onResourcesBlur, onValueChange, onAdd, onRemove } = this

    const resources = this.state.resources.map((resource, index) =>
      <ResourceFields resource={ resource } key={ index }
        onResourcesChange={ onResourcesChange.bind(this, index) }
        onResourcesBlur={ onResourcesBlur.bind(this, index) }
        onValueChange={ onValueChange.bind(this, index) }
        onRemove={ onRemove.bind(this, index) }
      />
    )

    return <div>
      <Typography variant="subheading">
        Misc Resources:
        <Button onClick={ onAdd.bind(this) }>
          Add &nbsp;
          <ContentAddCircle />
        </Button>
      </Typography>
      { resources.length == 0 &&
        <Typography paragraph>None</Typography>
      }
      { resources }
    </div>
  }
}
ResourceEditor.propTypes = {
  character: PropTypes.shape(withIntimacies),
  onChange: PropTypes.func
}

export default ResourceEditor
