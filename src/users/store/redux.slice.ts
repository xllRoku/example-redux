import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { CreateUserInfo, User } from "../models";

const DEFAULT_STATE = [
	{
		id: "1",
		name: "Peter Doe",
		email: "yazmanito@gmail.com",
		github: "yazmanito",
	},
	{
		id: "2",
		name: "John Doe",
		email: "leo@gmail.com",
		github: "leo",
	},
	{
		id: "3",
		name: "Haakano Dahlberg",
		email: "haakano@gmail.com",
		github: "haakano",
	},
];

const initialState: User[] = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	if (persistedState) {
		return JSON.parse(persistedState).users;
	}
	return DEFAULT_STATE;
})();

export const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		createNewUser: (state, action: PayloadAction<CreateUserInfo>) => {
			const id = crypto.randomUUID();
			state.push({ id, ...action.payload });
		},
		deleteUserById: (state, action: PayloadAction<string>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
		updateUser: (state, action: PayloadAction<Partial<User | undefined>>) => {
			const userToUpdate = state.find((user) => user.id === action.payload?.id);
			if (userToUpdate) {
				Object.assign(userToUpdate, action.payload);
			}
		},
		rollbackUser: (state, action: PayloadAction<User>) => {
			const isUserAlreadyDefined = state.some(
				(user) => user.id === action.payload.id,
			);
			if (!isUserAlreadyDefined) {
				state.push(action.payload);
			}
		},
	},
});

export default userSlice.reducer;
export const { deleteUserById, createNewUser, rollbackUser, updateUser } =
	userSlice.actions;
