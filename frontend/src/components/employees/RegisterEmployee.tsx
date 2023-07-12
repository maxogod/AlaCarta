import { useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { employeeCategoryEnum } from "../../@types/enums"
import { IoRestaurantSharp } from "react-icons/io5"

const RegisterEmployee = ({ setShowAddEmployee }:
    { setShowAddEmployee: (bool: boolean) => void }) => {

    const [errors, setErrors] = useState("")
    const [employeeInfo, setEmployeeInfo] = useState({
        email: "",
        categoryEnum: employeeCategoryEnum.Employee,
    })
    const { restaurantUrl } = useParams<{ restaurantUrl: string }>()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeeInfo({
            ...employeeInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/register`,
                { ...employeeInfo, restaurantUrl },
                { withCredentials: true })
            setShowAddEmployee(false)
            window.location.reload()
        } catch (error) {
            setErrors("You Aren't Authorized to Register This Type of Staff")
        }
    }

    const closeAddEmployee = () => {
        setShowAddEmployee(false)
    }

    return (
        <div className="z-20 max-h-[90vh] max-w-[95vw] overflow-y-scroll fixed drop-shadow-3xl bg-customBeige p-7 rounded-lg">
            <div onClick={closeAddEmployee} className="flex items-center justify-center rotate-hover cursor-pointer">
                <IoRestaurantSharp className="text-3xl sm:text-6xl text-customRed cross-icon" />
                <h1 className="text-3xl sm:text-6xl text-customRed">AlaCarta</h1>
            </div>
            <hr className="bg-customPink h-1" />
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center justify-center gap-5 mt-4">
                    <h1 className="text-2xl sm:text-4xl">New Staff</h1>
                    <div className="flex flex-col gap-5">
                        <label htmlFor="email">Email</label>
                        <input
                            className="border border-customRed focus:border-customOrange focus:outline-none rounded-xl p-2"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="e.g. alacarta@email.com"
                            required
                            onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-5">
                        <label htmlFor="categoryEnum">Category</label>
                        <select
                            className="border border-customRed focus:border-customOrange focus:outline-none rounded-xl p-2"
                            name="categoryEnum"
                            id="categoryEnum"
                            required
                            onChange={(e) => {
                                setEmployeeInfo({
                                    ...employeeInfo,
                                    categoryEnum: parseInt(e.target.value)
                                })
                            }}>
                            <option value="">Select a category</option>
                            <option value="1">Manager</option>
                            <option value="2">Employee</option>
                        </select>
                    </div>
                    {errors && <p className="text-customRed max-w-[15vw] text-center">{errors}</p>}
                    <button
                        className="bg-customRed border border-customRed rounded-xl p-2 text-white hover:bg-opacity-20 hover:font-bold hover:text-customOrange ease-in-out duration-300"
                        type="submit">Add</button>
                </div>
            </form>
        </div>
    )
}

export default RegisterEmployee