import { DragDropProvider } from '@dnd-kit/react'
import { isSortable } from '@dnd-kit/react/sortable'
import { Grid, Typography } from '@material-ui/core'

import CharacterCard from '@lca/components/characters/CharacterCard.tsx'
import CharacterCreatePopup from '@lca/components/characters/CharacterCreatePopup.tsx'
import SortableGridItem from '@lca/components/shared/wrappers/SortableGridItem.tsx'
import ProtectedComponent from '@lca/containers/ProtectedComponent.tsx'
import { getMyCharacters, updateCharacter } from '@lca/ducks/entities/index.ts'
import { useAppDispatch } from '@lca/hooks/UseAppDispatch.ts'
import { useAppSelector } from '@lca/hooks/UseAppSelector.ts'
import { useBetterDocumentTitle } from '@lca/hooks/UseDocumentTitle.ts'

const CharacterList = () => {
  const characters = useAppSelector((state) => getMyCharacters(state))
  const dispatch = useAppDispatch()

  const mappedChars = characters.map((c, i) => (
    <SortableGridItem id={c.id} key={c.id} index={i}>
      <CharacterCard character={c} />
    </SortableGridItem>
  ))

  useBetterDocumentTitle('Characters')

  return (
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
  )
}

export default ProtectedComponent(CharacterList)
