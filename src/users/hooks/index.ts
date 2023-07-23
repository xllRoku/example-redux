import { useUpdateUserInformation } from "../context/updateUserInformation";
import { User, UserToUpdate } from "../models";
import type { StateUserToUpdate } from "./management";

export const useGetUserToUpdate = (
	stateUserToUpdate: StateUserToUpdate,
	currentUser: User,
) => {
	const state = {
		user: undefined as UserToUpdate,
		buttonState: {
			save: false,
			edit: true,
		},
	};

	if (stateUserToUpdate) {
		stateUserToUpdate?.forEach((userToUpdate) => {
			if (userToUpdate?.id === currentUser.id) {
				state.buttonState.save = true;
				state.buttonState.edit = false;
				state.user = userToUpdate;
			}
		});
	}

	return state;
};

export const useUpdateUserProperty = () => {
	const { setStateUserToUpdate } = useUpdateUserInformation();

	const updateProperty = (
		event: React.ChangeEvent<HTMLInputElement>,
		userToUpdate: UserToUpdate,
		propertyToUpdate: keyof User,
	) => {
		if (userToUpdate) {
			setStateUserToUpdate([
				{ ...userToUpdate, [propertyToUpdate]: event.target.value },
			]);
		}
	};

	return { updateProperty };
};

export type ButtonState = ReturnType<typeof useGetUserToUpdate>["buttonState"];
