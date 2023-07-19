import { apiURL } from "./constans";

export const client = (endpoint: string, method = "GET", data?: Object) => {
	if (method === "DELETE" && data !== undefined) {
		throw new Error("DELETE method should not have a request body (data).");
	}

	const config = {
		method: method.toUpperCase(),
		body: data ? JSON.stringify(data) : undefined,
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	};

	return fetch(`${apiURL}/${endpoint}`, config).then(async (res) => {
		const data = await res.json();
		if (res.ok) {
			return data;
		} else {
			return Promise.reject(data);
		}
	});
};
