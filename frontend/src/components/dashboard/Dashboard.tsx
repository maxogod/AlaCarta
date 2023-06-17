import { useEffect, useState } from 'react';
import { NavBar } from './Header';
import { Blurhash } from 'react-blurhash';


interface category {
    categoria: string
}


interface products {
    name: string
    price: number
    sales: number
    description: string
    img: string
    categories: category[]
    isAvailable: boolean

}


const Dashboard = () => {

    const src = "https://toohotel.com/wp-content/uploads/2022/09/TOO_restaurant_Panoramique_vue_Paris_Seine_Tour_Eiffel_2.jpg"
    const [imageLoader, setImageLoader] = useState(false)

    useEffect(() => {
        const img = new Image()
        img.onload = () => {
            setImageLoader(true)
        }
        img.src = src
    }, [src])


    const dummyProducts: products[] = [
        { name: "empanadas de jamon y queso", price: 500, sales: 850, description: "empanadas de jamon y queso, riqui riqui", img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg", categories: [], isAvailable: true },
        { name: "pizza de muzza", price: 1600, sales: 48, description: "piza de muza, muy rica bro", img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg", categories: [], isAvailable: true },
        { name: "hamburgesa con queso", price: 2500, sales: 55, description: "paty con queso bro", img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg", categories: [], isAvailable: true },
        { name: "fideos con solo tuco", price: 1500, sales: 5, description: "fideos con SOLO TUCO >:(", img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg", categories: [], isAvailable: true },
        { name: "agua", price: 100, sales: 99, description: "aguita refrescante :D", img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg", categories: [], isAvailable: true },
        { name: "empanadas de jamon y queso", price: 500, sales: 850, description: "empanadas de jamon y queso, riqui riqui", img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg", categories: [], isAvailable: true },
        { name: "pizza de muzza", price: 1600, sales: 48, description: "piza de muza, muy rica bro", img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg", categories: [], isAvailable: true },
        { name: "hamburgesa con queso", price: 2500, sales: 55, description: "paty con queso bro", img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg", categories: [], isAvailable: true },
        { name: "fideos con solo tuco", price: 1500, sales: 5, description: "fideos con SOLO TUCO >:(", img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg", categories: [], isAvailable: true },
        { name: "agua", price: 100, sales: 99, description: "aguita refrescante :D", img: "https://www.cucinare.tv/wp-content/uploads/2021/09/Empanadas-fritas-o-al-horno.jpg", categories: [], isAvailable: true }
    ]


    return (
        <>
            <BackgroundImage src={src} imageLoader={imageLoader} />
            <div className="fixed inset-0">
                <NavBar />
                <ProductCatalog productList={dummyProducts} />
                <AboutProduct />
            </div>
        </>
    )
}

function BackgroundImage({ src, imageLoader }: { src: string, imageLoader: boolean }) {
    return (
        <>
            {!imageLoader && (
                <Blurhash
                    hash='LYGRuJw^S5R*ysn%ozax4=R*t7n~'
                    resolutionX={32}
                    resolutionY={32}
                    punch={1} />
            )}
            {imageLoader && (
                <img
                    className="blur-lg object-cover object-center h-screen w-screen fixed"
                    src={src}
                    alt=""
                />
            )}
        </>
    )
}



const ProductCatalog = ({ productList }: { productList: products[] }) => {

    return (
        <div>
            <div className="absolute bg-customBeige rounded-r-3xl  w-96 h-screen  ">
                <div>
                    <div>
                        <div className="flex flex-col items-center justify-center mt-24 ">
                            <h1 className="text-3xl font-bold text-customRed">Catalogo de Productos</h1>
                            <hr className="bg-customPink h-1 w-72 mt-2" />

                            <div className=' overflow-y-auto border border- mt-3 w-80 h-[80vh]'>
                                {productList.map((product, index) => (
                                    <div>
                                        <ProductThumbnail product={product} />
                                    </div>
                                ))}


                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ProductThumbnail = ({ product }: { product: products }) => {


    return (
        <div className='bg-white rounded-lg mt-5 h-24 w-72'>
            <div className='flex'>
                <img src={product.img} alt='' className='w-24 h-24 object-cover rounded-lg' />
                <h1>{product.name}</h1>
            </div>
        </div>
    )

}

const AboutProduct = () => {
    return (
        <div className=' absolute mt-20 right-80 rounded-3xl h-[85vh] w-[120vh] bg-customBeige ml-5'>
            <div>

            </div>
        </div>
    )
}

export default Dashboard;