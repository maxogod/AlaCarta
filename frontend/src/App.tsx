import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import Dashboard from './components/dashboard/Dashboard'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/' element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
