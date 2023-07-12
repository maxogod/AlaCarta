import { useState } from 'react'
import { RestaurantType } from '../../@types/stateTypes';
import { FilterOptions, RangeDatePicker } from './FilterOptions';
import RestaurantActions from './RestaurantActions';
import { RestaurantPieChart } from './PieChartStatistics';
import LineChartStatistics from './LineChartStatistics';


const RestaurantStatistics = ({ restaurant }: { restaurant: RestaurantType | null }) => {
    const [filterOption, setFilterOption] = useState<string>();
    const [customStartDate, setCustomStartDate] = useState<Date>();
    const [customEndDate, setCustomEndDate] = useState<Date>();

    return (
        <div className="absolute w-[75%] ml-8 right-12 sm:w-[65%] 2xl:w-[75%] h-5/6 mt-20 flex items-center justify-center  rounded-3xl bg-customBeige sm:ml-5 overflow-hidden">
            <div className='border-2 border-customPink rounded-3xl w-[95%] h-[90%]'>
                <div className='ml-5 mt-8 text-customRed font-bold'>
                    <div className='flex gap-10 relative'>
                        <h1 className='2xl:text-4xl mt-10 sm:mt-0 text-lg'>{restaurant?.name}</h1>
                        <RestaurantActions />
                    </div>
                </div>
                <LineChartStatistics
                    product={undefined}
                    filterOption={filterOption}
                    customStartDate={customStartDate}
                    customEndDate={customEndDate}
                />
                <div className=' w-full 2xl:ml-3 ml-2  flex justify-start items-start 2xl:gap-7 gap-4 '>
                    <FilterOptions setFilterOption={setFilterOption} />
                    <RangeDatePicker
                        filterOption={filterOption}
                        customStartDate={customStartDate}
                        customEndDate={customEndDate}
                        setCustomStartDate={setCustomStartDate}
                        setCustomEndDate={setCustomEndDate}
                    />
                    <RestaurantPieChart />
                </div>
            </div>
        </div>
    )

}

export default RestaurantStatistics;