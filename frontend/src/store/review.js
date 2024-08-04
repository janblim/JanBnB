import { csrfFetch } from "./csrf";

const GETSPOTREVIEWS = 'reviews/getReviews'
const POSTREVIEW = 'reviews/postReview'
const DELETEREVIEW = 'reviews/delete'

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

const deleteReview = (id) => {
    return {
        type: DELETEREVIEW,
        payload: id
    }
}

//Thunks

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

export const postReviewThunk = (id, review, rating, user) => async (dispatch) => {
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
            data.User = user
            dispatch(postReview(data))
        } else {
            throw res
        }
    }
    catch(e){
        return e;
    }
}

export const deleteReviewThunk = (id) => async (dispatch) => {
    try{
        const res = await csrfFetch(`/api/reviews/${id}`, {
            method: 'DELETE'
        })

        if(res.ok){
            dispatch(deleteReview(id))
        }
    }
    catch(e){
        return e;
    }
}

//Reducer

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
            newState = {...state, reviews:[...state.reviews]}
            newState.reviews.push(action.payload)
            return newState
        case DELETEREVIEW:
            newState = {...state, reviews:[...state.reviews]}
            newState.reviews.splice(newState.reviews.map(e => e.userId).indexOf(action.payload), 1)
            return newState
        default:
            return state;
    }

}

export default reviewsReducer
