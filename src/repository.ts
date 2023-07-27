import { User, UserToUpdate } from "../domain/models";
import { UserRepository } from "../domain/repository";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { selectUserData } from "./store";
import { updateUser } from "./store/redux.slice";

export class UserRepositoryImpl implements UserRepository {
	private dispatch = useAppDispatch();

	getUsers(): User[] {
		const users = useAppSelector(selectUserData);
		return users;
	}

	// create(user: CreateUserInfo): void {
    //     const user = new User

    //     this.dispatch(
	// 		createNewUser({
	// 			name: user.name,
	// 			email: user.email,
	// 			github: user.github,
	// 		}),
	// 	);
	// }

	update(userToUpdate: UserToUpdate): void {
		this.dispatch(
			updateUser({
				...userToUpdate,
				name: userToUpdate?.name,
				email: userToUpdate?.email,
			}),
		);
	}

	// remove(id: string): void {
	// 	this.users = this.users.filter((user) => user.id !== id);
	// }
}
