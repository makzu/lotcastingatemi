import { Grid, Typography } from '@mui/material'

import CharacterCard from '@/components/characters/CharacterCard.jsx'
import CharacterCreatePopup from '@/components/characters/CharacterCreatePopup'
import SortableGridList from '@/components/generic/SortableGridList.jsx'
import SortableItem from '@/components/generic/SortableItem'
import ProtectedComponent from '@/containers/ProtectedComponent'
import { getMyCharacters, updateCharacter } from '@/ducks/entities'
import { updateCharacterSort } from '@/ducks/entities/character'
import { useAppDispatch, useAppSelector, useDocumentTitle } from '@/hooks'

const CharacterList = () => {
  useDocumentTitle('Characters | Lot-Casting Atemi')
  const characters = useAppSelector((state) => getMyCharacters(state))
  const dispatch = useAppDispatch()

  const chars = characters.map((c, i) => (
    <SortableItem key={c.id} index={i} collection="characters">
      <Grid item xs={12} md={6} xl={4}>
        <CharacterCard character={c} />
      </Grid>
    </SortableItem>
  ))

  const handleSort = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number
    newIndex: number
  }) => {
    if (oldIndex === newIndex) {
      return
    }

    const charA = characters[oldIndex]!
    const charB = characters[newIndex]!
    const offset = charA.sorting > charB.sorting ? 1 : -1
    dispatch(
      updateCharacterSort({ id: charA.id, sorting: charB.sorting + offset }),
    )
    dispatch(updateCharacter(charA.id, { sorting_position: newIndex }))
  }

  const classes = {}

  return (
    <>
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
    </>
  )
}

export default ProtectedComponent(CharacterList)
