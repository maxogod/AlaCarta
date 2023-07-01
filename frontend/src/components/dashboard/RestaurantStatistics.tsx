import { useState } from 'react'
import { Product } from '../models/product';
import ProductChart from './ProductChart';
import {FilterOptions, RangeDatePicker} from './FilterOptions';
import ProductImage from './ProductImage';
import PieChartStatistics from './PieChartStatistics';

const RestaurantStatistics = ({allProducts} : {allProducts: Product[]}) =>{

    const [filterOption, setFilterOption] = useState<string>();
    const [customStartDate, setCustomStartDate] = useState<Date>();
    const [customEndDate, setCustomEndDate] = useState<Date>();
    const RestaurantName = "Restaurante Epico"


    return(
        <div className="right-1 flex justify-center mt-20 md:right-80 rounded-3xl bg-customBeige ml-5 overflow-hidden">
            <div className="md:w-[95%] m-5 border-2 border-customPink rounded-3xl">
                <div className="relative top-4">
                    <div className="ml-3 text-customRed font-bold">
                        <div className="font-bold text-3xl w-fit">
                            {RestaurantName}
                            <hr className="bg-customPink h-1 mt-1 rounded-lg" />
                        </div>
                    </div>
                </div>
                <div className="mt-12 mb-2 relative">
                    <ProductChart
                        products={allProducts}
                        filterOption={filterOption}
                        customStartDate={customStartDate}
                        customEndDate={customEndDate}
                    />
                    <div className="md:flex-row flex justify-center flex-shrink-0 flex-wrap gap-7">
                        <FilterOptions setFilterOption={setFilterOption} />
                        <RangeDatePicker
                            customStartDate={customStartDate}
                            customEndDate={customEndDate}
                            setCustomStartDate={setCustomStartDate}
                            setCustomEndDate={setCustomEndDate}
                        />
                    </div>
                    <PieChartStatistics selectedProduct={allProducts[0]} />
                    <ProductImage selectedProduct={allProducts[0]} />
                </div>
            </div>
        </div>
    )

}

export default RestaurantStatistics;