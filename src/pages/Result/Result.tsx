import React, { useEffect } from "react";
import { useAtomValue } from "jotai";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import * as Theme from "../../theme";

import { answerListAtom, elapsedTimeAtom } from "../../store";
import { Header } from "../../components";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";

Chart.register(ArcElement, Tooltip, Legend);

export function Result() {
	const navigate = useNavigate();
	const elapsedTime = useAtomValue(elapsedTimeAtom);
	const answerList = useAtomValue(answerListAtom);
	const incorrectList = answerList.filter((answer) => answer.isCorrect === false);
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
		<div>
			<Header />
			<div>
				<h1>수고하셨습니다</h1>
				<Doughnut data={data} />
				<p>정답: {answerList.length - incorrectList.length}문제</p>
				<p>오답: {incorrectList.length}문제</p>
				<p>경과시간: {(elapsedTime / 1000).toFixed(2)}초</p>
			</div>
			<ul>
				{incorrectList.map((item) => (
					<li key={item.answer}>
						<p dangerouslySetInnerHTML={{ __html: item.question }} />
						<div>
							<div>
								<p>정답: </p>
								<p dangerouslySetInnerHTML={{ __html: item.correct_answer }} />
							</div>
							<div>
								<p>내 답안: </p>
								<p dangerouslySetInnerHTML={{ __html: item.answer }} />
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
