import React from 'react'
import DocumentTitle from 'react-document-title'
import { useDispatch, useSelector } from 'react-redux'
import { SortableElement } from 'react-sortable-hoc'

import { Grid, Typography } from '@material-ui/core'

import CharacterCard from 'components/characters/CharacterCard.jsx'
import CharacterCreatePopup from 'components/characters/CharacterCreatePopup'
import SortableGridList from 'components/generic/SortableGridList.jsx'
import ProtectedComponent from 'containers/ProtectedComponent'
import { State } from 'ducks'
import { getMyCharacters, updateCharacter } from 'ducks/entities'
import { updateCharacterSort } from 'ducks/entities/character'

const SortableItem = SortableElement(({ children }) => children)

const CharacterList = () => {
  const characters = useSelector((state: State) => getMyCharacters(state))
  const dispatch = useDispatch()

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
    dispatch(updateCharacterSort({id: charA.id, sorting: charB.sorting + offset}))
    dispatch(
      updateCharacter(charA.id, { sorting_position: newIndex }),
    )
  }

  const classes = {}

  return (
    <>
      <DocumentTitle title="Characters | Lot-Casting Atemi" />

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
