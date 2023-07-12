import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useGetSession } from './hooks/sessionHooks'
import Menu from './components/menu/Menu'
import Orders from './components/orders/Orders'
import Employees from './components/employees/Employees'
import HomePage from './components/homepage/HomePage'
import Dashboard from './components/dashboard/Dashboard'
import LoadingScreen from './components/shared/LoadingScreen'
import NotFound from './components/informational/NotFound'

function App() {
  const { user, isLoading } = useGetSession()
  const [isSessionLoaded, setIsSessionLoaded] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      setIsSessionLoaded(true)
    }
  }, [isLoading])

  return (
    <Router>
      {isSessionLoaded ? (
        <Routes>
          <Route path='/:restaurantUrl/dashboard' element={
            user ? <Dashboard user={user} /> : <Navigate to="/" />
          } />
          <Route path='/' element={<HomePage />} />
          <Route path='/:restaurantUrl' element={<Menu />} />
          <Route path='/:restaurantUrl/orders' element={
            user ? <Orders user={user} /> : <Navigate to="/" />
          } />
          <Route path='/:restaurantUrl/employees' element={
            user ? <Employees user={user} /> : <Navigate to="/" />
          } />
          <Route path='*' element={<NotFound />} />
        </Routes>
      )
        :
        (<LoadingScreen />)
      }
    </Router>
  )
}

export default App