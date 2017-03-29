export function _create_qc_attack(state, action) {
  const id = action.qc_attack.id
  const charId = action.qc_attack.qc_id

  const char = { ...state.qcs[charId] }
  char.qc_attacks.push(id)

  return { ...state,
    qc_attacks: { ...state.qc_attacks, [id]: action.qc_attack },
    qcs: { ...state.qcs, [charId]: char }
  }
}

export function _destroy_qc_attack(state, action) {
  const id = action.qc_attack.id
  const charId = action.qc_attack.qc_id

  const newWeapons = { ...state.qc_attacks }

  delete newWeapons[id]

  const char = { ...state.qcs[charId] }
  char.qc_attacks = char.qc_attacks.filter((e) => e != id)

  return { ...state, qc_attacks: newWeapons, qcs: { ...state.qcs, [charId]: char } }
}
