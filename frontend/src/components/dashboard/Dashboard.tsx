import { useEffect, useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { NavBar } from './Header';
import { Blurhash } from 'react-blurhash';


interface category {
    title: string
}


interface product {
    name: string
    price: number
    sales: number
    description: string
    img: string
    categories: category[]
    isAvailable: boolean
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

    const categories: category[] = [
        { title: "vegano" },
        { title: "picante" },
        { title: "empanada" },
        { title: "sin tacc" }
    ]

    const dummyProducts: product[] = [
        { name: "empanadas de jamon y queso reeeeeeeeeeee largaaaaaaaaa", price: 500, sales: 850, description: "empanadas de jamon y queso, riqui riqui", img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg", categories: categories, isAvailable: true },
        { name: "pizza de muzza", price: 1600, sales: 48, description: "piza de muza, muy rica bro aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg", categories: [], isAvailable: true },
        { name: "hamburgesa con queso", price: 2500, sales: 55, description: "paty con queso bro", img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg", categories: [], isAvailable: true },
        { name: "fideos con solo tuco", price: 1500, sales: 5, description: "fideos con SOLO TUCO >:(", img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg", categories: [], isAvailable: true },
        { name: "agua", price: 100, sales: 99, description: "aguita refrescante :D", img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg", categories: [], isAvailable: true },
        { name: "empanadas de jamon y queso", price: 500, sales: 850, description: "empanadas de jamon y queso, riqui riqui", img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg", categories: [], isAvailable: true },
        { name: "pizza de muzza", price: 1600, sales: 48, description: "piza de muza, muy rica bro", img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg", categories: [], isAvailable: true },
        { name: "hamburgesa con queso", price: 2500, sales: 55, description: "paty con queso bro", img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg", categories: [], isAvailable: true },
        { name: "fideos con solo tuco", price: 1500, sales: 5, description: "fideos con SOLO TUCO >:(", img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg", categories: [], isAvailable: true },
        { name: "agua", price: 100, sales: 99, description: "aguita refrescante :D", img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg", categories: [], isAvailable: true }
    ]


    return (
        <>
            <BackgroundImage src={src} imageLoader={imageLoader} />
            <div className="fixed inset-0 scale-100">
                <NavBar />
                <ProductCatalog productList={dummyProducts} handleProductClick={handleProductClick} />
                <ProductStatistics selectedProduct={selectedProduct} />
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



const ProductCatalog = ({ productList, handleProductClick }: { productList: product[],  handleProductClick: (product: product) => void  }) => {

    const [selectedProduct, setSelectedProduct] = useState<product | null>(null);

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
                    <img src={product.img} alt='' className='w-16 h-24 object-cover rounded-lg' />
                    <div className='flex-col ml-2 mt-3 text-sm'>
                        <h1 className='font-bold'>
                            {product.name.length > 25 ? product.name.substring(0, 25) + '...' : product.name}
                        </h1>
                        <hr className="bg-customPink h-1 w-48 rounded-lg" />
                        <h1 className='font-bold mt-1'>Precio: ${product.price}</h1>
                        <div className='flex justify-normal gap-2 w-52  overflow-x-scroll'>
                            {displayedCategories.map((category, index) => (
                                <div key={index}>
                                    <CategoryTag category={category} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

const CategoryTag = ({ category }: { category: category }) => {

    return (
        <div className='h-5 w-full pl-2 pr-2 rounded-xl text-center mt-1 bg-customRed text-white font-bold'>
            {category.title}

        </div>
    )

}

const ProductStatistics = ({ selectedProduct }: { selectedProduct: product | null }) => {
    return (
        <div className=' absolute mt-20 right-80 rounded-3xl h-[85vh] w-[120vh] bg-customBeige ml-5'>
            <div>
                {selectedProduct?.name}
                {selectedProduct?.description}
                {selectedProduct?.price}
            </div>
        </div>
    )
}

export default Dashboard;