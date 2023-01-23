import { useParams } from 'react-router'

/** Retrieves the id param from any react-router <Route> and returns it as an int. */
export const useIdFromParams = () => {
  const { id } = useParams<{ id: string }>()
  return parseInt(id)
}
