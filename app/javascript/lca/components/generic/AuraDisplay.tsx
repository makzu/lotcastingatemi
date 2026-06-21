import ButtonBase from '@material-ui/core/ButtonBase'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles, type Theme } from '@material-ui/core/styles'

import { update as updateThing } from '@lca/ducks/actions/ByType.ts'
import {
  useAppDispatch,
  useAppSelector,
  useMenuLogic,
} from '@lca/hooks/index.ts'
import { canIEdit } from '@lca/selectors/index.ts'
import type { Character, QC } from '@lca/types/index.ts'
import type { WithSharedStats } from '@lca/types/shared.ts'

const useStyles = makeStyles((theme: Theme) => ({
  wrap: {
    marginRight: theme.spacing(),
    minWidth: '5.5em',
    textAlign: 'left',
  },
  label: {
    ...theme.typography.body1,
    fontSize: '0.75rem',
    fontWeight: 500,
    opacity: 0.7,
    textAlign: 'left',
    paddingLeft: '0.25rem',
  },
  current: {
    ...theme.typography.h4,
    fontSize: '1.75rem',
    display: 'inline-block',
    verticalAlign: 'top',
    textTransform: 'capitalize',
  },
}))
interface Props {
  character: Character | QC
}

const noop = () => {}

const AuraDisplay = (props: Props) => {
  const { character } = props
  const type = character.type === 'qc' ? 'qc' : 'character'
  const dispatch = useAppDispatch()
  const [anchor, open, close] = useMenuLogic()
  const classes = useStyles()

  const canEdit = useAppSelector((state) => canIEdit(state, character.id, type))

  const update = (aura: WithSharedStats['aura']) => {
    if (canEdit) dispatch(updateThing[type](character.id, { aura }))
    close()
  }

  if (character.aura == null || character.aura === '') return null

  return (
    <>
      <ButtonBase
        disabled={!canEdit}
        onClick={canEdit ? open : noop}
        style={{ minWidth: '5.625rem', justifyContent: 'start' }}
      >
        <div className={classes.wrap}>
          <div className={classes.label}>Aura</div>
          <div>
            <span className={classes.current}>{character.aura}</span>
          </div>
        </div>
      </ButtonBase>

      <Menu anchorEl={anchor} open={!!anchor} onClose={close}>
        {(['none', 'air', 'earth', 'fire', 'water', 'wood'] as const).map(
          (element) => (
            <MenuItem
              key={element}
              onClick={() => update(element)}
              style={{ textTransform: 'capitalize' }}
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
