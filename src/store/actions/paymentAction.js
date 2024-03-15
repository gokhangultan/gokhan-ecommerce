import Axios from 'axios';
import { GlobalAction } from '../reducers/ShoppingCardReducer';

export const axiosInstance = Axios.create({
    baseURL: "https://workintech-fe-ecommerce.onrender.com"
});

// Thunk 
export const fetchPayment = () => async (dispatch, getState) => {
    try {
        const { payment } = getState().shoppingCard;
        if (payment.length > 0) {
            // payment bilgisi varmı kontrol et
            return;
        }
        const response = await axiosInstance.get("/user/card", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });
                dispatch(setPayment(response.data));
    } catch (error) {
        console.error("Ödeme Yöntemlerine erişemiyorum.", error);
    }
};

export const setPayment = (payment) => ({
    type: GlobalAction.setPaymentInfo,
    payload: payment
});
