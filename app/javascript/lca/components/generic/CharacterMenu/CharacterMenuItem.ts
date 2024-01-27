import type { CharacterType } from '@/types'
import { WithId } from '@/types/_lib'

export interface MenuItemProps {
  id: WithId['id']
  characterType: CharacterType
}
