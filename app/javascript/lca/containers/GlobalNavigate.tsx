// Copied directly from https://stackoverflow.com/a/74159445
import { useNavigate, NavigateFunction } from 'react-router-dom'

export let globalNavigate: NavigateFunction

export const GlobalHistory = () => {
  globalNavigate = useNavigate()

  return null
}
