import { AiFillPlusCircle } from "react-icons/ai"
import { Category } from "../models/category"

const Categories = ({ deploy, categories, handleCategoryClick }: { deploy: boolean, categories: Category[], handleCategoryClick: (category: Category) => void }) => {
    
    return(
        <>
            <div>
                <div className={`absolute bg-customBeige rounded-r-3xl  w-1/6 h-screen 
                    ${deploy ? 'translate-x-0' : '-translate-x-80'} transition-transform duration-300`}>
                    <div>
                        <div>
                            <div className="flex flex-col items-center mt-24 ">
                                <h1 className="text-3xl font-bold text-customRed">Categorías</h1>
                                <hr className="bg-customPink h-1 w-72 mt-2" />

                                <div className='flex flex-col items-center overflow-y-auto mt-3 w-80 h-[80vh]'>
                                    {categories.map((category, index) => (
                                        <div key={index} onClick={() => handleCategoryClick(category)}>
                                            <CategoryThumbnail category={category} />
                                        </div>
                                    ))}


                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const CategoryThumbnail = ({ category }: { category: Category }) => {
    return(
        <>
            <div className='bg-white rounded-lg mt-5 w-52 hover:scale-105 ease-in-out duration-200 text-center'>
                <div className='flex flex-col items-center'>
                    <div>
                        <AiFillPlusCircle className='text-customRed' />
                    </div>
                    <h1 className='font-bold text-center'>
                        {category.title.length > 25 ? category.title.substring(0, 25) + '...' : category.title}
                    </h1>
                </div>
            </div>
        </>
    )
}

export default Categories;