import { useEffect, useState } from 'react'
import { NavBar } from '../NavBar'
import { Blurhash } from 'react-blurhash'
import { dummyProducts } from './MockData'
import { Product } from '../models/product'
import ProductCatalog from './ProductCatalog'
import ProductStatistics from './ProductStatistics'
import RestaurantStatistics from './RestaurantStatistics'

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

    const handleProductClick = (product: Product | null) => {
        setSelectedProduct(product);
    }


    return (
        <>
            <BackgroundImage src={src} imageLoader={imageLoader} />
            <div className="fixed inset-0 scale-100">
                <NavBar />
                <ProductCatalog productList={dummyProducts} handleProductClick={handleProductClick} />
                <div className='relative w-full h-full'>
                    {selectedProduct ? (
                        <ProductStatistics selectedProduct={selectedProduct} />
                    ) : (
                        <RestaurantStatistics allProducts={dummyProducts} />
                    )}
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


export default Dashboard;