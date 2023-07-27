import { ConditionalRender } from "../../functional.component";
import { useUpdateUserInformation } from "../context/updateUserInformation";
import { useGetUserToUpdate } from "../hooks";
import { EditUser } from "./EditUser";
import { UserInformation } from "./UserInformation";
import { UserPropComponent } from "./types";

export function UserComponent({ user }: UserPropComponent) {
	const { stateUserToUpdate, ifNotUserToUpdated } = useUpdateUserInformation();
	const { buttonState: isButton, user: userToUpdate } = useGetUserToUpdate(
		stateUserToUpdate,
		user,
	);

	return (
		<>
			<td>{user.id}</td>
			<ConditionalRender predicate={ifNotUserToUpdated}>
				<UserInformation
					user={user}
					userToUpdate={userToUpdate}
					isButton={isButton}
				/>
			</ConditionalRender>

			<ConditionalRender predicate={!ifNotUserToUpdated}>
				<EditUser user={user} userToUpdate={userToUpdate} isButton={isButton} />
			</ConditionalRender>
		</>
	);
}
