import { Product } from "./product";

interface UserCategoryType {
    restaurant: string;
    categoryEnum: number;
}

interface UserType {
    _id: string;
    name: string;
    email: string;
    userCategories: UserCategoryType[];
    password?: string;
    createdAt: Date;
    updatedAt: Date;
}

interface RestaurantType {
    _id: string;
    name: string;
    productCategories: string[];
    urlSuffix: string;
    paymentInfo: string;
    employees: UserType[];
    orders: string[];
    menu?: MenuType | undefined;
    createdAt: Date;
    updatedAt: Date;
}

interface MenuType {
    _id: string;
    products: string[];
    banner: string;
    color: string;
    restaurant: string;
    createdAt: Date;
    updatedAt: Date;
}

interface OrderType {
    _id: string;
    products: Product[];
    table: string;
    statusEnum: number;
    price: number;
    restaurant: number;
    createdAt: Date;
    updatedAt: Date;
}

export type { UserType, RestaurantType, OrderType };
