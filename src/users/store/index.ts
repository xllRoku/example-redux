import { configureStore } from "@reduxjs/toolkit";
import {
	persistanceLocalStorageMiddleware,
	syncWithDatabaseMiddleware,
} from "./middlewares";
import usersReducer from "./slice";

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	middleware: [persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selectUserData = (state: RootState) => state.users;
