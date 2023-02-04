import { ChangeEvent } from 'react'

import Delete from '@mui/icons-material/Delete'
import { Box, Button } from '@mui/material'

import TagsField from 'components/generic/TagsField.jsx'
import TextField from 'components/generic/TextField.jsx'
import BlockPaper from 'components/shared/BlockPaper'
import Checkbox from 'components/shared/inputs/Checkbox'
import SpellCircleSelect from 'components/shared/selects/SpellCircleSelect'
import { Spell } from 'types'

interface Props {
  spell: Spell
  handleChange(id: number, trait: Partial<Spell>): void
  handleDestroy(id: number): void
}

const QcSpellFields = ({ spell, handleChange, handleDestroy }: Props) => {
  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    handleChange(spell.id, { [target.name]: target.value })

  return (
    <BlockPaper>
      <TextField
        name="name"
        value={spell.name}
        onChange={onChange}
        label="Name"
        margin="dense"
        fullWidth
      />
      <Box sx={{ display: 'flex' }}>
        <TextField
          name="cost"
          value={spell.cost}
          onChange={onChange}
          label="Cost"
          margin="dense"
          sx={{ flex: 1 }}
        />
        <SpellCircleSelect spell={spell} onChange={onChange} />
      </Box>

      <Box sx={{ display: 'flex' }}>
        <TextField
          name="duration"
          value={spell.duration}
          onChange={onChange}
          label="Duration"
          margin="dense"
          sx={{ flex: 1 }}
        />

        <Checkbox
          name="control"
          label="Control Spell"
          value={spell.control}
          onChange={onChange}
        />
      </Box>

      <TagsField
        trait="keywords"
        value={spell.keywords}
        onChange={onChange}
        fullWidth
        label="Keywords (comma separated)"
        margin="dense"
      />

      <TextField
        name="body"
        value={spell.body}
        onChange={onChange}
        multiline
        fullWidth
        label="Effect"
        margin="dense"
        rows={2}
        maxRows={15}
      />

      <Box sx={{ display: 'flex' }}>
        <TextField
          name="ref"
          value={spell.ref}
          onChange={onChange}
          label="Reference"
          margin="dense"
          sx={{ flex: 1 }}
        />

        <Button onClick={() => handleDestroy(spell.id)}>
          Delete
          <Delete />
        </Button>
      </Box>
    </BlockPaper>
  )
}

export default QcSpellFields
