import type { RouteComponentProps } from 'react-router'

export interface RouteWithIdProps
  extends RouteComponentProps<{ id?: string }> {}
