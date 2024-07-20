import { csrfFetch } from "./csrf";

// CONSTANCE
// npm-module-or-app/reducer-name/ACTION_TYPE, can be anything, but must be unique

const GETSPOTS = 'spots/getAllSpots'
const GETONESPOT = 'spots/getOneSpot'
const CREATESPOT = 'spots/createSpot'
const SPOTIMAGE = 'spots/image'
const OWNERSPOTS = 'spots/owner'

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
        const res = await csrfFetch(`/api/spots/${id}`)

        if (res.ok) {
            const data = await res.json()
            dispatch(getOneSpot(data))
        } else {
            throw res
        }
    }
    catch(e){
        return e;
    }

}

export const createSpotThunk = (form) => async(dispatch) => {
    console.log('form', form)
    try{

        const res = await csrfFetch('/api/spots', { //creates the new spot
            method: 'POST',
            body: JSON.stringify(form)
        });
        if (res.ok) {
            console.log('spot', res)
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
            return data
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


//Reducer (updates the state)

const initialState = {
    allSpots: [],
    allUserSpots: {
        allSpots: [],
        byId: {},
    },
    byId: {},
    spot: {},
}

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GETSPOTS:
            newState = {...state}
            newState.allSpots = action.payload.Spots
            for (let spot of action.payload.Spots) {
                newState.byId[spot.id] = spot;
            }
            return newState //always last line
        case GETONESPOT:
            newState = {...state}
            newState.spot = action.payload
            return newState
        case CREATESPOT:
            newState = {...state}
            return newState
        case SPOTIMAGE:
            newState = {...state}
            return newState
        case OWNERSPOTS:
            newState = {...state}
            newState.allUserSpots.allSpots = action.payload.Spots
            for (let spot of action.payload.Spots) {
                newState.allUserSpots.byId[spot.id] = spot;
            }
            return newState
        default:
            return state;
    }

}

export default spotsReducer
