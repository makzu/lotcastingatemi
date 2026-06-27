import type { ComponentType } from 'react'
import type { RouteComponentProps } from 'react-router'

import ErrorBoundary from './ErrorBoundary.tsx'
import LogoutPopup from './LogoutPopup.tsx'

const ProtectedComponent = <P extends object>(
  WrappedComponent: ComponentType<P>,
) => {
  const protectedComponent = (props: P & RouteComponentProps) => (
    <>
      <ErrorBoundary>
        <WrappedComponent {...props} />
      </ErrorBoundary>
      <LogoutPopup />
    </>
  )
  protectedComponent.displayName = 'Protected Component'

  return protectedComponent
}

export default ProtectedComponent
