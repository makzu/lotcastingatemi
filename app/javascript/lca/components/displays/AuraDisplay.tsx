import { ButtonBase, Menu, MenuItem } from '@mui/material'

import { update as updateThing } from '@/ducks/actions/ByType'
import { useAppDispatch, useAppSelector, useMenuLogic } from '@/hooks'
import { canIEdit } from '@/selectors'
import { Character, QC } from '@/types'
import { WithSharedStats } from '@/types/shared'
import { noop } from '@/utils'
import DisplayValueText from './TextTraitDisplay'

interface Props {
  character: Character | QC
}

const AuraDisplay = (props: Props) => {
  const { character } = props
  const type = character.type === 'qc' ? 'qc' : 'character'
  const dispatch = useAppDispatch()
  const [anchor, open, close] = useMenuLogic()

  const canEdit = useAppSelector((state) => canIEdit(state, character.id, type))

  const update = (aura: WithSharedStats['aura']) => {
    if (canEdit) dispatch(updateThing[type](character.id, { aura }))
    close()
  }

  if (character.aura == null || character.aura === '') return null

  return (
    <>
      <ButtonBase
        onClick={canEdit ? open : noop}
        sx={{ minWidth: '5.625rem', justifyContent: 'start' }}
      >
        <DisplayValueText label="Aura" value={character.aura} />
      </ButtonBase>

      <Menu anchorEl={anchor} open={!!anchor} onClose={close}>
        {(['none', 'air', 'earth', 'fire', 'water', 'wood'] as const).map(
          (element) => (
            <MenuItem
              key={element}
              onClick={() => update(element)}
              sx={{ textTransform: 'capitalize' }}
            >
              {element}
            </MenuItem>
          ),
        )}
      </Menu>
    </>
  )
}

export default AuraDisplay
