import { DragDropProvider } from '@dnd-kit/react'
import { isSortable } from '@dnd-kit/react/sortable'
import { Divider } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'

import BattlegroupCard from '@lca/components/battlegroups/BattlegroupCard.tsx'
import CharacterCard from '@lca/components/characters/CharacterCard.tsx'
import BlockPaper from '@lca/components/generic/BlockPaper.tsx'
import QcCard from '@lca/components/qcs/QcCard.tsx'
import SortableGridItem from '@lca/components/shared/wrappers/SortableGridItem.tsx'
import ProtectedComponent from '@lca/containers/ProtectedComponent.tsx'
import {
  updateBattlegroup,
  updateCharacter,
  updateQc,
} from '@lca/ducks/actions.ts'
import {
  useAppDispatch,
  useAppSelector,
  useIdFromParams,
} from '@lca/hooks/index.ts'
import { useBetterDocumentTitle } from '@lca/hooks/UseDocumentTitle.ts'
import {
  amIStOfChronicle,
  getBattlegroupsForChronicle,
  getCharactersForChronicle,
  getQcsForChronicle,
  getSpecificChronicle,
} from '@lca/selectors/index.ts'
import BattlegroupAddPopup from './battlegroupAddPopup.tsx'
import CharacterAddPopup from './characterAddPopup.tsx'
import QcAddPopup from './qcAddPopup.tsx'
import STControls from './StControls.tsx'

const ChronicleDashboard = () => {
  const dispatch = useAppDispatch()
  const id = useIdFromParams()
  const chronicle = useAppSelector((state) => getSpecificChronicle(state, id))
  const characters = useAppSelector((state) =>
    getCharactersForChronicle(state, id),
  )
  const qcs = useAppSelector((state) => getQcsForChronicle(state, id))
  const battlegroups = useAppSelector((state) =>
    getBattlegroupsForChronicle(state, id),
  )
  const is_st = useAppSelector((state) => amIStOfChronicle(state, id))

  useBetterDocumentTitle(chronicle ? chronicle.name : undefined)

  /* Escape hatch */
  if (chronicle === undefined)
    return (
      <BlockPaper>
        <Typography paragraph>This Chronicle has not yet loaded.</Typography>
      </BlockPaper>
    )

  const characterList = characters.map((c, i) => (
    <SortableGridItem id={c.id} key={c.id} index={i}>
      <CharacterCard character={c} chronicle st={is_st} />
    </SortableGridItem>
  ))
  const qcList = qcs.map((c, i) => (
    <SortableGridItem id={c.id} key={c.id} index={i}>
      <QcCard qc={c} chronicle st={is_st} />
    </SortableGridItem>
  ))
  const bgList = battlegroups.map((c, i) => (
    <SortableGridItem id={c.id} key={c.id} index={i}>
      <BattlegroupCard battlegroup={c} chronicle st={is_st} />
    </SortableGridItem>
  ))

  return (
    <>
      <Grid container spacing={3}>
        <Hidden smUp>
          <Grid item xs={12}>
            <div style={{ height: '1em' }}>&nbsp;</div>
          </Grid>
        </Hidden>

        {is_st && (
          <Grid item xs={12}>
            <STControls chronicleId={chronicle.id} />
          </Grid>
        )}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} className="stickyHeader">
          <Typography variant="h5">
            Characters
            <CharacterAddPopup chronicleId={chronicle.id} />
          </Typography>
        </Grid>

        {characterList.length === 0 && (
          <Grid item xs={12}>
            <Typography>None yet</Typography>
          </Grid>
        )}

        <DragDropProvider
          onDragEnd={(event) => {
            const { source } = event.operation

            if (isSortable(source)) {
              if (source.index === source.initialIndex) {
                return
              }

              dispatch(
                updateCharacter(source.id as number, {
                  chronicle_sorting_position: source.index,
                }),
              )
            }
          }}
        >
          {characterList}
        </DragDropProvider>
      </Grid>

      <Divider style={{ margin: '1em 0' }} />

      <Grid container spacing={3}>
        <Grid item xs={12} className="stickyHeader">
          <Typography variant="h5">
            Quick Characters
            <QcAddPopup chronicleId={chronicle.id} />
          </Typography>
        </Grid>

        {qcList.length === 0 && (
          <Grid item xs={12}>
            <Typography>None yet</Typography>
          </Grid>
        )}

        <DragDropProvider
          onDragEnd={(event) => {
            const { source } = event.operation

            if (isSortable(source)) {
              if (source.index === source.initialIndex) {
                return
              }

              dispatch(
                updateQc(source.id as number, {
                  chronicle_sorting_position: source.index,
                }),
              )
            }
          }}
        >
          {qcList}
        </DragDropProvider>
      </Grid>

      <Divider style={{ margin: '1em 0' }} />

      <Grid container spacing={3}>
        <Grid item xs={12} className="stickyHeader">
          <Typography variant="h5">
            Battlegroups
            <BattlegroupAddPopup chronicleId={chronicle.id} />
          </Typography>
        </Grid>

        {bgList.length === 0 && (
          <Grid item xs={12}>
            <Typography>None yet</Typography>
          </Grid>
        )}

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
          {bgList}
        </DragDropProvider>
      </Grid>
    </>
  )
}

export default ProtectedComponent(ChronicleDashboard)
