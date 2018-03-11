export function isAbilityCharm(charm) {
  switch (charm.type) {
  case 'SolarCharm':
  case 'CustomAbilityCharm':
    return true
  default:
    return false
  }
}

export function isAttributeCharm(charm) {
  switch(charm.type) {
  case 'CustomAttributeCharm':
    return true
  default:
    return false
  }
}
