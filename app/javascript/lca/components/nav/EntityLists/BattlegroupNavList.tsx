import { useListBattlegroupsQuery } from '@/features/battlegroup/store/battlegroup'
import type { Battlegroup } from '@/features/battlegroup/types'
import EntityList from './EntityList'
import EntityListItem from './EntityListItem'

const mapBattlegroupToListItem = (battlegroup: Battlegroup) => (
  <EntityListItem
    key={battlegroup.id}
    link={`/battlegroups/${battlegroup.id}`}
    name={battlegroup.name}
  />
)

const BattlegroupNavList = ({ closeDrawer }: { closeDrawer(): void }) => {
  const { data: battlegroups, isLoading, error } = useListBattlegroupsQuery(1)
  const pinnedBgs = (battlegroups ?? []).filter((bg) => bg.pinned)

  if (isLoading || battlegroups == null) return null
  if (error) return <div>Error: {JSON.stringify(error)}</div>

  return (
    <EntityList
      label="Battlegroups"
      link="/battlegroups"
      count={battlegroups.length}
      onClick={closeDrawer}
    >
      {pinnedBgs.map(mapBattlegroupToListItem)}
    </EntityList>
  )
}

export default BattlegroupNavList
