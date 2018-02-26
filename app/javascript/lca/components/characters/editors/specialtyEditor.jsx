import React from 'react'
import PropTypes from 'prop-types'
import { cloneDeep } from 'lodash'

import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import ContentRemoveCircle from 'material-ui-icons/RemoveCircle'
import ContentAddCircle from 'material-ui-icons/AddCircle'

import AbilitySelect from '../../generic/abilitySelect.jsx'
import BlockPaper from '../../generic/blockPaper.jsx'
import { withIntimacies } from '../../../utils/propTypes'
import * as calc from '../../../utils/calculated'

function SpecialtyFields(props) {
  const { onSpecialtyChange, onSpecialtyBlur, onRatingChange, onRemove, character } = props
  const { ability, context } = props.specialty

  return <div>
    <AbilitySelect name="ability" value={ ability }
      label="Ability"
      onChange={ onRatingChange }
      abilities={ calc.abilitiesWithRatings(character) }
    />
    <TextField name="context" value={ context }
      label="Specialty:"
      onChange={ onSpecialtyChange } onBlur={ onSpecialtyBlur }
    />
    <IconButton onClick={ onRemove }><ContentRemoveCircle /></IconButton>
  </div>
}
SpecialtyFields.propTypes = {
  specialty: PropTypes.object,
  character: PropTypes.object,
  onSpecialtyChange: PropTypes.func,
  onSpecialtyBlur: PropTypes.func,
  onRatingChange: PropTypes.func,
  onRemove: PropTypes.func,
}

class SpecialtyEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      specialties: cloneDeep(this.props.character.specialties),
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ specialties: cloneDeep(newProps.character.specialties) })
  }

  onSpecialtyChange(index, e) {
    var newSpecialtys = [ ...this.state.specialties ]
    newSpecialtys[index].context = e.target.value
    this.setState({ specialties: newSpecialtys })
  }

  onSpecialtyBlur(index) {
    if (this.state.specialties[index].context == this.props.character.specialties[index].context)
      return

    this.onChange(this.state.specialties)
  }

  onRatingChange(index, e) {
    var newSpecialtys = [...this.state.specialties]
    newSpecialtys[index].ability = e.target.value

    this.onChange(newSpecialtys)
  }

  onAdd() {
    var newSpecialtys = [ ...this.state.specialties, { context: 'New Specialty', ability: '' }]
    this.onChange(newSpecialtys)
  }

  onRemove(index) {
    var newSpecialtys = [...this.state.specialties]
    newSpecialtys.splice(index, 1)

    this.onChange(newSpecialtys)
  }

  onChange(newSpecialtys) {
    this.props.onRatingChange({ target: { name: 'specialties', value: newSpecialtys }})
  }

  render() {
    const { onSpecialtyChange, onSpecialtyBlur, onRatingChange, onAdd, onRemove } = this
    const { character, classes } = this.props

    const crafts = this.state.specialties.map((specialty, index) =>
      <SpecialtyFields specialty={ specialty } key={ index }
        character={ character }
        onSpecialtyChange={ onSpecialtyChange.bind(this, index) }
        onSpecialtyBlur={ onSpecialtyBlur.bind(this, index) }
        onRatingChange={ onRatingChange.bind(this, index) }
        onRemove={ onRemove.bind(this, index) }
      />
    )

    return <BlockPaper>
      <Typography variant="title">
        Specialties:
        <Button onClick={ onAdd.bind(this) }>
          Add &nbsp;
          <ContentAddCircle />
        </Button>
      </Typography>
      { crafts.length == 0 &&
        <Typography paragraph>None</Typography>
      }
      { crafts }
    </BlockPaper>
  }
}
SpecialtyEditor.propTypes = {
  character: PropTypes.shape(withIntimacies),
  onRatingChange: PropTypes.func
}

export default SpecialtyEditor
