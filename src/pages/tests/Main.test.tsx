import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Template from "./Template";
import { Main } from "../Main";
import { ROUTES } from "../../constants";

test("사용자는 '퀴즈 풀기' 버튼을 클릭하여 퀴즈 풀기를 시작할 수 있다.", async () => {
	render(
		<Template>
			<Main />
		</Template>
	);

	const startButton = await screen.findByTestId("submit");
	expect(startButton).toBeInTheDocument();

	userEvent.click(startButton);

	expect(window.location.pathname).toBe(ROUTES.QUIZ);
});
