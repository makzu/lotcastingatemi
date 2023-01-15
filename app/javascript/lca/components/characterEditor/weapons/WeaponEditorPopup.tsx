import { deepEqual } from 'fast-equals'
import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Theme,
  Typography,
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { ExpandLess, ExpandMore, Help } from '@mui/icons-material'

import WeaponPoolDisplay from 'components/characters/weapons/WeaponPoolDisplay.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import TagsField from 'components/generic/TagsField.jsx'
import TextField from 'components/generic/TextField.jsx'
import Checkbox from 'components/shared/inputs/Checkbox'
import WeightSelect from 'components/shared/selects/WeightSelect'
import { State } from 'ducks'
import { getSpecificWeapon, updateWeapon } from 'ducks/entities'
import { Character } from 'types'
import WeaponAbilitySelect from './WeaponAbilitySelect'
import WeaponOverrides from './WeaponOverrides'

const useStyles = makeStyles((theme: Theme) => ({}))

interface Props {
  character: Character
  openWeapon: number | null
  setId: (id: number | null) => void
}

const WeaponEditorPopup = (props: Props) => {
  const { character, openWeapon, setId } = props
  const setClosed = () => setId(null)
  const [advancedOpen, setAdvancedOpen] = useState(false)

  const weapon = useSelector((state: State) =>
    getSpecificWeapon(state, openWeapon),
  )

  const dispatch = useDispatch()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (deepEqual(weapon[name], value)) {
      return
    }
    dispatch(updateWeapon(openWeapon, character.id, { [name]: value }))
  }

  return openWeapon == null ? null : (
    <Dialog open={openWeapon != null} onClose={setClosed} fullWidth>
      <DialogTitle>Edit {weapon.name}</DialogTitle>

      <DialogContent>
        <Box display="flex" justifyContent="space-between">
          <WeaponPoolDisplay weapon={weapon} />
        </Box>
        <TextField
          label="Name"
          name="name"
          value={weapon.name}
          fullWidth
          onChange={handleChange}
        />
        <Box display="flex" justifyContent="space-between">
          <WeaponAbilitySelect
            character={character}
            weapon={weapon}
            onChange={handleChange}
          />

          <WeightSelect
            name="weight"
            value={weapon.weight}
            onChange={handleChange}
          />

          <Checkbox
            name="is_artifact"
            label="Artifact"
            value={weapon.is_artifact}
            onChange={handleChange}
          />
        </Box>

        <TagsField
          label="Tags (comma separated)"
          trait="tags"
          value={weapon.tags}
          margin="dense"
          onBlur={handleChange}
          onChange={handleChange}
          fullWidth
        />

        <Typography>
          <IconButton onClick={() => setAdvancedOpen(!advancedOpen)} size="large">
            {advancedOpen ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
          Advanced
        </Typography>

        <Collapse in={advancedOpen}>
          <WeaponOverrides
            character={character}
            weapon={weapon}
            onChange={handleChange}
          />
          <Typography variant="subtitle1">Other Bonuses</Typography>
          <Box display="flex">
            <RatingField
              trait="bonus_accuracy"
              label="Accuracy"
              min={-Infinity}
              value={weapon.bonus_accuracy}
              onChange={handleChange}
              margin="dense"
            />
            <RatingField
              trait="bonus_damage"
              label="Damage"
              min={-Infinity}
              value={weapon.bonus_damage}
              onChange={handleChange}
              margin="dense"
            />
            <RatingField
              trait="bonus_defense"
              label="Parry"
              min={-Infinity}
              value={weapon.bonus_defense}
              onChange={handleChange}
              margin="dense"
            />
            <RatingField
              trait="bonus_overwhelming"
              label="Overwhelming"
              min={-Infinity}
              value={weapon.bonus_overwhelming}
              onChange={handleChange}
              margin="dense"
            />
          </Box>
          <TextField
            name="notes"
            label="Notes"
            value={weapon.notes}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
        </Collapse>
      </DialogContent>

      <DialogActions>
        <Box flexGrow={1}>
          <IconButton component={Link} to={'/help/weapons'} size="small">
            <Help />
          </IconButton>
        </Box>
        <Button onClick={setClosed}>Done</Button>
      </DialogActions>
    </Dialog>
  )
}

export default WeaponEditorPopup
