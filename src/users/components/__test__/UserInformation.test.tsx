import { render } from "@testing-library/react";
import { UserInformation } from "../UserInformation";

vi.mock("../ProfileImage", () => ({
	ProfileImage: () => <div>Mocked ProfileImage</div>,
}));

vi.mock("../ButtonsActions", () => ({
	ButtonsActions: () => <div>Mocked ButtonsActions</div>,
}));

describe("UserInformation component", () => {
	const user = {
		id: "somne-id",
		name: "John Doe",
		email: "john.doe@example.com",
		github: "xllroku",
	};
	const userToUpdate = {
		id: "somne-id",
		name: "Jane Smith",
		email: "jane.smith@example.com",
		github: "xllroku",
	};
	const isButton = { save: true, edit: false };

	it("renders user information correctly", () => {
		const { getByText } = render(
			<table>
				<tbody>
					<tr>
						<UserInformation
							user={user}
							userToUpdate={userToUpdate}
							isButton={isButton}
						/>
					</tr>
				</tbody>
			</table>,
		);

		expect(getByText("John Doe")).toBeInTheDocument();
		expect(getByText("john.doe@example.com")).toBeInTheDocument();
		expect(getByText("Mocked ButtonsActions")).toBeInTheDocument();
	});
});
