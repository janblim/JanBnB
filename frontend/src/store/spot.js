import { csrfFetch } from "./csrf";
// CONSTANCE

const GETSPOTS = 'spots/getAllSpots'

// Action creators

const getAllSpots = (data) => {
    console.log('step 6', data)
    return {
        type: GETSPOTS,
        payload: data,
    }
}

// THUNKS


export const getAllSpotsThunk = () => async (dispatch) => {

    try{
        console.log('inside thunk')
        const res = await csrfFetch('/api/spots')


        //things to consider here

        if (res.ok) {
            console.log('step 5', res)
            const data = await res.json() //array of spots
            console.log(data)
            dispatch(getAllSpots(data))
        } else {
            throw res //throws to the catch e
        }

    } catch (e) {
        return e;
    }
}

//Reducer

const initialState = {
    allSpots: [],
    byId: {}
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

            console.log('step 7', action.payload)

            return newState //always last line
        default:
            return state;
    }
}

export default spotsReducer
