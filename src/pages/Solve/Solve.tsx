import { useState, MouseEvent, useMemo, useEffect } from "react";
import styled from "styled-components";
import { useSetAtom } from "jotai";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

import { Button, ProgressBar } from "../../components";
import { DIFFICULTY } from "../../constants";
import { Question } from "../../types";
import { incorrectListAtom } from "../../store";

interface IQuestion {
	inform: Question;
	total: number;
	step: number;
	answerList: string[];
	increaseStep: () => void;
}

export function Solve({ inform, answerList, total, step, increaseStep }: IQuestion) {
	const { category, correct_answer, incorrect_answers, difficulty, question } = inform;
	const [answer, setAnswer] = useState<string>("");
	const isAnswered = useMemo(() => Boolean(answer), [answer]);
	const isCorrect = useMemo(() => correct_answer === answer, [correct_answer, answer]);
	const saveIncorrectList = useSetAtom(incorrectListAtom);

	useEffect(() => {
		setAnswer("");
	}, [step]);

	useEffect(() => {
		if (isAnswered && inform.incorrect_answers.includes(answer)) {
			saveIncorrectList((prevList) => [...prevList, inform]);
		}
	}, [answer, inform, isAnswered, saveIncorrectList]);

	const handleAnswer = (target: string) => (event: MouseEvent<HTMLButtonElement>) => {
		setAnswer(target);
	};

	const getClassList = (text: string) => {
		if (isAnswered === false) return "";

		if (isCorrect) {
			return text === answer ? "correct" : "";
		} else {
			if (text === answer) {
				return "incorrect";
			} else {
				return correct_answer === text ? "correct" : "";
			}
		}
	};

	const getIcon = (text: string, index: number) => {
		if (isAnswered === false) return `${index + 1}.`;

		if (isCorrect) {
			if (text === answer) {
				return <AiOutlineCheck />;
			}
			return incorrect_answers.includes(text) ? <AiOutlineClose /> : `${index + 1}.`;
		} else {
			if (text === answer) {
				return <AiOutlineClose />;
			}
			return correct_answer === text ? <AiOutlineCheck /> : `${index + 1}.`;
		}
	};

	return (
		<Wrapper test-id="solve">
			<ProgressBar total={total} step={step} />
			<ContentWrapper>
				<Content>
					<Progress>
						{step + 1}/{total}
					</Progress>
					<QuestionInform>
						<p>문제 유형:</p>
						<p>{category}</p>
					</QuestionInform>
					<QuestionInform>
						<p>난이도:</p>
						<p className={difficulty}>{DIFFICULTY[difficulty]}</p>
					</QuestionInform>
					<StyledQuestion>
						<p>Q.</p>
						<p dangerouslySetInnerHTML={{ __html: question }} />
					</StyledQuestion>
					<AnswerList>
						{answerList.map((item, index) => (
							<Answer key={item} className={getClassList(item)} onClick={handleAnswer(item)} disabled={isAnswered}>
								{getIcon(item, index)}
								<p dangerouslySetInnerHTML={{ __html: item }} />
							</Answer>
						))}
					</AnswerList>
					{isAnswered && (
						<ResultInform className={`${isCorrect ? "correct" : ""}`}>
							{isCorrect ? "정답입니다!" : "오답입니다..."}
						</ResultInform>
					)}
				</Content>
				{isAnswered && (
					<Button $size="lg" $fullWidth onClick={increaseStep}>
						{total === step + 1 ? "결과" : "다음 문항"}
					</Button>
				)}
			</ContentWrapper>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
`;

const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	padding: 20px 15px;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`;

const Progress = styled.p`
	margin: 15px 0;
`;

const QuestionInform = styled.div`
	display: inline-flex;
	font-size: 14px;
	margin-bottom: 5px;
	p:last-child {
		margin-left: 3px;
		&.easy {
			color: ${({ theme }) => theme.colors.yellow600};
		}
		&.medium {
			color: ${({ theme }) => theme.colors.green700};
		}
		&.hard {
			color: ${({ theme }) => theme.colors.red700};
		}
	}
`;

const StyledQuestion = styled.div`
	display: inline-flex;
	gap: 5px;
	font-size: 30px;
	line-height: 1.15;
	margin: 15px 0 25px 0;
`;

const ResultInform = styled.p`
	font-size: 18px;
	margin: 25px 0;
	text-align: center;
	color: ${({ theme }) => theme.colors.red600};
	&.correct {
		color: ${({ theme }) => theme.colors.green700};
	}
`;

const AnswerList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

const Answer = styled.button`
	display: flex;
	align-items: center;
	gap: 5px;
	flex: auto 1;
	font-size: 16px;
	line-height: 1.15;
	padding: 15px 20px;
	border: 1px solid ${({ theme }) => theme.colors.gray300};
	border-radius: 5px;
	background-color: ${({ theme }) => theme.colors.white};
	transition: 0.2s background;
	cursor: pointer;
	&.correct {
		border: 1px solid ${({ theme }) => theme.colors.green700};
		color: ${({ theme }) => theme.colors.green700};
	}
	&.incorrect {
		border: 1px solid ${({ theme }) => theme.colors.red600};
		color: ${({ theme }) => theme.colors.red600};
	}
	&:not(:disabled):hover {
		background-color: ${({ theme }) => theme.colors.green100};
	}
	&:disabled {
		cursor: auto;
	}
`;
