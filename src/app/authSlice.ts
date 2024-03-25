import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User} from "../modules/Auth/types";


interface AuthState {
    status: boolean;
    // userData: UserData | null;
    userData: User|null
}

const initialState: AuthState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ userData: User }>) => {
            state.status = true;
            state.userData = action.payload.userData;

            console.log("state status: ",state.status);
            console.log("state userData: ",state.userData);

            
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
