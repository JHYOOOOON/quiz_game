import React, { useEffect } from "react";
import { useAtomValue } from "jotai";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";
import { MdEventNote } from "react-icons/md";

import * as Theme from "../theme";
import { answerListAtom, elapsedTimeAtom } from "../store";
import { Header } from "../components";
import { ROUTES } from "../constants";
import styled from "styled-components";
import { getCorrectCount, getIncorrectList, timeToSeconds } from "../utils";

Chart.register(ArcElement, Tooltip, Legend);

export function Result() {
	const navigate = useNavigate();
	const elapsedTime = useAtomValue(elapsedTimeAtom);
	const answerList = useAtomValue(answerListAtom);
	const incorrectList = getIncorrectList(answerList);
	const data = {
		labels: ["정답", "오답"],
		datasets: [
			{
				label: "문제 풀이 결과",
				data: [answerList.length - incorrectList.length, incorrectList.length],
				backgroundColor: [Theme.colors.green500, Theme.colors.purple],
			},
		],
	};

	useEffect(() => {
		if (answerList.length === 0) {
			navigate(ROUTES.MAIN);
		}
	}, []);

	return (
		<Wrapper>
			<Header />
			<Content>
				<InformWrapper>
					<Title>수고하셨습니다.</Title>
					<DoughnutChart>
						<Doughnut data={data} />
					</DoughnutChart>
					<Inform>
						<p data-testid="correct">정답: {getCorrectCount(answerList.length, incorrectList.length)}문제</p>
						<p data-testid="incorrect">오답: {incorrectList.length}문제</p>
						<p data-testid="time">소요 시간: {timeToSeconds(elapsedTime)}초</p>
					</Inform>
				</InformWrapper>
				<NoteWrapper>
					<NoteTitle>
						<MdEventNote />
						오답노트
					</NoteTitle>
					<NoteContainer>
						{incorrectList.length === 0 ? (
							<RightText>다 맞히셨네요!</RightText>
						) : (
							<Note>
								{incorrectList.map((item) => (
									<NoteItem key={item.answer}>
										<Question>
											<p>Q.</p> <p dangerouslySetInnerHTML={{ __html: item.question }} />
										</Question>
										<AnswerWrapper>
											<Answer className="correct">
												<p>정답: </p>
												<p dangerouslySetInnerHTML={{ __html: item.correct_answer }} />
											</Answer>
											<Answer className="incorrect">
												<p>내 답안: </p>
												<p dangerouslySetInnerHTML={{ __html: item.answer }} />
											</Answer>
										</AnswerWrapper>
									</NoteItem>
								))}
							</Note>
						)}
					</NoteContainer>
				</NoteWrapper>
			</Content>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow: hidden;
`;

const Content = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	padding: 20px 15px;
	gap: 20px;
	overflow: hidden;
`;

const Title = styled.p`
	margin: 15px 0;
	font-weight: bold;
	font-size: 25px;
	text-align: center;
`;

const DoughnutChart = styled.div`
	width: 250px;
	height: 250px;
`;

const InformWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Inform = styled.div`
	display: flex;
	border: 1px solid ${({ theme }) => theme.colors.gray400};
	border-radius: 5px;
	font-size: 14px;
	width: fit-content;
	margin-top: 15px;
	p {
		padding: 5px 7px;
		&:not(:last-child) {
			border-right: 1px solid ${({ theme }) => theme.colors.gray400};
		}
	}
`;

const NoteWrapper = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 10px;
	overflow: hidden;
`;

const NoteTitle = styled.p`
	display: inline-flex;
	align-items: center;
	font-size: 20px;
	font-weight: bold;
	gap: 5px;
`;

const NoteContainer = styled.div`
	flex: 1;
	overflow: hidden;
`;

const NoteItem = styled.li`
	position: relative;
	display: flex;
	flex-direction: column;
	padding: 15px 20px;
	gap: 10px;
`;

const RightText = styled.p`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	font-size: 20px;
	border-radius: 5px;
	border: 1px solid ${({ theme }) => theme.colors.green500};
`;

const Note = styled.ul`
	max-height: 100%;
	border-radius: 5px;
	border: 1px solid ${({ theme }) => theme.colors.green500};
	overflow: auto;

	${NoteItem}:not(:first-child) {
		&::before {
			content: "";
			position: absolute;
			top: 0;
			left: 2%;
			width: 96%;
			height: 1px;
			background-color: ${({ theme }) => theme.colors.gray400};
		}
	}
`;

const Question = styled.div`
	display: flex;
	gap: 5px;
	font-size: 18px;
	line-height: 1.15;
`;

const AnswerWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 3px;
`;

const Answer = styled.div`
	display: flex;
	gap: 5px;
	font-size: 14px;
	line-height: 1.15;
	&.correct {
		color: ${({ theme }) => theme.colors.green700};
	}
	&.incorrect {
		color: ${({ theme }) => theme.colors.yellow600};
	}
`;
