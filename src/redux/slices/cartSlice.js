import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        totalPrice: 0
    },
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state?.items?.find(item => item.id === newItem.id);
            state.totalQuantity++;
            state.totalPrice += parseInt(newItem.price);

            if (!existingItem) {
                state.items.push({
                    ...newItem,
                    quantity: 1,
                    total: newItem.price
                });
            } else {
                existingItem.quantity++;
                existingItem.total += newItem.price;
            }
        },
        removeFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (!existingItem) return;

            state.totalQuantity--;
            state.totalPrice -= parseInt(existingItem.price);

            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.total -= existingItem.price;
            }
        },
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        }
    }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;