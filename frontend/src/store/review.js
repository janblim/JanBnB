import { csrfFetch } from "./csrf";

const GETSPOTREVIEWS = 'reviews/getReviews'
const POSTREVIEW = 'reviews/postReview'

const getSpotReviews = (data) => {
    return {
        type: GETSPOTREVIEWS,
        payload: data
    }
}

const postReview = (data) => {
    return {
        type: POSTREVIEW,
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

export const postReviewThunk = (id, review, rating) => async (dispatch) => {
    try{
        const res = await csrfFetch(`/api/spots/${id}/reviews`, {
            method: 'POST',
            body: JSON.stringify({
                review,
                stars: rating
            })
        })

        if(res.ok){
            const data = await res.json()
            dispatch(postReview(data))
        } else {
            throw res
        }
    }
    catch(e){
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
        case POSTREVIEW:
            newState = {...state}
            newState.reviews.push(action.payload.Reviews)
            return newState
        default:
            return state;
    }

}

export default reviewsReducer
