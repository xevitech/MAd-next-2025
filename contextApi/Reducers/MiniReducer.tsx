export const MINI_STATE = {
    reviewdata: {},
    loading: true,
    error: null
};
export const miniReducer = (state, action) => {
    switch (action.type) {
        case "FETCHING_REVIEW":
            return {
                ...state,
                loading: true
            };
        case "FETCHED_REVIEW":
            return {
                ...state,
                loading: false
            };
        case "UPDATE_REVIEW":
            return {
                ...state,
                reviewdata: { ...action.payload }
            };

        default:
            return state;
    }
};