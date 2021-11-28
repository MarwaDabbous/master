import { User } from "../types/userReducersTypes";
import types from "../actions/types";

const userState: User = {
    isLoggedIn: false,
    accessToken: null
};

export const UserReducerSwitcher = (state: User, action: any) => {
    switch (action.type) {
        case types.SET_USER: return action.payload;
        case types.RESET_USER: {
            console.log('reset user --', userState);
            return userState
        }
        default: return userState;
    }
}

const UserReducer = (state = userState, action: any): User => {
    return UserReducerSwitcher(state, action);
}

export default UserReducer;