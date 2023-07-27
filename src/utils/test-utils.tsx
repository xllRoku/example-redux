import React from "react";

import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { userSlice } from "../users/store/redux.slice";

export function renderWithProviders(
	ui: React.ReactElement,
	{
		store = configureStore({
			reducer: { listReducers: userSlice.reducer },
		}),
		...renderOptions
	} = {},
) {
	function Wrapper({ children }: { children: React.ReactNode }) {
		return <Provider store={store}>{children}</Provider>;
	}

	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
