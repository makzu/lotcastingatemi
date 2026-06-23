import type { ChangeEvent } from 'react'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MenuItem from '@material-ui/core/MenuItem'
import MuiTextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Delete from '@material-ui/icons/Delete'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import { deepEqual } from 'fast-equals'

import BlockPaper from '@lca/components/generic/BlockPaper.tsx'
import RatingField from '@lca/components/generic/RatingField.tsx'
import TextField from '@lca/components/generic/TextField.tsx'
import { destroyMerit, updateMerit } from '@lca/ducks/actions.ts'
import useAppDispatch from '@lca/hooks/UseAppDispatch.ts'
import type { Merit } from '@lca/types/index.ts'
import { MERIT_RATING_MAX, MERIT_RATING_MIN } from '@lca/utils/constants.ts'
import MeritEffectBlurb from './MeritEffectBlurb.tsx'

type FieldsProps = { merit: Merit }
const MeritFields = (props: FieldsProps) => {
  const dispatch = useAppDispatch()
  const { merit } = props

  const handleRemove = () => {
    dispatch(destroyMerit(merit.id, merit.character_id))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (deepEqual(merit[name as keyof Merit], value)) return

    dispatch(updateMerit(merit.id, merit.character_id, { [name]: value }))
  }

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof Merit
    const value = !merit[name]

    dispatch(updateMerit(merit.id, merit.character_id, { [name]: value }))
  }

  return (
    <BlockPaper>
      <Button
        onClick={handleRemove}
        style={{ position: 'absolute', bottom: '0.5em', right: '0.5em' }}
      >
        Delete&nbsp;
        <Delete />
      </Button>

      <Typography
        component="div"
        style={{ position: 'absolute', top: '0.5em', right: '0.5em' }}
      >
        <DragHandleIcon onClick={(e) => e.preventDefault()} />
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
          <span style={{ verticalAlign: 'center' }}>
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

      <div style={{ display: 'flex' }}>
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

export default MeritFields
