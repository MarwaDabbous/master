import { combineReducers, createStore } from 'redux';
import UserReducer from './reducers/userReducer';

const Store = createStore(
    combineReducers({
        UserReducer
    })
);

export default Store;