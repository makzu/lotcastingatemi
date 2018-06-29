// @flow
import { isEqual } from 'lodash'
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
import MuiTextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import ContentAddCircle from '@material-ui/icons/AddCircle'
import Delete from '@material-ui/icons/Delete'
import DragHandleIcon from '@material-ui/icons/DragHandle'

import BlockPaper from '../generic/blockPaper.jsx'
import RatingField from '../generic/RatingField.jsx'
import SortableGridList from 'components/generic/SortableGridList.jsx'
import TextField from 'components/generic/TextField.jsx'

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
export class MeritFields extends Component<FieldsProps> {
  handleChange = (e: SyntheticInputEvent<>) => {
    const { name, value } = e.target
    const { merit } = this.props

    if (isEqual(merit[name], value)) return

    this.props.onUpdate(merit.id, merit.character_id, name, value)
  }

  handleCheck = (e: SyntheticInputEvent<>) => {
    const { name } = e.target
    const { merit } = this.props
    const value = !merit[name]

    this.props.onUpdate(merit.id, merit.character_id, name, value)
  }

  handleRemove = () => {
    this.props.onRemove(this.props.merit.id)
  }

  render() {
    const { merit } = this.props
    const { handleChange, handleCheck } = this

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
            onChange={handleChange}
          />
          {merit.rating === 6 && <span>{'(N/A)'}&nbsp;&nbsp;</span>}
          <MuiTextField
            select
            name="merit_cat"
            value={merit.merit_cat}
            label="Type"
            margin="dense"
            onChange={handleChange}
          >
            <MenuItem value="story">Story</MenuItem>
            <MenuItem value="innate">Innate</MenuItem>
            <MenuItem value="purchased">Purchased</MenuItem>
            <MenuItem value="flaw">Flaw</MenuItem>
          </MuiTextField>
        </Typography>

        <div style={{ display: 'flex' }}>
          <TextField
            name="label"
            value={merit.label}
            style={{ flex: 1 }}
            label="Summary (optional)"
            margin="dense"
            onChange={handleChange}
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
          />
        </div>

        <div>
          <TextField
            name="ref"
            value={merit.ref}
            onChange={handleChange}
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
