import { useEffect, useState } from "react";
import { NavBar } from "../dashboard/Header";
import { Category } from "../models/category";
import { Blurhash } from "react-blurhash";
import { useParams } from 'react-router-dom';
import { Product } from "../models/product";
import { dummyProducts } from "../dashboard/MockData";
import { ProductThumbnail } from "../dashboard/Dashboard";
import Categories from "./CategoryBar";
import { AiOutlineMenu } from "react-icons/ai"


const Menu = () => {
    const src = "https://toohotel.com/wp-content/uploads/2022/09/TOO_restaurant_Panoramique_vue_Paris_Seine_Tour_Eiffel_2.jpg";
    const [imageLoader, setImageLoader] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [deployCategories, setDeployCategories] = useState(false);
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

    const handleDeployCategoriesClick = () => {
        setDeployCategories(!deployCategories);
    }

    const handleCategoryClick = (category: Category) => {
        setSelectedCategory(category);
    }

    const handleProductClick = (product: Product) => {
        setSelectedProducts([...selectedProducts, product]);
      };

    return (
        <>
            <BackgroundImage src={src} imageLoader={imageLoader} />
            <div className="fixed inset-0 scale-100">
                <NavBar />
                <Categories deploy={deployCategories} categories={categoryList} handleCategoryClick={handleCategoryClick} />
                <CategoryButton handleDeployCategoriesClick={handleDeployCategoriesClick}/>
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

const CategoryButton = ({ handleDeployCategoriesClick }: { handleDeployCategoriesClick: () => void }) => {
    return(
        <div className="bg-white rounded-3xl w-15 h-15 mt-20">
            <button className="bg-white rounded-3xl flex items-center space-x-2 h-15 w-15" onClick={handleDeployCategoriesClick}>
                <AiOutlineMenu className="transform h-20 w-20"/>
            </button>
        </div>
        
    )
}

export default Menu;