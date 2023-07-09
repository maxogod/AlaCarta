import { useGetRestaurant } from "../../hooks/restaurantHook";
import LoadingScreen from "../shared/LoadingScreen";
import { NavBar } from "../shared/NavBar";
import Banner from "./Banner";
import Categories from "./CategoryBar";
import OrderCart from "./OrderCart";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";


const Menu = () => {

    const [isRestaurantLoaded, setIsRestaurantLoaded] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<string>("")
    const [kPopular, setKPopular] = useState<number>(10000)
    const { restaurant, isLoading } = useGetRestaurant()

    useEffect(() => {
        if (!isLoading) {
            setIsRestaurantLoaded(true)
        }
    }, [isLoading])

    const handleSelectCategory = (category: string) => {
        setSelectedCategory(category)
    }

    const handleKPopular = (k: number) => {
        setKPopular(k)
    }

    return (
        <>
            <NavBar />
            {
                isRestaurantLoaded ?
                    <div className="fixed inset-0 flex py-5" style={{ background: restaurant!.menu?.color }}>
                        <Categories
                            deploy={true}
                            categories={restaurant!.productCategories}
                            handleCategoryClick={handleSelectCategory}
                            handleKPopular={handleKPopular} />
                        <div className="flex flex-col px-5">
                            <Banner />
                            <ProductList category={selectedCategory} kPopular={kPopular} />
                        </div>
                        <OrderCart />
                    </div>
                    :
                    <LoadingScreen />
            }
        </>
    );
}


export default Menu;