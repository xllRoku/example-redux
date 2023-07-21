import { UserToUpdate } from "../hooks/actions";
import { UserWithId } from "../store/slice";

export type UserPropComponent = { user: UserWithId };
export type UserToUpdatePropComponent = { userToUpdate: UserToUpdate };
