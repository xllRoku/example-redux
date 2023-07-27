import { CreateUserInfo, User, UserToUpdate } from "./models";

export interface UserRepository {
	/**
	 * Create a user
	 * @param user User info
	 * @returns Domain user
	 */
	create: (user: CreateUserInfo) => void;

	/**
	 * Update a user by id
	 * @param userToUpdate user info
	 * @returns Domain user
	 */
	update: (userToUpdate: UserToUpdate) => void;

	/**
	 * Removes a user by id
	 * @param id User id
	 */
	remove: (id: string) => void;

	/**
	 * Get all users
	 * @returns Users
	 */
	getUsers: () => User[];
}
