import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { Product } from "../../@types/product"
import axios from "axios"
import { IoRestaurantSharp } from "react-icons/io5"
import { addToCart } from "../../redux/slices/cartSlice"
import ProductThumbnail from "../shared/ProductThumbnail"

const ProductList = ({ category, kPopular }: { category: string, kPopular: number }) => {

    const [productsLoaded, setProductsLoaded] = useState(false)
    const { restaurantUrl } = useParams<{ restaurantUrl: string }>()
    const [products, setProducts] = useState<Product[] | null>();

    const dispatch = useDispatch()
    const handleProductClick = (product: Product) => {
        dispatch(addToCart({ productId: product._id, name: product.name, price: product.price }))
    }

    useEffect(() => {
        setProductsLoaded(false)
        const fetchProducts = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/${restaurantUrl}/products?category=${category}&firstKPopular=${kPopular}`,
                    {
                        withCredentials: true,
                    }
                );
                if (res.status === 404) return
                setProducts(res.data)
                setProductsLoaded(true)
            } catch (err) {
                return
            }
        };
        fetchProducts()
    }, [category, kPopular, restaurantUrl]);

    return (
        <div className="bg-white bg-opacity-50 rounded-b-3xl drop-shadow-3xl w-full overflow-y-scroll overflow-x-hidden h-full p-5">
            <h1 className="text-xl text-white">{category ? category : (kPopular > 100 ? 'All' : 'Popular')}</h1>
            <hr className="bg-white h-1" />

            {productsLoaded ?
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 mt-3">
                    {products!.map((product, index) => (
                        <ProductThumbnail
                            key={index}
                            product={product}
                            handleProductClick={handleProductClick} />
                    ))}
                </div>
                :
                <div className='flex animate-pulse items-center justify-center h-full'>
                    <IoRestaurantSharp className="text-9xl animate-spin text-white" />
                </div>
            }
        </div>
    )
}

export default ProductList
