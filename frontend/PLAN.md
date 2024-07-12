# spots (saturday)
1. get all spots
2. get one spot
3. create a spot
4. delete a spot
5. update a spot

# reviews (tuesday)

1. get all reviews for a spot
2. get all reviews belong to user
3. create a review
4. delete a review
5. update a review


# things to consider

1. user auth, can only create, update, and delete spots if signed in
2. need to be the owner of a spot in order to update and delete it
3. user auth, can only create, update, and delete review if signed in
4. need to be NOT the owner of a spot to create a review
5. can only create 1 review per spot
6. can only update and delete a review if you are the owner of the review




# The Data Flow is as follows:

1. A user performs some sort of action in the browser
2. The client (react) packages the information from its component and sends it to the thunk
3. The thunk (responsbile for 2 things) sends information to the backend route
4. Backend route (responsible for 2 things). Responsbile for preparing data for the database
5. Database, responsbile for storing and sending data
6. The backend route sends a response to the Thunk that called it
7. The thunk prepares the response data for the action (or intercepts errors)
8. The action creator packages the data in the form of a payload, and ties it to a case
9. The reducer receives the case and changes the state in store
10. React component retrieves the store via `useSelector` and sends it back to the browser
11. User is happy


We can condense some of these to create the 9 step plan

1. Browser
2. React component
3. Thunk
4. Backend route
5. Thunk (again)
6. Action creator (the only way to trigger changes in the store's state)
7. Reducer (in the store.js, actually does the change of state)
8. React component (via useSelector)
9. Browser (with state now changed)




const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer); // middlewares go in here
};

export default configureStore


```

### Create a Slice of State

## Create a Thunk

```js
// thunk for creating a pokemon
export const createPokemonThunk = (newPokemon) => async (dispatch) => {
    const response = await csrfFetch("/api/pokemon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPokemon)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(createPokemon(data));
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
};

// thunk for getting a pokemon
export const getPokemonThunk = () => async (dispatch) => {
    try{
        const response = await csrfFetch("/api/pokemon");
        if (response.ok) {
            const data = await response.json();
            dispatch(setPokemon(data));
        }
    } catch (e){
        return e
    }
};

```

## Create an action creator

In the above examples, we referenced 2 action creators. `createPokemon` and `setPokemon`

```js
//Constants
const SET_POKEMON = 'pokemon/setPokemon';
const CREATE_POKEMON = 'pokemon/createPokemon';

const setPokemon = (data) => ({
    type: SET_POKEMON,
    payload: data
});

const createPokemon = (newPokemon) => ({
    type: CREATE_POKEMON,
    payload: newPokemon
});

```

## Create Reducer slices

In the above example, we have two actions, we should have a reducer case for each
```js
const initialState = {
    allPokemon: [],
    byId: {}
};

function pokemonReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_POKEMON:
            newState = {...state}; // make a shallow copy of state
            newState.allPokemon = action.payload //
            for(let mon of action.payload){
                newState.byId[mon.id] = mon; // sets individual pokemon
            }
            return newState;
        case CREATE_POKEMON:
            newState = {...state}; // shallow copy
            newState.allPokemon = [...newState.allPokemon, action.payload]; //adds newPokemon and makes a new array shallow copied
            const id = action.payload.id;
            newState.byId = { ...newState.byId, [id]: action.payload }
            return newState
        default:
            return state;
    }
}

export default pokemonReducer;


```

## Using the pokemon state

```js
import {useSelector} from 'react-redux';

const PokemonComponent = () => {
    const pokemon = useSelector((state)=> state.pokemonState.allPokemon);

    if(!pokemon){
        return <h1>Loading...</h1>
    }
    return (
        <>
        <h1>Pokemon</h1>
        {pokemon.map((mon, idx)=> (
            <p key={`${idx}-${mon.name}`}>{mon.name}</p>
        ))}
        </>
    )
}

export default PokemonComponent;
