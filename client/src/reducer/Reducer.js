export const InitialState = null;

export const Reducer = (state, action) => {
    if( action.type==='USER' ){
        return action.payload;
    }
    return state;
}

