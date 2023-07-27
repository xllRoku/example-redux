import { fireEvent, render } from "@testing-library/react";
import { DeleteButton } from "../DeleteButton";

const user = {
	id: "1",
	name: "Test User",
	email: "test@example.com",
	github: "xllroky",
};

describe("Edit Component", () => {
	it("should call handle edit when clicked", () => {
		const mockRemove = vi.fn();

		const { getByRole } = render(
			<DeleteButton user={user} remove={mockRemove} />,
		);

		const button = getByRole("button");
		fireEvent.click(button);

		expect(mockRemove).toHaveBeenCalledWith(user.id);
	});
});
