import { Product } from '../models/product';
import { Tag } from './Tag';

const ProductImage = ({ selectedProduct }: { selectedProduct: Product }) => {

    const currentProduct = selectedProduct.name
    const restOfProductsTitle = "Todos Los Productos"

    return (
        
        <div className=' w-full flex flex-col justify-center'>
            <img
                src={selectedProduct.img}
                className="border-2 2xl:border-4 border-customRed rounded-3xl h-fit w-1/3  transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
                alt=""
            />
            <Tag title={currentProduct} customComponents=' ml-1 my-0.5 2xl:my-1 bg-customRed 2xl:text-lg text-xs'/>
            <Tag title={restOfProductsTitle} customComponents=' ml-1 my-0.5 2xl:my-1 bg-customOrange 2xl:text-lg text-xs'/>
            
        </div>
    )
}

export default ProductImage;