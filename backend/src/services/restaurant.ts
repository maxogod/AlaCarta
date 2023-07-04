import Restaurant from "../models/Restaurant";
import Menu from "../models/Menu";
import Product from "../models/Product";
import User from "../models/User";

const getRestaurantByUrl = async (restaurantUrl: string) => {
    const restaurant = await Restaurant.findOne({ urlSuffix: restaurantUrl });
    if (!restaurant) return null;
    return restaurant;
};

const deleteRestaurantService = async (restaurantUrl: string) => {
    const restaurant = await Restaurant.findOne({ urlSuffix: restaurantUrl });
    if (!restaurant) return null;

    for (const employeeId of restaurant.employees) {
        const employee = await User.findById(employeeId);
        if (!employee) continue;
        employee.userCategories = employee.userCategories.filter(
            (category) =>
                category.restaurant.toString() !== restaurant._id.toString()
        );
        await employee.save();
    }

    const menuDeleteResult = await Menu.deleteOne({
        restaurant: restaurant._id,
    });
    const productsDeleteResult = await Product.deleteMany({
        restaurant: restaurant._id,
    });
    const restaurantDeleteResult = await Restaurant.deleteOne({
        urlSuffix: restaurantUrl,
    });
    return { menuDeleteResult, productsDeleteResult, restaurantDeleteResult };
};

export { getRestaurantByUrl, deleteRestaurantService };
