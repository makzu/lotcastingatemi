export function _create_qc_merit(state, action) {
  const id = action.qc_merit.id
  const charId = action.qc_merit.qc_id

  const char = { ...state.qcs[charId] }
  char.qc_merits.push(id)

  return { ...state,
    qc_merits: { ...state.qc_merits, [id]: action.qc_merit },
    qcs: { ...state.qcs, [charId]: char }
  }
}

export function _destroy_qc_merit(state, action) {
  const id = action.qc_merit.id
  const charId = action.qc_merit.qc_id

  const newMerits = { ...state.qc_merits }

  delete newMerits[id]

  const char = { ...state.qcs[charId] }
  char.qc_merits = char.qc_merits.filter((e) => e != id)

  return { ...state, qc_merits: newMerits, qcs: { ...state.qcs, [charId]: char }}
}
