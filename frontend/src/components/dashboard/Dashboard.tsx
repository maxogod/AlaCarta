import { useEffect, useState} from 'react';
import { NavBar } from './Header';
import { Blurhash } from 'react-blurhash';
import { dummyProducts } from './MockData';
import { Product } from '../models/product';
import { Category } from '../models/category';

const Dashboard = () => {

    const src = "https://toohotel.com/wp-content/uploads/2022/09/TOO_restaurant_Panoramique_vue_Paris_Seine_Tour_Eiffel_2.jpg"
    const [imageLoader, setImageLoader] = useState(false)

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);


    useEffect(() => {
        const img = new Image()
        img.onload = () => {
            setImageLoader(true)
        }
        img.src = src
    }, [src])

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
    }

    
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



const ProductCatalog = ({ productList, handleProductClick }: { productList: Product[], handleProductClick: (product: Product) => void }) => {

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

const ProductThumbnail = ({ product }: { product: Product }) => {

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

const CategoryTag = ({ category }: { category: Category }) => {

    return (
        <div className='h-5 w-full pl-2 pr-2 rounded-xl text-center mt-1 bg-customRed text-white font-bold'>
            {category.title}
        </div>
    )

}

const ProductStatistics = ({ selectedProduct }: { selectedProduct: Product | null }) => {
    return (
        <div className="flex justify-center absolute mt-20 right-80 rounded-3xl h-[85vh] w-[120vh] bg-customBeige ml-5">
            <div className="w-[95%] h-[95%] mt-5 flex items-center justify-center border-2 border-customPink  rounded-3xl">
                {selectedProduct?.name}
                {selectedProduct?.description}
            </div>
        </div>
    )
}

export default Dashboard;