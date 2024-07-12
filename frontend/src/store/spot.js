import thunk from "redux-thunk";
import { csrfFetch } from "./csrf";
// CONSTANCE
// npm-module-or-app/reducer-name/ACTION_TYPE, can be anything, but must be unique

const GETSPOTS = 'spots/getAllSpots'
const GETONESPOT = 'spots/getOneSpot'

// Action creators ()

const getAllSpots = (data) => {

    // console.log('step 6', data)

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

// THUNKS


export const getAllSpotsThunk = () => async (dispatch) => {

    try{
        // console.log('inside thunk')
        const res = await csrfFetch('/api/spots')

        //things to consider here

        if (res.ok) {

            // console.log('step 5', res)

            const data = await res.json() //array of spots

            // console.log(data)

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
            // console.log(data)
            dispatch(getOneSpot(data))
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
    allSpots: [],
    byId: {},
    spot: {}
}

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GETSPOTS:
            newState = {...state} //always first line
            //update allSpots

            newState.allSpots = action.payload.Spots

            //update byId

            for (let spot of action.payload.Spots) {
                newState.byId[spot.id] = spot;
            }


            return newState //always last line
        case GETONESPOT:
            newState = {...state}
            newState.spot = action.payload
            return newState

        default:
            return state;
    }

}

export default spotsReducer
