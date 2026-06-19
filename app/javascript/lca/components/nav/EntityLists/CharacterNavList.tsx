import { connect } from 'react-redux'

import type { State } from '@lca/ducks'
import { getMyCharacters, getMyPinnedCharacters } from '@lca/ducks/entities'
import type { Character } from '@lca/types'
import { prettyCompactExaltType } from '@lca/utils/calculated'
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
