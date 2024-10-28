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
import PoolStack from '@/components/shared/PoolStack'
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
      <Typography variant="caption">
        Rules for battlegroups can be found in the Core book starting at page
        205.
      </Typography>

      <Typography paragraph variant="caption">
        (Use the stats of an average member of the group - bonuses from
        drill/might/etc are added automatically)
      </Typography>

      <PoolStack>
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
          />
        )}
      </PoolStack>

      <PoolStack>
        <RatingField
          id="battlegroup-essence"
          label="Essence"
          value={battlegroup.essence}
          max={10}
          min={1}
          name="essence"
          onChange={handleUpdate}
        />
        <RatingField
          id="battlegroup-health_levels"
          label="Health lvls"
          name="health_levels"
          value={battlegroup.health_levels}
          onChange={handleUpdate}
        />
        <RatingField
          id="battlegroup-willpower_temporary"
          label="Temp WP"
          name="willpower_temporary"
          value={battlegroup.willpower_temporary}
          onChange={handleUpdate}
        />
        <Typography component="span" sx={{ alignSelf: 'flex-end', mb: 1 }}>
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
      </PoolStack>

      <PoolStack>
        <RatingField
          id="battlegroup-size"
          name="size"
          label="Size"
          value={battlegroup.size}
          onChange={handleUpdate}
        />
        <RatingField
          id="battlegroup-drill"
          name="drill"
          label="Drill"
          value={battlegroup.drill}
          onChange={handleUpdate}
        />
        <RatingField
          id="battlegroup-might"
          name="might"
          label="Might"
          value={battlegroup.might}
          onChange={handleUpdate}
        />
        <FormControlLabel
          label="Perfect Morale"
          control={
            <Checkbox
              name="perfect_morale"
              checked={battlegroup.perfect_morale}
              onChange={handleUpdate}
            />
          }
        />
      </PoolStack>

      <PoolStack>
        <RatingField
          id="battlegroup-initiative"
          name="initiative"
          label="Initiative"
          value={battlegroup.initiative}
          min={-Infinity}
          onChange={handleUpdate}
        />
        <RatingField
          id="battlegroup-onslaught"
          label="Onslaught"
          name="onslaught"
          value={battlegroup.onslaught}
          onChange={handleUpdate}
        />
      </PoolStack>

      <PoolStack>
        <RatingField
          id="battlegroup-resolve"
          label="Resolve"
          name="resolve"
          value={battlegroup.resolve}
          onChange={handleUpdate}
        />
        <RatingField
          id="battlegroup-guile"
          label="Guile"
          name="guile"
          value={battlegroup.guile}
          onChange={handleUpdate}
        />
        <RatingField
          id="battlegroup-appearance"
          label="Appearance"
          name="appearance"
          value={battlegroup.appearance}
          onChange={handleUpdate}
        />
        <RatingField
          id="battlegroup-senses"
          label="Senses"
          name="senses"
          value={battlegroup.senses}
          onChange={handleUpdate}
        />
      </PoolStack>

      <BattlegroupAttackEditor battlegroup={battlegroup} />
    </BlockPaper>
  )
}

export default BattlegroupEditor
