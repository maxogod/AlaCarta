import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useGetSession } from './hooks/sessionHooks'
import Menu from './components/menu/Menu'
import Orders from './components/orders/Orders'
import Employees from './components/employees/Employees'
import HomePage from './components/homepage/HomePage'
import Dashboard from './components/dashboard/Dashboard'
import { useEffect, useState } from 'react'
import LoadingScreen from './components/shared/LoadingScreen'
import NotFound from './components/informational/NotFound'
import { Blurhash } from 'react-blurhash'

function App() {
  const { user, isLoading } = useGetSession()
  const [isSessionLoaded, setIsSessionLoaded] = useState(false)
  const src = "https://toohotel.com/wp-content/uploads/2022/09/TOO_restaurant_Panoramique_vue_Paris_Seine_Tour_Eiffel_2.jpg"
  const [imageLoader, setImageLoader] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      setIsSessionLoaded(true)
    }
  }, [isLoading])

  useEffect(() => {
      const img = new Image()
      img.onload = () => {
          setImageLoader(true)
      }
      img.src = src
  }, [src ])

  function BackgroundImage({ src, imageLoader }: { src: string, imageLoader: boolean }) {
    return (
        <>
            {!imageLoader && (
                <Blurhash
                    hash='LYGRuJw^S5R*ysn%ozax4=R*t7n~'
                    resolutionX={32}
                    resolutionY={32}
                    punch={1} />
            )}
            {imageLoader && (
                <img
                    className="blur-lg object-cover object-center h-screen w-screen fixed"
                    src={src}
                    alt=""
                />
            )}
        </>
    )
}


  return (
    <Router>
      <BackgroundImage src={src} imageLoader={imageLoader} />
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