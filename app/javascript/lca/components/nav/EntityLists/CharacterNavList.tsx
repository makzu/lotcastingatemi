import EntityList from './EntityList'
import EntityListItem from './EntityListItem'
import { getMyCharacters, getMyPinnedCharacters } from 'ducks/entities'
import { useAppSelector } from 'hooks'
import type { Character } from 'types'
import { prettyCompactExaltType } from '@/utils/calculated'

const mapCharacterToListItem = (character: Character) => (
  <EntityListItem
    key={character.id}
    link={`/characters/${character.id}`}
    name={character.name}
    desc={prettyCompactExaltType(character)}
  />
)

const CharacterNavList = ({ closeDrawer }: { closeDrawer(): void }) => {
  const characters = useAppSelector((state) => getMyPinnedCharacters(state))
  const count = useAppSelector((state) => getMyCharacters(state).length)

  return (
    <EntityList
      label="Characters"
      link="/characters"
      count={count}
      onClick={closeDrawer}
    >
      {characters.map(mapCharacterToListItem)}
    </EntityList>
  )
}

export default CharacterNavList
