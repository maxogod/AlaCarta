import { Product } from "../../@types/product";
import { Tag } from './Tag'

const ProductThumbnail = ({ product }: { product: Product }) => {

    const priceTitle = "Precio:"
    const productName = product.name
    const productPrice = product.price
    const displayedCategories = product.productCategories.slice(0, 3);


    return (
        <div className='bg-white rounded-lg mt-5 ml-2 h-24 w-11/12 hover:scale-105 ease-in-out duration-200 flex cursor-pointer'>
            <img src={product.picture} alt='' className='w-16 h-24 object-cover rounded-lg' />
            <div className='flex-col ml-2 mt-3 text-sm'>
                <h1 className='font-bold text-ellipsis'>
                    {productName}
                </h1>
                <hr className="bg-customPink h-1 w-48 rounded-lg" />
                <h1 className='font-bold mt-1'>{priceTitle} ${productPrice}</h1>
                <div className='flex justify-normal gap-2 w-52  overflow-x-scroll'>
                    {displayedCategories.map((category, index) => (
                        <div key={index}>
                            <Tag title={category} customComponents={"bg-customRed"} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}

export default ProductThumbnail