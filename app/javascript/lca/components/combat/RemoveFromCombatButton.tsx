import Button from '@material-ui/core/Button'

import {
  updateBattlegroup,
  updateCharacter,
  updateQc,
} from '@lca/ducks/actions/index.ts'
import useAppDispatch from '@lca/hooks/UseAppDispatch.ts'
import useAppSelector from '@lca/hooks/UseAppSelector.ts'
import { canIEdit } from '@lca/selectors/index.ts'
import type { Battlegroup, Character, QC } from '@lca/types/index.ts'

type ExposedProps = {
  character: Character | QC | Battlegroup
  characterType: 'character' | 'qc' | 'battlegroup'
}

const endCombatPayload = {
  in_combat: false,
  has_acted: false,
  onslaught: 0,
}

const RemoveFromCombatButton = (props: ExposedProps) => {
  const dispatch = useAppDispatch()
  const { character, characterType } = props
  const canEdit = useAppSelector((state) =>
    canIEdit(state, character.id, characterType),
  )

  if (!canEdit) return null

  const handleClick = () => {
    switch (characterType) {
      case 'qc':
        dispatch(updateQc(character.id, endCombatPayload))
        return
      case 'battlegroup':
        dispatch(updateBattlegroup(character.id, endCombatPayload))
        return
      case 'character':
      default:
        dispatch(updateCharacter(character.id, endCombatPayload))
    }
  }

  return <Button onClick={handleClick}>Remove from Combat</Button>
}

export default RemoveFromCombatButton
