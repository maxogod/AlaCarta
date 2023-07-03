import { Request, Response } from "express";
import {
    deleteRestaurantService,
    getRestaurantByUrl,
} from "../services/restaurant";

const getRestaurantController = async (req: Request, res: Response) => {
    const { restaurantUrl } = req.session;
    const restaurant = await getRestaurantByUrl(restaurantUrl as string);
    if (!restaurant) return res.status(404).send("Restaurant not found");
    return res.status(200).send(restaurant);
};

const deleteRestaurantController = async (req: Request, res: Response) => {
    const { restaurantUrl } = req.session;
    try {
        const result = await deleteRestaurantService(restaurantUrl as string);
        if (
            !result ||
            (result &&
                (!result.restaurantDeleteResult.acknowledged ||
                    !result.menuDeleteResult.acknowledged ||
                    !result.productsDeleteResult.acknowledged))
        )
            return res.status(400).send(result || "Error deleting restaurant");
        return res.status(200).send(result);
    } catch (err) {
        return res.status(500).send("Error deleting product");
    }
};

export { getRestaurantController, deleteRestaurantController };
