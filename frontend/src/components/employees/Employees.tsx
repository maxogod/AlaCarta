import ContentPane from "../shared/ContentPane"
import { useEffect, useState } from "react"
import TitleCard from "../orders/TitleCard"
import { useGetRestaurant } from "../../hooks/restaurantHook"
import EmployeeThumbnail from "./EmployeeThumbnail"
import RegisterEmployee from "./RegisterEmployee"
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { IoRestaurantSharp } from "react-icons/io5"
import { NavBar } from "../shared/NavBar"
import { UserType } from "../../@types/stateTypes"
import { employeeCategoryEnum } from "../../@types/enums"
import { Navigate } from "react-router-dom"


const Employees = ({ user }: { user: UserType }) => {

    const [showAddEmployee, setShowAddEmployee] = useState(false)
    const { restaurant, isLoading } = useGetRestaurant()
    const [isRestaurantLoaded, setIsRestaurantLoaded] = useState(false)
    const [userHasAccess, setUserHasAccess] = useState(false)
    const title = `Empleados de ${restaurant?.name}`

    useEffect(() => {
        if (!isLoading) {
            setIsRestaurantLoaded(true)
            const isEmployee = user.userCategories.find(
                (category) => category.restaurant._id === restaurant!._id
            )
            if (!isEmployee) {
                setUserHasAccess(false)
            } else {
                const hasAccess = isEmployee.categoryEnum <= employeeCategoryEnum.Manager
                setUserHasAccess(hasAccess)
            }
        }
    }, [isLoading])

    const openAddEmployee = () => {
        setShowAddEmployee(true)
    }

    return (

        <>
            <img
                className="blur-lg object-cover object-center h-screen w-screen fixed"
                src={"https://toohotel.com/wp-content/uploads/2022/09/TOO_restaurant_Panoramique_vue_Paris_Seine_Tour_Eiffel_2.jpg"}
                alt=""
            />
            <div className="fixed inset-0 scale-100">
                <NavBar />
                {showAddEmployee &&
                    <div className="flex items-center justify-center absolute top-0 left-0 h-screen w-screen">
                        <RegisterEmployee setShowAddEmployee={setShowAddEmployee} />
                    </div>
                }
                <ContentPane>
                    {
                        isRestaurantLoaded ? (
                            userHasAccess ?
                                <>
                                    <TitleCard title={title} />
                                    <div className="mt-10 flex flex-wrap justify-center gap-3 overflow-x-hidden">
                                        {restaurant?.employees.map((employee) => (
                                            <EmployeeThumbnail key={employee._id} employee={employee} restaurant={restaurant} />
                                        ))}
                                        <div
                                            className="bg-customRed hover:bg-customDarkRed transition-colors cursor-pointer drop-shadow-lg w-40 h-40 p-2 rounded-md sm:text-lg overflow-x-scroll text-sm flex items-center justify-center"
                                            onClick={openAddEmployee}>
                                            <BiSolidMessageSquareAdd className="text-white text-5xl" />
                                        </div>
                                    </div>
                                </>
                                :
                                <Navigate to="/" />
                        )
                            :
                            (
                                <div className='h-screen w-screen fixed inset-0 flex animate-pulse items-center justify-center'>
                                    <IoRestaurantSharp className="text-9xl animate-spin text-customRed" />
                                </div>
                            )
                    }
                </ContentPane>

            </div>
        </>

    )
}

export default Employees