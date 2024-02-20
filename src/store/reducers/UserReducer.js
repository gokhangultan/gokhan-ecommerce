export const GlobalAction = {
    setUser: "SET_USER"
}

const initialState = {
    user: {
        userName: "",
        userPassword: "",
        userEmail: "",
        userRole: ""
    }
}


export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GlobalAction.setUser:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
};
