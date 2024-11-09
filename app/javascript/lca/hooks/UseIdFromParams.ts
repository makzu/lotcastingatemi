import { useParams } from 'react-router-dom'

/** Retrieves the id param from any react-router <Route> and returns it as an int. */
const useIdFromParams = () => {
  const { id } = useParams<{ id: string }>()
  return Number.parseInt(id ?? '')
}

export default useIdFromParams
