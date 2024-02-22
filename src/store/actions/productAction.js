import Axios from 'axios';

const axiosInstance = Axios.create({
    baseURL: "https://workintech-fe-ecommerce.onrender.com"
});

// Thunk 
export const fetchProduct = (/*{ limit = 25, offset = 0 }*/) => async (dispatch) => {
    try {

        const response = await axiosInstance.get("/products", {
            /* params: {
                 limit: limit,
                 offset: offset
             }*/
        });
        dispatch(setProductList(response.data));
    } catch (error) {
        console.error("Ürünlere erişemiyorum.", error);
    }
};

export const setProductList = (products) => ({
    type: 'SET_PRODUCT_LIST',
    payload: products
});
