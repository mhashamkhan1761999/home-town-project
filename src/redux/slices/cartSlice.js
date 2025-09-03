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
            // Check for existing item with same ID and color combination
            const existingItem = state?.items?.find(item => 
                item.id === newItem.id && item.color === newItem.color
            );
            state.totalQuantity++;
            state.totalPrice += parseInt(newItem.price);

            if (!existingItem) {
                state.items.push({
                    ...newItem,
                    quantity: 1,
                    total: newItem.price,
                    // Ensure color data is properly stored
                    color: newItem.color || '#000000',
                    colorName: newItem.colorName || 'Unknown'
                });
            } else {
                existingItem.quantity++;
                existingItem.total += newItem.price;
            }
        },
        removeFromCart(state, action) {
            const payload = action.payload;
            // Support both old format (just ID) and new format (object with ID and color)
            const itemId = typeof payload === 'object' ? payload.id : payload;
            const itemColor = typeof payload === 'object' ? payload.color : null;
            
            let existingItem;
            if (itemColor) {
                // Find item by both ID and color
                existingItem = state.items.find(item => item.id === itemId && item.color === itemColor);
            } else {
                // Fallback to find by ID only (for backward compatibility)
                existingItem = state.items.find(item => item.id === itemId);
            }
            
            if (!existingItem) return;

            state.totalQuantity--;
            state.totalPrice -= parseInt(existingItem.price);

            if (existingItem.quantity === 1) {
                if (itemColor) {
                    state.items = state.items.filter(item => !(item.id === itemId && item.color === itemColor));
                } else {
                    state.items = state.items.filter(item => item.id !== itemId);
                }
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