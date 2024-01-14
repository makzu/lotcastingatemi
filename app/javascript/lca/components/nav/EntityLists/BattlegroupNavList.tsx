import EntityList from './EntityList'
import EntityListItem from './EntityListItem'

import { getMyBattlegroups, getMyPinnedBattlegroups } from '@/ducks/entities'
import { useAppSelector } from '@/hooks'
import type { Battlegroup } from '@/types'

const mapBattlegroupToListItem = (battlegroup: Battlegroup) => (
  <EntityListItem
    key={battlegroup.id}
    link={`/battlegroups/${battlegroup.id}`}
    name={battlegroup.name}
  />
)

const BattlegroupNavList = ({ closeDrawer }: { closeDrawer(): void }) => {
  const battlegroups = useAppSelector((state) => getMyPinnedBattlegroups(state))
  const count = useAppSelector((state) => getMyBattlegroups(state).length)

  return (
    <EntityList
      label="Battlegroups"
      link="/battlegroups"
      count={count}
      onClick={closeDrawer}
    >
      {battlegroups.map(mapBattlegroupToListItem)}
    </EntityList>
  )
}

export default BattlegroupNavList
