import { BiSolidLeftArrow } from "react-icons/bi";
import { useGetRestaurant } from "../../hooks/restaurantHook";
import LoadingScreen from "../shared/LoadingScreen";
import { NavBar } from "../shared/NavBar";
import Banner from "./Banner";
import Categories from "./CategoryBar";
import OrderCart from "./OrderCart";
import ProductList from "./ProductList";
import EditMenu from "./EditMenu";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";


const Menu = () => {

    const [isRestaurantLoaded, setIsRestaurantLoaded] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<string>("")
    const [kPopular, setKPopular] = useState<number>(10000)
    const { restaurant, isLoading } = useGetRestaurant()
    const [deployCategory, setDeployCategory] = useState<boolean>(window.innerWidth > 720)
    const [deployCart, setDeployCart] = useState<boolean>(window.innerWidth > 720)
    const [deployEdit, setDeployEdit] = useState<boolean>(false)
    const isInMobile = window.innerWidth < 400
    const [menuIsVisible, setMenuIsVisible] = useState<boolean>(true)

    useEffect(() => {
        if (!isLoading) {
            setIsRestaurantLoaded(true)
        }
    }, [isLoading])

    useEffect(() => {
        if (isInMobile && (deployCategory || deployCart)) {
            setMenuIsVisible(false)
        } else {
            setMenuIsVisible(true)
        }
    }, [isInMobile, deployCategory, deployCart])

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
                        {deployEdit && <EditMenu
                            setDeploy={setDeployEdit}
                            currentColor={restaurant!.menu?.color}
                            currentPicture={restaurant!.menu?.banner} />}
                        {
                            !deployCategory && (!isInMobile || (isInMobile && !deployCart)) &&
                            <div className="h-full absolute left-0 mt-3 z-10 flex sm:items-center ml-2">
                                <button
                                    className="text-lg drop-shadow-4xl flex justify-center rotate-180 items-center text-customRed bg-white w-8 h-16 rounded-full"
                                    onClick={() => { setDeployCategory(true) }}>
                                    <BiSolidLeftArrow />
                                </button>
                            </div>
                        }
                        <Categories
                            deploy={deployCategory}
                            setDeploy={setDeployCategory}
                            categories={restaurant!.productCategories}
                            handleCategoryClick={handleSelectCategory}
                            handleKPopular={handleKPopular} />
                        {
                            menuIsVisible &&
                            <div className="flex flex-col px-5">
                                <Banner picture={restaurant!.menu?.banner}>
                                    <button
                                        className="absolute right-2 bottom-4 hover:scale-125 duration-200 text-white shadow-2xl text-4xl"
                                        onClick={() => { setDeployEdit(true) }}>
                                        <FaEdit />
                                    </button>
                                </Banner>
                                <ProductList category={selectedCategory} kPopular={kPopular} />
                            </div>
                        }
                        {
                            !deployCart && (!isInMobile || (isInMobile && !deployCategory)) &&
                            <div className="h-full absolute right-0 mt-3 z-10 flex sm:items-center mr-2">
                                <button
                                    className="text-lg drop-shadow-4xl flex justify-center items-center text-customRed bg-white w-8 h-16 rounded-full"
                                    onClick={() => { setDeployCart(true) }}>
                                    <BiSolidLeftArrow />
                                </button>
                            </div>
                        }
                        <OrderCart
                            deploy={deployCart}
                            setDeploy={setDeployCart} />
                    </div>
                    :
                    <LoadingScreen />
            }
        </>
    );
}


export default Menu;