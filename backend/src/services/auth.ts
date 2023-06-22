import { ObjectId } from "mongodb";
import { hashPassword, comparePassword } from "../utils/hasher";
import { getDefaultProductCategories } from "../utils/defaultValues";
import { employeeCategoryEnum } from "../@types/enums";
import User from "../models/User";
import Restaurant from "../models/Restaurant";

const authenticateUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (user && comparePassword(password, user.password as string)) {
        return user;
    }
    return null;
};

const createUser = async (
    name: string,
    email: string,
    password: string,
    restaurantUrl: string,
    categoryEnum: number
) => {
    const existingUser = await User.findOne({ email });
    const restaurant = await Restaurant.findOne({ urlSuffix: restaurantUrl });

    if (existingUser || !restaurant) return null;

    const hashedPassword = hashPassword(password);
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        userCategories: [
            {
                restaurant: restaurant._id,
                categoryEnum: categoryEnum,
            },
        ],
    });
    await newUser.save();
    restaurant.employees.push(newUser._id);
    await restaurant.save();
    return newUser;
};

const updateUser = async (
    userId: ObjectId,
    newFields: {
        name?: string;
        email?: string;
        password?: string;
        newRestaurant?: ObjectId;
        newCategoryEnum?: number;
    }
) => {
    const user = await User.findById(userId);
    if (!user) return null;

    if (newFields.name) user.name = newFields.name;
    if (newFields.email) user.email = newFields.email;
    if (newFields.password) user.password = hashPassword(newFields.password);
    if (newFields.newRestaurant) {
        user.userCategories.push({
            restaurant: newFields.newRestaurant,
            categoryEnum: newFields.newCategoryEnum,
        });
    }
    user.save();
    return user;
};

const createRestaurant = async (
    name: string,
    urlSuffix: string,
    paymentInfo: string,
    ownerName: string,
    ownerEmail: string,
    ownerPassword: string
) => {
    const existingRestaurant = await Restaurant.findOne({ urlSuffix });
    if (existingRestaurant) return [null, null];

    const defaultProductCategories = await getDefaultProductCategories();

    const newRestaurant = new Restaurant({
        name,
        urlSuffix,
        paymentInfo,
        productCategories: defaultProductCategories,
    });

    let owner = await User.findOne({ email: ownerEmail });
    if (owner) {
        await updateUser(owner._id, {
            newRestaurant: newRestaurant._id,
            newCategoryEnum: employeeCategoryEnum.Owner,
            password: ownerPassword,
        });
        // TODO bug here, password should not be updated every time a User creates a restaurant
    } else {
        owner = await createUser(
            ownerName,
            ownerEmail,
            ownerPassword,
            newRestaurant.urlSuffix,
            employeeCategoryEnum.Owner
        );
    }

    newRestaurant.employees.push(owner!._id);
    await newRestaurant.save();
    return [newRestaurant, owner];
};

export { authenticateUser, updateUser, createUser, createRestaurant };
