import { useEffect, useState } from 'react'
import { Product } from '../models/product';
import { Record } from '../models/record';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'

const ProductChart = ({ products, filterOption, customStartDate, customEndDate }: { products: Product[], filterOption: string | undefined, customStartDate: Date | undefined, customEndDate: Date | undefined }) => {

    const [chartWidth, setChartWidth] = useState<number>((window.innerWidth * 1300) / 1920)
    const [chartHeight, setChartHeight] = useState<number>((window.innerHeight * 300) / 937)


    useEffect(() => {
        const handleResize = () => {
            setChartWidth((window.innerWidth * 1300) / 1920)
            setChartHeight((window.innerHeight * 300) / 937)
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])


    const formattedSalesData = ({product}:{product: Product}) => {
        const currentSales = filterRecordsByDate({ filterOption, currentProduct: product })
        return currentSales.map((sale) => ({
            purchaseDate: sale.purchaseDate.toISOString().substring(0, 10),
            ventas: sale,
        }))
    }

    const filterRecordsByDate = ({ filterOption, currentProduct }: { filterOption: string | undefined, currentProduct: Product }): Record[] => {
        const today = new Date();
        let startDate = new Date();
        let endDate = new Date();
        switch (filterOption) {
            case "Hoy":
                endDate.setHours(23, 59, 59, 999)
                break;
            case "Esta Semana":
                startDate.setDate(today.getDate() - today.getDay());
                endDate.setDate(today.getDate() - today.getDay() + 6);
                break;
            case "Este Mes":
                startDate = new Date(today.getFullYear(), today.getMonth(), 1);
                startDate.setHours(0, 0, 0, 0)
                endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                endDate.setHours(23, 59, 59, 999)
                break;
            case "Ultimos 6 Meses":
                startDate = new Date(today.getFullYear(), today.getMonth() - 5, 1);
                startDate.setHours(0, 0, 0, 0);
                endDate = new Date(today.getFullYear(), 11, 31);
                endDate.setHours(23, 59, 59, 999);
                break;
            case "Este Año":
                startDate = new Date(today.getFullYear(), 0, 1);
                break;
            case "Personalizado":
                startDate = customStartDate ? customStartDate : new Date();
                endDate = customEndDate ? customEndDate : new Date();
                break;
            default:
                return currentProduct.sales;
        }
        return currentProduct.sales.filter((record: Record) => startDate <= record.purchaseDate && record.purchaseDate <= endDate)
    }

    return (
        <>
            <div className='relative mt-2  flex rounded-3xl  justify-center'>
                <div>
                    <LineChart width={chartWidth} height={chartHeight} data={formattedSalesData({ product: products[0] })} margin={{ top: 10, right: 50, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={"purchaseDate"} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey={"ventas"} stroke="#CE5160" />
                    </LineChart>
                </div>
            </div>
        </>
    )
}

export default ProductChart;