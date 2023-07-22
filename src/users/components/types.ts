import { ButtonState } from "../hooks";
import { User, UserToUpdate } from "../models";

export type UserPropComponent = { user: User };
export type UserPropChildComponent = {
	user: User;
	userToUpdate: UserToUpdate;
	isButton: ButtonState;
};
export type UserToUpdatePropComponent = { userToUpdate: UserToUpdate };
export type ProfileImageProp = { user: User | UserToUpdate };
