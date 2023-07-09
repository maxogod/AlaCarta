import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import background from './assets/background.jpg'
import { useGetSession } from './hooks/sessionHooks'
import Dashboard from './components/dashboard/Dashboard'
import Menu from './components/menu/Menu'
import Orders from './components/orders/Orders'
import Employees from './components/employees/Employees'
import React from 'react'
import { Suspense } from 'react'

const LazyHomePage = React.lazy(() => import('./components/homepage/HomePage'))

function App() {

  useGetSession()

  return (
    <Suspense fallback={
      <img
        className='object-cover blur-sm object-center h-screen w-screen fixed'
        src={background}
        alt="loading"
      />
    }>
      <Router>
        <Routes>
          <Route path='/:restaurantUrl/dashboard' element={<Dashboard />} />
          <Route path='/' element={<LazyHomePage />} />
          <Route path='/:restaurantUrl/menu' element={<Menu />} />
          <Route path='/:restaurantUrl/orders' element={<Orders />} />
          <Route path='/:restaurantUrl/employees' element={<Employees />} />
        </Routes>
      </Router>
    </Suspense>
  )
}

export default App
