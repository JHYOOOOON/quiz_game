import { AnswerList } from "../types";

export const getIncorrectList = (answerList: AnswerList) => answerList.filter((answer) => answer.isCorrect === false);

export const getCorrectCount = (total: number, incorrectCount: number) => total - incorrectCount;
