import {
  destroyBattlegroup,
  destroyCharacter,
  destroyQc,
  duplicateBattlegroup,
  duplicateCharacter,
  duplicateQc,
  fetchBattlegroup,
  fetchCharacter,
  fetchChronicle,
  fetchQc,
  updateBattlegroup,
  updateCharacter,
  updateQc,
} from './'

export const destroy = {
  battlegroup: destroyBattlegroup,
  character: destroyCharacter,
  qc: destroyQc,
}

export const duplicate = {
  battlegroup: duplicateBattlegroup,
  character: duplicateCharacter,
  qc: duplicateQc,
}

export const update = {
  battlegroup: updateBattlegroup,
  character: updateCharacter,
  qc: updateQc,
}

export const fetch = {
  battlegroup: fetchBattlegroup,
  character: fetchCharacter,
  qc: fetchQc,
}
