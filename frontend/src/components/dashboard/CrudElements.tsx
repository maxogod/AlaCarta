import { useEffect, useState } from 'react'
import { RiDeleteBin7Line } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BiSolidAddToQueue } from 'react-icons/bi'
import { BiSolidMessageSquareAdd } from 'react-icons/bi';
import { Product } from '../../@types/product';
import { EditTag, Tag } from './Tag';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setCurrentProduct } from '../../redux/slices/currentRestaurantSlice';


const EditDeleteSection = ({ selectedProduct }: { selectedProduct: Product }) => {

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const icons = [
        { icon: <FaEdit className="2xl:w-11 2xl:h-11 w-8 h-8" />, action: () => setOpenEdit(true) },
        { icon: <RiDeleteBin7Line className="2xl:w-11 2xl:h-11 w-8 h-8" />, action: () => setOpenDelete(true) }
    ]

    return (
        <>
            <div className='absolute right-5 -top-12 flex gap-5'>
                {icons.map((comp, index) => (
                    <div
                        key={index}
                        className='hover:scale-150 transition-all cursor-pointer'
                        onClick={comp.action}>
                        {comp.icon}
                    </div>
                ))}
            </div>
            <EditPopUp openEdit={openEdit} setOpenEdit={setOpenEdit} selectedProduct={selectedProduct} />
            <DeletePopUp openDelete={openDelete} setOpenDelete={setOpenDelete} selectedProduct={selectedProduct} />
        </>
    )
}

const AddProducts = () => {

    const [isOpen, setIsOpen] = useState(false);


    return (
        <>
            <div className='absolute right-5 -top-3 flex gap-5 hover:scale-150 transition-all cursor-pointer' onClick={() => setIsOpen(true)}>
                <BiSolidMessageSquareAdd className="2xl:w-11 2xl:h-11 w-8 h-8" />
            </div>
            <AddPopUp openAdd={isOpen} setOpenAdd={setIsOpen} />
        </>
    )
}


