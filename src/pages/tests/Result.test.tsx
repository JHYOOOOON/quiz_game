import { PropsWithChildren } from "react";
import { Provider } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { render, screen } from "@testing-library/react";

import Template from "./Template";
import { Result } from "../Result";
import { answerListAtom, elapsedTimeAtom } from "../../store";
import { getCorrectCount, getIncorrectList, timeToSeconds } from "../../utils";
import { AnswerList } from "../../types";

const TIME = 3000;

const ANSWER_LIST: AnswerList = [
	{
		answer: "Brinjal",
		category: "General Knowledge",
		correct_answer: "Potimarron",
		difficulty: "hard",
		incorrect_answers: ["Brinjal", "Guinea Squash", "Melongene"],
		isCorrect: false,
		question: "Which of the following is not another name for the eggplant?",
		type: "multiple",
	},
	{
		answer: "Flax",
		category: "General Knowledge",
		correct_answer: "Straw",
		difficulty: "easy",
		incorrect_answers: ["Silk", "Hemp", "Flax"],
		isCorrect: false,
		question: "What are Panama hats made out of?",
		type: "multiple",
	},
	{
		answer: "Uno",
		category: "General Knowledge",
		correct_answer: "Uno",
		difficulty: "easy",
		incorrect_answers: ["Go Fish", "Twister", "Munchkin"],
		isCorrect: true,
		question: "Which of the following card games revolves around numbers and basic math?",
		type: "multiple",
	},
	{
		answer: "Skirt",
		category: "General Knowledge",
		correct_answer: "Kilt",
		difficulty: "medium",
		incorrect_answers: ["Skirt", "Dress", "Rhobes"],
		isCorrect: false,
		question: "Which item of clothing is usually worn by a Scotsman at a wedding?",
		type: "multiple",
	},
	{
		answer: "Bullfighting",
		category: "General Knowledge",
		correct_answer: "Bullfighting",
		difficulty: "medium",
		incorrect_answers: ["Fiestas", "Flamenco", "Mariachi"],
		isCorrect: true,
		question: "What did the Spanish autonomous community of Catalonia ban in 2010, that took effect in 2012?",
		type: "multiple",
	},
];

interface IHydrateAtoms extends PropsWithChildren {
	initialValues: any;
}

const HydrateAtoms = ({ initialValues, children }: IHydrateAtoms) => {
	useHydrateAtoms(initialValues);
	return <>{children}</>;
};

const TestProvider = ({ initialValues, children }: IHydrateAtoms) => (
	<Provider>
		<HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
	</Provider>
);

jest.mock("react-chartjs-2", () => ({
	Doughnut: () => <div data-testid="chart"></div>,
}));

const renderResult = () =>
	render(
		<Template>
			<TestProvider
				initialValues={[
					[elapsedTimeAtom, TIME],
					[answerListAtom, ANSWER_LIST],
				]}
			>
				<Result />
			</TestProvider>
		</Template>
	);

describe("결과 정보 페이지에서 다음과 같은 정보를 볼 수 있다.", () => {
	test("퀴즈를 마칠 때까지 소요된 시간", () => {
		renderResult();

		const time = screen.getByTestId("time");

		expect(time).toHaveTextContent(`소요 시간: ${timeToSeconds(TIME)}초`);
	});

	test("정답 개수", () => {
		renderResult();

		const incorrectList = getIncorrectList(ANSWER_LIST);
		const correct = screen.getByTestId("correct");

		expect(correct).toHaveTextContent(`정답: ${getCorrectCount(ANSWER_LIST.length, incorrectList.length)}문제`);
	});

	test("오답 개수", () => {
		renderResult();

		const incorrectList = getIncorrectList(ANSWER_LIST);
		const incorrect = screen.getByTestId("incorrect");

		expect(incorrect).toHaveTextContent(`오답: ${incorrectList.length}문제`);
	});

	test("정 오답에 대한 비율을 차트로 표기", () => {
		renderResult();

		const chart = screen.getByTestId("chart");

		expect(chart).toBeInTheDocument();
	});
});
