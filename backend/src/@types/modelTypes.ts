import { Document, Types } from "mongoose";

interface UserType extends Document {
    createdAt: Date;
    updatedAt: Date;
    email: string;
    password: string;
    name: string;
    userCategories: Types.DocumentArray<{
        restaurant: Types.ObjectId;
        categoryEnum: number;
    }>;
}

interface UserCategoriesType extends Document {
    restaurant: Types.ObjectId;
    categoryEnum: number;
}

export { UserType, UserCategoriesType };
