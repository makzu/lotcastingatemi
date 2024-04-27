import type { CharacterType } from '@/types'
import { type WithId } from '@/types/_lib'

export interface MenuItemProps {
  id: WithId['id']
  characterType: CharacterType
}
