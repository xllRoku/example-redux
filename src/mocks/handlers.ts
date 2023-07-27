import { rest } from "msw";

export const handlers = [
	rest.get(
		"https://unavatar.io/github/test-github-username",
		(_req, res, ctx) => {
			return res(
				ctx.status(200),
				ctx.json({
					url: "https://unavatar.io/github/test-github-username",
				}),
			);
		},
	),
	rest.get("/api/user", (_req, res, ctx) => {
		return res(
			ctx.json([
				{
					id: "1",
					name: "John Doe",
					email: "john@example.com",
					github: "johndoe",
				},
				{
					id: "2",
					name: "Jane Smith",
					email: "jane@example.com",
					github: "janesmith",
				},
			]),
			ctx.delay(150),
		);
	}),
];
