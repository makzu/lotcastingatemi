// @flow
import * as React from 'react'
const { Component, Fragment } = React
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'
import { SortableElement, SortableHandle } from 'react-sortable-hoc'

import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import ContentAddCircle from '@material-ui/icons/AddCircle'
import Delete from '@material-ui/icons/Delete'
import DragHandleIcon from '@material-ui/icons/DragHandle'

import BlockPaper from '../generic/blockPaper.jsx'
import RatingField from '../generic/RatingField.jsx'
import SortableGridList from 'components/generic/SortableGridList.jsx'

import ProtectedComponent from 'containers/ProtectedComponent.jsx'
import { updateMerit, createMerit, destroyMerit } from 'ducks/actions.js'
import { getSpecificCharacter, getMeritsForCharacter } from 'selectors'
import { MERIT_RATING_MIN, MERIT_RATING_MAX } from 'utils/constants.js'
import type { Character, fullMerit as Merit } from 'utils/flow-types'

const SortableItem = SortableElement(({ children }) => children)
const Handle = SortableHandle(() => (
  <DragHandleIcon onClick={e => e.preventDefault()} />
))

type FieldsProps = { merit: Merit, onUpdate: Function, onRemove: Function }
type State = { merit: Merit }
export class MeritFields extends Component<FieldsProps, State> {
  constructor(props: FieldsProps) {
    super(props)
    this.state = { merit: this.props.merit }
  }

  componentWillReceiveProps = (newProps: FieldsProps) => {
    this.setState({ merit: newProps.merit })
  }

  handleChange = (e: SyntheticInputEvent<>) => {
    const { name, value } = e.target

    this.setState({ merit: { ...this.state.merit, [name]: value } })
  }

  handleBlur = (e: SyntheticInputEvent<>) => {
    const { name } = e.target
    const { merit } = this.state

    if (merit[name] != this.props.merit[name]) {
      this.props.onUpdate(merit.id, merit.character_id, name, merit[name])
    }
  }

  handleRatingChange = (e: SyntheticInputEvent<>) => {
    let { name, value } = e.target
    const { merit } = this.state

    this.setState({ merit: { ...merit, [name]: value } })
    this.props.onUpdate(merit.id, merit.character_id, name, value)
  }

  handleCheck = (e: SyntheticInputEvent<>) => {
    const { name } = e.target
    const { merit } = this.state
    const value = !merit[name]

    this.props.onUpdate(merit.id, merit.character_id, name, value)
  }

  handleRemove = () => {
    this.props.onRemove(this.state.merit.id)
  }

  render() {
    const { merit } = this.state
    const { handleChange, handleBlur, handleRatingChange, handleCheck } = this
    const meritCatOptions: React.Node = [
      <MenuItem key="s" value="story">
        Story
      </MenuItem>,
      <MenuItem key="i" value="innate">
        Innate
      </MenuItem>,
      <MenuItem key="p" value="purchased">
        Purchased
      </MenuItem>,
      <MenuItem key="f" value="flaw">
        Flaw
      </MenuItem>,
    ]
    return (
      <BlockPaper>
        <Button
          onClick={this.handleRemove}
          style={{ position: 'absolute', bottom: '0.5em', right: '0.5em' }}
        >
          Delete&nbsp;
          <Delete />
        </Button>

        <Typography
          component="div"
          style={{ position: 'absolute', top: '0.5em', right: '0.5em' }}
        >
          <Handle />
        </Typography>

        <Typography component="div">
          <TextField
            name="merit_name"
            value={merit.merit_name}
            onChange={handleChange}
            onBlur={handleBlur}
            label={merit.merit_cat === 'flaw' ? 'Flaw' : 'Merit'}
            margin="dense"
          />&nbsp;&nbsp;
          <RatingField
            trait="rating"
            value={merit.rating}
            label="Rating"
            margin="dense"
            narrow
            min={MERIT_RATING_MIN}
            max={MERIT_RATING_MAX}
            onChange={handleRatingChange}
          />
          {merit.rating === 6 && <span>{'(N/A)'}&nbsp;&nbsp;</span>}
          <TextField
            select
            name="merit_cat"
            value={merit.merit_cat}
            label="Type"
            margin="dense"
            onChange={handleRatingChange}
          >
            {meritCatOptions}
          </TextField>
        </Typography>

        <div style={{ display: 'flex' }}>
          <TextField
            name="label"
            value={merit.label}
            style={{ flex: 1 }}
            label="Summary (optional)"
            margin="dense"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          &nbsp;
        </div>

        <div>
          <TextField
            name="description"
            value={merit.description}
            label="Description"
            margin="dense"
            multiline
            fullWidth
            rowsMax={10}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div>
          <TextField
            name="ref"
            value={merit.ref}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Reference"
            margin="dense"
          />&nbsp;&nbsp;
          <FormControlLabel
            control={
              <Checkbox
                name="supernatural"
                checked={merit.supernatural}
                onChange={handleCheck}
              />
            }
            label="Supernatual"
          />
        </div>
      </BlockPaper>
    )
  }
}

/* LATER: possible autocomplete for merits in the book with merit_name, cat, and
 * ref pre-filled
 * TODO:  See how kosher something like above would be
 * */
type Props = {
  character: Character,
  merits: Array<Merit>,
  updateMerit: Function,
  destroyMerit: Function,
  createMerit: Function,
}
class MeritEditor extends Component<Props> {
  constructor(props) {
    super(props)
  }

  handleUpdate = (id, charId, trait, value) => {
    this.props.updateMerit(id, charId, trait, value)
  }

  handleAdd = () => {
    this.props.createMerit(this.props.character.id)
  }

  handleRemove = id => {
    this.props.destroyMerit(id, this.props.character.id)
  }

  handleSort = ({ oldIndex, newIndex }) => {
    if (oldIndex === newIndex) return
    const meritA = this.props.merits[oldIndex]
    const meritB = this.props.merits[newIndex]
    const offset = meritA.sort_order > meritB.sort_order ? -1 : 1
    this.props.updateMerit(
      meritA.id,
      this.props.character.id,
      'sort_order',
      meritB.sort_order + offset
    )
  }

  render() {
    /* Escape hatch */
    if (this.props.character == undefined)
      return (
        <div>
          <Typography paragraph>This Character has not yet loaded.</Typography>
        </div>
      )

    const { handleAdd, handleRemove, handleSort } = this
    const { updateMerit } = this.props

    const mts = this.props.merits.map((m, i) => (
      <SortableItem key={m.id} index={i}>
        <Grid item key={m.id} xs={12} md={6} xl={4}>
          <MeritFields
            merit={m}
            character={this.props.character}
            onUpdate={updateMerit}
            onRemove={handleRemove}
          />
        </Grid>
      </SortableItem>
    ))

    return (
      <Fragment>
        <DocumentTitle
          title={`${this.props.character.name} Merits | Lot-Casting Atemi`}
        />

        <Hidden smUp>
          <div style={{ height: '1.5em' }}>&nbsp;</div>
        </Hidden>

        <SortableGridList
          header={
            <Typography variant="headline">
              Merits &nbsp;&nbsp;
              <Button onClick={handleAdd}>
                Add Merit&nbsp;
                <ContentAddCircle />
              </Button>
            </Typography>
          }
          items={mts}
          classes={{}}
          onSortEnd={handleSort}
          useDragHandle={true}
          axis="xy"
        />
      </Fragment>
    )
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

export default ProtectedComponent(
  connect(
    mapStateToProps,
    { updateMerit, destroyMerit, createMerit }
  )(MeritEditor)
)
