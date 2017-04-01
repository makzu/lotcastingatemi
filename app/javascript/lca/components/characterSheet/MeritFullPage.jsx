import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/FlatButton'
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle'
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'

import { updateMerit, createMerit, destroyMerit } from '../../actions'
import { MERIT_RATING_MIN, MERIT_RATING_MAX } from '../../utils/constants.js'
import RatingDots from '../../utils/ratingDots.jsx'

function SingleMerit(props) {
  const { merit } = props

  return <div className="singleMerit">
    <h3>{ merit.name }</h3>
    <RatingDots rating={merit.rating} dontFill />
    <p><small>
      { merit.name.toUpperCase() != merit.merit_name.toUpperCase() &&
        <span>({ merit.merit_name }), </span>
      }
      { merit.supernatural && <span>supernatural </span> }
      { merit.merit_cat } merit
    </small></p>

    <p>{ merit.description }</p>
    <p><small>Ref: { merit.ref }</small></p>
    <Divider />
  </div>
}

class SingleMeritEditor extends React.Component {
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

    if (e.target.name == "rating") {
      val = parseInt(val)
      val = Math.max(Math.min(val, MERIT_RATING_MAX), MERIT_RATING_MIN)
    } else if (e.target.type == "checkbox") {
      val = ! this.state.merit[e.target.name]
      this.props.onUpdate(this.state.merit.id, this.props.character.id, e.target.name, val)
    }

    this.setState({merit: { ...this.state.merit, [e.target.name]: val}})
  }
  handleBlur(e) {
    const trait = e.target.name

    if (this.state.merit[trait] != this.props.merit[trait]) {
      this.props.onUpdate(this.state.merit.id, this.state.merit.character_id, trait, this.state.merit[trait])
    }
  }

  handleCatChange(e, key, value) {
    this.setState({ merit: { ...this.state.merit, merit_cat: value } })

    this.props.onUpdate(this.state.merit.id, this.props.character.id, "merit_cat", value)
  }

  handleRemove(e) {
    this.props.onRemove(this.state.merit.id)
  }

  render() {
    const { merit } = this.state

    return <div className="singleMerit">
      <TextField name="merit_name" value={ merit.merit_name }
        onChange={this.handleChange} onBlur={this.handleBlur}
        floatingLabelText="Merit:" />
      <TextField name="name" value={merit.name}
        onChange={this.handleChange} onBlur={this.handleBlur}
        floatingLabelText="Summary:" />
      <TextField name="rating" value={merit.rating}
        type="number" min={MERIT_RATING_MIN} max={MERIT_RATING_MAX} className="editor-rating-field"
          onChange={this.handleChange} onBlur={this.handleBlur}
        floatingLabelText="Rating:"
      />

      <div>

        <SelectField name="merit_cat" value={merit.merit_cat}
          onChange={this.handleCatChange}
          floatingLabelText="Type:"
        >
          <MenuItem value="story" primaryText="Story" />
          <MenuItem value="innate" primaryText="Innate" />
          <MenuItem value="purchased" primaryText="Purchased" />
        </SelectField>

        <div style={{display: 'inline-block'}}>
          <Checkbox name="supernatural" value={merit.supernatural}
            onCheck={this.handleChange}
            label="Supernatural?" />
        </div>
      </div>

      <div>
        <TextField name="description" value={ merit.description }
          onChange={this.handleChange} onBlur={this.handleBlur}
          floatingLabelText="Description:"
          multiLine={ true } style={{width: '100%'}}
        />
      </div>
      <div>
        <TextField name="ref" value={ merit.ref }
          onChange={this.handleChange} onBlur={this.handleBlur}
          floatingLabelText="Ref:"
        />
        <IconButton onClick={ this.handleRemove } label="Remove"
          style={{float: 'right'}}
        >
          <ContentRemoveCircle />
        </IconButton>
      </div>
      <Divider />
    </div>
  }
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
    this.setState({isEditing: !this.state.isEditing})
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
      <h1>
        Merits
        <small style={{fontSize: '60%', marginLeft: '5em'}}>
          { this.props.character &&
            <Link style={{textDecoration: 'none'}} to={"/characters/" + this.props.character.id }>
              Back to full sheet
            </Link>
          }</small>
        <FlatButton style={{ float: 'right'}} label={ this.state.isEditing ? 'done' : 'edit' } onClick={ this.toggleEditor } />
        { this.state.isEditing &&
          <IconButton onClick={ this.handleAdd } label="Add Merit"
            style={{ float: 'right' }}
          >
            <ContentAddCircle />
          </IconButton>
        }
      </h1>
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

  const { isFetching, isError } = state.app
  return {
    character,
    merits,
  }
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
