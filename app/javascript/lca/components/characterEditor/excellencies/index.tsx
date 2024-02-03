import { type ChangeEvent, type ChangeEventHandler } from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  TextField,
  Typography,
  type SelectChangeEvent,
} from '@mui/material'

import AbilitySelect from '@/components/generic/abilitySelect'
import { useDialogLogic } from '@/hooks'
import type { Character } from '@/types'
import CanonExcellencyCopy from './CanonExcellencyCopy'

interface Props {
  character: Character
  onChange: ChangeEventHandler<HTMLInputElement>
  onChangeMulti: $TSFixMeFunction
}

interface ExcellencyOption {
  value: string
  label?: string
}

const options: ExcellencyOption[] = [
  { value: 'solar', label: 'Solar (Attribute + Ability)' },
  { value: 'dragonblood', label: 'Dragon-Blooded (Attribute + Specialty)' },
  {
    value: 'sidereal',
    label: 'Sidereal (Higher of Essence or 3, will not halve static values)',
  },
  { value: 'divider' },
  { value: 'attribute', label: 'Attribute' },
  { value: 'ability', label: 'Ability' },
  { value: 'specialty', label: 'Specialty' },
  { value: 'essence', label: 'Essence' },
  { value: 'attributeonanima', label: 'Attribute (while anima is glowing+)' },
  { value: 'abilityonanima', label: 'Ability (while anima is glowing+)' },
  { value: 'essenceonanima', label: 'Essence (while anima is glowing+)' },
  {
    value: 'otherability',
    label: 'Another Ability (will select highest available)',
  },
  {
    value: 'otherattribute',
    label: 'Another Attribute (will select highest available)',
  },
  {
    value: 'anima',
    label: 'Anima (Dim: 0, Glowing: 1, Burning: 2, Bonfire: 3)',
  },
  {
    value: 'subtleanima',
    label: '3 - Anima value (Dim: 3, Glowing: 2, Burning: 1, Bonfire: 0)',
  },
  { value: 'essenceor3', label: 'Essence or 3 (whichever is higher)' },
  { value: 'divider' },
  { value: 'roundup', label: 'Round cap up for static ratings' },
  { value: 'nohalf', label: "Don't halve cap for static ratings" },
]

const mappedOptions = options.map((option, i) =>
  option.value === 'divider' ? (
    <Divider key={`divider-${i}`} style={{ margin: '0.125em 0' }} />
  ) : (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ),
)

const ExcellencyEditor = ({ character, onChange, onChangeMulti }: Props) => {
  const [isOpen, open, close] = useDialogLogic()

  const handleExcellencyChange = (e: SelectChangeEvent<string[]>) => {
    const { value } = e.target
    let val = value
    if (typeof val !== 'string') val = val.filter((e) => e !== '').join('+')

    if (val.includes('*')) val = '*'

    const fakeEvent = e as ChangeEvent<HTMLInputElement>
    fakeEvent.target.value = val
    onChange(fakeEvent)
  }

  const { excellency, excellency_stunt } = character
  return (
    <>
      <Button onClick={open}>Excellencies</Button>

      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>Edit Excellencies</DialogTitle>

        <DialogContent>
          <Typography>
            Build your custom Exalt&apos;s excellency. Examples:
          </Typography>
          <Typography>
            QC Dragon-Blooded (Core p.540): Ability + Specialty
          </Typography>
          <Typography>
            QC Lunars (Core p.545): Attribute, Stunt: Attribute + Other
            Attribute
          </Typography>
          <Typography>QC Sidereals (Core p.548): Essence</Typography>
          <Typography>QC Abyssals (Core p.549): Attribute + Ability</Typography>
          <Typography>
            QC Liminals (Core p.550): Attribute + Essence(glowing+)
          </Typography>

          <Typography sx={{ marginTop: '1em' }}>
            Some Exalts, like Lunars and Revana Quin (Core p. 552) have
            different dice caps under certain stunts. You can set those here,
            and they will appear below relevant pools. Leave blank if your
            excellency limits do not change based on stunts.
          </Typography>

          <TextField
            variant="standard"
            select
            label="Excellency Cap"
            name="excellency"
            SelectProps={{ multiple: true }}
            value={character.excellency.split('+') ?? []}
            // @ts-expect-error MUI typings are wrong, this has a string[] value
            onChange={handleExcellencyChange}
            margin="dense"
            fullWidth
          >
            {excellency === '' && (
              <MenuItem key="blank" value="" disabled>
                No Excellency
              </MenuItem>
            )}
            {mappedOptions}
          </TextField>

          <TextField
            variant="standard"
            select
            label="Stunt Excellency cap"
            name="excellency_stunt"
            SelectProps={{ multiple: true }}
            value={character.excellency_stunt.split('+') ?? []}
            // @ts-expect-error MUI typings are wrong, this has a string[] value
            onChange={handleExcellencyChange}
            margin="dense"
            fullWidth
          >
            {excellency_stunt === '' && (
              <MenuItem key="blank" value="" disabled>
                No change to caps on stunt
              </MenuItem>
            )}
            {mappedOptions}
          </TextField>

          <AbilitySelect
            name="excellencies_for"
            label="Ratings with Excellencies"
            value={character.excellencies_for}
            onChange={onChange}
            multiple
            fullWidth
            margin="dense"
            withAttributes
            prependOptions={[
              <MenuItem value="*" key="*">
                All Attribute + Ability rolls
              </MenuItem>,
              <MenuItem value="solar" key="solar">
                As Solars, Sidereals, Abyssals (caste/favored
                attributes/abilities &gt; 0, other attributes/abilities with at
                least one Charm)
              </MenuItem>,
              <MenuItem value="dragonblood" key="dragonblood">
                As Dragon-Blooded (all attributes/abilities with an excellency
                keyworded Charm)
              </MenuItem>,
              <MenuItem value="lunar" key="lunar">
                As Lunars (caste/favored attributes &ge; 3 or with &ge; 2
                Charms, other attributes &ge; 4 or with &ge; 3 Charms)
              </MenuItem>,
            ]}
          />
        </DialogContent>

        <DialogActions>
          <div className="flex">
            <CanonExcellencyCopy onChangeMulti={onChangeMulti} />
          </div>
          <Button onClick={close}>Done</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ExcellencyEditor
