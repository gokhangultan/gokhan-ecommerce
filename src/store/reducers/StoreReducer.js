export const GlobalAction = {
    setStoreInfo: "SET_STORE_INFO"
}

const initialState = {
    sellerStore: {
        storeName: "",
        storeTax: "",
        storeBank: "",
        storePhone: "",
    }
}

export const storeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GlobalAction.setStoreInfo:
            return {
                ...state,
                sellerStore: action.payload
            };
        default:
            return state;
    }
};
