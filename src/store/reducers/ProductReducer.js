export const GlobalAction = {
    SET_PRODUCT_LIST: "SET_PRODUCT_LIST",
    SET_FETCH_STATE: "SET_FETCH_STATE",
    SET_TOTAL_STATE: "SET_TOTAL_STATE"
};

// Fetch durumları
export const FetchState = {
    NOT_FETCHED: "NOT_FETCHED",
    FETCHING: "FETCHING",
    FETCHED: "FETCHED",
    FAILED: "FAILED"
};

const initialState = {
    productList: [],
    totalProductCount: 0,
    pageCount: 0,
    activePage: 1,
    fetchState: FetchState.NOT_FETCHED //baslangıc
};

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GlobalAction.SET_PRODUCT_LIST:
            return {
                ...state,
                productList: action.payload,
                fetchState: FetchState.FETCHED
            };
        case GlobalAction.SET_FETCH_STATE:
            return {
                ...state,
                fetchState: action.payload
            };
        case GlobalAction.SET_TOTAL_STATE:
            return {
                ...state,
                totalProductCount: action.payload
            };
        default:
            return state;
    }
};

// component icerisinde yapılacaklar.
// dispatch(setFetchState(FetchState.FETCHING)); // alınırken fetch durumunu 
// dispatch(setFetchState(FetchState.FAILED)); // hata oluştuğunda fetch durumunu

export const setProductList = (productList) => ({
    type: GlobalAction.SET_PRODUCT_LIST,
    payload: productList
});

export const setFetchState = (fetchState) => ({
    type: GlobalAction.SET_FETCH_STATE,
    payload: fetchState
});