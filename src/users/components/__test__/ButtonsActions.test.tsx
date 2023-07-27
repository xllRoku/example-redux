import { renderWithProviders } from "../../../utils/test-utils";
import { ButtonsActions } from "../ButtonsActions";

const user = {
	id: "1",
	name: "Test User",
	email: "test@example.com",
	github: "xllroky",
};

describe("Buttons Actions Component", () => {
	it("should render SaveButton when isButton.save is true", () => {
		const { queryByTestId } = renderWithProviders(
			<ButtonsActions
				userToUpdate={user}
				user={user}
				isButton={{ save: true, edit: false }}
			/>,
		);

		expect(queryByTestId("save-button")).toBeInTheDocument();
		expect(queryByTestId("edit-button")).not.toBeInTheDocument();
		expect(queryByTestId("delete-button")).toBeInTheDocument();
	});

	it("should render EditButton when isButton.edit is true", () => {
		const { queryByTestId } = renderWithProviders(
			<ButtonsActions
				userToUpdate={user}
				user={user}
				isButton={{ save: false, edit: true }}
			/>,
		);

		expect(queryByTestId("save-button")).not.toBeInTheDocument();
		expect(queryByTestId("edit-button")).toBeInTheDocument();
		expect(queryByTestId("delete-button")).toBeInTheDocument();
	});
});
