/* https://whereisthemouse.com/how-to-use-withrouter-hoc-in-react-router-v6-with-typescript */

import { useLocation, useParams } from 'react-router-dom'

/** @deprecated Use `React Router hooks` instead */
export interface WithRouterProps {
  location: ReturnType<typeof useLocation>
  params: Record<string, string>
}

/** @deprecated Use `React Router hooks` instead */
export const withRouter = <Props extends WithRouterProps>(
  Component: React.ComponentType<Props>,
) => {
  const ComponentWithRouterProps = (
    props: Omit<Props, keyof WithRouterProps>,
  ) => {
    const location = useLocation()
    const params = useParams()

    return (
      <Component {...(props as Props)} location={location} params={params} />
    )
  }

  return ComponentWithRouterProps
}

export default withRouter
