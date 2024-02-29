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
