import { DragHandle, RemoveCircle } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'

import RatingField from '@/components/fields/RatingField'
import TagsField from '@/components/fields/TagsField'
import LcaTextField from '@/components/fields/TextField'
import RangeSelect from '@/components/selects/RangeSelect'
import type { QcAttack } from '@/types'
import { bgDamage } from '@/utils/calculated'
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
        label="Name"
        name="name"
        nameField
        value={attack.name}
        onChange={handleChange}
        margin="dense"
        sx={{ mr: 1 }}
      />

      <RatingField
        name="pool"
        value={attack.pool}
        label="Pool"
        min={1}
        onChange={handleChange}
        sx={{ mr: 1 }}
      />

      <RatingField
        name="damage"
        value={attack.damage}
        label="Damage"
        min={1}
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
        onChange={handleChange}
        sx={{ mr: 1 }}
      />

      <TagsField
        name="tags"
        value={attack.tags}
        label="Tags (comma separated)"
        margin="dense"
        onChange={handleChange}
        sx={{ mr: 1 }}
      />

      <RangeSelect name="range" value={attack.range} onChange={handleChange} />

      <IconButton onClick={handleRemove} size="large" aria-label="delete">
        <RemoveCircle />
      </IconButton>
    </Box>
  )
}

export default BattlegroupAttackFields
