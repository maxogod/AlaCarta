import { useEffect, useState } from "react";
import { NavBar } from "../shared/NavBar";
import { Blurhash } from "react-blurhash";
import { useParams } from 'react-router-dom';
import Categories from "./CategoryBar";
import { AiOutlineMenu } from "react-icons/ai";


const Menu = () => {

    return (
        <>
            <div className="fixed inset-0 scale-100">

            </div>
        </>
    );
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



const CategoryButton = ({ handleDeployCategoriesClick }: { handleDeployCategoriesClick: () => void }) => {
    return(
        <div className="bg-white rounded-3xl w-15 h-15 mt-20">
            <button className="bg-white rounded-3xl flex items-center space-x-2 h-15 w-15" onClick={handleDeployCategoriesClick}>
                <AiOutlineMenu className="transform h-20 w-20"/>
            </button>
        </div>
        
    )
}

export default Menu;