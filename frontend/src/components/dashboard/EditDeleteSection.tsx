import { useState } from 'react'
import { RiDeleteBin7Line } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/Ai';
import { BiSolidAddToQueue } from 'react-icons/bi'
import { Product } from '../models/product';
import { EditTag, Tag } from './Tag';

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
                        onClick={comp.action}
                    >
                        {comp.icon}
                    </div>
                ))}
            </div>

            <EditPopUp openEdit={openEdit} setOpenEdit={setOpenEdit} selectedProduct={selectedProduct} />
            <DeletePopUp openDelete={openDelete} setOpenDelete={setOpenDelete} selectedProduct={selectedProduct} />

        </>
    )
}

const EditPopUp = ({ openEdit, setOpenEdit, selectedProduct }: { openEdit: boolean; setOpenEdit: (open: boolean) => void, selectedProduct: Product }) => {

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
        console.log("Edited product:", selectedProduct);
        setOpenEdit(false);
    };




    return (
        <>
            <div className={openEdit ? 'bg-black bg-opacity-25 fixed inset-0 z-10' : 'hidden'}></div>
            <div className={`${openEdit ? 'visible z-20' : '-z-10'} scale-50 fixed pop-in-out z-10 inset-0  flex items-center justify-center transition-all`}>
                <div className='bg-customBeige  2xl:w-2/4 w-10/12 rounded-3xl p-4'>
                    <div className="m-5 border-2 border-customPink rounded-3xl">
                        <div >
                            <div className='relative flex'>
                                <div className='mt-8 mx-8 2xl:text-2xl text-lg'>
                                    {selectedProduct.name}
                                    <hr className="mt-1 border-2 rounded-full border-customPink" />
                                    <AiFillCloseCircle className='absolute top-6  right-5 cursor-pointer h-12 w-12 hover:scale-125 transition-all' onClick={() => setOpenEdit(false)} />
                                </div>
                            </div>
                            <div className='my-3 mx-8'>
                                <form onSubmit={handleSubmit}>
                                    <div className='mt-4  w-full'>
                                        <div>
                                            <label htmlFor="name" className="block text-lg text-customRed font-bold  2xl:text-2xl  ">Name</label>
                                            <input
                                                onChange={handleChange}
                                                type="text"
                                                id="name"
                                                name="name"
                                                placeholder={selectedProduct.name}
                                                className="border-2 text-lg border-customPink rounded-lg px-4 py-2 w-5/6" />
                                        </div>
                                        <div className='mt-2'>
                                            <label htmlFor="description" className="block text-lg text-customRed font-bold  2xl:text-2xl">Description</label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                placeholder={selectedProduct.description}
                                                className="border-2 border-customPink rounded-lg text-lg px-4 py-2 w-5/6 h-32 resize-none" />
                                        </div>
                                        <div className='md:flex gap-9 mt-3 '>
                                            <div>
                                                <label htmlFor="price" className="block text-lg text-customRed font-bold mr-1  2xl:text-2xl">Price</label>
                                                <input
                                                    type="number"
                                                    id="price"
                                                    name="price"
                                                    placeholder={`${selectedProduct.price}`}
                                                    className="border-2 border-customPink rounded-lg text-lg px-4 py-2 w-28" />
                                            </div>
                                            <ShowCategories selectedProduct={selectedProduct} />
                                        </div>

                                        <div className='flex gap-14 items-center'>
                                            <button type="submit" className="bg-customRed text-white rounded-lg mt-5 px-4 h-10 text-lg py-2 font-bold hover:bg-customDarkRed transition-all">Guardar Cambios</button>
                                            <div className='flex gap-3 mt-5'>
                                                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"><Tag title='En Stock' customComponents='bg-customDarkRed scale-125' /></span>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" value="" className="sr-only peer" />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-customPink dark:peer-focus:ring-customOrange rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-customRed"></div>
                                                </label>
                                            </div>

                                        </div>

                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
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
            <div className={`${openDelete ? 'visible z-10' : '-z-10'} w-full h-full fixed pop-in-out z-10 inset-0  flex items-center justify-center transition-all`}>
                <div className='bg-customBeige 2xl:w-fit rounded-3xl '>
                    <div className="mx-6 my-9 border-2 border-customPink rounded-3xl">
                        <h2 className='mt-8 mx-3 text-center text-2xl text-customRed font-semibold mb-2'>{warningText}</h2>
                        <div className='flex justify-center items-center gap-3 my-4'>
                            <button className=' w-fit h-fit  px-4 py-2 bg-customRed hover:bg-customDarkRed transition-all text-white rounded-3xl cursor-pointer' onClick={() => setOpenDelete(false)}>{remove}</button>
                            <button className='  w-fit h-fit px-4 py-2 bg-customRed hover:bg-customDarkRed transition-all text-white rounded-3xl cursor-pointer' onClick={() => setOpenDelete(false)}>{close}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const ShowCategories = ({ selectedProduct }: { selectedProduct: Product }) => {

    return (
        <div className="relative mt-5">
            <div
                className=" mt-2  rounded-full flex justify-center gap-1 w-fit py-2 transition-all">
                {selectedProduct.categories.map((category, index) => (
                    <div key={index}>
                        <EditTag title={category.title} customComponents='bg-customRed' />
                    </div>
                ))}
                <div className='ml-7'>
                    <AddCategories selectedProduct={selectedProduct} />
                </div>
            </div>
        </div>
    )
}

const AddCategories = ({ selectedProduct }: { selectedProduct: Product }) => {

    const addCategories = "Agregar Categorias"

    const [isOpen, setIsOpen] = useState(false);

    const categories = [
        "snacks", "empanadas", "pizza", "snacks", "empanadas", "pizza", "snacks", "empanadas", "pizza", "snacks", "empanadas", "pizza", "snacks", "empanadas", "pizza", "snacks", "empanadas", "pizza",
    ]


    return (
        <>
            <button className='
            w-fit 
            h-fit 
            py-1 
            px-2 
            cursor-pointer 
            bg-customRed 
            hover:bg-customDarkRed hover:scale-125 transition-all
            rounded-full 
            flex justify-center text-center gap-1 
            text-white text-lg font-bold'
                onClick={() => setIsOpen((prev) => (!prev))}
                type='button'
            >
                {addCategories}
                <div className='mt-1'>
                    <BiSolidAddToQueue />
                </div>
            </button>
            <div className='relative'>
                {isOpen && <div className='overflow-y-auto scroll-m-1 z-10 absolute my-1 w-full h-20 bg-customRed bg-opacity-80 mt-2 rounded-3xl font-bold text-white text-lg transition-all'>
                    <div className='flex flex-col text-center justify-center'>
                        {categories.map((category, index) => (
                            <div className='my-1 mx-3 hover:bg-customDarkRed rounded-3xl transition-all' key={index}>
                                {category}
                            </div>
                        ))}

                    </div>
                </div>}
            </div>

        </>
    )


}

export default EditDeleteSection;