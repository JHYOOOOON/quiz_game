import { useLocation, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { useQuery } from "@tanstack/react-query";

import { ROUTES } from "../../constants";
import { getQuestions } from "../../lib";
import { stepAtom } from "../../store";
import { Header } from "../../components";

export function Quiz() {
	const navigate = useNavigate();
	const location = useLocation();
	const [step, setStep] = useAtom(stepAtom);
	const { data: questionList } = useQuery({
		queryKey: ["quiz"],
		queryFn: () => {
			if (!location.state) navigate(ROUTES.MAIN);

			const { amount, category, difficulty, type } = location.state;

			return getQuestions(amount, category, difficulty, type);
		},
	});

	const increaseStep = () => setStep((prev) => prev + 1);

	if (!questionList) return null;

	return (
		<div test-id="quiz">
			<Header hasNote={false} />
			{questionList && step === questionList.length ? <div>결과</div> : <div>문제</div>}
		</div>
	);
}
