import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { AiFillCaretDown, AiFillHome } from "react-icons/ai"
import { PiChartLineFill } from "react-icons/pi"
import { BiSolidFoodMenu } from 'react-icons/bi';
import { IoRestaurantSharp } from 'react-icons/io5';
import { IoIosPeople } from 'react-icons/io';

const NavBar = () => {


    const { restaurantUrl } = useParams()
    const [isOpen, setIsOpen] = useState(false);
    const sessionUser = useSelector((state: RootState) => state.currentUser.user)

    const home = "Home";
    const dashboard = "Dashboard";
    const menu = "Menú";
    const orders = "Pedidos";
    const employees = "Empleados";

    const itemsNav = [
        { icon: <AiFillHome className={"w-8 h-8"} />, title: home, to: "/" },
        { icon: <PiChartLineFill className={"w-8 h-8"} />, title: dashboard, to: `/${restaurantUrl}/dashboard` },
        { icon: <BiSolidFoodMenu className={"w-8 h-8"} />, title: menu, to: `/${restaurantUrl}` },
        { icon: <IoRestaurantSharp className={"w-8 h-8"} />, title: orders, to: `/${restaurantUrl}/orders` },
        { icon: <IoIosPeople className={"w-8 h-8"} />, title: employees, to: `/${restaurantUrl}/employees` }
    ];

    sessionUser?.userCategories

    return (
        <>
            {sessionUser &&
                <div className='z-50 fixed w-full'>
                    <nav
                        className={`h-14 2xl:h-16  ${isOpen ? '2xl:translate-y-1' : '-translate-y-14 2xl:-translate-y-12'} flex flex-col justify-center items-center  transition-transform duration-300`}>
                        <ul className="flex  gap-8 2xl:gap-14 p-3 mt-5 justify-center items-center 2xl:items-start bg-customRed w-full rounded-b-3xl">
                            {itemsNav.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item.to}
                                        className={`text-white font-bold transition-all"`}>
                                        <div className='2xl:block hidden text-xl'>{item.title}</div>
                                        <div className='2xl:hidden block'>{item.icon}</div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div
                            onClick={() => setIsOpen((prev) => (!prev))}
                            className={`transition-transform w-fit px-24 flex items-center justify-center bg-customDarkRed rounded-b-full cursor-pointer `}>
                            <AiFillCaretDown className={"text-white w-6 h-6 2xl:h-10"} />
                        </div>
                    </nav>
                </div>
            }
        </>

    );
};

export { NavBar };