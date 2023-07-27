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

export type CreateUserInfo = Omit<User, "id">;
export type UserToUpdate = User | undefined;
