import ProductCatalog from './ProductCatalog'
import ProductStatistics from './ProductStatistics'
import RestaurantStatistics from './RestaurantStatistics'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { NavBar } from '../shared/NavBar'

const Dashboard = () => {

    const selectedProduct = useSelector((state: RootState) => state.currentRestaurant.product)

    return (
        <>
            <div className="fixed inset-0 scale-100">
                <NavBar/>
                <ProductCatalog />
                <div className='relative w-full h-full'>
                    {selectedProduct ? (
                        <ProductStatistics selectedProduct={selectedProduct} />
                    ) : (
                        <RestaurantStatistics />
                    )}
                </div>


            </div>
        </>
    )
}

export default Dashboard;