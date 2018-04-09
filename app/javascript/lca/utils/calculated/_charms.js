// @flow
import type { Charm } from '../propTypes/flow'

export function isAbilityCharm(charm: Charm) {
  switch (charm.type) {
  case 'SolarCharm':
  case 'AbyssalCharm':
  case 'DragonbloodCharm':
  case 'SiderealCharm':
  case 'CustomAbilityCharm':
    return true
  default:
    return false
  }
}

export function isAttributeCharm(charm: Charm) {
  switch(charm.type) {
  case 'CustomAttributeCharm':
  case 'LunarCharm':
    return true
  default:
    return false
  }
}
