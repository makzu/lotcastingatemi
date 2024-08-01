import { DragHandle, RemoveCircle } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'

import RatingField from '@/components/fields/RatingField'
import TagsField from '@/components/fields/TagsField'
import LcaTextField from '@/components/fields/TextField'
import RangeSelect from '@/components/selects/RangeSelect'
import type { QcAttack } from '@/types'
import { bgDamage } from '../lib'
import {
  useDeleteBattlegroupAttackMutation,
  useUpdateBattlegroupAttackMutation,
} from '../store'
import type { Battlegroup } from '../types'

interface Props {
  battlegroup: Battlegroup
  attack: QcAttack
}

const BattlegroupAttackFields = ({ battlegroup, attack }: Props) => {
  const [update] = useUpdateBattlegroupAttackMutation()
  const [destroy] = useDeleteBattlegroupAttackMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    update({ id: attack.id, qc_attackable_id: battlegroup.id, [name]: value })
  }

  const handleRemove = () => {
    destroy({ id: attack.id, qc_attackable_id: battlegroup.id })
  }

  return (
    <Box key={attack.id} className="flexContainerWrap" sx={{ mb: 1 }}>
      <DragHandle sx={{ alignSelf: 'center', mr: 1 }} />

      <LcaTextField
        nameField
        label="Name"
        name="name"
        value={attack.name}
        margin="dense"
        sx={{ mr: 1 }}
        id={`attack-${attack.id}-name`}
        onChange={handleChange}
      />

      <RatingField
        name="pool"
        value={attack.pool}
        label="Pool"
        min={1}
        sx={{ mr: 1 }}
        id={`attack-${attack.id}-pool`}
        onChange={handleChange}
      />

      <RatingField
        name="damage"
        value={attack.damage}
        label="Damage"
        min={1}
        id={`attack-${attack.id}-damage`}
        onChange={handleChange}
      />

      <Typography
        component="span"
        variant="caption"
        sx={{ alignSelf: 'flex-end', mr: 1, mb: 1 }}
      >
        ({bgDamage(battlegroup, attack)} total)
      </Typography>

      <RatingField
        name="overwhelming"
        value={attack.overwhelming}
        label="Min"
        min={1}
        sx={{ mr: 1 }}
        id={`attack-${attack.id}-overwhelming`}
        onChange={handleChange}
      />

      <TagsField
        name="tags"
        value={attack.tags}
        label="Tags (comma separated)"
        margin="dense"
        sx={{ mr: 1 }}
        id={`attack-${attack.id}-tags`}
        onChange={handleChange}
      />

      <RangeSelect name="range" value={attack.range} onChange={handleChange} />

      <IconButton size="large" aria-label="delete" onClick={handleRemove}>
        <RemoveCircle />
      </IconButton>
    </Box>
  )
}

export default BattlegroupAttackFields
