import { Suspense } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, createSearchParams } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as router from "react-router";

import * as Theme from "../../theme";
import { ROUTES } from "../../constants";
import { Router } from "../../Router";
import { Loader } from "../../components";
import { getTimestamp } from "../../utils";

const navigate = jest.fn();

jest.mock("../../lib", () => ({
	getCategories: jest.fn().mockResolvedValue([
		{ id: 1, name: "a" },
		{ id: 2, name: "b" },
	]),
}));

Date.now = jest.fn(() => new Date(Date.UTC(2024, 2, 15)).valueOf());

beforeEach(() => {
	jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

afterEach(() => {
	jest.clearAllMocks();
});

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

test("사용자는 '퀴즈 풀기' 버튼을 클릭하여 퀴즈 풀기를 시작할 수 있다.", async () => {
	render(
		<ThemeProvider theme={Theme}>
			<QueryClientProvider client={queryClient}>
				<Suspense fallback={<Loader />}>
					<MemoryRouter initialEntries={[ROUTES.MAIN]}>
						<Router />
					</MemoryRouter>
				</Suspense>
			</QueryClientProvider>
		</ThemeProvider>
	);

	const startButton = await screen.findByTestId("submit");
	expect(startButton).toBeInTheDocument();

	userEvent.click(startButton);

	expect(navigate).toHaveBeenCalledWith({
		pathname: ROUTES.QUIZ,
		search: `?${createSearchParams({
			amount: "5",
			difficulty: "any",
			category: "1",
			timestamp: getTimestamp(),
		})}`,
	});
});
