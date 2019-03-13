import * as React from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'

import { Grid, Typography } from '@material-ui/core'

import CharacterCard from 'components/characters/CharacterCard.jsx'
import CharacterCreatePopup from 'components/characters/characterCreatePopup.jsx'
import SortableGridList from 'components/generic/SortableGridList.jsx'
import ProtectedComponent from 'containers/ProtectedComponent'
import { State } from 'ducks'
import { getMyCharacters } from 'ducks/entities'

const CharacterList = props => {
  const chars = props.characters.map(c => (
    <Grid item xs={12} md={6} xl={4} key={c.id}>
      <CharacterCard character={c} />
    </Grid>
  ))

  const handleSort = () => null
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

const mapState = (state: State) => ({
  characters: getMyCharacters(state),
})

export default ProtectedComponent(connect(mapState)(CharacterList))
