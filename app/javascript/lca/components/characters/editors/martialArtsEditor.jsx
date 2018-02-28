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

function _MAFields(props) {
  const { onStyleChange, onStyleBlur, onRatingChange, onRemove, classes } = props
  const { style, rating } = props.art

  return <div className={ classes.fieldContainer }>
    <TextField name="style" value={ style } className={ classes.nameField }
      label="Style" margin="dense"
      onChange={ onStyleChange } onBlur={ onStyleBlur }
    />
    <RatingField trait="rating" value={ rating }
      label="Rating" min={ MIN } max={ MAX } margin="dense"
      onChange={ onRatingChange }
    />
    <IconButton onClick={ onRemove }><ContentRemoveCircle /></IconButton>
  </div>
}
_MAFields.propTypes = {
  art: PropTypes.object,
  onStyleChange: PropTypes.func,
  onStyleBlur: PropTypes.func,
  onRatingChange: PropTypes.func,
  onRemove: PropTypes.func,
  classes: PropTypes.object,
}
const MAFields = withStyles(styles)(_MAFields)

class MAEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      abil_martial_arts: cloneDeep(this.props.character.abil_martial_arts),
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ abil_martial_arts: cloneDeep(newProps.character.abil_martial_arts) })
  }

  onStyleChange(index, e) {
    var newMAs = [ ...this.state.abil_martial_arts ]
    newMAs[index].style = e.target.value
    this.setState({ abil_martial_arts: newMAs })
  }

  onStyleBlur(index) {
    if (this.state.abil_martial_arts[index].style == this.props.character.abil_martial_arts[index].style)
      return

    this.onChange(this.state.abil_martial_arts)
  }

  onRatingChange(index, e) {
    var newMAs = [...this.state.abil_martial_arts]
    newMAs[index].rating = e.target.value

    this.onChange(newMAs)
  }

  onAdd() {
    var newMAs = [ ...this.state.abil_martial_arts, { style: 'New MA', rating: 1 }]
    this.onChange(newMAs)
  }

  onRemove(index) {
    var newMAs = [...this.state.abil_martial_arts]
    newMAs.splice(index, 1)

    this.onChange(newMAs)
  }

  onChange(newMAs) {
    this.props.onChange({ target: { name: 'abil_martial_arts', value: newMAs }})
  }

  render() {
    const { onStyleChange, onStyleBlur, onRatingChange, onAdd, onRemove } = this

    const arts = this.state.abil_martial_arts.map((art, index) =>
      <MAFields art={ art } key={ index }
        onStyleChange={ onStyleChange.bind(this, index) }
        onStyleBlur={ onStyleBlur.bind(this, index) }
        onRatingChange={ onRatingChange.bind(this, index) }
        onRemove={ onRemove.bind(this, index) }
      />
    )

    return <div>
      <Typography variant="subheading">
        Martial Arts:
        <Button onClick={ onAdd.bind(this) }>
          Add &nbsp;
          <ContentAddCircle />
        </Button>
      </Typography>
      { arts.length == 0 &&
        <Typography paragraph>None</Typography>
      }
      { arts }
    </div>
  }
}
MAEditor.propTypes = {
  character: PropTypes.shape(withIntimacies),
  onChange: PropTypes.func
}

export default MAEditor
