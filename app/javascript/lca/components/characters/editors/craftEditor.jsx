import React from 'react'
import PropTypes from 'prop-types'
import { cloneDeep } from 'lodash'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import ContentRemoveCircle from 'material-ui-icons/RemoveCircle'
import ContentAddCircle from 'material-ui-icons/AddCircle'

import RatingField from '../../generic/RatingField.jsx'
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

function _CraftFields(props) {
  const { onCraftChange, onCraftBlur, onRatingChange, onRemove, classes } = props
  const { craft, rating } = props.craft

  return <div className={ classes.fieldContainer }>
    <TextField name="craft" value={ craft } className={ classes.nameField }
      label="Craft" margin="dense"
      onChange={ onCraftChange } onBlur={ onCraftBlur }
    />
    <RatingField trait="rating" value={ rating }
      label="Rating" min={ MIN } max={ MAX } margin="dense" narrow
      onChange={ onRatingChange }
    />
    <IconButton onClick={ onRemove }><ContentRemoveCircle /></IconButton>
  </div>
}
_CraftFields.propTypes = {
  craft: PropTypes.object,
  onCraftChange: PropTypes.func,
  onCraftBlur: PropTypes.func,
  onRatingChange: PropTypes.func,
  onRemove: PropTypes.func,
  classes: PropTypes.object,
}
const CraftFields = withStyles(styles)(_CraftFields)

class CraftEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      abil_craft: cloneDeep(this.props.character.abil_craft),
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ abil_craft: cloneDeep(newProps.character.abil_craft) })
  }

  onCraftChange(index, e) {
    var newCrafts = [ ...this.state.abil_craft ]
    newCrafts[index].craft = e.target.value
    this.setState({ abil_craft: newCrafts })
  }

  onCraftBlur(index) {
    if (this.state.abil_craft[index].craft == this.props.character.abil_craft[index].craft)
      return

    this.onChange(this.state.abil_craft)
  }

  onRatingChange(index, e) {
    var newCrafts = [...this.state.abil_craft]
    newCrafts[index].rating = e.target.value

    this.onChange(newCrafts)
  }

  onAdd() {
    var newCrafts = [ ...this.state.abil_craft, { craft: 'New Craft', rating: 1 }]
    this.onChange(newCrafts)
  }

  onRemove(index) {
    var newCrafts = [...this.state.abil_craft]
    newCrafts.splice(index, 1)

    this.onChange(newCrafts)
  }

  onChange(newCrafts) {
    this.props.onChange({ target: { name: 'abil_craft', value: newCrafts }})
  }

  render() {
    const { onCraftChange, onCraftBlur, onRatingChange, onAdd, onRemove } = this

    const crafts = this.state.abil_craft.map((craft, index) =>
      <CraftFields craft={ craft } key={ index }
        onCraftChange={ onCraftChange.bind(this, index) }
        onCraftBlur={ onCraftBlur.bind(this, index) }
        onRatingChange={ onRatingChange.bind(this, index) }
        onRemove={ onRemove.bind(this, index) }
      />
    )

    return <div>
      <Divider style={{ marginTop: '0.5em' }}/>

      <Typography variant="subheading">
        Crafts:
        <Button onClick={ onAdd.bind(this) }>
          Add &nbsp;
          <ContentAddCircle />
        </Button>
      </Typography>
      { crafts.length == 0 &&
        <Typography paragraph>None</Typography>
      }
      { crafts }
    </div>
  }
}
CraftEditor.propTypes = {
  character: PropTypes.shape(withIntimacies),
  onChange: PropTypes.func
}

export default CraftEditor
