import { UserToUpdate } from "../models";

type SaveButtonProps = {
	userToUpdate: UserToUpdate;
	handleUpdate: (userToUpdate: UserToUpdate) => void;
};

export function SaveButton({ userToUpdate, handleUpdate }: SaveButtonProps) {
	return (
		<button
			data-testid="save-button"
			type="button"
			onClick={() => handleUpdate(userToUpdate)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-6 h-6"
			>
				<title>Save</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		</button>
	);
}
