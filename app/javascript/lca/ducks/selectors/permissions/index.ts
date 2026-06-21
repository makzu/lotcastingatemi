import { canIDeleteBattlegroup, canIEditBattlegroup } from './battlegroup.ts'
import { canIDeleteCharacter, canIEditCharacter } from './character.ts'
import { canIDeleteQc, canIEditQc } from './qc.ts'

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

export * from './battlegroup.ts'
export * from './character.ts'
export * from './qc.ts'
export { canIEditCharacter }
