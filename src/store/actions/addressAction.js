import Axios from 'axios';
import { GlobalAction } from '../reducers/ShoppingCardReducer';

const axiosInstance = Axios.create({
    baseURL: "https://workintech-fe-ecommerce.onrender.com"
});

// Thunk 
export const fetchAddress = () => async (dispatch, getState) => {
    try {
        const { address } = getState().shoppingCard;
        if (address.length > 0) {
            // adres varmı kontrol et
            return;
        }
        const response = await axiosInstance.get("/user/address");
        dispatch(setAddress(response.data));
    } catch (error) {
        console.error("Adreslere erişemiyorum.", error);
    }
};

export const setAddress = (address) => ({
    type: GlobalAction.setAddressInfo,
    payload: address
});
