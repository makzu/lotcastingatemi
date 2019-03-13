import * as React from 'react'
import { RouteComponentProps } from 'react-router'

import LogoutPopup from './LogoutPopup'

const ProtectedComponent = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const protectedComponent = (props: P & RouteComponentProps) => (
    <>
      <WrappedComponent {...props} />
      <LogoutPopup />
    </>
  )
  protectedComponent.displayName = 'Protected Component'

  return protectedComponent
}

export default ProtectedComponent
