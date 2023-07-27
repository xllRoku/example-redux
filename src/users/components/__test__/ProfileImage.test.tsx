import { render, screen } from "@testing-library/react";
import { ProfileImage } from "../ProfileImage";

const user = {
	id: "some-id",
	github: "test-github-username",
	name: "Test User",
	email: "some-id",
};

describe("ProfileImage", () => {
	it("should render the Spinner when loading is true", () => {
		render(<ProfileImage user={user} />);
		expect(screen.getByTestId("spinner")).toBeInTheDocument();
		expect(screen.queryByAltText("Test User")).not.toBeInTheDocument();
	});

	it("should render the user image when loading is false", async () => {
		render(<ProfileImage user={user} />);

		await screen.findByAltText("Test User");

		expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
		expect(screen.getByAltText("Test User")).toBeInTheDocument();
		expect(screen.getByAltText("Test User")).toHaveAttribute(
			"src",
			"https://unavatar.io/github/test-github-username",
		);
	});

	it("should render a default image when fetch fails", async () => {
		render(<ProfileImage user={user} />);

		await screen.findByAltText("Test User");

		expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
		expect(screen.getByAltText("Test User")).toBeInTheDocument();
		expect(screen.getByAltText("Test User")).toHaveAttribute(
			"src",
			"https://unavatar.io/github/test-github-username",
		);
	});
});
