import React from 'react'
import DocumentTitle from 'react-document-title'

import { Grid, Typography } from '@material-ui/core'

import CharacterCard from 'components/characters/CharacterCard'
import CharacterCreatePopup from 'components/characters/CharacterCreatePopup'
import SortableGridList from 'components/generic/SortableGridList'
import ProtectedComponent from 'containers/ProtectedComponent'
import { getMyCharacters, updateCharacter } from 'ducks/entities'
import SortableItem from 'components/generic/SortableItem'
import { useAppDispatch, useAppSelector } from 'hooks'

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
    const offset = charA.sort_order > charB.sort_order ? -1 : 1
    dispatch(
      // @ts-expect-error TODO
      updateCharacter(charA.id, { sort_order: charB.sort_order + offset }),
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
            {/*
            // @ts-expect-error Hopefully updating react-redux fixes this */}
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
