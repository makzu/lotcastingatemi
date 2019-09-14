import * as React from 'react'
import { connect } from 'react-redux'

import { State } from 'ducks'
import { getMyCharacters, getMyPinnedCharacters } from 'ducks/entities'
import { Character } from 'types'
import { prettyCompactExaltType } from 'utils/calculated'
import EntityList from './EntityList'
import EntityListItem from './EntityListItem'

interface StateProps {
  characters: Character[]
  count: number
}

interface OuterProps {
  closeDrawer(): void
}

interface Props extends StateProps, OuterProps {}

const mapCharacterToListItem = (character: Character) => (
  <EntityListItem
    key={character.id}
    link={`/characters/${character.id}`}
    name={character.name}
    desc={prettyCompactExaltType(character)}
  />
)

const CharacterNavList = ({ characters, count, closeDrawer }: Props) => {
  return (
    <EntityList
      label="Characters"
      link="/characters"
      count={count}
      children={characters.map(mapCharacterToListItem)}
      onClick={closeDrawer}
    />
  )
}

const mapState = (state: State): StateProps => ({
  characters: getMyPinnedCharacters(state),
  count: getMyCharacters(state).length,
})

export default connect(mapState)(CharacterNavList)
