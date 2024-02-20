import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import logger from "redux-logger";
import { globalReducer } from "./reducers/GlobalReducer";
import { userReducer } from "./reducers/UserReducer";
import { productReducer } from "./reducers/ProductReducer";
import { storeReducer } from "./reducers/StoreReducer";
import { shoppingCartReducer } from "./reducers/ShoppingCardReducer";
import { thunk } from "redux-thunk";

const reducers = combineReducers({
    global: globalReducer,
    user: userReducer,
    products: productReducer,
    sellerStore: storeReducer,
    shoppingCard: shoppingCartReducer
})


export const store = createStore(
    reducers,
    applyMiddleware(thunk, logger)
);