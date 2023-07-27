import { ButtonsActions } from "./ButtonsActions";
import { ProfileImage } from "./ProfileImage";
import { UserPropChildComponent } from "./types";

export function UserInformation({
	user,
	userToUpdate,
	isButton,
}: UserPropChildComponent) {
	return (
		<>
			<td>
				<div className=" px-2 py-3  flex items-center gap-[.5rem] justify-center">
					<div className="flex w-[255px] items-center">
						<ProfileImage user={user} />
						<p className="w-full flex px-2">{user.name}</p>
					</div>
				</div>
			</td>
			<td className="p-2 py-3">
				<div className="flex justify-center">
					<p className="w-[180px]">{user.email}</p>
				</div>
			</td>
			<ButtonsActions
				user={user}
				userToUpdate={userToUpdate}
				isButton={isButton}
			/>
		</>
	);
}
