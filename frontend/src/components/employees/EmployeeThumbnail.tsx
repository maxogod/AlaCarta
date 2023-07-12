import { RestaurantType, UserType } from "../../@types/stateTypes"
import { employeeCategoryEnum } from "../../@types/enums"
import { BsFillPersonFill, BsFillPersonLinesFill, BsFillStarFill } from 'react-icons/bs'
import { AiFillMinusCircle, AiFillCaretDown, AiOutlineClose } from 'react-icons/ai'
import { useState } from "react"
import axios from "axios"

const EmployeeThumbnail = ({ employee, restaurant }:
    { employee: UserType, restaurant: RestaurantType }) => {

    const [categoryChangeDropDown, setCategoryChangeDropDown] = useState(false)
    const category = employee.userCategories.find(
        (category) => category.restaurant as unknown as string === restaurant._id
    )
    const icons = [<BsFillStarFill />, <BsFillPersonLinesFill />, <BsFillPersonFill />]
    const categories = ['Owner', 'Manager', 'Employee']

    const openChangeCategory = () => {
        setCategoryChangeDropDown(!categoryChangeDropDown)
    }

    const handleCategoryChange = (newCategory: string) => {
        const catEnum = categories.indexOf(newCategory)
        const changeCategoryFetch = async () => {
            try {
                await axios.put(`${import.meta.env.VITE_API_URL}/api/${restaurant.urlSuffix}/employees/${employee._id}`,
                    { categoryEnum: catEnum },
                    { withCredentials: true })
                window.location.reload()
            } catch (error) {
                console.log(error)
            }
        }
        changeCategoryFetch()
        setCategoryChangeDropDown(false)
    }

    const handleDeleteEmployee = () => {
        const deleteEmployeeFetch = async () => {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/${restaurant.urlSuffix}/employees/${employee._id}`,
                    { withCredentials: true })
                window.location.reload()
            } catch (error) {
                console.log(error)
            }
        }
        deleteEmployeeFetch()
    }

    return (
        <div className="bg-slate-100 drop-shadow-lg w-40 h-40 p-2 rounded-md sm:text-lg overflow-x-scroll text-sm flex flex-col relative">
            <div className="absolute top-0 right-0 m-2 text-customDarkRed">
                <button onClick={handleDeleteEmployee}><AiFillMinusCircle /></button>
            </div>
            {icons[category!.categoryEnum]}
            <small className="text-customDarkRed">{employee.name ? employee.name : 'Sin Registrar Aun'}</small>
            <small className="text-customDarkRed opacity-80">{employee.email}</small>
            <small className="text-slate-700 opacity-30 cursor-pointer" onClick={openChangeCategory}>
                {employeeCategoryEnum[category!.categoryEnum]}
                <AiFillCaretDown className="inline-block" />
            </small>
            {categoryChangeDropDown && (
                <div className="absolute top-0 left-0 w-full h-full bg-slate-100 bg-opacity-80 flex flex-col justify-center items-center">
                    <div className="flex flex-col gap-2 w-full">
                        {categories.map((category, index) => (
                            <button key={index}
                                onClick={() => { handleCategoryChange(category) }}
                                className="text-customDarkRed border w-full">
                                {category}
                            </button>
                        ))}
                    </div>
                    <button onClick={openChangeCategory} className="text-customDarkRed mt-3">
                        <AiOutlineClose />
                    </button>
                </div>
            )}
        </div>
    )
}

export default EmployeeThumbnail