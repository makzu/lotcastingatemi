import { deepEqual } from 'fast-equals'
import { Component, type SyntheticInputEvent } from 'react'
import { SortableHandle } from 'react-sortable-hoc'

import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import MenuItem from '@mui/material/MenuItem'
import MuiTextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Delete from '@mui/icons-material/Delete'
import DragHandleIcon from '@mui/icons-material/DragHandle'

import MeritEffectBlurb from './MeritEffectBlurb'
import RatingField from 'components/generic/RatingField'
import TextField from 'components/generic/TextField'
import BlockPaper from 'components/shared/BlockPaper'

import { MERIT_RATING_MIN, MERIT_RATING_MAX } from 'utils/constants'
import type { fullMerit as Merit } from 'utils/flow-types'
const Handle = SortableHandle(() => (
  <DragHandleIcon onClick={(e) => e.preventDefault()} />
))
interface FieldsProps {
  merit: Merit
  onUpdate: $TSFixMeFunction
  onRemove: $TSFixMeFunction
}

class MeritFields extends Component<FieldsProps> {
  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const { merit } = this.props
    if (deepEqual(merit[name], value)) return
    this.props.onUpdate(merit.id, merit.character_id, {
      [name]: value,
    })
  }

  handleCheck = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { name } = e.target
    const { merit } = this.props
    const value = !merit[name]
    this.props.onUpdate(merit.id, merit.character_id, {
      [name]: value,
    })
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
          style={{
            position: 'absolute',
            bottom: '0.5em',
            right: '0.5em',
          }}
        >
          Delete&nbsp;
          <Delete />
        </Button>

        <Typography
          component="div"
          style={{
            position: 'absolute',
            top: '0.5em',
            right: '0.5em',
          }}
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

        <div
          style={{
            display: 'flex',
          }}
        >
          <TextField
            name="label"
            value={merit.label}
            style={{
              flex: 1,
            }}
            label="Display Name (optional)"
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
            maxRows={10}
            onChange={handleChange}
          />
        </div>

        <div
          style={{
            display: 'flex',
          }}
        >
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
            label="Supernatural"
          />
        </div>
        <MeritEffectBlurb name={merit.merit_name} rating={merit.rating} />
      </BlockPaper>
    )
  }
}

export default MeritFields
