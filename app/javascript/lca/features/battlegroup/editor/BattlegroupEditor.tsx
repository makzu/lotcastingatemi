import {
  Box,
  Checkbox,
  FormControlLabel,
  Skeleton,
  Typography,
} from '@mui/material'

import RatingField from '@/components/fields/RatingField'
import TextField from '@/components/fields/TextField'
import BlockPaper from '@/components/shared/BlockPaper'
import { useDocumentTitle, useIdFromParams } from '@/hooks'
import { useGetBattlegroupQuery, useUpdateBattlegroupMutation } from '../store'
import BattlegroupAttackEditor from './BattlegroupAttackEditor'

const BattlegroupEditor = () => {
  const id = useIdFromParams()
  const { data: battlegroup, isLoading, error } = useGetBattlegroupQuery(id)
  const [updateBattlegroup] = useUpdateBattlegroupMutation()

  useDocumentTitle(
    `${battlegroup && battlegroup.name + ' | '}Lot-Casting Atemi`,
  )

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkbox = e.target.type === 'checkbox'
    const { name, value, checked } = e.target

    updateBattlegroup({ id, [name]: checkbox ? checked : value })
  }

  if (isLoading || !battlegroup) {
    return (
      <BlockPaper>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </BlockPaper>
    )
  }

  if (error)
    return (
      <BlockPaper>
        <Typography paragraph>{JSON.stringify(error)}</Typography>
      </BlockPaper>
    )

  if (!battlegroup?.editable) {
    return (
      <BlockPaper>
        <Typography paragraph>
          You do not have permission to edit this.
        </Typography>
      </BlockPaper>
    )
  }

  return (
    <BlockPaper>
      <Typography variant="caption" paragraph>
        Rules for battlegroups can be found in the Core book starting at page
        205.
      </Typography>

      <Typography variant="caption" paragraph>
        (Use the stats of an average member of the group - bonuses from
        drill/might/etc are added automatically)
      </Typography>

      <Box className="flexContainer" sx={{ mb: 1 }}>
        <TextField
          label="Name"
          name="name"
          value={battlegroup.name}
          className="flex"
          onChange={handleUpdate}
          nameField
        />
        {!!battlegroup.deletable && (
          <FormControlLabel
            label="Publicly Viewable"
            control={
              <Checkbox
                name="public"
                checked={battlegroup.public}
                onChange={handleUpdate}
              />
            }
            sx={{ ml: 1 }}
          />
        )}
      </Box>

      <Box className="flexContainer" sx={{ mb: 1 }}>
        <RatingField
          label="Essence"
          name="essence"
          value={battlegroup.essence}
          min={1}
          max={10}
          onChange={handleUpdate}
          sx={{ mr: 1 }}
        />
        <RatingField
          name="health_levels"
          value={battlegroup.health_levels}
          label="Health lvls"
          onChange={handleUpdate}
          sx={{ mr: 1 }}
        />
        <RatingField
          name="willpower_temporary"
          value={battlegroup.willpower_temporary}
          label="Temp WP"
          onChange={handleUpdate}
        />
        <Typography
          component="span"
          sx={{ alignSelf: 'flex-end', mr: 1, mb: 1 }}
        >
          /
        </Typography>
        <RatingField
          name="willpower_permanent"
          value={battlegroup.willpower_permanent}
          min={1}
          max={10}
          label="Perm WP"
          onChange={handleUpdate}
        />
      </Box>

      <Box className="flexContainerWrap" sx={{ mb: 1 }}>
        <RatingField
          name="initiative"
          value={battlegroup.initiative}
          min={-Infinity}
          label="Initiative"
          onChange={handleUpdate}
          sx={{ mr: 1 }}
        />
        <RatingField
          name="onslaught"
          value={battlegroup.onslaught}
          label="Onslaught"
          onChange={handleUpdate}
          sx={{ mr: 1 }}
        />
      </Box>

      <Box className="flexContainerWrap">
        <RatingField
          name="resolve"
          value={battlegroup.resolve}
          label="Resolve"
          onChange={handleUpdate}
          sx={{ mr: 1 }}
        />
        <RatingField
          name="guile"
          value={battlegroup.guile}
          label="Guile"
          onChange={handleUpdate}
          sx={{ mr: 1 }}
        />
        <RatingField
          name="appearance"
          value={battlegroup.appearance}
          label="Appearance"
          onChange={handleUpdate}
          sx={{ mr: 1 }}
        />
        <RatingField
          name="senses"
          value={battlegroup.senses}
          label="Senses"
          onChange={handleUpdate}
        />
      </Box>

      <BattlegroupAttackEditor battlegroup={battlegroup} />
    </BlockPaper>
  )
}

export default BattlegroupEditor
