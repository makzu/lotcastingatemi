import EntityList from './EntityList'
import EntityListItem from './EntityListItem'
import { getMyPinnedQcs, getMyQcs } from 'ducks/entities'
import { useAppSelector } from 'hooks'
import { QC } from 'types'

const mapQcToListItem = (qc: QC) => (
  <EntityListItem key={qc.id} link={`/qcs/${qc.id}`} name={qc.name} />
)

const QcNavList = ({ closeDrawer }: { closeDrawer(): void }) => {
  const qcs = useAppSelector((state) => getMyPinnedQcs(state))
  const count = useAppSelector((state) => getMyQcs(state).length)

  return (
    <EntityList
      label="Quick Characters"
      link="/qcs"
      count={count}
      onClick={closeDrawer}
    >
      {qcs.map(mapQcToListItem)}
    </EntityList>
  )
}

export default QcNavList
