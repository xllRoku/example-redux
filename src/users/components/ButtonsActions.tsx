import { ConditionalRender } from "../../functional.component";
import { useUpdateUserInformation } from "../context/updateUserInformation";
import { useUserManagement } from "../hooks/management";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import { SaveButton } from "./SaveButton";
import { UserPropChildComponent } from "./types";

export function ButtonsActions({
	user,
	userToUpdate,
	isButton,
}: UserPropChildComponent) {
	const { handleUpdate, handleEdit } = useUpdateUserInformation();
	const { remove } = useUserManagement();

	return (
		<tr>
			<td>
				<ConditionalRender predicate={isButton.save}>
					<SaveButton userToUpdate={userToUpdate} handleUpdate={handleUpdate} />
				</ConditionalRender>

				<ConditionalRender predicate={isButton.edit}>
					<EditButton user={user} handleEdit={handleEdit} />
				</ConditionalRender>
				<DeleteButton user={user} remove={remove} />
			</td>
		</tr>
	);
}
