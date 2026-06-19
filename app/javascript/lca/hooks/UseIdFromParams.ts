import { useParams } from 'react-router-dom'

export const useIdFromParams = () => {
  const { id } = useParams<{ id: string }>()

  return parseInt(id, 10)
}

export default useIdFromParams
