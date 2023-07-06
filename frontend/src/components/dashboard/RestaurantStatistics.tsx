import { useState } from 'react'
import { Product } from '../../@types/product';
import ProductChart from './ProductChart';
import { FilterOptions, RangeDatePicker } from './FilterOptions';
import { AddProducts } from './CrudElements';
import PieChartStatistics from './PieChartStatistics';
import { useGetRestaurant } from '../../hooks/restaurantHook';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const RestaurantStatistics = ({ allProducts }: { allProducts: Product[] }) => {

    useGetRestaurant()

    const [product, setProduct] = useState<Product>(allProducts[0]); //TODO what do?

    const [filterOption, setFilterOption] = useState<string>();
    const [customStartDate, setCustomStartDate] = useState<Date>();
    const [customEndDate, setCustomEndDate] = useState<Date>();
    const restaurant = useSelector((state: RootState) => state.currentRestaurant.restaurant)   





    return (
        <div className="absolute right-12 w-[65%] 2xl:w-[75%] h-5/6 mt-20 flex items-center justify-center  rounded-3xl bg-customBeige ml-5 overflow-hidden">
            <div className='border-2 border-customPink rounded-3xl w-[95%] h-[90%]'>
                <div className='ml-5 mt-8 text-customRed font-bold'>
                    <div className='flex gap-10 relative'>
                        <h1 className='2xl:text-4xl text-lg'>{restaurant?.name}</h1>
                        <AddProducts />
                    </div>
                </div>
                <ProductChart
                    product={product}
                    filterOption={filterOption}
                    customStartDate={customStartDate}
                    customEndDate={customEndDate}
                />
                <div className=' w-full 2xl:ml-3 ml-2  flex 2xl:gap-7 gap-4 '>
                    <FilterOptions setFilterOption={setFilterOption} />
                    <RangeDatePicker
                        filterOption={filterOption}
                        customStartDate={customStartDate}
                        customEndDate={customEndDate}
                        setCustomStartDate={setCustomStartDate}
                        setCustomEndDate={setCustomEndDate}
                    />
                </div>
            </div>
        </div>
    )

}

export default RestaurantStatistics;