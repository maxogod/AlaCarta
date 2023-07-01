import { Product } from '../models/product';

const ProductImage = ({ selectedProduct }: { selectedProduct: Product }) => {


    return (
        <div className='ml-4 absolute -right-2 bottom-0 scale-75'>
            <img
                src={selectedProduct.img}
                className="border-4 border-customRed rounded-3xl h-auto max-w-sm  transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
                alt=""
            />
            <div className='absolute bottom-0 bg-customRed font-bold text-white rounded-3xl text-xl w-full text-center'>
                {selectedProduct.name}
            </div>
        </div>
    )
}

export default ProductImage;