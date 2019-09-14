import { canIDeleteBattlegroup, canIEditBattlegroup } from './battlegroup'
import { canIDeleteCharacter, canIEditCharacter } from './character'
import { canIDeleteQc, canIEditQc } from './qc'

export const canIEdit = {
  battlegroup: canIEditBattlegroup,
  character: canIEditCharacter,
  qc: canIEditQc,
}

export const canIDelete = {
  battlegroup: canIDeleteBattlegroup,
  character: canIDeleteCharacter,
  qc: canIDeleteQc,
}

export * from './battlegroup'
export * from './character'
export * from './qc'
export { canIEditCharacter }
