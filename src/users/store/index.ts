import { configureStore } from "@reduxjs/toolkit";
import {
	persistanceLocalStorageMiddleware,
	syncWithDatabaseMiddleware,
} from "./redux.middlewares";
import usersReducer from "./redux.slice";

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	middleware: [persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selectUserData = (state: RootState) => state.users;
