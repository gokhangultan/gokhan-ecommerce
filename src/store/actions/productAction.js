import Axios from 'axios';

const axiosInstance = Axios.create({
    baseURL: "https://workintech-fe-ecommerce.onrender.com"
});

export const fetchProduct = (limit = "50", offset = 0, category = null, filter = null, sort = null) => async (dispatch) => {
    try {
        const response = await axiosInstance.get("/products", {
            params: {
                limit: limit,
                offset: offset,
                category: category,
                filter: filter,
                sort: sort
            }
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
