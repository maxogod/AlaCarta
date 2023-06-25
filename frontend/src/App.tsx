import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/homepage/HomePage'
import { useGetSession } from './hooks/sessionHooks'

function App() {

  useGetSession()

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
