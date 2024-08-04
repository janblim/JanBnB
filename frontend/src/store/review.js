import { csrfFetch } from "./csrf";

const GETSPOTREVIEWS = 'reviews/getReviews'

const getSpotReviews = (data) => {
    return {
        type: GETSPOTREVIEWS,
        payload: data
    }
}

export const getSpotReviewsThunk = (id) => async (dispatch) => {
    try{
        const res = await csrfFetch(`/api/spots/${id}/reviews`)
        if (res.ok) {
            const data = await res.json() //array of spots
            dispatch(getSpotReviews(data))
        } else {
            throw res //throws to the catch e
        }

    } catch (e) {
        return e;
    }
}

const initialState = {
    reviews: []
}

const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GETSPOTREVIEWS:
            newState = {...state}
            newState.reviews = action.payload.Reviews
            return newState
        default:
            return state;
    }

}

export default reviewsReducer
