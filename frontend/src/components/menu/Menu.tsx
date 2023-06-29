import { useEffect, useState } from "react";
import { NavBar } from "../dashboard/Header";
import { Category } from "../models/category";
import { Blurhash } from "react-blurhash";
import { AiFillPlusCircle } from "react-icons/ai";
import { useParams } from 'react-router-dom';
import { Product } from "../models/product";
import { dummyProducts } from "../dashboard/MockData";


const Menu = () => {
    const src = "https://toohotel.com/wp-content/uploads/2022/09/TOO_restaurant_Panoramique_vue_Paris_Seine_Tour_Eiffel_2.jpg";
    const [imageLoader, setImageLoader] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const { restaurantUrl } = useParams();

    const categoryList: Category[] = [
        {
            id: "1",
            title: "Vegano"
        },
        {
            id: "2",
            title: "Vegetariano"
        },
        {
            id: "3",
            title: "Rico"
        }
    ]

    const productsList: Product[] = dummyProducts;

    useEffect(() => {
        const img = new Image()
        img.onload = () => {
            setImageLoader(true);
        }
        img.src = src
    }, [src]);

    const handleCategoryClick = (category: Category) => {
        setSelectedCategory(category);
    }

    const handleProductClick = (product: Product) => {
        setSelectedProducts([...selectedProducts, product]);
      };

    return (
        <>
            <div className="relative">
                <BackgroundImage src={src} imageLoader={imageLoader} />
                <NavBar />
            </div>

            <div className="flex">
                <Categories categories={categoryList} handleCategoryClick={handleCategoryClick} />
                <Products products={productsList} handleProductClick={handleProductClick} />
                <Cart products={selectedProducts} />
            </div>

        </>
    );
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

const Categories = ({ categories, handleCategoryClick }: { categories: Category[], handleCategoryClick: (category: Category) => void }) => {
    return(
        <>
            <div>
                <div className="absolute bg-customBeige rounded-r-3xl  w-1/6 h-screen  ">
                    <div>
                        <div>
                            <div className="flex flex-col items-center mt-24 ">
                                <h1 className="text-3xl font-bold text-customRed">Categorías</h1>
                                <hr className="bg-customPink h-1 w-72 mt-2" />

                                <div className='flex flex-col items-center overflow-y-auto mt-3 w-80 h-[80vh]'>
                                    {categories.map((category, index) => (
                                        <div key={index} onClick={() => handleCategoryClick(category)}>
                                            <CategoryThumbnail category={category} />
                                        </div>
                                    ))}


                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const CategoryThumbnail = ({ category }: { category: Category }) => {
    return(
        <>
            <div className='bg-white rounded-lg mt-5 w-50 hover:scale-105 ease-in-out duration-200 text-center'>
                <div className='flex flex-col items-center'>
                    <div>
                        <AiFillPlusCircle className='text-customRed' />
                    </div>
                    <h1 className='font-bold text-center'>
                        {category.title.length > 25 ? category.title.substring(0, 25) + '...' : category.title}
                    </h1>
                </div>
            </div>
        </>
    )
}

const Products = ({ products, handleProductClick }: { products: Product[], handleProductClick: (product: Product) => void }) => {
    return(
        <>
            <div className="flex justify-center h-screen">
                <div className="bg-customBeige rounded-3xl w-1/2">
                    <div className="flex items-center justify-center mt-24">
                        <h1 className="text-3xl font-bold text-customRed">Menú</h1>
                        <hr className="bg-customPink h-1 w-72 mt-2" />

                        <div className="overflow-y-auto m-3 w-80 h-[80vh]">
                            {products.map((product, index) => (
                                <div key={index} onClick={() => handleProductClick(product)}>
                                    <ProductThumbnail product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
    
}

const ProductThumbnail = ({ product }: { product: Product }) => {

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
                    </div>
                </div>
            </div>
        </>
    )

}

const Cart = ({ products }: { products: Product[] }) => {
    return(
        <ul>
            <li>
                {products.map((product, index) => (
                    <div key={index}>
                        <ProductThumbnail product={product} />
                    </div>
                ))}
            </li>
        </ul>
    )
}

export default Menu;