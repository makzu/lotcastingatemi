import { DragDropProvider } from '@dnd-kit/react'
import { isSortable } from '@dnd-kit/react/sortable'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import SortableGridItem from '@lca/components/shared/wrappers/SortableGridItem.tsx'
import ProtectedComponent from '@lca/containers/ProtectedComponent.tsx'
import {
  getMyBattlegroups,
  getMyCharacters,
  getMyQcs,
  updateBattlegroup,
  updateCharacter,
  updateQc,
} from '@lca/ducks/entities/index.ts'
import { useAppDispatch, useAppSelector } from '@lca/hooks/index.ts'
import BattlegroupCard from '../battlegroups/BattlegroupCard.tsx'
import BattlegroupCreatePopup from '../battlegroups/BattlegroupCreatePopup.tsx'
import CharacterCard from '../characters/CharacterCard.tsx'
import CharacterCreatePopup from '../characters/CharacterCreatePopup.tsx'
import QcCard from '../qcs/QcCard.tsx'
import QcCreatePopup from '../qcs/QcCreatePopup.tsx'

const ContentList = () => {
  const characters = useAppSelector((state) => getMyCharacters(state))
  const dispatch = useAppDispatch()

  const mappedChars = characters.map((c, i) => (
    <SortableGridItem id={c.id} key={c.id} index={i}>
      <CharacterCard character={c} />
    </SortableGridItem>
  ))

  const rawQcs = useAppSelector((state) => getMyQcs(state))

  const mappedQcs = rawQcs.map((c, i) => (
    <SortableGridItem id={c.id} key={c.id} index={i}>
      <QcCard qc={c} />
    </SortableGridItem>
  ))

  const rawBgs = useAppSelector((state) => getMyBattlegroups(state))

  const mappedBgs = rawBgs.map((c, i) => (
    <SortableGridItem id={c.id} key={c.id} index={i}>
      <BattlegroupCard battlegroup={c} />
    </SortableGridItem>
  ))

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} className="stickyHeader">
          <Typography variant="h5">
            Characters &nbsp;
            <CharacterCreatePopup />
          </Typography>
        </Grid>

        <DragDropProvider
          onDragEnd={(event) => {
            const { source } = event.operation

            if (isSortable(source)) {
              if (source.index === source.initialIndex) {
                return
              }

              dispatch(
                updateCharacter(source.id as number, {
                  sorting_position: source.index,
                }),
              )
            }
          }}
        >
          {mappedChars}
        </DragDropProvider>
      </Grid>

      <Divider style={{ margin: '1em 0' }} />

      <Grid container spacing={3}>
        <Grid item xs={12} className="stickyHeader">
          <Typography variant="h5">
            Qcs &nbsp;
            <QcCreatePopup />
          </Typography>
        </Grid>

        <DragDropProvider
          onDragEnd={(event) => {
            const { source } = event.operation

            if (isSortable(source)) {
              if (source.index === source.initialIndex) {
                return
              }

              dispatch(
                updateQc(source.id as number, {
                  sorting_position: source.index,
                }),
              )
            }
          }}
        >
          {mappedQcs}
        </DragDropProvider>
      </Grid>

      <Divider style={{ margin: '1em 0' }} />

      <Grid container spacing={3}>
        <Grid item xs={12} className="stickyHeader">
          <Typography variant="h5">
            Battlegroups &nbsp;
            <BattlegroupCreatePopup />
          </Typography>
        </Grid>

        <DragDropProvider
          onDragEnd={(event) => {
            const { source } = event.operation

            if (isSortable(source)) {
              if (source.index === source.initialIndex) {
                return
              }

              dispatch(
                updateBattlegroup(source.id as number, {
                  sorting_position: source.index,
                }),
              )
            }
          }}
        >
          {mappedBgs}
        </DragDropProvider>
      </Grid>
    </>
  )
}

export default ProtectedComponent(ContentList)
