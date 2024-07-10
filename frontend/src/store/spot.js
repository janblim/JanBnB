import { csrfFetch } from "./csrf";

export const getAllSpots = () => async () => {
    const response = await csrfFetch('/api/spots', {
        method: 'GET'
    })

    return response;
}
