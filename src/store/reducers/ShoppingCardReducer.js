export const GlobalAction = {
    setAddCard: "ADD_TO_CART",
    setRemoveCard: "REMOVE_FROM_CART",
    setPaymentInfo: "SET_PAYMENT_INFO",
    setAddressInfo: "SET_ADDRESS_INFO"
}
const initialState = {
    cart: [],
    payment: {},
    address: {}
};

export const shoppingCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: [...state.cart, action.payload]
            };
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter(item => item.product.id !== action.payload)
            };
        case 'SET_PAYMENT_INFO':
            // Ödeme bilgilerini güncelleme
            return {
                ...state,
                payment: action.payload
            };
        case 'SET_ADDRESS_INFO':
            // Adres bilgilerini güncelleme
            return {
                ...state,
                address: action.payload
            };
        default:
            return state;
    }
};
