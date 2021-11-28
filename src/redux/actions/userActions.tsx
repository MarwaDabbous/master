import { User } from "../types/userReducersTypes";
import types from "./types";

export function setUser(user: User) {
    console.log('set user called, ', user)
    return { type: types.SET_USER, payload: { ...user } }
}

export function resetUser() {
    console.log('reset user  called')
    return { type: types.RESET_USER }
}