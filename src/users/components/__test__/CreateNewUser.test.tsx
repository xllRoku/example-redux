import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test-utils";
import { CreateNewUSer } from "../CreateNewUSer";

describe("CreateNewUser Component", () => {
	beforeAll(() => {
		vi.resetAllMocks();
	});

	it("should render the form with input fields and a submit button", () => {
		const mockCreate = vi.fn();

		renderWithProviders(<CreateNewUSer create={mockCreate} />);

		expect(
			screen.getByPlaceholderText(/Aquí va el nombre/i),
		).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText(/Aquí va el email/i),
		).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText(/Aquí va el github/i),
		).toBeInTheDocument();
		expect(screen.getByText(/crear usuario/i)).toBeInTheDocument();
	});

	it("should display error messages for invalid input", async () => {
		const mockCreate = vi.fn();

		renderWithProviders(<CreateNewUSer create={mockCreate} />);

		const nameInput = screen.getByPlaceholderText("Aquí va el nombre");
		const emailInput = screen.getByPlaceholderText("Aquí va el email");
		const githubInput = screen.getByPlaceholderText("Aquí va el github");
		const submitButton = screen.getByText("Crear usuario");

		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText("Hay un error en el nombre")).toBeInTheDocument();
			expect(screen.getByText("Hay un error en el email")).toBeInTheDocument();
			expect(screen.getByText("Hay un error en el github")).toBeInTheDocument();
		});

		fireEvent.change(nameInput, { target: { value: "" } });
		fireEvent.change(emailInput, { target: { value: "" } });
		fireEvent.change(githubInput, { target: { value: "" } });

		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(
				screen.getByText(/Hay un error en el nombre/i),
			).toBeInTheDocument();
			expect(screen.getByText(/Hay un error en el email/i)).toBeInTheDocument();
			expect(
				screen.getByText(/Hay un error en el github/i),
			).toBeInTheDocument();
		});

		fireEvent.change(nameInput, { target: { value: "John Doe" } });
		fireEvent.change(emailInput, { target: { value: "john@example.com" } });
		fireEvent.change(githubInput, { target: { value: "johndoe" } });

		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(
				screen.queryByText(/Hay un error en el nombre/i),
			).not.toBeInTheDocument();
			expect(
				screen.queryByText(/Hay un error en el email/i),
			).not.toBeInTheDocument();
			expect(
				screen.queryByText(/Hay un error en el github/i),
			).not.toBeInTheDocument();
		});
	});

	it("should call the create function on form submission with valid data", async () => {
		const mockCreate = vi.fn();

		renderWithProviders(<CreateNewUSer create={mockCreate} />);

		const nameInput = screen.getByPlaceholderText(/Aquí va el nombre/i);
		const emailInput = screen.getByPlaceholderText(/Aquí va el email/i);
		const githubInput = screen.getByPlaceholderText(/Aquí va el github/i);
		const submitButton = screen.getByText(/Crear usuario/i);

		fireEvent.change(nameInput, { target: { value: "John Doe" } });
		fireEvent.change(emailInput, { target: { value: "john@example.com" } });
		fireEvent.change(githubInput, { target: { value: "johndoe" } });

		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(mockCreate).toHaveBeenCalledWith({
				name: "John Doe",
				email: "john@example.com",
				github: "johndoe",
			});
		});
	});
});
