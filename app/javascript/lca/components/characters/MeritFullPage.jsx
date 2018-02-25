import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Divider from 'material-ui/Divider'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import ContentRemoveCircle from 'material-ui-icons/RemoveCircle'
import ContentAddCircle from 'material-ui-icons/AddCircle'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Select from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'
import Checkbox from 'material-ui/Checkbox'

import { updateMerit, createMerit, destroyMerit } from '../../ducks/actions.js'
import { clamp } from '../../utils/'
import { MERIT_RATING_MIN, MERIT_RATING_MAX } from '../../utils/constants.js'
import { fullMerit } from '../../utils/propTypes'
import RatingDots from '../generic/ratingDots.jsx'

export function SingleMerit(props) {
  const { merit } = props

  return <div>
    <Typography variant="title">
      { merit.name }
    </Typography>
    <RatingDots rating={ merit.rating } dontFill />

    <Typography variant="caption" gutterBottom>
      { merit.name.toUpperCase() != merit.merit_name.toUpperCase() &&
        `(${ merit.merit_name }) `
      }
      { merit.supernatural && 'Supernatural '}
      { merit.merit_cat } Merit
    </Typography>

    <Typography>
      { merit.description }
    </Typography>

    <Typography variant="caption" gutterBottom>
      Ref: { merit.ref }
    </Typography>

    <Divider />
  </div>
}

SingleMerit.propTypes = {
  merit: PropTypes.shape(fullMerit),
}

export class SingleMeritEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { merit: this.props.merit }

    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleCatChange = this.handleCatChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleChange(e) {
    e.preventDefault()
    let val = e.target.value

    if (e.target.name == 'rating') {
      val = clamp(parseInt(val), MERIT_RATING_MIN, MERIT_RATING_MAX)
    } else if (e.target.type == 'checkbox') {
      val = ! this.state.merit[e.target.name]
      this.props.onUpdate(this.state.merit.id, this.props.character.id, e.target.name, val)
    }

    this.setState({ merit: { ...this.state.merit, [e.target.name]: val }})
  }
  handleBlur(e) {
    const trait = e.target.name

    if (this.state.merit[trait] != this.props.merit[trait]) {
      this.props.onUpdate(this.state.merit.id, this.state.merit.character_id, trait, this.state.merit[trait])
    }
  }

  handleCatChange(e, key, value) {
    this.setState({ merit: { ...this.state.merit, merit_cat: value }})

    this.props.onUpdate(this.state.merit.id, this.props.character.id, 'merit_cat', value)
  }

  handleRemove() {
    this.props.onRemove(this.state.merit.id)
  }

  render() {
    const { merit } = this.state

    return <div className="singleMerit">
      <TextField name="merit_name" value={ merit.merit_name }
        onChange={this.handleChange} onBlur={this.handleBlur}
        label="Merit:" />
      <TextField name="name" value={merit.name}
        onChange={this.handleChange} onBlur={this.handleBlur}
        label="Summary:" />
      <TextField name="rating" value={merit.rating}
        type="number" min={MERIT_RATING_MIN} max={MERIT_RATING_MAX} className="editor-rating-field"
        onChange={this.handleChange} onBlur={this.handleBlur}
        label="Rating:"
      />

      <div>
        <Select name="merit_cat" value={merit.merit_cat}
          onChange={this.handleCatChange}
          label="Type:"
        >
          <MenuItem value="story" primarytext="Story" />
          <MenuItem value="innate" primarytext="Innate" />
          <MenuItem value="purchased" primarytext="Purchased" />
        </Select>

        <div style={{ display: 'inline-block' }}>
          <Checkbox name="supernatural" value={merit.supernatural}
            onCheck={this.handleChange}
            label="Supernatural?" />
        </div>
      </div>

      <div>
        <TextField name="description" value={ merit.description }
          onChange={this.handleChange} onBlur={this.handleBlur}
          label="Description:"
          multiLine={ true } style={{ width: '100%' }}
        />
      </div>
      <div>
        <TextField name="ref" value={ merit.ref }
          onChange={this.handleChange} onBlur={this.handleBlur}
          label="Ref:"
        />
        <IconButton onClick={ this.handleRemove } label="Remove"
          style={{ float: 'right' }}
        >
          <ContentRemoveCircle />
        </IconButton>
      </div>
      <Divider />
    </div>
  }
}
SingleMeritEditor.propTypes = {
  character: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
  merit: PropTypes.shape(fullMerit),
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
}

/* LATER: possible autocomplete for merits in the book with merit_name, cat, and
 * ref pre-filled
 * TODO  See how kosher something like above would be
 * */
class MeritFullPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isEditing: false }

    this.toggleEditor = this.toggleEditor.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  toggleEditor() {
    this.setState({ isEditing: !this.state.isEditing })
  }

  handleUpdate(id, charId, trait, value) {
    this.props._handleUpdate(id, charId, trait, value)
  }

  handleAdd() {
    this.props._handleCreate(this.props.character.id)
  }

  handleRemove(id) {
    this.props._handleDestroy(id, this.props.character.id)
  }

  render() {
    if (this.props.character == undefined) {
      return null // TODO replace with spinner or something?
    }

    let mts
    if (this.state.isEditing) {
      mts = this.props.merits.map((m) =>
        <SingleMeritEditor key={ m.id } merit={ m } character={ this.props.character }
          onUpdate={ this.handleUpdate } onRemove={ this.handleRemove }
        />
      )
    } else {
      mts = this.props.merits.map((m) =>
        <SingleMerit key={ m.id } merit={ m } />
      )
    }

    return <div className="meritPage">
      <Typography variant="headline">
        Merits
        <small style={{ fontSize: '60%', marginLeft: '5em' }}>
          <Link style={{ textDecoration: 'none' }} to={'/characters/' + this.props.character.id }>
            Back to full sheet
          </Link>
        </small>
        <Button style={{ float: 'right' }} label={ this.state.isEditing ? 'done' : 'edit' } onClick={ this.toggleEditor } />
        { this.state.isEditing &&
          <Button label="Add Merit" icon={<ContentAddCircle />}
            onClick={ this.handleAdd }
            style={{ float: 'right' }}
          />
        }
      </Typography>
      { mts }
    </div>
  }
}

function mapStateToProps(state, ownProps) {
  const character = state.entities.characters[ownProps.match.params.characterId]
  let merits = []

  if (character != undefined && character.merits != undefined) {
    merits = character.merits.map((id) => state.entities.merits[id])
  }

  return {
    character,
    merits,
  }
}
MeritFullPage.propTypes = {
  character: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
  merits: PropTypes.arrayOf(PropTypes.shape(fullMerit)),
  _handleUpdate: PropTypes.func,
  _handleDestroy: PropTypes.func,
  _handleCreate: PropTypes.func
}

function mapDispatchToProps(dispatch) {
  return {
    _handleUpdate: (id, charId, trait, value) => {
      dispatch(updateMerit(id, charId, trait, value))
    },
    _handleDestroy: (id, charId) => {
      dispatch(destroyMerit(id, charId))
    },
    _handleCreate: (charId) => {
      dispatch(createMerit(charId))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MeritFullPage)
