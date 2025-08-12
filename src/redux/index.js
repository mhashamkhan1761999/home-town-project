import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import authReducer from './slices/authSlice'
import cartReducer from './slices/cartSlice'

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    authenticate: authReducer,
    cart: cartReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store)