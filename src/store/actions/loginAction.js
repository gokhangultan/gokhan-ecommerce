import Axios from 'axios';

const axiosInstance = Axios.create({
    baseURL: "https://workintech-fe-ecommerce.onrender.com"
});

// Thunk 
export const postLogin = () => async (dispatch) => {
    try {
        const response = await axiosInstance.post("/login");
        dispatch(setUser(response.data));
    } catch (error) {
        console.error("Kayıt oluşturamıyorum.", error);
    }
};

export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user
});
