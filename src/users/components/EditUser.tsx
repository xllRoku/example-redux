import { FORM_NAMES } from "../constans";
import { useUpdateUserInformation } from "../context/updateUserInformation";
import { useUpdateUserProperty } from "../hooks";
import { ButtonsActions } from "./ButtonsActions";
import { ProfileImage } from "./ProfileImage";
import { UserPropChildComponent } from "./types";

export function EditUser({
	user,
	userToUpdate,
	isButton,
}: UserPropChildComponent) {
	const { stateUserToUpdate } = useUpdateUserInformation();
	const { updateProperty } = useUpdateUserProperty();

	return (
		<>
			<td className="p-2 py-3 flex items-center gap-[.5rem] justify-center">
				<ProfileImage user={user} />
				<label>
					<input
						type="text"
						name={FORM_NAMES.NAME}
						value={userToUpdate?.name}
						onChange={(event) => updateProperty(event, userToUpdate, "name")}
						className="h-8 text-black px-2 rounded-full"
						placeholder={userToUpdate?.name}
					/>
					{stateUserToUpdate.errors.name && (
						<span className="text-red-500">
							{stateUserToUpdate.errors.name.message}
						</span>
					)}
				</label>
			</td>
			<td className="p-2 py-3">
				<label>
					<input
						type="text"
						name={FORM_NAMES.EMAIL}
						value={userToUpdate?.email}
						onChange={(event) => updateProperty(event, userToUpdate, "email")}
						className="h-8 text-black px-2 rounded-full"
						placeholder={userToUpdate?.email}
					/>
					{stateUserToUpdate.errors.email && (
						<span className="text-red-500">
							{stateUserToUpdate.errors.email.message}
						</span>
					)}
				</label>
			</td>
			<ButtonsActions
				user={user}
				userToUpdate={userToUpdate}
				isButton={isButton}
			/>
		</>
	);
}
