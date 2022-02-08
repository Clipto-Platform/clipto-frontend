
interface Action {
    type:string;
    payload: {
        user: string; 
    };
}
const initialState = {
    user: localStorage.getItem('user')
}
export default function reducer(state = {...initialState} , action :Action ) {
    const {type, payload} = action;

    switch(type){

        case 'login' : {
            localStorage.setItem('user',payload.user);
            return {
                ...state,
                user: payload.user
            }

        }
        case 'logout' : {
            localStorage.removeItem('user');
            return {
                ...state,
                user: payload.user
            }

        }
        default: 

        return state;
    }
}