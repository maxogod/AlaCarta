import { useEffect, useState } from 'react'
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Pie, PieChart, Cell } from 'recharts'
import { FiCircle } from "react-icons/fi";
import { NavBar } from './Header'
import { Blurhash } from 'react-blurhash'
import { dummyProducts } from './MockData'



interface category {
    id: string
    title: string
}

interface record {
    id: string
    purchaseDate: Date
    amountOfSales: number
}

interface product {
    id: string
    name: string
    price: number
    description: string
    img: string[]
    categories: category[]
    isAvailable: boolean
    sales: record[]
}


const Dashboard = () => {

    const src = "https://toohotel.com/wp-content/uploads/2022/09/TOO_restaurant_Panoramique_vue_Paris_Seine_Tour_Eiffel_2.jpg"
    const [imageLoader, setImageLoader] = useState(false)

    const [selectedProduct, setSelectedProduct] = useState<product | null>(null);


    useEffect(() => {
        const img = new Image()
        img.onload = () => {
            setImageLoader(true)
        }
        img.src = src
    }, [src])

    const handleProductClick = (product: product) => {
        setSelectedProduct(product);
    }


    return (
        <>
            <BackgroundImage src={src} imageLoader={imageLoader} />
            <div className="fixed inset-0 scale-100">
                <NavBar />
                <div className='flex gap-96'>
                    <ProductCatalog productList={dummyProducts} handleProductClick={handleProductClick} />
                    <ProductStatistics selectedProduct={selectedProduct} />
                </div>
            </div>
        </>
    )
}


function BackgroundImage({ src, imageLoader }: { src: string, imageLoader: boolean }) {
    return (
        <>
            {!imageLoader && (
                <Blurhash
                    hash='LYGRuJw^S5R*ysn%ozax4=R*t7n~'
                    resolutionX={32}
                    resolutionY={32}
                    punch={1} />
            )}
            {imageLoader && (
                <img
                    className="blur-lg object-cover object-center h-screen w-screen fixed"
                    src={src}
                    alt=""
                />
            )}
        </>
    )
}


