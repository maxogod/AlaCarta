import { useEffect, useState } from "react";
import { NavBar } from "../shared/NavBar";
import { Category } from "../models/category";
import { Blurhash } from "react-blurhash";
import { useParams } from 'react-router-dom';
import { Product } from "../models/product";
import { dummyProducts } from "../dashboard/MockData";
import Categories from "./CategoryBar";
import { AiOutlineMenu } from "react-icons/ai";


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