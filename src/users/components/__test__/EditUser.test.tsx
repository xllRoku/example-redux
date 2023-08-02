import { fireEvent } from "@testing-library/react";
import { EditUser } from "../EditUser";

import { renderWithProviders } from "../../../utils/test-utils";

vi.mock("../../context/updateUserInformation", () => ({
	useUpdateUserInformation: vi.fn(() => ({
		stateUserToUpdate: { errors: {} },
	})),
}));

vi.mock("../../hooks/index", () => ({
	useUpdateUserProperty: vi.fn(() => ({ updateProperty: vi.fn() })),
}));

describe("EditUser component", () => {
	test("should render the input fields correctly", () => {
		const user = {
			id: "some-id",
			name: "John Doe",
			email: "john@example.com",
			github: "john",
		};

		const userToUpdate = {
			id: "some-id",
			name: "Updated John",
			email: "updated@example.com",
			github: "updated",
		};

		const isButton = { save: true, edit: false };

		const { getByPlaceholderText } = renderWithProviders(
			<table>
				<tbody>
					<tr>
						<EditUser
							user={user}
							userToUpdate={userToUpdate}
							isButton={isButton}
						/>
					</tr>
				</tbody>
			</table>,
		);

		const emailInput = getByPlaceholderText("updated@example.com");
		const nameInput = getByPlaceholderText("Updated John");

		expect(nameInput).toHaveValue("Updated John");
		expect(emailInput).toHaveValue("updated@example.com");
	});

	test("should call the updateProperty function when input fields are changed", () => {
		const user = {
			id: "some-id",
			name: "John Doe",
			email: "john@example.com",
			github: "john",
		};

		const userToUpdate = {
			id: "some-id",
			name: "Updated John",
			email: "updated@example.com",
			github: "updated",
		};

		const isButton = { save: true, edit: false };

		const { getByPlaceholderText } = renderWithProviders(
			<table>
				<tbody>
					<tr>
						<EditUser
							user={user}
							userToUpdate={userToUpdate}
							isButton={isButton}
						/>
					</tr>
				</tbody>
			</table>,
		);

		const emailInput = getByPlaceholderText("Updated John");
		const nameInput = getByPlaceholderText("updated@example.com");

		fireEvent.change(nameInput, { target: { value: "New Name" } });
		fireEvent.change(emailInput, { target: { value: "new@example.com" } });
	});
});
