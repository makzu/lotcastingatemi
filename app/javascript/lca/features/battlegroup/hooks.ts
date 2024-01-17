import { useAppSelector } from '@/hooks'
import type { Battlegroup } from '@/types/battlegroup'
import { selectBattlegroupById } from './store/battlegroupSelectors'

export const useBattlegroup = (id: Battlegroup['id']) =>
  useAppSelector((state) => selectBattlegroupById(state, id))

export const useBattlegroupTrait = (
  id: Battlegroup['id'],
  trait: keyof Battlegroup,
) => useAppSelector((state) => selectBattlegroupById(state, id)?.[trait])
