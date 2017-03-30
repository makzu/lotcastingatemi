export function _create_weapon(state, action) {
  const id = action.weapon.id
  const charId = action.weapon.character_id

  const char = { ...state.characters[charId] }
  char.weapons.push(id)

  return { ...state,
    weapons: { ...state.weapons, [id]: action.weapon },
    characters: { ...state.characters, [charId]: char }
  }
}

export function _destroy_weapon(state, action) {
  const id = action.weapon.id
  const charId = action.weapon.character_id

  const newWeapons = { ...state.weapons }

  delete newWeapons[id]

  const char = { ...state.characters[charId] }
  char.weapons = char.weapons.filter((e) => e != id)

  return { ...state, weapons: newWeapons, characters: { ...state.characters, [charId]: char } }
}
