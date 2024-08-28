import { useListQcsQuery } from '@/features/qc/store/qc'
import type { QC } from '@/features/qc/types'
import EntityList from './EntityList'
import EntityListItem from './EntityListItem'

const mapQcToListItem = (qc: QC) => (
  <EntityListItem key={qc.id} link={`/qcs/${qc.id}`} name={qc.name} />
)

const QcNavList = ({ closeDrawer }: { closeDrawer(): void }) => {
  const { data: qcs, isLoading, error } = useListQcsQuery(1)
  const pinnedQcs = (qcs ?? []).filter((qc) => qc.pinned)

  if (isLoading || qcs == null) return null
  if (error) return <div>Error: {JSON.stringify(error)}</div>

  return (
    <EntityList
      label="Quick Characters"
      link="/qcs"
      count={qcs.length}
      onClick={closeDrawer}
    >
      {pinnedQcs.map(mapQcToListItem)}
    </EntityList>
  )
}

export default QcNavList
