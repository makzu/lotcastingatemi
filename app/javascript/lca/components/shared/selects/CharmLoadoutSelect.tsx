import { MenuItem, TextField } from '@material-ui/core'

import {
  getAllCharmLoadoutsForCharacter,
  updateCharacter,
} from '@lca/ducks/entities'
import { useAppDispatch, useAppSelector } from '@lca/hooks'
import type { Character } from '@lca/types'
import { isCustomCharacter } from '@lca/utils/calculated'

interface CharmLoadoutSelectProps {
  character: Character
}

const CharmLoadoutSelect = (props: CharmLoadoutSelectProps) => {
  const dispatch = useAppDispatch()
  const { character } = props
  const options = useAppSelector((state) =>
    getAllCharmLoadoutsForCharacter(state, character.id),
  )
  return (
    <TextField
      select
      label="Current Loadout"
      style={{ marginLeft: '1em', minWidth: '20ex' }}
      value={character.active_loadout}
      onChange={(e) => {
        let value: string | null = e.target.value
        if (value === undefined) value = null
        dispatch(updateCharacter(character.id, { active_loadout: value }))
      }}
    >
      {options.map((loadout) =>
        loadout === '*' ? null : (
          <MenuItem key={loadout} value={loadout}>
            {loadout}
          </MenuItem>
        ),
      )}
      {isCustomCharacter(character) && (
        <MenuItem key="nothing" value={undefined}>
          Do not use loadouts
        </MenuItem>
      )}
    </TextField>
  )
}

export default CharmLoadoutSelect
