import { Pie, PieChart, Cell } from 'recharts'
import { Product } from '../../@types/product';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChartTag, Tag } from '../shared/Tag';


const ProductPieChart = ({ selectedProduct }: { selectedProduct: Product | undefined }) => {


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

    const mostPopularProds = "Productos Más Populares"

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

    function createSortedData(products: Product[]): { productName: string, totalSales: number }[] {
        const sortedProducts = [...products].sort((a, b) => b.sells - a.sells);
        const topProducts = sortedProducts.slice(0, 3);

        if (products.length <= 3) {
            return topProducts.map(product => ({ productName: product.name, totalSales: product.sells }));
        }

        const restOfProductsSales = sortedProducts.slice(3).reduce((sum, product) => sum + product.sells, 0);

        const result = [
            ...topProducts.map(product => ({ productName: product.name, totalSales: product.sells })),
            { productName: 'restOfProducts', totalSales: restOfProductsSales }
        ];
        return result;
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

    const customComponentsS = ["#F26B3F", '#CE5160', "#5389f5", "#ebb92f"];
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


    const sortedSales = createSortedData(allProducts ? allProducts : [])
    const totalSales = (products: Product[]): number => products.reduce((total, product) => total + product.sells, 0);
    const totalRevenue = (products: Product[]): number => products.reduce((total, product) => total + product.price * product.sells, 0);

    return (
        <div className='flex gap-6'>
            <div className='flex flex-col gap-0.5 2xl:gap-2'>
                <div className='border-2  border-customRed rounded-3xl px-3 2xl:h-52 h-40 2xl:my-3 pb-16'>
                    <h1 className='2xl:text-2xl text-sm mt-3 text-customRed font-bold text-center'>{mostPopularProds}</h1>
                    <div className=' my-2 h-full overflow-scroll'>
                        <MostPopularProducts products={allProducts ? allProducts : []} />
                    </div>
                </div>
                <PieChartTag title={`Ventas Totales - #${totalSales(allProducts ? allProducts : [])}`} index={1} />
                <PieChartTag title={`Ganancia Total - $${totalRevenue(allProducts ? allProducts : [])}`} index={1} />


            </div>
            <PieChart width={chartScale} height={chartScale} >
                <Pie
                    data={sortedSales}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    fill="#8884d8"
                    nameKey={"productName"}
                    dataKey={"totalSales"}>
                    {sortedSales?.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={customComponentsS[index % customComponentsS.length]} />
                    ))}
                </Pie>
            </PieChart>

        </div>
    )
};


const MostPopularProducts = ({ products }: { products: Product[] }) => {
    const sortedProducts = [...products].sort((a, b) => b.sells - a.sells);
    const topProducts = sortedProducts.slice(0, 3);
    const restOfProducts = sortedProducts.slice(3);

    return (
        <div className='flex flex-col  gap-2 '>
            {topProducts.map((product, index) => (
                <PieChartTag title={`${product.name} - ${product.sells}`} index={index} />
            ))}
            {restOfProducts.map((product, _) => (
                <PieChartTag title={`${product.name} - ${product.sells}`} index={3} />
            ))}
        </div>
    );
};




export { RestaurantPieChart, ProductPieChart };