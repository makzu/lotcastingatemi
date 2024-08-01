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
      <Typography paragraph variant="caption">
        Rules for battlegroups can be found in the Core book starting at page
        205.
      </Typography>

      <Typography paragraph variant="caption">
        (Use the stats of an average member of the group - bonuses from
        drill/might/etc are added automatically)
      </Typography>

      <Box className="flexContainer" sx={{ mb: 1 }}>
        <TextField
          nameField
          className="flex"
          id="battlegroup-name"
          label="Name"
          name="name"
          value={battlegroup.name}
          onChange={handleUpdate}
        />
        {!!battlegroup.deletable && (
          <FormControlLabel
            control={
              <Checkbox
                checked={battlegroup.public}
                name="public"
                onChange={handleUpdate}
              />
            }
            label="Publicly Viewable"
            sx={{ ml: 1 }}
          />
        )}
      </Box>

      <Box className="flexContainer" sx={{ mb: 1 }}>
        <RatingField
          id="battlegroup-essence"
          label="Essence"
          value={battlegroup.essence}
          max={10}
          min={1}
          name="essence"
          sx={{ mr: 1 }}
          onChange={handleUpdate}
        />
        <RatingField
          id="battlegroup-health_levels"
          label="Health lvls"
          name="health_levels"
          value={battlegroup.health_levels}
          sx={{ mr: 1 }}
          onChange={handleUpdate}
        />
        <RatingField
          id="battlegroup-willpower_temporary"
          label="Temp WP"
          name="willpower_temporary"
          value={battlegroup.willpower_temporary}
          onChange={handleUpdate}
        />
        <Typography
          component="span"
          sx={{ alignSelf: 'flex-end', mr: 1, mb: 1 }}
        >
          /
        </Typography>
        <RatingField
          id="battlegroup-willpower_permanent"
          name="willpower_permanent"
          value={battlegroup.willpower_permanent}
          label="Perm WP"
          max={10}
          min={1}
          onChange={handleUpdate}
        />
      </Box>

      <Box className="flexContainerWrap" sx={{ mb: 1 }}>
        <RatingField
          id="battlegroup-initiative"
          name="initiative"
          label="Initiative"
          value={battlegroup.initiative}
          min={-Infinity}
          sx={{ mr: 1 }}
          onChange={handleUpdate}
        />
        <RatingField
          id="battlegroup-onslaught"
          label="Onslaught"
          name="onslaught"
          value={battlegroup.onslaught}
          sx={{ mr: 1 }}
          onChange={handleUpdate}
        />
      </Box>

      <Box className="flexContainerWrap">
        <RatingField
          id="battlegroup-resolve"
          label="Resolve"
          name="resolve"
          sx={{ mr: 1 }}
          value={battlegroup.resolve}
          onChange={handleUpdate}
        />
        <RatingField
          id="battlegroup-guile"
          label="Guile"
          name="guile"
          value={battlegroup.guile}
          sx={{ mr: 1 }}
          onChange={handleUpdate}
        />
        <RatingField
          id="battlegroup-appearance"
          label="Appearance"
          name="appearance"
          value={battlegroup.appearance}
          sx={{ mr: 1 }}
          onChange={handleUpdate}
        />
        <RatingField
          id="battlegroup-senses"
          label="Senses"
          name="senses"
          value={battlegroup.senses}
          onChange={handleUpdate}
        />
      </Box>

      <BattlegroupAttackEditor battlegroup={battlegroup} />
    </BlockPaper>
  )
}

export default BattlegroupEditor
