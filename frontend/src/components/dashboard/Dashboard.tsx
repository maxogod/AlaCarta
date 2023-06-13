import { useEffect } from 'react';
import { NavBar } from './Header';

const Dashboard = () => {



    return (
        <>
            <Background />
            <div className="fixed inset-0">
                <NavBar />
                <ProductCatalog />
                <AboutProduct />
            </div>
        </>
    )
}



const Background = () => {
    return (
        <div className=' h-screen w-screen fixed'></div>
    )
}

const ProductCatalog = () => {
    return (
        <div>
            <div className="absolute bg-customBeige rounded-r-3xl  w-96 h-screen  ">
                <div>
                    <div>
                        <div className="flex flex-col items-center justify-center mt-24 ">
                            <h1 className="text-3xl font-bold text-customRed">Catalogo de Productos</h1>
                            <hr className="bg-customPink h-1 w-72 mt-2" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const AboutProduct = () => {
    return (
        <div className='mt-20 bg-customBeige ml-5'>
            <div>
                class
            </div>
        </div>
    )
}

export default Dashboard;