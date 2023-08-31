import { useState } from 'react'
import { Product } from '../../@types/product'
import { Tag } from '../shared/Tag'
import ProductImage from './ProductImage'
import LineChartStatistics from './LineChartStatistics'
import { ProductPieChart } from './PieChartStatistics'
import { ProductActions } from './ProductActions'
import { FilterOptions, RangeDatePicker } from './FilterOptions'


const ProductStatistics = ({ selectedProduct }: { selectedProduct: Product }) => {
    const [filterOption, setFilterOption] = useState<string>();
    const [customStartDate, setCustomStartDate] = useState<Date>();
    const [customEndDate, setCustomEndDate] = useState<Date>();

    return (
        <div className="absolute right-12 w-[75%] sm:w-[65%] 2xl:w-[75%] h-5/6 mt-20 flex items-center justify-center  rounded-3xl bg-customBeige ml-5 overflow-hidden">
            <div className='border-2 border-customPink rounded-3xl w-[95%] h-[90%]'>
                <div className='ml-5 mt-8 text-customRed font-bold'>
                    <ShowTags selectedProduct={selectedProduct} />
                    <div className='flex mt-14 sm:mt-0 gap-10 relative'>
                        <h1 className='2xl:text-4xl text-lg'>{selectedProduct.name}</h1>
                        <ProductActions selectedProduct={selectedProduct} />
                    </div>
                    <p className="mt-1 2xl:text-lg text-xs">{selectedProduct?.description}</p>
                </div>
                <LineChartStatistics
                    product={selectedProduct}
                    filterOption={filterOption}
                    customStartDate={customStartDate}
                    customEndDate={customEndDate}
                />
                <div className='relative w-full 2xl:ml-3 ml-2 mb-10 flex justify-start items-start 2xl:gap-7 gap-4 '>
                    <FilterOptions setFilterOption={setFilterOption} />
                    <RangeDatePicker
                        filterOption={filterOption}
                        customStartDate={customStartDate}
                        customEndDate={customEndDate}
                        setCustomStartDate={setCustomStartDate}
                        setCustomEndDate={setCustomEndDate}
                    />
                    <ProductImage selectedProduct={selectedProduct} />
                    <ProductPieChart selectedProduct={selectedProduct} />
                </div>
            </div>
        </div>
    )
}





const ShowTags = ({ selectedProduct }: { selectedProduct: Product }) => {

    return (
        <div className='flex gap-3 my-3'>
            {selectedProduct.productCategories.map((category, index) => (
                <div key={index}>
                    <Tag title={category} customComponents='bg-customRed' />
                </div>
            ))}
        </div>
    )
}


export default ProductStatistics;