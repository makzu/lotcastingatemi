import { useReducer } from 'react'

import DivWithFilterDrawer from 'components/shared/DivWithFilterDrawer'
import { useCharacterAttribute } from 'ducks/entities'
import { useDocumentTitle, useIdFromParams } from 'hooks'
import CharacterLoadError from '../CharacterLoadError'
import CharmFilter from './CharmFilter/'
import CharmList from './CharmList'
import { initialFilters, reducer } from './useCharmFilters'

const CharmPage = () => {
  const [filters, setfilters] = useReducer(reducer, initialFilters)
  const id = useIdFromParams()
  const name = useCharacterAttribute(id, 'name')

  useDocumentTitle(`${name} Charms | Lot-Casting Atemi`)

  if (name == null) {
    return <CharacterLoadError />
  }

  return (
    <DivWithFilterDrawer>
      <div>
        Charms!{' '}
        <CharmFilter id={id} filters={filters} setfilters={setfilters} />
      </div>

      <CharmList type="native" id={id} filters={filters} />

      <CharmList type="martialArts" id={id} filters={filters} />

      <CharmList type="evocation" id={id} filters={filters} />

      <CharmList type="spirit" id={id} filters={filters} />
    </DivWithFilterDrawer>
  )
}

export default CharmPage
