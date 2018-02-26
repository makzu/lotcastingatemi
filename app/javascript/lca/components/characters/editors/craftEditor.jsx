import React from 'react'
import PropTypes from 'prop-types'
import { cloneDeep } from 'lodash'

import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import ContentRemoveCircle from 'material-ui-icons/RemoveCircle'
import ContentAddCircle from 'material-ui-icons/AddCircle'

import RatingField from '../../generic/ratingField.jsx'
import { withIntimacies } from '../../../utils/propTypes'

function CraftFields(props) {
  const { onCraftChange, onCraftBlur, onRatingChange, onRemove } = props
  const { craft, rating } = props.craft

  return <div>
    <TextField name="craft" value={ craft }
      label="Craft:"
      onChange={ onCraftChange } onBlur={ onCraftBlur }
    />
    <RatingField trait="rating" value={ rating }
      label="Rating:" max={ 5 }
      onChange={ onRatingChange }
    />
    <IconButton onClick={ onRemove }><ContentRemoveCircle /></IconButton>
  </div>
}
CraftFields.propTypes = {
  craft: PropTypes.object,
  onCraftChange: PropTypes.func,
  onCraftBlur: PropTypes.func,
  onRatingChange: PropTypes.func,
  onRemove: PropTypes.func,
}

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
