import { Pie, PieChart, Cell } from 'recharts'
import { Product } from '../../@types/product';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductPieChart = ({ selectedProduct }: { selectedProduct: Product | undefined }) => {


    const { restaurantUrl } = useParams()

    const [allProducts, setAllProducts] = useState<Product[] | null>(null);
    const [chartScale, setChartScale] = useState<number>((window.innerWidth))

    const fetchProducts = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/${restaurantUrl}/products`,
                {
                    withCredentials: true,
                }
            );
            if (res.status === 404) return
            setAllProducts(res.data)
        } catch (err) {
            return
        }
    };
    fetchProducts()


    function allSales(): number {
        let totalSells = 0;
        if (allProducts) for (const product of allProducts) {
            totalSells += product.sells;
        }
        return totalSells - (selectedProduct?.sells || 0);
    }

    const handleResize = () => {
        if (window.innerWidth <= 1280) {
            setChartScale(150)
        }
        else if (window.innerWidth <= 1400) {
            setChartScale(200)
        } else {
            setChartScale(300)
        }
    }
    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [])


    const data = [
        {
            name: "restaurante",
            sales: allSales()
        },
        {
            name: selectedProduct?.name,
            sales: selectedProduct?.sells
        }
    ]

    const customComponentsS = ["#F26B3F", '#CE5160'];
    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: { cx: number, cy: number, midAngle: number, innerRadius: number, outerRadius: number, percent: number }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className='font-bold text-sm 2xl:text-lg'>
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <PieChart width={chartScale} height={chartScale} >
            <Pie
                data={data}
                labelLine={false}
                label={renderCustomizedLabel}
                fill="#8884d8"
                nameKey={"name"}
                dataKey={"sales"}>
                {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={customComponentsS[index % customComponentsS.length]} />
                ))}
            </Pie>
        </PieChart>
    )
}

const RestaurantPieChart = () => {

    const { restaurantUrl } = useParams()

    const [allProducts, setAllProducts] = useState<Product[] | null>(null);
    const [chartScale, setChartScale] = useState<number>((window.innerWidth))

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8080/api/${restaurantUrl}/products`,
                    {
                        withCredentials: true,
                    }
                );
                if (res.status === 404) return
                setAllProducts(res.data)
            } catch (err) {
                return
            }
        };
        fetchProducts()
    }, []);

    console.log(allProducts);

    const handleResize = () => {
        if (window.innerWidth <= 1280) {
            setChartScale(150)
        }
        else if (window.innerWidth <= 1400) {
            setChartScale(200)
        } else {
            setChartScale(300)
        }
    }
    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [])

    const customComponentsS = ["#F26B3F", '#CE5160'];
    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: { cx: number, cy: number, midAngle: number, innerRadius: number, outerRadius: number, percent: number }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className='font-bold text-sm 2xl:text-lg'>
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className='flex '>
            <PieChart width={chartScale} height={chartScale} >
                <Pie
                    data={allProducts ? allProducts : []}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    fill="#8884d8"
                    nameKey={"name"}
                    dataKey={"sells"}>
                    {allProducts?.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={customComponentsS[index % customComponentsS.length]} />
                    ))}
                </Pie>
            </PieChart>
            <div>
                
            </div>

        </div>
    )
};


export { RestaurantPieChart, ProductPieChart };