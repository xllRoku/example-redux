export class User {
	/**
	 * Constructor
	 * @param id User unique identifier
	 * @param email User email
	 * @param name User password
	 * @param github User github
	 */

	constructor(
		public readonly id: string,
		public email: string,
		public name: string,
		public github: string,
	) {}
}

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

export type CreateUserInfo = Omit<User, "id">;
export type UserToUpdate = User | undefined;
