import { MouseEvent, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useSetAtom } from "jotai";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

import { Button, Header, ProgressBar } from "../components";
import { DIFFICULTY, ROUTES } from "../constants";
import { getQuestions } from "../lib";
import { Question } from "../types";
import { shuffleArray } from "../utils";
import { elapsedTimeAtom, answerListAtom } from "../store";

export function Quiz() {
	const navigate = useNavigate();
	const [step, setStep] = useState(0);
	const [startTime, setStartTime] = useState(0);
	const setElapsedTime = useSetAtom(elapsedTimeAtom);
	const saveAnswerList = useSetAtom(answerListAtom);
	const [searchParams, _] = useSearchParams();
	const { data: questionList } = useSuspenseQuery({
		queryKey: ["quiz", searchParams.get("timestamp")],
		queryFn: () => {
			const queries = ["amount", "category", "difficulty"].map((key) => searchParams.get(key) ?? "");

			if (Boolean(queries[0]) === false) {
				window.location.href = ROUTES.MAIN;
			}

			return getQuestions(queries[0], queries[1], queries[2]);
		},
	});
	const getAnswerList = (question: Question) =>
		shuffleArray<string>([question.correct_answer, ...question.incorrect_answers]);
	const inform = useMemo(() => questionList[step], [questionList, step]);
	const answerList = useMemo(() => getAnswerList(inform), [inform]);
	const [answer, setAnswer] = useState<string>("");
	const isAnswered = useMemo(() => Boolean(answer), [answer]);
	const isCorrect = useMemo(() => inform.correct_answer === answer, [inform, answer]);

	useEffect(() => {
		// 저장된 답변 초기화
		saveAnswerList([]);
		// 시작시간 초기화
		setStartTime(new Date().getTime());
	}, []);

	useEffect(() => {
		// 답변 초기화
		setAnswer("");
	}, [step]);

	useEffect(() => {
		if (isAnswered) {
			saveAnswerList((prev) => [...prev, { ...inform, isCorrect, answer }]);
		}
	}, [isAnswered]);

	const increaseStep = () => {
		if (step === questionList.length - 1) {
			setElapsedTime(new Date().getTime() - startTime);
			navigate(ROUTES.RESULT);
			return;
		}
		setStep((prev) => prev + 1);
	};

	const getClassList = (text: string) => {
		if (isAnswered === false) return "";

		if (isCorrect) {
			return text === answer ? "correct" : "";
		} else {
			if (text === answer) {
				return "incorrect";
			} else {
				return inform.correct_answer === text ? "correct" : "";
			}
		}
	};

	const getIcon = (text: string, index: number) => {
		if (isAnswered === false) return `${index + 1}.`;

		if (isCorrect) {
			if (text === answer) {
				return <AiOutlineCheck />;
			}
			return inform.incorrect_answers.includes(text) ? <AiOutlineClose /> : `${index + 1}.`;
		} else {
			if (text === answer) {
				return <AiOutlineClose />;
			}
			return inform.correct_answer === text ? <AiOutlineCheck /> : `${index + 1}.`;
		}
	};

	const handleAnswer = (target: string) => (event: MouseEvent<HTMLButtonElement>) => {
		setAnswer(target);
	};

	if (!questionList) return null;

	// if (failureReason) return <Loader />;

	return (
		<Wrapper data-testid="quiz">
			<Header />
			<QuizWrapper>
				<ProgressBar total={questionList.length} step={step} />
				<ContentWrapper>
					<Content>
						<Progress data-testid="progress">
							{step + 1}/{questionList.length}
						</Progress>
						<QuestionInform>
							<p>문제 유형:</p>
							<p>{inform.category}</p>
						</QuestionInform>
						<QuestionInform>
							<p>난이도:</p>
							<p className={inform.difficulty}>{DIFFICULTY[inform.difficulty]}</p>
						</QuestionInform>
						<StyledQuestion>
							<p>Q.</p>
							<p dangerouslySetInnerHTML={{ __html: inform.question }} />
						</StyledQuestion>
						<AnswerList>
							{answerList.map((item, index) => (
								<Answer
									data-testid="answer"
									key={item}
									className={getClassList(item)}
									onClick={handleAnswer(item)}
									disabled={isAnswered}
								>
									{getIcon(item, index)}
									<p dangerouslySetInnerHTML={{ __html: item }} />
								</Answer>
							))}
						</AnswerList>
						{isAnswered && (
							<ResultInform data-testid="resultText" className={`${isCorrect ? "correct" : ""}`}>
								{isCorrect ? "정답입니다!" : "오답입니다..."}
							</ResultInform>
						)}
					</Content>
					{isAnswered && (
						<Button data-testid="submit" $size="lg" $fullWidth onClick={increaseStep}>
							{questionList.length === step + 1 ? "결과" : "다음 문항"}
						</Button>
					)}
				</ContentWrapper>
			</QuizWrapper>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
`;

const QuizWrapper = styled.div`
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
	text-align: left;
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
