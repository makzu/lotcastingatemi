import { DragDropProvider } from '@dnd-kit/react'
import { isSortable } from '@dnd-kit/react/sortable'
import { Button, Grid, Typography } from '@material-ui/core'
import type { WithStyles } from '@material-ui/core/styles'
import ContentAddCircle from '@material-ui/icons/AddCircle'

import Checkbox from '@lca/components/shared/inputs/Checkbox.tsx'
import SortableGridItem from '@lca/components/shared/wrappers/SortableGridItem.tsx'
import {
  createSpell,
  destroySpell,
  updateSpell,
} from '@lca/ducks/entities/spell.ts'
import { getSpellsForQc } from '@lca/ducks/selectors/index.ts'
import useAppDispatch from '@lca/hooks/UseAppDispatch.ts'
import useAppSelector from '@lca/hooks/UseAppSelector.ts'
import type commonStyles from '@lca/styles/index.ts'
import type { QC } from '@lca/types/index.ts'
import QcSpellFields from './QcSpellFields.tsx'

interface OuterProps {
  qc: QC
  changeQc(): void
}
interface Props extends OuterProps, WithStyles<typeof commonStyles> {}

const QcSpellEditor = (props: Props) => {
  const dispatch = useAppDispatch()
  const { qc, classes, changeQc } = props
  const spells = useAppSelector((state) => getSpellsForQc(state, qc.id))

  const handleCreate = () => {
    dispatch(createSpell(qc.id, { parent: 'qc' }))
  }

  const handleUpdate = (id: number, trait) => {
    dispatch(updateSpell(id, qc.id, trait, 'qc'))
  }

  const handleDestroy = (id: number) => {
    dispatch(destroySpell(id, qc.id, 'qc'))
  }

  const spellList = spells.map((spell, i) => (
    <SortableGridItem id={spell.id} key={spell.id} index={i}>
      <QcSpellFields
        key={spell.id}
        spell={spell}
        handleChange={handleUpdate}
        handleDestroy={handleDestroy}
        classes={classes}
      />
    </SortableGridItem>
  ))

  return (
    <>
      <Typography variant="h6" component="div">
        Sorcery&nbsp;&nbsp;
        <Checkbox
          label="Is Sorcerer"
          labelPlacement="end"
          value={qc.is_sorcerer}
          name="is_sorcerer"
          onChange={changeQc}
        />
        &nbsp;&nbsp;
        {qc.is_sorcerer && (
          <Button onClick={handleCreate}>
            Add Spell
            <ContentAddCircle />
          </Button>
        )}
      </Typography>
      {qc.is_sorcerer && (
        <Grid container spacing={3}>
          <DragDropProvider
            onDragEnd={(event) => {
              const { source } = event.operation

              if (isSortable(source)) {
                if (source.index === source.initialIndex) {
                  return
                }

                handleUpdate(source.id as number, {
                  sorting_position: source.index,
                })
              }
            }}
          >
            {spellList}
          </DragDropProvider>
        </Grid>
      )}
    </>
  )
}

export default QcSpellEditor
