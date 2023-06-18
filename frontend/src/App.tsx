import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import Dashboard from './components/dashboard/Dashboard'
import Menu from './components/menu/Menu'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/' element={<HomePage />} />
        <Route path='/at=:restaurantName/menu' element={<Menu />} />
      </Routes>
    </Router>
  )
}

export default App
