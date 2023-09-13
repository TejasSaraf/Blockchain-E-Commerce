import { legacy_createStore as createStore } from 'redux'

const initialState = {
    isAdmin: false,
    cartCount: 0,
    subTotal: 0,
    loggedIn: false,
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ADMIN':
            return { ...state, isAdmin: action.payload };
        // Add more cases for different actions
        case 'SET_COUNT':
            return { ...state, cartCount: action.payload };
        case 'SET_SUBTOTAL':
            return { ...state, subTotal: action.payload }
        case "LOGGED_IN":
            return { ...state, loggedIn: action.payload }
        default:
            return state;
    }
}

const store = createStore(
    reducer
);


export default store;