import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetRestaurant } from '../../hooks/restaurantHook'
import { RootState } from '../../redux/store'
import { UserType } from '../../@types/stateTypes'
import { employeeCategoryEnum } from '../../@types/enums'
import ProductCatalog from './ProductCatalog'
import ProductStatistics from './ProductStatistics'
import RestaurantStatistics from './RestaurantStatistics'
import { NavBar } from '../shared/NavBar'
import LoadingScreen from '../shared/LoadingScreen'
import BackgroundImage from '../shared/BackgroundImage'

const Dashboard = ({ user }: { user: UserType }) => {

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

    return (
        <>
            <BackgroundImage />
            {
                isRestaurantLoaded ?
                    (
                        userHasAccess ?
                            <>
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

export default Dashboard;