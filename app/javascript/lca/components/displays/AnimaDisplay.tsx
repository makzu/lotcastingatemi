import { ButtonBase, Menu, MenuItem } from '@mui/material'

import { update as updateThing } from '@/ducks/actions/ByType'
import { useAppDispatch, useAppSelector, useMenuLogic } from '@/hooks'
import { canIEdit } from '@/selectors'
import { type Character, type QC } from '@/types'
import { type WithSharedStats } from '@/types/shared'
import { noop } from '@/utils'
import { prettyAnimaLevel } from '@/utils/calculated'
import DisplayValueText from './TextTraitDisplay'

interface Props {
  character: Character | QC
}

const AnimaDisplay = (props: Props) => {
  const { character } = props
  const type = character.type === 'qc' ? 'qc' : 'character'
  const dispatch = useAppDispatch()
  const [anchor, open, close] = useMenuLogic()

  const canEdit = useAppSelector((state) => canIEdit(state, character.id, type))

  const update = (anima: WithSharedStats['anima_level']) => {
    if (canEdit)
      dispatch(updateThing[type](character.id, { anima_level: anima }))
    close()
  }

  return (
    <>
      <ButtonBase
        onClick={canEdit ? open : noop}
        sx={{ minWidth: '9.75rem', justifyContent: 'start' }}
      >
        <DisplayValueText
          label="Anima"
          value={prettyAnimaLevel(character.anima_level)}
          extra={character.anima_level > 0 ? character.anima_level : undefined}
        />
      </ButtonBase>

      <Menu anchorEl={anchor} open={!!anchor} onClose={close}>
        {([0, 1, 2, 3] as const).map((level) => (
          <MenuItem
            key={level}
            onClick={() => update(level)}
            sx={{ textTransform: 'capitalize' }}
          >
            {prettyAnimaLevel(level)}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default AnimaDisplay
