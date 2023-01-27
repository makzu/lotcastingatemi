import { ComponentType } from 'react'

import LogoutPopup from './LogoutPopup'

const ProtectedComponent = <P extends object>(
  WrappedComponent: ComponentType<P>,
) => {
  const protectedComponent = (props: P) => (
    <>
      <WrappedComponent {...props} />
      <LogoutPopup />
    </>
  )
  protectedComponent.displayName = 'Protected Component'

  return protectedComponent
}

export default ProtectedComponent
