import { useState } from 'react'
import { Product } from '../models/product'
import { Tag } from './Tag'
import { FilterOptions, RangeDatePicker } from './FilterOptions'
import ProductImage from './ProductImage'
import ProductChart from './ProductChart'
import PieChartStatistics from './PieChartStatistics'
import EditDeleteSection from './EditDeleteSection';

const ProductStatistics = ({ selectedProduct }: { selectedProduct: Product }) => {
    const [filterOption, setFilterOption] = useState<string>();
    const [customStartDate, setCustomStartDate] = useState<Date>();
    const [customEndDate, setCustomEndDate] = useState<Date>();

    return (
        <div className="absolute right-12 w-[65%] 2xl:w-[75%] h-5/6 mt-20 flex items-center justify-center  rounded-3xl bg-customBeige ml-5 overflow-hidden">
            <div className='border-2 border-customPink rounded-3xl w-[95%] h-[90%]'>
                <div className='ml-5 mt-8 text-customRed font-bold'>
                    <ShowTags selectedProduct={selectedProduct} />
                    <div className='flex gap-10 relative'>
                        <h1 className='2xl:text-4xl'>{selectedProduct.name}</h1>
                        <EditDeleteSection selectedProduct={selectedProduct} />
                    </div>
                </div>

            </div>

        </div>
    )
}

const OldProductStatistics = ({ selectedProduct }: { selectedProduct: Product }) => {
    const [filterOption, setFilterOption] = useState<string>();
    const [customStartDate, setCustomStartDate] = useState<Date>();
    const [customEndDate, setCustomEndDate] = useState<Date>();

    return (
        <div className="right-1 flex justify-center mt-20 md:right-80 rounded-3xl bg-customBeige ml-5 overflow-hidden">
            <div className="md:w-[95%] m-5 border-2 border-customPink rounded-3xl">
                <div className="relative top-4">
                    <div className="ml-3 text-customRed font-bold">
                        {selectedProduct && <ShowTags selectedProduct={selectedProduct} />}
                        <div className="flex font-bold text-3xl w-fit">
                            {selectedProduct.name}
                            <EditDeleteSection selectedProduct={selectedProduct} />
                            <hr className="bg-customPink h-1 mt-1 rounded-lg" />
                        </div>
                        <p className="mt-2">{selectedProduct?.description}</p>
                    </div>
                </div>
                <div className="mt-12 mb-2 relative">
                    <ProductChart
                        products={[selectedProduct]}
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
                    <PieChartStatistics selectedProduct={selectedProduct} />
                    <ProductImage selectedProduct={selectedProduct} />
                </div>
            </div>
        </div>
    )
}


const ShowTags = ({ selectedProduct }: { selectedProduct: Product }) => {

    return (
        <div className='flex gap-3 my-3'>
            {selectedProduct.categories.map((category, index) => (
                <div key={index}>
                    <Tag title={category.title} customComponents='bg-customRed' />
                </div>
            ))}
        </div>
    )
}


export default ProductStatistics;