import { useReducer } from 'react'

import type { Timing } from '@lca/types/_lib.ts'
import type {
  AbilityCharm,
  AttributeCharm,
  Charm,
  NativeCharm,
  Spell,
} from '@lca/types/index.ts'

export interface CharmFilter {
  ability: Array<AbilityCharm['ability'] | AttributeCharm['ability']>
  category: string[]
  categoryInclusive: boolean
  hidePerilous: boolean
  keyword: Charm['keywords']
  keywordInclusive: boolean
  loadout: NonNullable<NativeCharm['loadouts']>
  loadoutInclusive: boolean
  muteOnly: boolean
  timing: Timing[]
}

export type CharmFilterAction =
  | { type: 'reset' }
  | { type: 'category' | 'keyword' | 'loadout'; payload: string[] }
  | { type: 'ability'; payload: CharmFilter['ability'] }
  | { type: 'timing'; payload: CharmFilter['timing'] }
  | {
      type:
        | 'categoryInclusive'
        | 'keywordInclusive'
        | 'loadoutInclusive'
        | 'hidePerilous'
        | 'muteOnly'
      payload: boolean
    }

export const initialFilters: CharmFilter = {
  ability: [],
  category: [],
  categoryInclusive: false,
  hidePerilous: false,
  keyword: [],
  keywordInclusive: false,
  loadout: [],
  loadoutInclusive: true,
  muteOnly: false,
  timing: [],
}

export const reducer = (state: CharmFilter, action: CharmFilterAction) => {
  if (action.type === 'reset') {
    return initialFilters
  }

  return {
    ...state,
    [action.type]: action.payload,
  }
}

const useCharmFilters = () => {
  const [state, dispatch] = useReducer(reducer, initialFilters)
  return [state, dispatch]
}

export default useCharmFilters

export const filterCharms = (
  charms: (Charm | Spell)[],
  filters: CharmFilter,
  type: 'evocation' | 'martialArts' | 'native' | 'spirit' | 'spell',
) => {
  let theCharms = charms

  if (filters.category.length > 0) {
    theCharms = theCharms.filter((charm) =>
      filters.categoryInclusive
        ? filters.category.some((cat) => charm.categories.includes(cat))
        : filters.category.every((cat) => charm.categories.includes(cat)),
    )
  }

  if (filters.keyword.length > 0) {
    theCharms = theCharms.filter((charm) =>
      filters.keywordInclusive
        ? filters.keyword.some((word) => charm.keywords.includes(word))
        : filters.keyword.every((word) => charm.keywords.includes(word)),
    )
  }

  if (type === 'native' && filters.loadout.length > 0) {
    theCharms = (<NativeCharm[]>theCharms).filter(
      (charm) =>
        charm?.loadouts?.includes('*') ||
        (filters.loadoutInclusive
          ? filters.loadout.some((cat) => charm?.loadouts?.includes(cat))
          : filters.loadout.every((cat) => charm?.loadouts?.includes(cat))),
    )
  }

  if (type === 'native' && filters.ability.length > 0) {
    theCharms = (<(AttributeCharm | AbilityCharm)[]>theCharms).filter((charm) =>
      filters?.ability.includes(charm.ability),
    )
  }

  if (filters.timing.length > 0) {
    theCharms = theCharms.filter((charm) =>
      filters.timing.includes(charm.timing),
    )
  }

  if (filters.hidePerilous) {
    theCharms = theCharms.filter(
      (charm) => !charm.keywords.includes('perilous'),
    )
  }

  if (filters.muteOnly) {
    theCharms = theCharms.filter((charm) => charm.keywords.includes('mute'))
  }

  return theCharms
}
