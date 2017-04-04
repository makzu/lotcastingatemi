export function _create_merit(state, action) {
  const id = action.merit.id
  const charId = action.merit.character_id

  const char = { ...state.characters[charId] }
  char.merits.push(id)

  return { ...state,
    merits: { ...state.merits, [id]: action.merit },
    characters: { ...state.characters, [charId]: char }
  }
}

export function _destroy_merit(state, action) {
  const id = action.merit.id
  const charId = action.merit.character_id

  const newWeapons = { ...state.merits }

  delete newWeapons[id]

  const char = { ...state.characters[charId] }
  char.merits = char.merits.filter((e) => e != id)

  return { ...state, merits: newWeapons, characters: { ...state.characters, [charId]: char }}
}
