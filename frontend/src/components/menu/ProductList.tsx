import { Product } from "../../@types/product"
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { IoRestaurantSharp } from "react-icons/io5"
import { useDispatch } from "react-redux"
import { addToCart } from "../../redux/slices/cartSlice"

const ProductList = ({ category, kPopular }: { category: string, kPopular: number }) => {

    const [productsLoaded, setProductsLoaded] = useState(false)
    const { restaurantUrl } = useParams<{ restaurantUrl: string }>()
    const [products, setProducts] = useState<Product[] | null>();

    useEffect(() => {
        setProductsLoaded(false)
        const fetchProducts = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8080/api/${restaurantUrl}/products?category=${category}&firstKPopular=${kPopular}`,
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
                        <ProductThumbnailForMenu key={index} product={product} />
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

function ProductThumbnailForMenu({ product }: { product: Product }) {

    const priceTitle = "Precio:"
    const dispatch = useDispatch()

    const handleProductClick = () => {
        dispatch(addToCart({ productId: product._id, name: product.name, price: product.price }))
    }

    return (
        <div
            className='bg-white text-sm rounded-lg h-24 w-full hover:scale-105 ease-in-out duration-200 flex cursor-pointer font-bold p-2'
            onClick={handleProductClick}>
            <img
                src={product.picture}
                alt='Product Image'
                className='w-1/3 h-full object-cover rounded-lg mr-1' />
            <div className="overflow-y-hidden text-ellipsis w-full">
                <h1>{product.name}</h1>
                <hr className="bg-customPink h-1" />
                <h1>{priceTitle} ${product.price}</h1>
                <div className='flex gap-1 overflow-x-scroll'>
                    {product.productCategories.map((category, index) => (
                        <small
                            key={index}
                            className="bg-customRed text-white px-1 rounded-lg">
                            {category}
                        </small>
                    ))}
                </div>
            </div>
        </div>
    )

}

export default ProductList
