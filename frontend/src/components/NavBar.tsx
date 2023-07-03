import { useState } from 'react';

const NavBar = () => {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };


    const itemsNav = [
        { title: 'RestauranteEpico' },
        { title: 'DashBoard' },
        { title: 'Menú' },
        { title: 'Pedidos' },
        { title: 'Empleados' }
    ]

    return (
        <div  className='z-50 absolute w-full'  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <nav className={`rounded-b-3xl bg-customRed h-16
                ${isHovered ? 'translate-y-0' : '-translate-y-16'} transition-transform duration-300`}>
                <div className="p-5 ">
                    <ul className="flex items-center gap-5">
                        {itemsNav.map((item, index) => (
                            <li key={index} className="mr-6">
                                <div className={`text-white font-bold transition-all "`}>
                                    {item.title}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export { NavBar };