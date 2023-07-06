import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RestaurantType } from "../../@types/stateTypes";

const initialState = {
    restaurant: null,
} as { restaurant: RestaurantType | null };

export const currentRestaurantSlice = createSlice({
    name: "currentRestaurant",
    initialState,
    reducers: {
        setCurrentRestaurant: (state, action: PayloadAction<RestaurantType | null>) => {
            state.restaurant = action.payload;
        },
    },
});

export const { setCurrentRestaurant } = currentRestaurantSlice.actions;
export default currentRestaurantSlice.reducer;
