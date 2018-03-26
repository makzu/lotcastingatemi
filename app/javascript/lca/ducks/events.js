import { updateCharacter, updateQc } from './actions.js'

export const SPEND_MOTES = 'lca/event/SPEND_MOTES'
export const SPEND_WP    = 'lca/event/SPEND_WP'
export const TAKE_DAMAGE = 'lca/event/TAKE_DAMAGE'

function updateEvent(charType) {
  if (charType == 'qc')
    return updateQc
  else
    return updateCharacter
}

export function spendMotes(id, motes, pool = 'personal', charType = 'character', committments) {
  let update = updateEvent(charType)

  return (dispatch, getState) => {
    dispatch({ type: SPEND_MOTES, id: id, pool: pool })
    let current_motes = getState().entities[charType + 's'][id][`motes_${pool}_current`]

    dispatch(update(id, `motes_${pool}_current`, Math.max(current_motes - motes, 0)))

    // Add to mote committments if specified
    if (committments != undefined)
      dispatch(update(id, 'motes_committed', committments))

    // Raise anima banner level if appropriate
    if (pool == 'peripheral' && motes > 5) {
      let anima = getState().entities[charType + 's'][id].anima_level
      if (anima !== 3) { // Do not change Anima level if it's already at Bonfire
        const newLevel = Math.min(anima + Math.floor(motes / 5), 3)
        dispatch(update(id, 'anima_level', newLevel))
      }
    }
  }
}

export function spendWillpower(id, willpower, charType = 'character') {
  let update = updateEvent(charType)

  return (dispatch, getState) => {
    dispatch({ type: SPEND_WP, id: id })
    let current_wp = getState().entities[charType + 's'][id].willpower_temporary
    dispatch(update(id, 'willpower_temporary', Math.max(current_wp - willpower, 0)))
  }
}

export function takeDamage(id, damage, damageType = 'bashing', charType = 'character') {
  let update = updateEvent(charType)

  return (dispatch, getState) => {
    dispatch({ type: TAKE_DAMAGE, id: id, damageType: damageType })
    let current_dmg = getState().entities[charType + 's'][id][`damage_${damageType}`]
    dispatch(update(id, `damage_${damageType}`, current_dmg + damage))
  }
}
