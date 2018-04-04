import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc'

import Button from 'material-ui/Button'
import Checkbox from 'material-ui/Checkbox'
import { FormControlLabel } from 'material-ui/Form'
import Grid from 'material-ui/Grid'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import ContentAddCircle from 'material-ui-icons/AddCircle'
import Delete from 'material-ui-icons/Delete'
import DragHandleIcon from 'material-ui-icons/DragHandle'

import BlockPaper from '../generic/blockPaper.jsx'
import RatingField from '../generic/RatingField.jsx'

import ProtectedComponent from '../../containers/ProtectedComponent.jsx'
import { updateMerit, createMerit, destroyMerit } from '../../ducks/actions.js'
import { getSpecificCharacter, getMeritsForCharacter } from '../../selectors'
import { MERIT_RATING_MIN, MERIT_RATING_MAX } from '../../utils/constants.js'
import { fullMerit } from '../../utils/propTypes'

const SortableItem = SortableElement(({ children }) => children)
const SortableGridList = SortableContainer(({ header, items }) =>
  <Grid container spacing={ 24 }>
    <Grid item xs={ 12 }>
      { header }
    </Grid>
    { items }
  </Grid>
)
const Handle = SortableHandle(() => <DragHandleIcon onClick={ (e) => e.preventDefault() } />)

export class MeritFields extends Component {
  constructor(props) {
    super(props)
    this.state = { merit: this.props.merit }

    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleRatingChange = this.handleRatingChange.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentWillReceiveProps(newProps) {
    this.setState({ merit: newProps.merit })
  }

  handleChange(e) {
    const { name, value } = e.target

    this.setState({ merit: { ...this.state.merit, [name]: value }})
  }

  handleBlur(e) {
    const { name } = e.target
    const { merit } = this.state

    if (merit[name] != this.props.merit[name]) {
      this.props.onUpdate(merit.id, merit.character_id, name, merit[name])
    }
  }

  handleRatingChange(e) {
    let { name, value } = e.target
    const { merit } = this.state

    this.setState({ merit: { ...merit, [name]: value }})
    this.props.onUpdate(merit.id, merit.character_id, name, value)
  }

  handleCheck(e) {
    const { name } = e.target
    const { merit } = this.state
    const value = ! merit[name]

    this.props.onUpdate(merit.id, merit.character_id, name, value)
  }

  handleRemove() {
    this.props.onRemove(this.state.merit.id)
  }

  render() {
    const { merit } = this.state
    const { handleChange, handleBlur, handleRatingChange, handleCheck } = this

    return <BlockPaper>
      <Button onClick={ this.handleRemove }
        style={{ position: 'absolute', bottom: '0.5em', right: '0.5em' }}
      >
        Delete&nbsp;
        <Delete />
      </Button>

      <Typography component="div" style={{ position: 'absolute', top: '0.5em', right: '0.5em' }}>
        <Handle />
      </Typography>

      <Typography component="div">
        <TextField name="merit_name" value={ merit.merit_name }
          onChange={ handleChange } onBlur={ handleBlur }
          label="Merit" margin="dense"
        />&nbsp;&nbsp;

        <RatingField trait="rating" value={ merit.rating }
          label="Rating" margin="dense" narrow
          min={ MERIT_RATING_MIN } max={ MERIT_RATING_MAX }
          onChange={ handleRatingChange }
        />
        { merit.rating === 6 &&
          <span>{'(N/A)'}&nbsp;&nbsp;</span>
        }

        <TextField select name="merit_cat" value={ merit.merit_cat }
          label="Type" margin="dense"
          onChange={ handleRatingChange }
        >
          <MenuItem value="story">Story</MenuItem>
          <MenuItem value="innate">Innate</MenuItem>
          <MenuItem value="purchased">Purchased</MenuItem>
        </TextField>
        &nbsp;

        <FormControlLabel
          control={
            <Checkbox name="supernatural" checked={ merit.supernatural }
              onChange={ handleCheck }
            />
          }
          label="Supernatual"
        />


      </Typography>

      <div style={{ display: 'flex' }}>
        <TextField name="label" value={ merit.label }
          style={{ flex: 1 }}
          label="Summary (optional)" margin="dense"
          onChange={ handleChange } onBlur={ handleBlur }
        />
        &nbsp;


      </div>

      <div>
        <TextField name="description" value={ merit.description }
          label="Description" margin="dense"
          multiline fullWidth rowsMax={ 10 }
          onChange={ handleChange } onBlur={ handleBlur }
        />
      </div>

      <div>
        <TextField name="ref" value={ merit.ref }
          onChange={ handleChange } onBlur={ handleBlur }
          label="Reference" margin="dense"
        />
      </div>
    </BlockPaper>
  }
}
MeritFields.propTypes = {
  character: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
  merit: PropTypes.shape(fullMerit),
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
}

/* LATER: possible autocomplete for merits in the book with merit_name, cat, and
 * ref pre-filled
 * TODO:  See how kosher something like above would be
 * */
class MeritEditor extends Component {
  constructor(props) {
    super(props)

    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleSort = this.handleSort.bind(this)
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

  handleSort({ oldIndex, newIndex }) {
    if (oldIndex === newIndex)
      return
    const meritA = this.props.merits[oldIndex]
    const meritB = this.props.merits[newIndex]
    const offset = meritA.sort_order > meritB.sort_order ? -1 : 1
    this.props._handleUpdate(meritA.id, this.props.character.id, 'sort_order', meritB.sort_order + offset)
  }

  render() {
    /* Escape hatch */
    if (this.props.character == undefined)
      return <div>
        <Typography paragraph>This Character has not yet loaded.</Typography>
      </div>

    const { handleAdd, handleUpdate, handleRemove, handleSort } = this

    const mts = this.props.merits.map((m, i) => <SortableItem key={ m.id } index={ i }>
      <Grid item key={ m.id } xs={ 12 } md={ 6 } xl={ 4 }>
        <MeritFields merit={ m } character={ this.props.character }
          onUpdate={ handleUpdate } onRemove={ handleRemove }
        />
      </Grid>
    </SortableItem>)

    return <div>
      <SortableGridList
        header={<Typography variant="headline">
          Merits
          &nbsp;&nbsp;
          <Button onClick={ handleAdd }>
            Add Merit&nbsp;
            <ContentAddCircle />
          </Button>
        </Typography>}
        items={ mts }
        onSortEnd={ handleSort }
        useDragHandle={ true }
        axis="xy"
      />
    </div>
  }
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.characterId
  const character = getSpecificCharacter(state, id)
  let merits = []

  if (character != undefined && character.merits != undefined) {
    merits = getMeritsForCharacter(state, id)
  }

  return {
    character,
    merits,
  }
}
MeritEditor.propTypes = {
  character: PropTypes.shape({ id: PropTypes.number.isRequired }),
  merits: PropTypes.arrayOf(PropTypes.shape(fullMerit)),
  _handleUpdate: PropTypes.func,
  _handleDestroy: PropTypes.func,
  _handleCreate: PropTypes.func,
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

export default ProtectedComponent(
  connect(mapStateToProps, mapDispatchToProps)(
    MeritEditor
  )
)
