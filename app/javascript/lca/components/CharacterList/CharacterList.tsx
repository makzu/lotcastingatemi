import { SortableElement } from 'react-sortable-hoc'
import { Grid, Typography } from '@material-ui/core'

import CharacterCard from '@lca/components/characters/CharacterCard.tsx'
import CharacterCreatePopup from '@lca/components/characters/CharacterCreatePopup.tsx'
import SortableGridList from '@lca/components/generic/SortableGridList.tsx'
import ProtectedComponent from '@lca/containers/ProtectedComponent.tsx'
import { updateCharacterSort } from '@lca/ducks/entities/character.ts'
import { getMyCharacters, updateCharacter } from '@lca/ducks/entities/index.ts'
import { useDocumentTitle } from '@lca/hooks/index.ts'
import { useAppDispatch } from '@lca/hooks/UseAppDispatch.ts'
import { useAppSelector } from '@lca/hooks/UseAppSelector.ts'

const SortableItem = SortableElement(({ children }) => children)

const CharacterList = () => {
  const characters = useAppSelector((state) => getMyCharacters(state))
  const dispatch = useAppDispatch()

  const chars = characters.map((c, i) => (
    <SortableItem key={c.id} index={i} collection="characters">
      <Grid item xs={12} md={6} xl={4}>
        <CharacterCard character={c} />
      </Grid>
    </SortableItem>
  ))

  const handleSort = ({ oldIndex, newIndex }) => {
    if (oldIndex === newIndex) {
      return
    }

    const charA = characters[oldIndex]
    const charB = characters[newIndex]
    const offset = charA.sorting > charB.sorting ? 1 : -1
    dispatch(
      updateCharacterSort({ id: charA.id, sorting: charB.sorting + offset }),
    )
    dispatch(updateCharacter(charA.id, { sorting_position: newIndex }))
  }

  const classes = {}

  useDocumentTitle('Characters | Lot-Casting Atemi')

  return (
    <SortableGridList
      header={
        <Typography variant="h5">
          Characters &nbsp;
          <CharacterCreatePopup />
        </Typography>
      }
      items={chars}
      classes={classes}
      onSortEnd={handleSort}
      useDragHandle
      axis="xy"
    />
  )
}

export default ProtectedComponent(CharacterList)
