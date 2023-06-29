import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/homepage/HomePage'
import { useGetSession } from './hooks/sessionHooks'
import Dashboard from './components/dashboard/Dashboard'

function App() {

  useGetSession()

  return (
    <Router>
      <Routes>
        <Route path='/:restaurantUrl/dashboard' element={<Dashboard />} />
        <Route path='/' element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
