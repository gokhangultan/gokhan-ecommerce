import Axios from 'axios';

const axiosInstance = Axios.create({
    baseURL: "https://workintech-fe-ecommerce.onrender.com"
});

// Thunk 
export const fetchProduct = () => async (dispatch, getState) => {
    try {
        const { products } = getState().products;
        if (productList.length > 0) {
            // category varmı kontrol et
            return;
        }
        const response = await axiosInstance.get("/products");
        dispatch(setProductList(response.data));
    } catch (error) {
        console.error("Ürünlere erişemiyorum.", error);
    }
};

export const setProductList = (productList) => ({
    type: 'SET_PRODUCT_LIST',
    payload: productList
});
