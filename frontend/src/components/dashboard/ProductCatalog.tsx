import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import axios from 'axios'
import { setCurrentProduct } from '../../redux/slices/currentRestaurantSlice'
import { Product } from '../../@types/product'
import ProductThumbnail from '../shared/ProductThumbnail'
import { IoRestaurantSharp } from 'react-icons/io5'


const ProductCatalog = () => {

    const dispatch = useDispatch();

    const catalogTitle = "Catálogo de Productos"

    const [filterBy, setfilterBy] = useState("");

    const [products, setProducts] = useState<Product[] | null>();
    const [productsLoaded, setProductsLoaded] = useState(false)

    const { restaurantUrl } = useParams()


    useEffect(() => {
        setProductsLoaded(false)
        const fetchProducts = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/${restaurantUrl}/products?category=${filterBy}`,
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
    }, [filterBy]);

    const handleProductClick = (product: Product | null) => {
        dispatch(setCurrentProduct(product))
    }


    return (
        <div className="z-10  absolute bg-customBeige rounded-r-3xl w-80 2xl:w-96 h-screen flex flex-col items-center justify-center">

            <h1 className="text-2xl 2xl:text-3xl font-bold text-customRed mt-12">{catalogTitle}</h1>
            <hr className="bg-customPink h-1 w-56 2xl:w-72 my-2" />
            <div className='w-64 2xl:w-80'>
                <ShowProducts filterState={[filterBy, setfilterBy]} handleProductClick={handleProductClick} />
                {
                    productsLoaded ?
                        <div className='overflow-y-auto 2xl:h-[44rem] h-[25rem] overflow-x-hidden flex flex-col gap-3 p-4'>
                            {products?.map((product, index) => (
                                <ProductThumbnail
                                    key={index}
                                    product={product}
                                    handleProductClick={handleProductClick} />
                            ))}
                        </div>
                        :
                        <div className='flex animate-pulse 2xl:h-[44rem] h-[25rem] items-center justify-center'>
                            <IoRestaurantSharp className="text-9xl animate-spin text-customRed" />
                        </div>
                }
            </div>
        </div>
    )
}


const ShowProducts = ({ filterState, handleProductClick }: { filterState: [string, React.Dispatch<React.SetStateAction<string>>], handleProductClick: (product: Product | null) => void }) => {

    const categories = useSelector((state: RootState) => state.currentRestaurant.restaurant)?.productCategories

    const [filterBy, setfilterBy] = filterState;

    const [isOpen, setIsOpen] = useState(false);

    const allProductos = "Mostrar todos los productos"


    const showAllProdcuts = () => {
        setfilterBy("")
        handleProductClick(null)
        setIsOpen(false)
    }

    return (
        <div className=" my-0.5 relative">
            <button onClick={() => setIsOpen((prev) => (!prev))}
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="text-white bg-customRed hover:bg-customDarkRed  font-bold text-xl rounded-full flex justify-center py-1 w-full text-center transition-all"
                type="button">
                {filterBy ? filterBy : 'Buscar por categoria'}
            </button>

            {isOpen && <div className='overflow-y-auto absolute z-10 my-1 w-full h-44 bg-customRed opacity-95 mt-2 rounded-3xl font-bold text-white text-lg transition-all'>
                <div className='flex flex-col text-center justify-center'>
                    <div onClick={() => showAllProdcuts()} className='my-2 mx-3 hover:bg-customDarkRed rounded-3xl transition-all'>
                        {allProductos}
                    </div>
                    <hr className="bg-white h-1  ml-3 mr-1 rounded-xl" />

                    {categories?.map((category, index) => (
                        <div
                            className='my-1 mx-3 hover:bg-customDarkRed rounded-3xl transition-all'
                            key={index}
                            onClick={() => { setfilterBy(category); setIsOpen((prev) => (!prev)) }}>
                            {category}
                        </div>
                    ))}
                </div>
            </div>}
        </div>
    )
}

export default ProductCatalog;