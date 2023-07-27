import { fireEvent, render } from "@testing-library/react";
import { EditButton } from "../EditButton";

const user = {
	id: "1",
	name: "Test User",
	email: "test@example.com",
	github: "xllroky",
};

describe("Edit Component", () => {
	it("should call handle edit when clicked", () => {
		const mockHandleEdit = vi.fn();

		const { getByRole } = render(
			<EditButton user={user} handleEdit={mockHandleEdit} />,
		);

		const button = getByRole("button");
		fireEvent.click(button);

		expect(mockHandleEdit).toHaveBeenCalledWith(user);
	});
});
