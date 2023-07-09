import ContentPane from "../shared/ContentPane"
import { useEffect, useState } from "react"
import TitleCard from "../orders/TitleCard"
import { useGetRestaurant } from "../../hooks/restaurantHook"
import EmployeeThumbnail from "./EmployeeThumbnail"
import RegisterEmployee from "./RegisterEmployee"
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { IoRestaurantSharp } from "react-icons/io5"
import { NavBar } from "../shared/NavBar"

const Employees = () => {

    const [showAddEmployee, setShowAddEmployee] = useState(false)
    const { restaurant, isLoading } = useGetRestaurant()
    const [isRestaurantLoaded, setIsRestaurantLoaded] = useState(false)
    const title = `Empleados de ${restaurant?.name}`

    useEffect(() => {
        if (!isLoading) {
            setIsRestaurantLoaded(true)
        }
    }, [isLoading])

    const openAddEmployee = () => {
        setShowAddEmployee(true)
    }

    return (

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

    )
}

export default Employees