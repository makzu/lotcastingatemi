export function isAbilityCharm(charm) {
  switch (charm.type) {
  case 'SolarCharm':
  case 'MartialArtsCharm':
    return true
  default:
    return false
  }
}
