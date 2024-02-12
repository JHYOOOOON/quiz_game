import { useLocation, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import styled from "styled-components";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Header } from "../../components";
import { ROUTES } from "../../constants";
import { getQuestions } from "../../lib";
import { stepAtom } from "../../store";
import { Solve } from "../Solve";
import { Question } from "../../types";
import { shuffleArray } from "../../utils";

export function Quiz() {
	const navigate = useNavigate();
	const location = useLocation();
	const [step, setStep] = useAtom(stepAtom);
	const { data: questionList } = useSuspenseQuery({
		queryKey: ["quiz"],
		queryFn: () => {
			if (!location.state) navigate(ROUTES.MAIN);

			const { amount, category, difficulty } = location.state;

			return getQuestions(amount, category, difficulty);
		},
	});

	console.log(questionList);

	const increaseStep = () => setStep((prev) => prev + 1);

	const getAnswerList = (question: Question) =>
		shuffleArray<string>([question.correct_answer, ...question.incorrect_answers]);

	if (!questionList) return null;

	return (
		<Wrapper test-id="quiz">
			<Header />
			{step === questionList.length ? (
				<div>결과</div>
			) : (
				<Solve
					inform={questionList[step]}
					total={questionList.length}
					step={step}
					increaseStep={increaseStep}
					answerList={getAnswerList(questionList[step])}
				/>
			)}
		</Wrapper>
	);
}

const Wrapper = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
`;
