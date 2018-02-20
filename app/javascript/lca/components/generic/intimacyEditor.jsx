import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import ContentRemoveCircle from 'material-ui-icons/RemoveCircle'
import ContentAddCircle from 'material-ui-icons/AddCircle'

import RatingField from './ratingField.jsx'
import { withIntimacies } from '../../utils/propTypes'

function IntimacyFields(props) {
  const { onSubjectChange, onSubjectBlur, onRatingChange, onRemove } = props
  const { subject, rating } = props.intimacy
  const label = props.type == 'tie' ? 'Tie:' : 'Principle:'

  return <div>
    <TextField name="subject" value={ subject }
      label={ label }
      onChange={ onSubjectChange } onBlur={ onSubjectBlur }
    />
    <RatingField trait="rating" value={ rating }
      label="Rating:" max={ 3 }
      onChange={ onRatingChange }
    />
    <IconButton onClick={ onRemove }><ContentRemoveCircle /></IconButton>
  </div>
}
IntimacyFields.propTypes = {
  intimacy: PropTypes.object,
  type: PropTypes.string,
  onSubjectChange: PropTypes.func,
  onSubjectBlur: PropTypes.func,
  onRatingChange: PropTypes.func,
  onRemove: PropTypes.func,
}

class IntimacyEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      principles: this.props.character.principles,
      ties: this.props.character.ties
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ principles: newProps.character.principles, ties: newProps.character.ties })
  }

  onSubjectChange(type, index, e) {
    var newIntimacies = [...this.state[type]]
    newIntimacies[index].subject = e.target.value
    this.setState({ [type]: newIntimacies })
  }

  onSubjectBlur(type, index) {
    if (this.state[type][index].subject == this.props.character[type][index])
      return

    this.props.onChange(type, this.state[type])
  }

  onRatingChange(type, index, e) {
    var newIntimacies = [...this.state[type]]
    newIntimacies[index].rating = parseInt(e.target.value)

    this.props.onChange(type, newIntimacies)
  }

  onAdd(type) {
    var newIntimacies = [...this.state[type], { subject: `New ${type.slice(0, -1)}`, rating: 1 }]
    this.props.onChange(type, newIntimacies)
  }

  onRemove(type, index) {
    var newIntimacies = [...this.state[type]]
    newIntimacies.splice(index, 1)

    this.props.onChange(type, newIntimacies)
  }

  render() {
    const { onSubjectChange, onSubjectBlur, onRatingChange, onAdd, onRemove } = this

    const principles = this.state.principles.map((principle, index) =>
      <IntimacyFields intimacy={ principle } type="principle" key={ index }
        onSubjectChange={ onSubjectChange.bind(this, 'principles', index) }
        onSubjectBlur={ onSubjectBlur.bind(this, 'principles', index) }
        onRatingChange={ onRatingChange.bind(this, 'principles', index) }
        onRemove={ onRemove.bind(this, 'principles', index) }
      />
    )
    const ties = this.state.ties.map((tie, index) =>
      <IntimacyFields intimacy={ tie } type="tie" key={ index }
        onSubjectChange={ onSubjectChange.bind(this, 'ties', index) }
        onSubjectBlur={ onSubjectBlur.bind(this, 'ties', index) }
        onRatingChange={ onRatingChange.bind(this, 'ties', index) }
        onRemove={ onRemove.bind(this, 'ties', index) }
      />
    )
    return <div>
      { principles }
      { ties }

      <Button onClick={ onAdd.bind(this, 'principles') }>
        Add Principle &nbsp;
        <ContentAddCircle />
      </Button>
      <Button onClick={ onAdd.bind(this, 'ties') }>
        Add Tie &nbsp;
        <ContentAddCircle />
      </Button>
    </div>
  }
}
IntimacyEditor.propTypes = {
  character: PropTypes.shape(withIntimacies),
  onChange: PropTypes.func
}

export default IntimacyEditor
