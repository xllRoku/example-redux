import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdate } from "../context";
import { addUserSchema } from "../schemas";
import { UserWithId } from "../store/slice";
import type { AddUserInfo, StateUserToUpdate, UserToUpdate } from "./actions";
import { useUserActions } from "./actions";

export const useAddUser = () => {
	const { addUser } = useUserActions();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<AddUserInfo>({
		resolver: zodResolver(addUserSchema),
	});

	const onSubmit: SubmitHandler<AddUserInfo> = (data) => {
		console.log(errors);
		console.log("IT WORKED", data);
		addUser(data);
		reset();
	};

	return { register, handleSubmit, onSubmit, errors };
};

export const useGetState = (
	stateUserToUpdate: StateUserToUpdate,
	currentUser: UserWithId,
) => {
	const state = {
		user: undefined as UserToUpdate,
		buttonState: {
			save: false,
			edit: false,
		},
	};

	if (!stateUserToUpdate) return state;

	stateUserToUpdate?.forEach((userToUpdate) => {
		if (userToUpdate?.id === currentUser.id) {
			state.buttonState.save = true;
			state.user = userToUpdate;
		} else {
			state.buttonState.edit = true;
		}
	});

	return state;
};

export const useUpdateProperty = () => {
	const { setStateUserToUpdate } = useUpdate();

	const updateProperty = (
		event: React.ChangeEvent<HTMLInputElement>,
		userToUpdate: UserToUpdate,
		propertyToUpdate: keyof UserWithId,
	) => {
		if (userToUpdate) {
			setStateUserToUpdate([
				{ ...userToUpdate, [propertyToUpdate]: event.target.value },
			]);
		}
	};

	return { updateProperty };
};
