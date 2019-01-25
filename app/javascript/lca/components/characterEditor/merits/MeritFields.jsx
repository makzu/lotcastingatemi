// @flow
import { isEqual } from 'lodash'
import * as React from 'react'
const { Component } = React
import { SortableHandle } from 'react-sortable-hoc'

import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MenuItem from '@material-ui/core/MenuItem'
import MuiTextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Delete from '@material-ui/icons/Delete'
import DragHandleIcon from '@material-ui/icons/DragHandle'

import MeritEffectBlurb from './MeritEffectBlurb.jsx'
import BlockPaper from 'components/generic/blockPaper.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import TextField from 'components/generic/TextField.jsx'

import { MERIT_RATING_MIN, MERIT_RATING_MAX } from 'utils/constants.js'
import type { fullMerit as Merit } from 'utils/flow-types'

const Handle = SortableHandle(() => (
  <DragHandleIcon onClick={e => e.preventDefault()} />
))

type FieldsProps = { merit: Merit, onUpdate: Function, onRemove: Function }
class MeritFields extends Component<FieldsProps> {
  handleChange = (e: SyntheticInputEvent<>) => {
    const { name, value } = e.target
    const { merit } = this.props

    if (isEqual(merit[name], value)) return

    this.props.onUpdate(merit.id, merit.character_id, { [name]: value })
  }

  handleCheck = (e: SyntheticInputEvent<>) => {
    const { name } = e.target
    const { merit } = this.props
    const value = !merit[name]

    this.props.onUpdate(merit.id, merit.character_id, { [name]: value })
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
          />
          &nbsp;&nbsp;
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
          {merit.rating === 6 && (
            <span>
              {'(N/A)'}
              &nbsp;&nbsp;
            </span>
          )}
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
          />
          &nbsp;&nbsp;
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
        <MeritEffectBlurb name={merit.merit_name} rating={merit.rating} />
      </BlockPaper>
    )
  }
}

export default MeritFields
