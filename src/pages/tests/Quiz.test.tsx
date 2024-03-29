import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Template from "./Template";
import { Quiz } from "../Quiz";
import { createMemoryHistory } from "history";
import { ROUTES } from "../../constants";

const AMOUNT = 5;

const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockUsedNavigate,
}));

const getRandomNumber = (min: number, max: number) => {
	const randomNumber = Math.random() * (max - min) + min;

	return Math.floor(randomNumber);
};

const renderQuiz = () => {
	const history = createMemoryHistory({
		initialEntries: [`/solve?amount=${AMOUNT}`],
	});

	render(
		<Template history={history}>
			<Quiz />
		</Template>
	);
};

const answerQuiz = async () => {
	const answerList = await screen.findAllByTestId("answer");
	const answerButton = answerList[getRandomNumber(0, 3)];
	userEvent.click(answerButton);
};

const clickNextButton = async () => {
	const nextButton = await screen.findByTestId("submit");
	userEvent.click(nextButton);
};

test("사용자는 문항에 대한 답안을 4개 보기 중에 선택할 수 있다.", async () => {
	renderQuiz();

	const answerList = await screen.findAllByTestId("answer");

	expect(answerList.length).toBe(4);
});

describe("사용자는 답안을 선택하면 다음 문항을 볼 수 있다.", () => {
	test("답안 선택 후 다음 문항 버튼을 볼 수 있다.", async () => {
		renderQuiz();

		const nextQuizButton = screen.queryByTestId("submit");
		expect(nextQuizButton).toBeNull();

		await answerQuiz();

		const nextButton = screen.getByTestId("submit");
		expect(nextButton).toBeInTheDocument();
	});

	test("답안이 맞았는지 틀렸는지 바로 알 수 있다.", async () => {
		renderQuiz();
		await answerQuiz();
		const resultInfom = screen.getByTestId("resultText");
		expect(resultInfom).toBeInTheDocument();
	});

	test("다음 문항 버튼을 클릭하여 다음 문항으로 이동할 수 있다.", async () => {
		renderQuiz();

		const nowProgress = await screen.findByTestId("progress");
		expect(nowProgress).toHaveTextContent(`1/${AMOUNT}`);

		await answerQuiz();
		clickNextButton();

		const nextProgress = await screen.findByTestId("progress");
		expect(nextProgress).toHaveTextContent(`2/${AMOUNT}`);
	});
});

test("모든 문제를 다 풀면 결과 정보로 이동한다.", async () => {
	renderQuiz();

	for (let page = 0; page < AMOUNT; page++) {
		await answerQuiz();
		await clickNextButton();
	}

	expect(mockUsedNavigate).toHaveBeenCalled();
	expect(mockUsedNavigate).toHaveBeenCalledWith(ROUTES.RESULT);
});
