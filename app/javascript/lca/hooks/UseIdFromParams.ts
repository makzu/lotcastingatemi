import { useParams } from 'react-router'

export const useIdFromParams = () => {
  const { id } = useParams<{ id: string }>()
  return parseInt(id)
}
