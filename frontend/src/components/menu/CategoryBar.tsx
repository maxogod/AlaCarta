import { AiFillPlusCircle } from "react-icons/ai"
import { BiSolidLeftArrow } from "react-icons/bi"

const Categories = ({ deploy, setDeploy, categories, handleCategoryClick, handleKPopular }:
    {
        deploy: boolean,
        setDeploy: (deploy: boolean) => void,
        categories: string[],
        handleCategoryClick: (category: string) => void
        handleKPopular: (k: number) => void
    }) => {

    return (
        <>
            {
                deploy &&
                <div className={`bg-white bg-opacity-30 drop-shadow-3xl rounded-r-3xl w-96 p-10 h-full flex flex-col items-center`}>
                    <h1 className="text-3xl font-bold text-customRed">Categorías</h1>
                    <hr className="bg-customPink h-1 w-full" />

                    <button
                        className="absolute top-1/2 right-2 text-lg flex justify-center items-center text-customRed bg-white w-8 h-16 rounded-full"
                        onClick={() => { setDeploy(false) }}>
                        <BiSolidLeftArrow />
                    </button>

                    <div className='flex flex-col gap-5 mt-4 items-center overflow-y-scroll overflow-x-hidden w-full h-full'>
                        <CategoryThumbnail
                            key="All"
                            category='All'
                            onClick={() => {
                                handleCategoryClick('')
                                handleKPopular(10000)
                            }} />
                        <CategoryThumbnail
                            key="Popular"
                            category='Popular'
                            onClick={() => {
                                handleKPopular(8)
                                handleCategoryClick('')
                            }} />
                        {categories.map((category, index) => (
                            <CategoryThumbnail
                                key={index}
                                category={category}
                                onClick={() => handleCategoryClick(category)} />
                        ))}
                    </div>
                </div>}
        </>
    )
}

const CategoryThumbnail = ({ category, onClick }: { category: string, onClick: () => void }) => {
    return (
        <div
            onClick={onClick}
            className='bg-customBeige opacity-90 cursor-pointer rounded-lg w-full hover:brightness-[1.07] text-center p-1 drop-shadow-md'>
            <h1 className='font-bold text-center'>
                {category.length > 25 ? category.substring(0, 25) + '...' : category}
                <AiFillPlusCircle className='text-customRed inline-block' />
            </h1>
        </div>
    )
}

export default Categories;