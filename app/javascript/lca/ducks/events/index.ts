import store, { AppDispatch } from '@/store'
import { updateCharacter, updateQc, updateBattlegroup } from '../actions'
export * from './chronicle.js'

export const SPEND_MOTES = 'lca/event/SPEND_MOTES'
export const SPEND_WP = 'lca/event/SPEND_WP'
export const TAKE_DAMAGE = 'lca/event/TAKE_DAMAGE'

export function updateEvent(charType: string) {
  if (charType === 'qc') return updateQc
  else if (charType === 'battlegroup') return updateBattlegroup
  else return updateCharacter
}

export function spendMotes(
  id: number,
  motes: number,
  pool: 'personal' | 'peripheral' = 'personal',
  charType: 'character' | 'qc' = 'character',
  committments: Record<string, $TSFixMe>,
  mute = false,
) {
  const update = updateEvent(charType)

  return (dispatch: AppDispatch, getState: typeof store.getState) => {
    dispatch({
      type: SPEND_MOTES,
      id: id,
      pool: pool,
    })
    const entity = getState().entities.current[charType + 's'][id]
    const current_motes = entity[`motes_${pool}_current`]
    const updateObj = {}
    updateObj[`motes_${pool}_current`] = Math.max(current_motes - motes, 0)

    // Add to mote committments if specified
    if (committments != null) updateObj.motes_committed = committments

    // Raise anima banner level if appropriate
    if (pool == 'peripheral' && motes >= 5 && !mute) {
      const anima = entity.anima_level

      if (anima !== 3) {
        // Do not change Anima level if it's already at Bonfire
        updateObj.anima_level = Math.min(anima + Math.floor(motes / 5), 3)
      }
    }

    dispatch(update(id, updateObj))
  }
}

export function spendWillpower(
  id: number,
  willpower: number,
  charType: 'character' | 'qc' = 'character',
) {
  let update = updateEvent(charType)

  return (dispatch: Function, getState: Function) => {
    dispatch({ type: SPEND_WP, id: id })
    let current_wp =
      getState().entities.current[charType + 's'][id].willpower_temporary
    dispatch(
      update(id, { willpower_temporary: Math.max(current_wp - willpower, 0) }),
    )
  }
}

export function takeDamage(
  id: number,
  damage: number,
  damageType: 'bashing' | 'lethal' | 'aggravated' = 'bashing',
  charType: 'character' | 'qc' = 'character',
) {
  const update = updateEvent(charType)

  return (dispatch: $TSFixMeFunction, getState: $TSFixMeFunction) => {
    dispatch({ type: TAKE_DAMAGE, id: id, damageType: damageType })
    const current_dmg =
      getState().entities.current[charType + 's'][id][`damage_${damageType}`]
    dispatch(update(id, { [`damage_${damageType}`]: current_dmg + damage }))
  }
}
