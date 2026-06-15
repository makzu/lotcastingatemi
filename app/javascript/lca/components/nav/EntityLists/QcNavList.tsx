import { connect } from 'react-redux'

import type { State } from '@lca/ducks'
import { getMyPinnedQcs, getMyQcs } from '@lca/ducks/entities'
import type { QC } from '@lca/types'
import EntityList from './EntityList'
import EntityListItem from './EntityListItem'

interface StateProps {
  qcs: QC[]
  count: number
}

interface OuterProps {
  closeDrawer(): void
}

interface Props extends StateProps, OuterProps {}

const mapQcToListItem = (qc: QC) => (
  <EntityListItem key={qc.id} link={`/qcs/${qc.id}`} name={qc.name} />
)

const QcNavList = ({ qcs, count, closeDrawer }: Props) => {
  return (
    <EntityList
      label="Quick Characters"
      link="/qcs"
      count={count}
      children={qcs.map(mapQcToListItem)}
      onClick={closeDrawer}
    />
  )
}

const mapState = (state: State): StateProps => ({
  count: getMyQcs(state).length,
  qcs: getMyPinnedQcs(state),
})

export default connect(mapState)(QcNavList)