const ProductCatalog = ({ productList, handleProductClick }: { productList: product[], handleProductClick: (product: product) => void }) => {

    return (
        <div>
            <div className="absolute bg-customBeige rounded-r-3xl  w-96 h-screen  ">
                <div>
                    <div>
                        <div className="flex flex-col items-center justify-center mt-24 ">
                            <h1 className="text-3xl font-bold text-customRed">Catálogo de Productos</h1>
                            <hr className="bg-customPink h-1 w-72 mt-2" />

                            <div className=' overflow-y-auto mt-3 w-80 h-[80vh]'>
                                {productList.map((product, index) => (
                                    <div key={index} onClick={() => handleProductClick(product)}>
                                        <ProductThumbnail product={product} />
                                    </div>
                                ))}


                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const ProductThumbnail = ({ product }: { product: product }) => {

    const displayedCategories = product.categories.slice(0, 3);


    return (
        <>
            <div className='bg-white rounded-lg mt-5 h-24 w-72 hover:scale-105 ease-in-out duration-200'>
                <div className='flex'>
                    <img src={product.img[0]} alt='' className='w-16 h-24 object-cover rounded-lg' />
                    <div className='flex-col ml-2 mt-3 text-sm'>
                        <h1 className='font-bold'>
                            {product.name.length > 25 ? product.name.substring(0, 25) + '...' : product.name}
                        </h1>
                        <hr className="bg-customPink h-1 w-48 rounded-lg" />
                        <h1 className='font-bold mt-1'>Precio: ${product.price}</h1>
                        <div className='flex justify-normal gap-2 w-52  overflow-x-scroll'>
                            {displayedCategories.map((category, index) => (
                                <div key={index}>
                                    <Tag title={category.title} customComponents={"bg-customRed"} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


const Tag = ({ title, customComponents }: { title: string, customComponents: string }) => {

    return (
        <div className={`pb-0  w-fit pl-2 pr-2 pt-0.5 rounded-xl text-center ${customComponents} text-white font-bold`}>
            {title}
        </div>
    )
}


const ShowTags = ({ selectedProduct }: { selectedProduct: product }) => {

    return (
        <div className='flex gap-3 mb-1'>
            {selectedProduct.categories.map((category, index) => (
                <Tag title={category.title} customComponents='bg-customRed' />
            ))}
        </div>
    )
}


const ProductStatistics = ({ selectedProduct }: { selectedProduct: product | null }) => {

    return (
        <div className="right-1 flex justify-center mt-20 md:right-80 rounded-3xl bg-customBeige ml-5">
            <div className=" md:w-[95%] m-5 border-2 border-customPink rounded-3xl">
                <div className="relative top-14">
                    <div className="ml-3 text-customRed font-bold">
                        {selectedProduct && <ShowTags selectedProduct={selectedProduct} />}
                        <div className="font-bold text-3xl w-fit">
                            {selectedProduct?.name}
                            <hr className="bg-customPink h-1 mt-1 rounded-lg" />
                        </div>
                        <p>{selectedProduct?.description}</p>
                    </div>
                    <div>
                        {selectedProduct &&
                            <>
                                <ProductChart selectedProduct={selectedProduct} />
                                <div className="h-96">
                                    <FilterOptions />
                                    {selectedProduct && <PieChartStatistics selectedProduct={selectedProduct} />}
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}


const FilterOptions = () => {

    const filterOptions = [
        "Un Día", "Una Semana", "Un Mes", "6 Meses", "Un Año", "Personalizado"
    ]

    return (
        <div className='ml-10 mt-1 flex justify-start gap-8'>
            {filterOptions.map((option, index) => (
                <div key={index} className='cursor-pointer hover:scale-125 transition-all'>
                    <div>
                        <Tag title={option} customComponents={"bg-customDarkRed"} />
                    </div>
                </div>
            ))}
        </div>
    )
}


const ProductChart = ({ selectedProduct }: { selectedProduct: product }) => {

    const xAxisValue = "purchaseDate"
    const yAxisValue = "amountOfSales"

    const [chartWidth, setChartWidth] = useState<number>((window.innerWidth * 1300) / 1920);
    const [chartHeight, setChartHeight] = useState<number>((window.innerHeight * 300) / 937);


    useEffect(() => {
        const handleResize = () => {
            setChartWidth((window.innerWidth * 1300) / 1920);
            setChartHeight((window.innerHeight * 300) / 937);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const formattedSalesData = selectedProduct.sales.map((sale) => ({
        purchaseDate: sale.purchaseDate.toISOString().substring(0, 10),
        amountOfSales: sale.amountOfSales,
    }));

    return (
        <>
            <div className='relative mt-2  flex rounded-3xl  justify-center'>
                <div>
                    <LineChart width={chartWidth} height={chartHeight} data={formattedSalesData} margin={{ top: 10, right: 50, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={xAxisValue} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey={yAxisValue} stroke="#CE5160" />
                    </LineChart>
                </div>
            </div>
        </>
    )
}


const PieChartStatistics = ({ selectedProduct }: { selectedProduct: product }) => {

    const amountOfSales = selectedProduct.sales.length;
    const amountOfSalesOfAllProducts = dummyProducts.reduce((total, product) => total + product.sales.length, 0) - amountOfSales;
    const data = [{ value: amountOfSales }, { value: amountOfSalesOfAllProducts },];

    const customComponentsS = ['#CE5160', '#edb553'];
    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: { cx: number, cy: number, midAngle: number, innerRadius: number, outerRadius: number, percent: number }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className='font-bold'>
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className='flex  justify-start '>
            <div>
                <PieChart width={315} height={315}>
                    <Pie
                        data={data}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        fill="#8884d8"
                        dataKey="value">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={customComponentsS[index % customComponentsS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </div>
            <div className=' flex flex-col mt-12 -ml-4'>
                <div className='mb-3'>
                    <Tag title={selectedProduct.name} customComponents={"bg-customRed"} />
                </div>
                <div >
                    <Tag title={'Todos los Prodcutos'} customComponents={"bg-customYellow"} />
                </div>
            </div>
        </div>

    )
}





export default Dashboard;