import { fireEvent, render } from "@testing-library/react";
import { SaveButton } from "../SaveButton";

const userToUpdate = {
	id: "1",
	name: "Test User",
	email: "test@example.com",
	github: "xllroky",
};

describe("SaveButton Component", () => {
	it("should call handleUpdate when clicked", () => {
		const mockHandleUpdate = vi.fn();

		const { getByRole } = render(
			<SaveButton
				userToUpdate={userToUpdate}
				handleUpdate={mockHandleUpdate}
			/>,
		);

		const button = getByRole("button");
		fireEvent.click(button);

		expect(mockHandleUpdate).toHaveBeenCalledWith(userToUpdate);
	});
});
