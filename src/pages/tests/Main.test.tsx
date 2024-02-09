import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Template from "./Template";
import { Main } from "../Main";

test("사용자는 '퀴즈 풀기' 버튼을 클릭하여 퀴즈 풀기를 시작할 수 있다.", () => {
	render(
		<Template>
			<Main />
		</Template>
	);

	const startButton = screen.getByRole("button", { name: "퀴즈 풀기" });
	expect(startButton).toBeInTheDocument();

	userEvent.click(startButton);

	const QuizPage = screen.getByTestId("quiz");
	expect(QuizPage).toBeInTheDocument();
});
