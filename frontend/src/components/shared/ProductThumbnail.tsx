import { Product } from "../../@types/product";

function ProductThumbnail({ product, handleProductClick }:
    {
        product: Product
        handleProductClick: (product: Product) => void
    }) {

    const priceTitle = "Precio:"

    return (
        <div
            className='bg-white text-sm rounded-lg h-24 w-full hover:scale-105 ease-in-out duration-200 flex cursor-pointer font-bold p-2'
            onClick={() => { handleProductClick(product) }}>
            <img
                src={product.picture}
                alt='Product Image'
                className='w-1/3 h-full object-cover rounded-lg mr-1' />
            <div className="overflow-y-hidden text-ellipsis w-full">
                <h1 className="overflow-ellipsis whitespace-nowrap max-w-[30%]">{product.name}</h1>
                <hr className="bg-customPink h-1" />
                <h1>{priceTitle} ${product.price}</h1>
                <div className='flex gap-1 overflow-x-scroll'>
                    {product.productCategories.map((category, index) => (
                        <small
                            key={index}
                            className="bg-customRed text-white px-1 rounded-lg">
                            {category}
                        </small>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductThumbnail