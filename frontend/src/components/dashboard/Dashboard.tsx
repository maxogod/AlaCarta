import { useEffect, useState } from 'react'
import { NavBar } from '../shared/NavBar'
import { Blurhash } from 'react-blurhash'
import ProductCatalog from './ProductCatalog'
import ProductStatistics from './ProductStatistics'
import RestaurantStatistics from './RestaurantStatistics'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { UserType } from '../../@types/stateTypes'
import { employeeCategoryEnum } from '../../@types/enums'
import { useGetRestaurant } from '../../hooks/restaurantHook'
import LoadingScreen from '../shared/LoadingScreen'
import { Navigate } from 'react-router-dom'

const Dashboard = ({ user }: { user: UserType }) => {

    const src = "https://toohotel.com/wp-content/uploads/2022/09/TOO_restaurant_Panoramique_vue_Paris_Seine_Tour_Eiffel_2.jpg"
    const [imageLoader, setImageLoader] = useState(false)
    const selectedProduct = useSelector((state: RootState) => state.currentRestaurant.product)
    const { restaurant, isLoading } = useGetRestaurant()
    const [isRestaurantLoaded, setIsRestaurantLoaded] = useState(false)
    const [userHasAccess, setUserHasAccess] = useState(false)

    useEffect(() => {
        if (!isLoading) {
            setIsRestaurantLoaded(true)
            const isEmployee = user.userCategories.find(
                (category) => category.restaurant._id === restaurant!._id
            )
            if (!isEmployee) {
                setUserHasAccess(false)
            } else {
                const hasAccess = isEmployee.categoryEnum <= employeeCategoryEnum.Manager
                setUserHasAccess(hasAccess)
            }
        }
    }, [isLoading])

    useEffect(() => {
        const img = new Image()
        img.onload = () => {
            setImageLoader(true)
        }
        img.src = src
    }, [src])



    return (
        <>
            {
                isRestaurantLoaded ?
                    (
                        userHasAccess ?
                            <>
                                <BackgroundImage src={src} imageLoader={imageLoader} />
                                <div className="fixed inset-0 scale-100">
                                    <NavBar />
                                    <ProductCatalog />
                                    <div className='relative w-full h-full'>
                                        {selectedProduct ? (
                                            <ProductStatistics selectedProduct={selectedProduct} />
                                        ) : (
                                            <RestaurantStatistics restaurant={restaurant} />
                                        )}
                                    </div>
                                </div>
                            </>
                            :
                            <Navigate to='/' />
                    )
                    :
                    <LoadingScreen />
            }
        </>
    )
}


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


export default Dashboard;