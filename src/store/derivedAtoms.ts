import { atom } from "jotai";

import { incorrectListAtom, questionListAtom, stepAtom } from "./atoms";

export const withIncorrectList = atom(
	(get) => get(incorrectListAtom),
	(get, set) => {
		// 틀린 문제 저장
		const step = get(stepAtom);
		const questionList = get(questionListAtom);
		set(incorrectListAtom, [...get(incorrectListAtom), questionList[step]]);
	}
);
