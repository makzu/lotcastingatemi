import * as React from 'react'

import { Ability, Attribute, Charm } from 'types'
import { Timing } from 'types/_lib'

export interface CharmFilter {
  ability: Array<Charm['ability']>
  category: string[]
  categoryInclusive: boolean
  hidePerilous: boolean
  keyword: string[]
  keywordInclusive: boolean
  muteOnly: boolean
  timing: Timing[]
}

export type CharmFilterAction =
  | { type: 'reset' }
  | { type: 'category' | 'keyword'; payload: string[] }
  | { type: 'ability'; payload: CharmFilter['ability'] }
  | { type: 'timing'; payload: CharmFilter['timing'] }
  | {
      type:
        | 'categoryInclusive'
        | 'keywordInclusive'
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
  const [state, dispatch] = React.useReducer(reducer, initialFilters)
  return [state, dispatch]
}

export default useCharmFilters

export const filterCharms = (charms: Charm[], filters: CharmFilter) => {
  let theCharms = charms

  if (filters.category.length > 0) {
    theCharms = theCharms.filter(charm =>
      filters.categoryInclusive
        ? filters.category.some(cat => charm.categories.includes(cat))
        : filters.category.every(cat => charm.categories.includes(cat))
    )
  }

  if (filters.keyword.length > 0) {
    theCharms = theCharms.filter(charm =>
      filters.keywordInclusive
        ? filters.keyword.some(word => charm.keywords.includes(word))
        : filters.keyword.every(word => charm.keywords.includes(word))
    )
  }

  if (filters.ability.length > 0) {
    theCharms = theCharms.filter(charm =>
      filters.ability.includes(charm.ability)
    )
  }

  if (filters.timing.length > 0) {
    theCharms = theCharms.filter(charm => filters.timing.includes(charm.timing))
  }

  if (filters.hidePerilous) {
    theCharms = theCharms.filter(charm => !charm.keywords.includes('perilous'))
  }

  if (filters.muteOnly) {
    theCharms = theCharms.filter(charm => charm.keywords.includes('mute'))
  }

  return theCharms
}
