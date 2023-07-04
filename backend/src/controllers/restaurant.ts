import { Request, Response } from "express";
import {
    deleteRestaurantService,
    getRestaurantByUrl,
    updateRestaurantService,
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

const updateRestaurantController = async (req: Request, res: Response) => {
    const { restaurantUrl } = req.session;
    if (!restaurantUrl) return res.status(400).send("Not in a restaurant");
    const { name, urlSuffix, paymentInfo } = req.body;
    if (!name && !urlSuffix && !paymentInfo) {
        return res.status(400).send("No data to update");
    }

    const restaurant = await updateRestaurantService(
        restaurantUrl,
        name,
        urlSuffix,
        paymentInfo
    );
    if (!restaurant) return res.status(400).send("Error updating restaurant");
    return res.status(200).send(restaurant);
};

export {
    getRestaurantController,
    deleteRestaurantController,
    updateRestaurantController,
};
