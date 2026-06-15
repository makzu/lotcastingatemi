import { connect } from 'react-redux'

import type { State } from '@lca/ducks'
import type { Battlegroup } from '@lca/types'
import { getMyBattlegroups, getMyPinnedBattlegroups } from 'ducks/entities'
import EntityList from './EntityList'
import EntityListItem from './EntityListItem'

interface StateProps {
  battlegroups: Battlegroup[]
  count: number
}

interface OuterProps {
  closeDrawer(): void
}

interface Props extends StateProps, OuterProps {}

const mapBattlegroupToListItem = (battlegroup: Battlegroup) => (
  <EntityListItem
    key={battlegroup.id}
    link={`/battlegroups/${battlegroup.id}`}
    name={battlegroup.name}
  />
)

const BattlegroupNavList = ({ battlegroups, count, closeDrawer }: Props) => {
  return (
    <EntityList
      label="Battlegroups"
      link="/battlegroups"
      count={count}
      children={battlegroups.map(mapBattlegroupToListItem)}
      onClick={closeDrawer}
    />
  )
}

const mapState = (state: State): StateProps => ({
  battlegroups: getMyPinnedBattlegroups(state),
  count: getMyBattlegroups(state).length,
})

export default connect(mapState)(BattlegroupNavList)
