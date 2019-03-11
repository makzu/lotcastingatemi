import * as React from 'react'
import { RouteComponentProps } from 'react-router'

import LogoutPopup from './LogoutPopup'

const ProtectedComponent = (WrappedComponent: React.ComponentClass<any>) => {
  const protectedComponent = (props: RouteComponentProps) => (
    <>
      <WrappedComponent {...props} />
      <LogoutPopup />
    </>
  )
  protectedComponent.displayName = 'Protected Component'

  return protectedComponent
}

export default ProtectedComponent
