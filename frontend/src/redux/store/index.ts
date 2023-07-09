import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "../slices/currentUserSlice";
import currentRestaurantReducer from "../slices/currentRestaurantSlice";
import cartReducer from "../slices/cartSlice";

const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        currentRestaurant: currentRestaurantReducer,
        cart: cartReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
