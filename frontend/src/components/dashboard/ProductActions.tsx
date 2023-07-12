import { useState } from 'react'
import { Product } from '../../@types/product'
import DeleteProduct from './productActions/DeleteProduct'
import { EditProduct } from './productActions/EditProduct'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin7Line } from 'react-icons/ri'



const ProductActions = ({ selectedProduct }: { selectedProduct: Product }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const icons = [
        { icon: <FaEdit className="2xl:w-11 2xl:h-11 w-8 h-8" />, action: () => setOpenEdit(true) },
        { icon: <RiDeleteBin7Line className="2xl:w-11 2xl:h-11 w-8 h-8" />, action: () => setOpenDelete(true) }
    ];

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
                <EditProduct openEdit={openEdit} setOpenEdit={setOpenEdit} selectedProduct={selectedProduct} />
                <DeleteProduct openDelete={openDelete} setOpenDelete={setOpenDelete} selectedProduct={selectedProduct} />
            </div>
        </>
    );
};



export { ProductActions };