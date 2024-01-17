import { Checkbox, FormControlLabel, Typography } from '@mui/material'

import TextField from '@/components/fields/TextField'
import BlockPaper from '@/components/shared/BlockPaper'
import { useCurrentPlayerId, useDocumentTitle, useIdFromParams } from '@/hooks'
import BattlegroupAttackDisplay from '../components/BattlegroupAttackDisplay'
import { useGetBattlegroupQuery, useUpdateBattlegroupMutation } from '../store'
import RatingField from '@/components/fields/RatingField'

const BattlegroupEditor = () => {
  const id = useIdFromParams()
  const { data: battlegroup } = useGetBattlegroupQuery(id)
  const [updateBattlegroup] = useUpdateBattlegroupMutation()
  const showDelete = battlegroup?.id === useCurrentPlayerId()

  useDocumentTitle(
    `${battlegroup && battlegroup.name + ' | '}Lot-Casting Atemi`,
  )

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkbox = e.target.type === 'checkbox'
    const { name, value, checked } = e.target

    void updateBattlegroup({ id, [name]: checkbox ? checked : value })
  }

  if (!battlegroup)
    return (
      <BlockPaper>
        <Typography paragraph>This Battlegroup has not yet loaded.</Typography>
      </BlockPaper>
    )

  return (
    <BlockPaper>
      <Typography variant="caption">
        Rules for battlegroups can be found in the Core book starting at page
        205.
      </Typography>

      <Typography variant="caption">
        (Use the stats of an average member of the group - bonuses from
        drill/might/etc are added automatically)
      </Typography>

      <p>{battlegroup.name}</p>

      <div className="flexContainer">
        <TextField
          label="Name"
          name="name"
          value={battlegroup.name}
          className="flex"
          onChange={handleUpdate}
        />
        {showDelete && (
          <FormControlLabel
            label="Publicly Viewable"
            control={
              <Checkbox
                name="public"
                checked={battlegroup.public}
                onChange={handleUpdate}
              />
            }
          />
        )}
      </div>

      <div className="flexContainer">
        <RatingField
          label="Essence"
          name="essence"
          value={battlegroup.essence}
          min={1}
          max={10}
          onChange={handleUpdate}
        />
        <RatingField
          name="health_levels"
          value={battlegroup.health_levels}
          label="Health Levels"
          onChange={handleUpdate}
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
      </div>

      <div className="flexContainerWrap">
        <RatingField
          name="initiative"
          value={battlegroup.initiative}
          min={-Infinity}
          label="Initiative"
          onChange={handleUpdate}
        />
        <RatingField
          name="onslaught"
          value={battlegroup.onslaught}
          label="Onslaught"
          onChange={handleUpdate}
        />
      </div>

      <div className="flexContainerWrap">
        <RatingField
          name="resolve"
          value={battlegroup.resolve}
          label="Resolve"
          onChange={handleUpdate}
        />
        <RatingField
          name="guile"
          value={battlegroup.guile}
          label="Guile"
          onChange={handleUpdate}
        />
        <RatingField
          name="appearance"
          value={battlegroup.appearance}
          label="Appearance"
          onChange={handleUpdate}
        />
        <RatingField
          name="senses"
          value={battlegroup.senses}
          label="Senses"
          onChange={handleUpdate}
        />
      </div>

      {battlegroup.qc_attacks.map((attack) => (
        <BattlegroupAttackDisplay
          battlegroup={battlegroup}
          attack={attack}
          key={attack.id}
        />
      ))}
    </BlockPaper>
  )
}

export default BattlegroupEditor
