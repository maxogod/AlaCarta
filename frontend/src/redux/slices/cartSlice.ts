import { createSlice, PayloadAction, Draft } from "@reduxjs/toolkit";

interface CartState {
    cart: {
        [productId: string]: {
            quantity: number;
            price: number;
            name: string;
        };
    };
}

const initialState: CartState = {
    cart: {},
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (
            state: Draft<CartState>,
            action: PayloadAction<{
                productId: string;
                name: string;
                price: number;
            }>
        ) => {
            const { productId, name, price } = action.payload;
            const currentQuantity = state.cart[productId]?.quantity || 0;
            state.cart[productId] = {
                quantity: currentQuantity + 1,
                name,
                price,
            };
        },
        removeFromCart: (
            state: Draft<CartState>,
            action: PayloadAction<{ productId: string }>
        ) => {
            const { productId } = action.payload;
            const currentQuantity = state.cart[productId]?.quantity || null;
            if (!currentQuantity) return;
            state.cart[productId].quantity = currentQuantity - 1;
            if (state.cart[productId].quantity === 0) {
                delete state.cart[productId];
            }
        },
        cleanCart: (state: Draft<CartState>) => {
            state.cart = {};
        },
    },
});

export const { addToCart, removeFromCart, cleanCart } = cartSlice.actions;
export default cartSlice.reducer;
