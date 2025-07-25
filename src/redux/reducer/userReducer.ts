import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  token: string;
  user: {
    userId: string;
    name: string;
    email: string;
    phone: string;
    role: string;
  };
}

interface IInitialState {
  isAuthenticated: boolean | null;
  user: IUser | null;
}
const initialState: IInitialState = {
  isAuthenticated: false,
  user: null,
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserToStore: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    removeUserFromStore: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { addUserToStore, removeUserFromStore } = userReducer.actions;

export default userReducer.reducer;
