import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Homepage from './pages/homepage/Homepage'

import RegisterComplaint from './components/registercomplaint/RegisterComplaint'
import ResolveComplaint from './pages/resolvecomplaint/ResolveComplaint'
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage/>} />
      <Route path="/registercomplaint" element={<RegisterComplaint/>}/>
      <Route path="/resolvecomplaint" element={<ResolveComplaint/>}/>
    </Routes>
  )
}

export default App