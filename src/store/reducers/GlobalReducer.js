export const GlobalActions = {
    setRole: "SET_ROLES",
    setCategories: "SET_CATEGORIES",
    setTheme: "SET_THEME",
    setLanguage: "SET_LANGUAGE"
}

// Initial State
const initialState = {
    roles: [],
    categories: [],
    theme: "",
    language: ""
};

export const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case GlobalActions.setRole:
            return {
                ...state,
                roles: action.payload
            };
        case GlobalActions.setCategories:
            return {
                ...state,
                categories: action.payload
            };
        case GlobalActions.setTheme:
            return {
                ...state,
                theme: action.payload
            };
        case GlobalActions.setLanguage:
            return {
                ...state,
                language: action.payload
            };
        default:
            return state;
    }
};