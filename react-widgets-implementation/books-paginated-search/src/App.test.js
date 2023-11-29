import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App tests", () => {
	test("should render", () => {
		const view = render(<App />);
		expect(view).toBeTruthy();
		const onlyElementForNow = screen.getByText(/Boilerplate/i);
		expect(onlyElementForNow).toBeInTheDocument();
	});
});
