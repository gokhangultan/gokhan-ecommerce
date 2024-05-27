export const GlobalAction = {
    setAddCard: "ADD_TO_CART",
    setRemoveCard: "REMOVE_FROM_CART",
    setPaymentInfo: "SET_PAYMENT_INFO",
    setRemoveAllCard: "REMOVE_ALL_FROM_CART", 
    setAddressInfo: "SET_ADDRESS_INFO",
    //increase ve decrease count ayrı action yemiyor idleri aynı oldugu icin iki aksiyonda artırmayı yapıyor. 
    //Alternatif cözümü bu sekilde.
    setChangeCount: "INCREASE_COUNT"
}
const initialState = {
    cart: [],
    payment: [],
    address: []
};




export const shoppingCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GlobalAction.setAddCard:
            const existingIndex = state.cart.findIndex(item => item.product.id === action.payload.id);
            if (existingIndex !== -1) {
                const updatedCart = [...state.cart];
                updatedCart[existingIndex] = {
                    ...updatedCart[existingIndex],
                    count: updatedCart[existingIndex].count + 1
                };
                return {
                    ...state,
                    cart: updatedCart
                };
            } else {
                return {
                    ...state,
                    cart: [...state.cart, { count: 1, checked: true, product: action.payload }]
                };
            }
        case GlobalAction.setRemoveCard:
            return {
                ...state,
                cart: state.cart.filter(item => item.product.id !== action.payload)
            };
            case GlobalAction.setRemoveAllCard:
                return {
                    ...state,
                    cart: []
                };
        case GlobalAction.setChangeCount:
            const { productId, change } = action.payload;
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.product.id === productId
                        ? { ...item, count: item.count + change }
                        : item
                )
            };

        case GlobalAction.setPaymentInfo:
            // Ödeme bilgilerini güncelleme
            return {
                ...state,
                payment: [...state.payment, action.payload]
            };
            case GlobalAction.setAddressInfo:
                // Adres bilgilerini güncelleme
                return {
                    ...state,
                    address: [...state.address, action.payload]
                };
        default:
            return state;
    }
};
