import Axios from 'axios';

const axiosInstance = Axios.create({
    baseURL: "https://workintech-fe-ecommerce.onrender.com"
});

// Thunk 
export const postLogin = () => async (dispatch) => {
    try {
        const { categoriesIs } = getState().global;
        if (categoriesIs.length > 0) {
            // category varmı kontrol et
            return;
        }
        const response = await axiosInstance.get("/categories");
        dispatch(setCategories(response.data));
    } catch (error) {
        console.error("Kategorilere erişemiyorum.", error);
    }
};

export const setCategories = (categories) => ({
    type: 'SET_CATEGORIES',
    payload: user
});
