import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import ChronicleDetailsPage from '@/components/chronicles/DetailsPage'
import ChronicleDashboard from '@/components/chronicles/index'
import CombatDashboard from '@/components/combat/index'
import { fetchChronicle } from '@/ducks/actions'
import { useAppDispatch, useAppSelector, useIdFromParams } from '@/hooks'
import { isChronicleLoaded } from '@/selectors'

const ChronicleWrap = () => {
  const dispatch = useAppDispatch()
  const [loadStarted, setLoadStarted] = useState(false)
  const id = useIdFromParams()
  const isLoaded = useAppSelector((state) => isChronicleLoaded(state, id))

  useEffect(() => {
    if (!isLoaded && !loadStarted) {
      dispatch(fetchChronicle(id))
      setLoadStarted(true)
    }
    return () => {
      setLoadStarted(false)
    }
  }, [dispatch, id, isLoaded, loadStarted])

  return (
    <Routes>
      <Route path="combat" element={<CombatDashboard />} />
      <Route path="details" element={<ChronicleDetailsPage />} />
      <Route path="*" element={<ChronicleDashboard />} />
    </Routes>
  )
}

export default ChronicleWrap
