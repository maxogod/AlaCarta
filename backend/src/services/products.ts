import Restaurant from "../models/Restaurant";
import Product from "../models/Product";
import { RestaurantType } from "../@types/modelTypes";
import Menu from "../models/Menu";

const addProductService = async (props: {
    name: string;
    picture: string;
    description: string;
    productCategories: string[];
    price: number;
    restaurant: RestaurantType;
}) => {
    const { name, picture, description, productCategories, price, restaurant } =
        props;
    const newProduct = new Product({
        name,
        picture,
        description,
        productCategories: productCategories || [],
        price,
        isAvailable: true,
        sells: 0,
        restaurant: restaurant._id,
    });
    await newProduct.save();
    const menu = await Menu.findById(restaurant.menu);
    if (menu) {
        menu.products.push(newProduct._id);
        await menu.save();
    } else {
        return null;
    }
    return newProduct;
};

const getProductsByCategory = async (
    category: string,
    restaurant: RestaurantType
) => {
    if (category) {
        const products = await Product.find({
            restaurant: restaurant._id,
            productCategories: category,
        });
        return products;
    } else {
        const products = await Product.find({
            restaurant: restaurant._id,
        });
        return products;
    }
};

export { addProductService, getProductsByCategory };