const AddPopUp = ({ openAdd, setOpenAdd }: { openAdd: boolean, setOpenAdd: (open: boolean) => void }) => {

    const title = "¡Agregando un producto nuevo!"
    const name = "Nombre"
    const description = "Descripcion"
    const price = "Precio"
    const addImage = "Agregar Imagen"
    const saveChanges = "Guardar Cambios"
    const namePlaceHolder = "Igrese aqui el nombre del producto"
    const descriptionPlaceHolder = "Ingrese una descripcion"
    const pricePlaceHolder = "$1.000"
    const addImagePlaceHolder = "Ingrese la URL de una Imagen"

    const [productInfo, setproductInfo] = useState({
        name: "",
        description: "",
        price: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setproductInfo({ ...productInfo, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("New product:");
        setOpenAdd(false);
    };


    return (
        <>
            <div className={openAdd ? 'bg-black bg-opacity-25 fixed inset-0 z-10' : 'hidden'}></div>
            <div className={`${openAdd ? 'visible z-20' : 'h-0 w-0'} fixed pop-in-out inset-0  flex items-center justify-center transition-all`}>
                {openAdd && <>
                    <div className='bg-customBeige  2xl:w-3/4 w-11/12 p-5 rounded-3xl'>
                        <div className="m-5 border-2 border-customPink rounded-3xl">
                            <div className='relative flex'>
                                <div className='mt-8 mx-8 2xl:text-2xl text-lg'>
                                    {title}
                                    <hr className="mt-1 border-2 rounded-full border-customPink" />
                                    <AiFillCloseCircle className='absolute top-6  right-5 cursor-pointer h-12 w-12 hover:scale-125 transition-all' onClick={() => setOpenAdd(false)} />
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} className='my-3 mx-8'>
                                <div className='mt-4  w-full'>
                                    <div>
                                        <label htmlFor="name" className="block text-lg text-customRed font-bold  2xl:text-2xl  ">{name}</label>
                                        <input
                                            required
                                            onChange={handleChange}
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder={namePlaceHolder}
                                            className="border-2 text-lg border-customPink rounded-lg px-4 py-2 w-5/6" />
                                    </div>
                                    <div className='mt-2'>
                                        <label htmlFor="description" className="block text-lg text-customRed font-bold  2xl:text-2xl">{description}</label>
                                        <textarea
                                            required
                                            id="description"
                                            name="description"
                                            placeholder={descriptionPlaceHolder}
                                            className="border-2 border-customPink rounded-lg text-lg px-4 py-2 w-5/6 h-32 resize-none" />
                                    </div>
                                    <div className='md:flex gap-6 mt-3 '>
                                        <div className='mt-2'>
                                            <label htmlFor="price" className="block text-lg text-customRed font-bold mr-1  2xl:text-2xl">{price}</label>
                                            <input
                                                required
                                                type="number"
                                                id="price"
                                                name="price"
                                                placeholder={pricePlaceHolder}
                                                className="border-2 border-customPink rounded-lg text-sm px-4 py-2 w-28" />
                                        </div>
                                        <div className='mt-2'>
                                            <label htmlFor="name" className="block text-lg text-customRed font-bold  2xl:text-2xl  ">{addImage}</label>
                                            <input
                                                required
                                                onChange={handleChange}
                                                type="text"
                                                id="name"
                                                name="name"
                                                placeholder={addImagePlaceHolder}
                                                className="border-2  border-customPink rounded-lg px-4 py-2 text-sm w-80" />
                                        </div>
                                        <AddCategories />
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
    );
};


const EditPopUp = ({ openEdit, setOpenEdit, selectedProduct }: { openEdit: boolean, setOpenEdit: (open: boolean) => void, selectedProduct: Product }) => {

    const { restaurantUrl } = useParams()
    const dispatch = useDispatch();

    const name = "Nombre"
    const description = "Descripcion"
    const price = "Precio"
    const saveChanges = "Guardar Cambios"
    const changeImage = "Cambiar Imagen"
    const inStock = "En Stock"

    const [productInfo, setproductInfo] = useState({
        name: "",
        picture: "",
        description: "",
        price: "",
        isAvailable: selectedProduct.isAvailable,
    })
    const [currentCategories, setCurrentCategories] = useState<string[]>(selectedProduct.productCategories)
    const [isAvailable, setIsAvailable] = useState(selectedProduct.isAvailable)

    useEffect(() => {
        if (!openEdit) {
            setCurrentCategories(selectedProduct.productCategories)
            setIsAvailable(selectedProduct.isAvailable)
        }
    }, [openEdit]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> ) => {
        setproductInfo({ ...productInfo, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        (async () => {
            try {
                const endpoint = `http://localhost:8080/api/${restaurantUrl}/products/${selectedProduct._id}`
                console.log(endpoint);

                const res = await axios.put(
                    endpoint,
                    {
                        name: productInfo.name,
                        picture: productInfo.picture,
                        price: parseInt(productInfo.price),
                        description: productInfo.description,
                        productCategories: currentCategories,
                        isAvailable: productInfo.isAvailable,
                    },
                    {
                        withCredentials: true,
                    }
                );
                if (res.status !== 200) return
                const editedProduct = res.data;
                console.log("prod info:");
                console.log(productInfo);
                dispatch(setCurrentProduct(editedProduct))
                setOpenEdit(false);
                window.location.reload()
            } catch (err) {
                return
            }
        })()
    };

    const handleChangeAvailability = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsAvailable(e.target.checked);
    };




    return (
        <>
            <div className={openEdit ? 'bg-black bg-opacity-25 fixed inset-0 z-10' : 'hidden'}></div>
            <div className={`${openEdit ? 'visible z-20' : 'h-0 w-0'} fixed pop-in-out inset-0  flex items-center justify-center transition-all`}>
                {openEdit && <>
                    <div className='bg-customBeige  2xl:w-3/4 w-11/12 p-5 rounded-3xl'>
                        <div className="m-5 border-2 border-customPink rounded-3xl">
                            <div className='relative flex'>
                                <div className='mt-8 mx-8 2xl:text-2xl text-lg'>
                                    {selectedProduct.name}
                                    <hr className="mt-1 border-2 rounded-full border-customPink" />
                                    <AiFillCloseCircle className='absolute top-6  right-5 cursor-pointer h-12 w-12 hover:scale-125 transition-all' onClick={() => setOpenEdit(false)} />
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} className='my-3 mx-8'>
                                <div className='mt-4  w-full'>
                                    <div>
                                        <label htmlFor="name" className="block text-lg text-customRed font-bold  2xl:text-2xl  ">{name}</label>
                                        <input
                                            onChange={handleChange}
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder={selectedProduct.name}
                                            className="border-2 text-lg border-customPink rounded-lg px-4 py-2 w-5/6" />
                                    </div>
                                    <div className='mt-2'>
                                        <label htmlFor="description" className="block text-lg text-customRed font-bold  2xl:text-2xl">{description}</label>
                                        <textarea
                                            onChange={handleChange}
                                            id="description"
                                            name="description"
                                            placeholder={selectedProduct.description}
                                            className="border-2 border-customPink rounded-lg text-lg px-4 py-2 w-5/6 h-32 resize-none" />
                                    </div>
                                    <div className='md:flex gap-6 mt-3 '>
                                        <div className='mt-2'>
                                            <label htmlFor="price" className="block text-lg text-customRed font-bold mr-1  2xl:text-2xl">{price}</label>
                                            <input
                                                onChange={handleChange}
                                                type="number"
                                                id="price"
                                                name="price"
                                                placeholder={`${selectedProduct.price}`}
                                                className="border-2 border-customPink rounded-lg text-sm px-4 py-2 w-28" />
                                        </div>
                                        <div className='mt-2'>
                                            <label htmlFor="name" className="block text-lg text-customRed font-bold  2xl:text-2xl  ">{changeImage}</label>
                                            <input
                                                onChange={handleChange}
                                                type="text"
                                                id="picture"
                                                name="picture"
                                                placeholder={selectedProduct.picture}
                                                className="border-2 text-sm border-customPink rounded-lg px-4 py-2 w-11/12" />
                                        </div>
                                        <EditCategories selectedCategories={currentCategories} setSelectedCategories={setCurrentCategories} />
                                    </div>
                                    <div className='flex gap-14 items-center'>
                                        <button type="submit" className="bg-customRed text-white rounded-lg mt-5 px-4 h-10 text-lg py-2 font-bold hover:bg-customDarkRed transition-all">{saveChanges}</button>
                                        <div className='flex gap-3 mt-5'>
                                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"><Tag title={inStock} customComponents='bg-customDarkRed scale-125' /></span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" value="" className="sr-only peer" checked={isAvailable} onChange={handleChangeAvailability} />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-customPink dark:peer-focus:ring-customOrange rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-customRed"></div>
                                            </label>
                                        </div>
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

const DeletePopUp = ({ openDelete, setOpenDelete, selectedProduct }: { openDelete: boolean; setOpenDelete: (open: boolean) => void, selectedProduct: Product }) => {

    const warningText = "¿Está seguro que desea eliminar este producto?"
    const remove = "Eliminar"
    const close = "Cerrar"

    return (
        <>
            <div className={openDelete ? 'bg-black bg-opacity-25 fixed inset-0 z-10' : 'hidden'}></div>
            <div className={`${openDelete ? 'visible z-10' : 'h-0 w-0'} fixed pop-in-out z-10 inset-0  flex items-center justify-center transition-all`}>
                {openDelete &&
                    <div className='bg-customBeige 2xl:w-fit rounded-3xl '>
                        <div className="mx-6 my-9 border-2 border-customPink rounded-3xl">
                            <h2 className='mt-8 mx-3 text-center text-2xl text-customRed font-semibold mb-2'>{warningText}</h2>
                            <div className='flex justify-center items-center gap-3 my-4'>
                                <button className=' w-fit h-fit  px-4 py-2 bg-customRed hover:bg-customDarkRed transition-all text-white rounded-3xl cursor-pointer' onClick={() => setOpenDelete(false)}>{remove}</button>
                                <button className='  w-fit h-fit px-4 py-2 bg-customRed hover:bg-customDarkRed transition-all text-white rounded-3xl cursor-pointer' onClick={() => setOpenDelete(false)}>{close}</button>
                            </div>
                        </div>
                    </div>}
            </div>
        </>
    )
}

const AddCategories = () => {

    const [selectedCategories, setSelectedCategories] = useState<string[]>([])

    return (
        <div className="relative">
            <div className="flex flex-col justify-center items-center gap-1 w-fit py-2 transition-all">
                <div className=''>
                    <AddCategoriesDropDown selectedCategories={selectedCategories} />
                </div>
                <div className='flex gap-2'>
                    {selectedCategories.map((category, index) => (
                        <div key={index}>
                            <EditTag title={category} customComponents='bg-customRed' />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const EditCategories = ({ selectedCategories, setSelectedCategories }: { selectedCategories: string[], setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>> }) => {

    const removeFromCategories = ({ category }: { category: string }) => {
        const updatedCategories = selectedCategories.filter((cat) => cat !== category);
        setSelectedCategories(updatedCategories);
    }

    return (
        <div className="relative">
            <div className="flex flex-col justify-center items-center gap-1 w-fit py-2 transition-all">
                <div className=''>
                    <AddCategoriesDropDown selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
                </div>
                <div className='flex gap-2'>
                    {selectedCategories.map((category, index) => (
                        <div key={index}>
                            <EditTag title={category} customComponents='bg-customRed' onCancelClick={() => removeFromCategories({ category })} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const AddCategoriesDropDown = ({ selectedCategories, setSelectedCategories }: { selectedCategories: string[], setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>> }) => {

    const addCategories = "Agregar Categorias"

    const maxCategories = selectedCategories.length >= 3

    const [isOpen, setIsOpen] = useState(false);

    const allCategories = useSelector((state: RootState) => state.currentRestaurant.restaurant)?.productCategories

    const addToCategories = ({ category }: { category: string }) => {
        if (!selectedCategories.includes(category)) {
            const updatedCategories = [...selectedCategories, category];
            setSelectedCategories(updatedCategories);
            setIsOpen(false)

            return
        }
    }

    return (
        <>
            <button className={`
            ${maxCategories ? 'bg-gray-400 pointer-events-none' : 'bg-customDarkRed hover:scale-125 transition-all'}
            w-fit 
            h-fit 
            py-1 
            px-2 
            cursor-pointer 
            hover:scale-125 transition-all
            rounded-full 
            flex justify-center text-center gap-1 
            text-white text-lg font-bold`}
                onClick={() => setIsOpen((prev) => (!prev))}
                type='button'
            >
                {addCategories}
                <div className='mt-1'>
                    <BiSolidAddToQueue />
                </div>
            </button>
            <div className='relative'>
                {isOpen && <div className='overflow-y-auto scroll-m-1 z-10 absolute my-1 w-full h-28 bg-customRed bg-opacity-80 mt-2 rounded-3xl font-bold text-white text-lg transition-all'>
                    <div className='flex flex-col text-center items-center justify-center'>
                        {allCategories?.map((category, index) => (
                            <div className='my-1 mx-3 hover:bg-customDarkRed rounded-3xl w-10/12 transition-all cursor-pointer' key={index}>
                                <div onClick={() => addToCategories({ category })}>{category}</div>
                            </div>
                        ))}

                    </div>
                </div>}
            </div>
        </>
    )
}

export { EditDeleteSection, AddProducts };