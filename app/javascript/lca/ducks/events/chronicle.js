// @flow
import { isEqual } from 'lodash'
import { updateEvent, updateEventMulti } from '.'
import { getCharactersForChronicle, getQcsForChronicle } from 'selectors'
import {
  committedPersonalMotes,
  committedPeripheralMotes,
} from 'utils/calculated'

export const END_SCENE = 'lca/event/CHRONICLE_END_SCENE'
export function endScene(id: number) {
  return (dispatch: Function, getState: Function) => {
    dispatch({ type: END_SCENE, id: id })

    const state = getState()
    let chars = [
      ...getCharactersForChronicle(state, id),
      ...getQcsForChronicle(state, id),
    ]
    chars.forEach(c => {
      const commits = c.motes_committed.filter(m => !m.scenelong)
      const update = updateEvent(c.type)

      if (!isEqual(commits, c.motes_committed))
        dispatch(update(c.id, 'motes_committed', commits))
    })
  }
}

export const RESPIRE_MOTES = 'lca/event/CHRONICLE_RESPIRE_MOTES'
export function respireMotes(id: number, motes: number, includeQcs: boolean) {
  return (dispatch: Function, getState: Function) => {
    dispatch({ type: RESPIRE_MOTES, id: id, motes: motes })

    const state = getState()
    let chars = [...getCharactersForChronicle(state, id)]
    if (includeQcs) chars = [...chars, ...getQcsForChronicle(state, id)]
    chars.forEach(c => {
      const update = updateEventMulti(c.type)
      let updateObj = {}

      const spentPeripheral =
        c.motes_peripheral_total -
        committedPeripheralMotes(c) -
        c.motes_peripheral_current
      const spentPersonal =
        c.motes_personal_total -
        committedPersonalMotes(c) -
        c.motes_personal_current

      if (spentPersonal === 0 && spentPeripheral === 0) return

      if (spentPeripheral >= motes) {
        updateObj = {
          motes_peripheral_current: c.motes_peripheral_current + motes,
        }
      } else {
        updateObj = {
          motes_peripheral_current:
            c.motes_peripheral_current + spentPeripheral,
          motes_personal_current: Math.min(
            c.motes_personal_current + spentPersonal,
            c.motes_personal_current + (motes - spentPeripheral)
          ),
        }
      }
      dispatch(update(c.id, updateObj))
    })
  }
}

export const RECOVER_WILLPOWER = 'lca/event/CHRONICLE_RECOVER_WP'
export function recoverWillpower(
  id: number,
  willpower: number,
  exceed: boolean,
  includeQcs: boolean
) {
  return (dispatch: Function, getState: Function) => {
    dispatch({ type: RECOVER_WILLPOWER, id: id, willpower: willpower })

    const state = getState()
    let chars = [...getCharactersForChronicle(state, id)]
    if (includeQcs) chars = [...chars, ...getQcsForChronicle(state, id)]
    chars.forEach(c => {
      const max = exceed ? 10 : c.willpower_permanent
      if (c.willpower_temporary >= max) return
      const update = updateEvent(c.type)
      const val = Math.min(c.willpower_temporary + willpower, max)
      dispatch(update(c.id, 'willpower_temporary', val))
    })
  }
}
