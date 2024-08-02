import { csrfFetch } from "./csrf";

// CONSTANCE
// npm-module-or-app/reducer-name/ACTION_TYPE, can be anything, but must be unique

const GETSPOTS = 'spots/getAllSpots'
const GETONESPOT = 'spots/getOneSpot'
const CREATESPOT = 'spots/createSpot'
const SPOTIMAGE = 'spots/image'
const OWNERSPOTS = 'spots/owner'
const DELETESPOT = 'spots/delete'
const UPDATESPOT = 'spots/update'

// Action creators ()

const getAllSpots = (data) => {
    return {
        type: GETSPOTS,
        payload: data,
    }
}

const getOneSpot = (data) => {
    return {
        type: GETONESPOT,
        payload: data,
    }
}

const createSpot = (data) => {
    return {
        type: CREATESPOT,
        payload: data,
    }
}

const spotImage = (data) => {
    return {
        type: SPOTIMAGE,
        payload: data,
    }
}

const getAllUserSpots = (data) => {
    return {
        type: OWNERSPOTS,
        payload: data,
    }
}

const deleteSpot = () => {
    return {
        type: DELETESPOT,
        payload: data,
    }
}

const updateSpot = (data) => {
    return{
        type: UPDATESPOT,
        payload: data,
    }
}

// THUNKS


export const getAllSpotsThunk = () => async (dispatch) => {

    try{
        const res = await csrfFetch('/api/spots')
        if (res.ok) {
            const data = await res.json() //array of spots
            dispatch(getAllSpots(data))
        } else {
            throw res //throws to the catch e
        }

    } catch (e) {
        return e;
    }
}

export const getOneSpotThunk = (id) => async(dispatch) => {

    try{
        const spot = await csrfFetch(`/api/spots/${id}`)
        const reviews = await csrfFetch(`/api/spots/${id}/reviews`) //fetches reviews for spot as well

        if (spot.ok && reviews.ok) {
            const spotData = await spot.json()
            const reviewsData = await reviews.json()

            spotData.reviews = reviewsData.Reviews

            dispatch(getOneSpot(spotData))
        } else {
            throw res
        }
    }
    catch(e){
        return e;
    }

}

export const createSpotThunk = (form) => async(dispatch) => {
    console.log('form inside thunk', form)
    try{

        form.lat = Number(form.lat)
        form.lng = Number(form.lng)
        form.price = Number(form.price)

        const res = await csrfFetch('/api/spots', {
            method: 'POST',
            body: JSON.stringify(form)
        });
        console.log(res)
        if (res.ok) {
            const data = await res.json()
            dispatch(createSpot(data))
            return data
        } else {
            throw res
        }
    }
    catch(e){
            return e;
    }
}

export const spotImageThunk = (image, id) => async(dispatch) => {

    try{
        const res = await csrfFetch(`/api/spots/${id}/images`, {
            method: 'POST',
            body: JSON.stringify(image)
        });
        if (res.ok) {
            const data = await res.json()
            dispatch(spotImage(data))
        } else {
            throw res
        }

    }
    catch(e){
        return e;
    }
}

export const getAllUserSpotsThunk = () => async (dispatch) => {

    try{
        const res = await csrfFetch('/api/spots/current')

        if (res.ok) {
            const data = await res.json()
            dispatch(getAllUserSpots(data))

        } else {
            throw res
        }

    } catch (e) {
        return e;
    }
}

export const deleteSpotThunk = (id) => async (dispatch) => {
    try{
        const res = await csrfFetch(`/api/spots/${id}`, {
            method: 'DELETE'
        })

        if (res.ok) {
            dispatch(deleteSpot(id))
        } else {
            throw res
        }
    } catch (e) {
        return e;
    }
}

export const updateSpotThunk = (form, id) => async (dispatch) => {
    console.log('inside thunk')
    try{
        const res = await csrfFetch(`/api/spots/${id}`, {
            method: 'PUT',
            body: JSON.stringify(form)
        })

        if (res.ok) {
            const data = await res.json()
            dispatch(updateSpot(data))
            return data
        } else {
            throw res
        }
    }
    catch(e){
        return e;
    }
}

//Reducer (updates the state)

const initialState = {
    allSpots: {},
    userSpots: {},
    spot: {}
}

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GETSPOTS:
            newState = {...state}
            for (let spot of action.payload.Spots) {
                newState.allSpots[spot.id] = spot;
            }
            return newState
        case GETONESPOT:
            newState = {...state}
            newState.spot = action.payload //adds spot details to existing key, or creates new key
            return newState
        case CREATESPOT:
            newState = {...state}
            return newState
        case SPOTIMAGE:
            newState = {...state}
            return newState
        case OWNERSPOTS:
            newState = {...state}
            for (let spot of action.payload.Spots) {
                newState.userSpots[spot.id] = spot
            }
            return newState
        case DELETESPOT:
            newState = {...state}
            delete newState.allSpots[action.payload]
            delete newState.userSpots[action.payload]
            return newState
        case UPDATESPOT:
            newState = {...state}
            return newState
        default:
            return state;
    }

}

export default spotsReducer
