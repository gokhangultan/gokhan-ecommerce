import Axios from 'axios';

const axiosInstance = Axios.create({
    baseURL: "https://workintech-fe-ecommerce.onrender.com"
});

// Thunk 
export const fetchProduct = () => async (dispatch) => {
    try {

        const response = await axiosInstance.get("/products");
        dispatch(setProductList(response.data));
    } catch (error) {
        console.error("Ürünlere erişemiyorum.", error);
    }
};

export const setProductList = (products) => ({
    type: 'SET_PRODUCT_LIST',
    payload: products
});
