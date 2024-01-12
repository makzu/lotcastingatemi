import { Route, Routes } from 'react-router-dom'

import CharacterEditor from './'
import BioEditor from './bio'
import MeritEditor from './merits/MeritEditor'

const CharacterEditorWrapper = () => (
  <Routes>
    <Route path="merits" element={<MeritEditor />} />
    <Route path="bio" element={<BioEditor />} />
    <Route path="*" element={<CharacterEditor />} />
  </Routes>
)

export default CharacterEditorWrapper
