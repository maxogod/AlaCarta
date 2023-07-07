import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setCurrentProduct } from '../../../redux/slices/currentRestaurantSlice';
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";
import { RootState } from '../../../redux/store';
import { SetCategories } from '../productActions/SetCategories';

const EditRestaurant = ({ openEdit, setOpenEdit }: { openEdit: boolean, setOpenEdit: (open: boolean) => void }) => {

    const { restaurantUrl } = useParams()
    const dispatch = useDispatch();

    const restaurant = useSelector((state: RootState) => state.currentRestaurant.restaurant)

    const name = "Nombre"
    const urlSuffix = "Url del restaurante"
    const paymentInfo = "CBU"
    const saveChanges = "Guardar Cambios"

    const [restaurantInfo, setRestaurantInfo] = useState({
        name: "",
        urlSuffix: "",
        paymentInfo: ""
    })
    const [categories, setCategories] = useState<string[] | undefined>(restaurant?.productCategories);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setRestaurantInfo({ ...restaurantInfo, [e.target.name]: e.target.value })
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        (async () => {
            try {
                const endpoint = `http://localhost:8080/api/${restaurantUrl}`
                const res = await axios.put(
                    endpoint,
                    {
                        name: restaurantInfo.name,
                        uelSuffix: restaurantInfo.urlSuffix,
                        paymentInfo: restaurantInfo.paymentInfo,
                        productCategories: categories,
                    },
                    {
                        withCredentials: true,
                    }
                );
                if (res.status !== 200) return
                const editedProduct = res.data;
                console.log("prod info:");
                console.log(restaurantInfo);
                dispatch(setCurrentProduct(editedProduct))
                setOpenEdit(false);
                window.location.reload()
            } catch (err) {
                return
            }
        })()
    };

    return (
        <>
            <div className={openEdit ? 'bg-black bg-opacity-25 fixed inset-0 z-10' : 'hidden'}></div>
            <div className={`${openEdit ? 'visible z-20' : 'h-0 w-0'} fixed pop-in-out inset-0  flex items-center justify-center transition-all`}>
                {openEdit && <>
                    <div className='bg-customBeige  2xl:w-1/2 w-11/12 p-5 rounded-3xl'>
                        <div className="m-5 border-2 border-customPink rounded-3xl">
                            <div className='relative flex'>
                                <div className='mt-8 mx-8 2xl:text-2xl text-lg'>
                                    {restaurant?.name}
                                    <hr className="mt-1 border-2 rounded-full border-customPink" />
                                    <AiFillCloseCircle className='absolute top-6  right-5 cursor-pointer h-12 w-12 hover:scale-125 transition-all' onClick={() => setOpenEdit(false)} />
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} className='my-3 mx-8'>
                                <div className='  w-full'>
                                    <div className='flex gap-5'>
                                        <div>
                                            <label htmlFor="name" className="block text-lg text-customRed font-bold  2xl:text-2xl  ">{name}</label>
                                            <input
                                                onChange={handleChange}
                                                type="text"
                                                id="name"
                                                name="name"
                                                placeholder={restaurant?.name}
                                                className="border-2 text-lg border-customPink rounded-lg px-4 py-2 w-full" />
                                        </div>
                                        <div>
                                            <label htmlFor="urlSuffix" className="block text-lg text-customRed font-bold  2xl:text-2xl">{urlSuffix}</label>
                                            <input
                                                onChange={handleChange}
                                                type="text"
                                                id="urlSuffix"
                                                name="urlSuffix"
                                                placeholder={restaurant?.urlSuffix}
                                                className="border-2 border-customPink rounded-lg text-lg px-4 py-2 w-full" />
                                        </div>
                                    </div>
                                    <div className='md:flex gap-6 mt-3 '>
                                        <div className='mt-2'>
                                            <label htmlFor="paymentInfo" className="block text-lg text-customRed font-bold mr-1  2xl:text-2xl">{paymentInfo}</label>
                                            <input
                                                onChange={handleChange}
                                                type="text"
                                                id="paymentInfo"
                                                name="paymentInfo"
                                                placeholder={restaurant?.paymentInfo}
                                                className="border-2 border-customPink rounded-lg text-lg px-4 py-2 w-full" />
                                        </div>
                                    </div>

                                    <div className='flex gap-14 items-center'>
                                        <button type="submit" className="bg-customRed text-white rounded-lg mt-5 px-4 h-10 text-lg py-2 font-bold hover:bg-customDarkRed transition-all">{saveChanges}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </>}
            </div>
        </>

    )
}

export default EditRestaurant;