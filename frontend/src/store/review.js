import { csrfFetch } from "./csrf";

// CONSTANCE
// npm-module-or-app/reducer-name/ACTION_TYPE, can be anything, but must be unique

const GETREVIEWS = 'review/getreviews'
// Action creators ()

const getSpotReviews = (data) => {
    return {
        type: GETREVIEWS,
        payload: data,
    }
}


// THUNKS


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


//Reducer (updates the state)

const initialState = {
    reviews: {},
}

const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GETREVIEWS:
            newState = {...state}
            for (let review of action.payload.Reviews) {
                newState.reviews[review.id] = review;
            }
            return newState
        default:
            return state;
    }
}

export default reviewsReducer
