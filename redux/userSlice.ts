import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  [key: string]: any;
};

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    clearUsers(state) {
      state.users = [];
    },
    deleteUser(state, action: PayloadAction<string>) {
      state.users = state.users.filter(user => user.id !== action.payload);
    }
  },
});

export const { setUsers, addUser, clearUsers ,deleteUser} = userSlice.actions;
export default userSlice.reducer;
