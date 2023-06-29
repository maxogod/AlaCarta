import { Request, Response } from "express";
import { getRestaurantByUrl } from "../services/restaurant";
import { createMenuService } from "../services/menu";
import { addProductService } from "../services/products";

const createMenuController = async (req: Request, res: Response) => {
    const { banner, color } = req.body;
    const restaurant = await getRestaurantByUrl(
        req.session.restaurantUrl as string
    );
    if (!restaurant) return res.status(404).send("Restaurant not found");
    const menu = await createMenuService({
        banner,
        color,
        restaurant,
    });
    if (!menu) return res.status(400).send("Menu already exists");
    return res.status(200).send(menu);
};

export { createMenuController };
